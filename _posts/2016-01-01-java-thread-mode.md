---
layout: post
title: Java 多线程使用模式
category: java
---

### 最常用的两种线程使用模式：

**Future模式** 与 **生产消费者模式**；

**Future模式：**

很多时候我们虽然开启了后台线程执行某些业务逻辑，但是却需要后台线程的执行状态结果的返回，以便主线程根据这执行结果判断其他的逻辑执行情况，若这一执行是耗时的往往需要等待的过程。

一种可以优化的情况是：我们并不是立马需要这个执行状态，也就是说这个执行状态的结果获取是可以后延的，利用Future模式，将这段等待时间利用起来，变串行等待为并行，等待时间内进行其他业务逻辑的操作，最后当所有条件准备好之后，再get这个状态的执行返回结果；

需要注意的一点是：若get FutureTask结果时，线程内部业务逻辑依旧在执行，也是同样需要阻塞等待
的。


针对这一情况记录最近遇到的一个优化实例：保存数据时，利用的一个SynTask操作保存全部数据状态，UI线程利用ShowDialog阻塞等待状态，在针对大数据量下Dialog时间过长的问题优化时，分析发现 有部分大时间操作 大概在 1000ms 实在等待数据保存到系统的状态返回，但是在获取返回数据之后，并没有立即使用，而是在获取之后又执行了大量其他保存操作，最后综合这部分其他操作和结果进行业务逻辑判定，我得解决方案是将这部分阻塞操作独立出来，利用FutureTask方式，将系统保存操作抛出（此处注意内存泄漏问题），从而将那些其他操作的运行时间提前，在最后状态综合阶段再阻塞等待状态集合做后续业务逻辑操作；最后发现这样的方式缩短了 超过40%的等待时间，效果很满意；


**生产消费者模式：**

这估计是最常见的多线程协同作业模式；其核心是将生产线程与消费线程通过共享内存缓冲区进行逻辑分离解耦，二者各自只关心自己的状态，生产者搜集工作提交到缓存区，消费者从缓存区获取处理工作；同时通过缓存区缓解二者性能与执行时间差距；可以一定程度缓解系统并行状态的性能瓶颈；


{% highlight java %}

public static class WaitNotifyBuffer{

        ArrayList<Integer>  mIntBuffer = new ArrayList<>(SIZE);
        static final int SIZE = 10;

        private int getRandomIntInRange(){
            final int max = 20;
            final int min = 10;
            Random random = new Random();
            // max - min 之间的随机数
            return random.nextInt((max - min) + 1) + min;
        }

        public  synchronized void addIntToBuffer(int num) throws InterruptedException {
            while (mIntBuffer.size() == SIZE){
                //wait() tells the calling thread to give up the monitor and go to sleep until some other thread enters the same monitor and calls notify( ).
                wait();
            }
            mIntBuffer.add(num);
            notifyAll();
        }


        public synchronized int offerInt() throws InterruptedException {
            while (mIntBuffer.size() == 0){
                wait();
            }
            int result = mIntBuffer.get(0);
            mIntBuffer.remove(0);
            //notify() wakes up the first thread that called wait() on the same object.
            //notify();
            notifyAll();
            return result;
        }

        public synchronized int getSize(){
            return mIntBuffer.size();
        }

    }


    public static class BlockingQueueBuffer{

    ArrayBlockingQueue<Integer> mIntBuffer = new ArrayBlockingQueue<>(10);

        public void addIntToBuffer(int num) throws InterruptedException {
            mIntBuffer.put(num);
        }

        public int offerInt() throws InterruptedException {
            return mIntBuffer.take();
        }

    }

{%  endhighlight %}

顺带提一个**不变模式**;

不变模式有与生俱来的线程友好，利用final特性，一个变量一旦被创建就无法修改，回避了线程之间的协同作业的同步操作，可以一定程度的提升性能；需要注意的是不变模式由于状态根本就无法修改，是不进行线程之间状态修改并同步通信的，所以与同步的应用场景是有差异的；




### 线程通信：

关于非Double 、非Float类型的原子变量，**Java保证在对应线程中返回的值是该线程中存储的对应变量的值，** 但是  **并不能保证一个线程写入的值对于另一个线程也是可见的**

较为常用的保证线程间**可靠**通信：  不变量(final字段的灵活运用) 以及同步互斥机制；

同步机制其实包含了两方面意思：线程之间的互斥与线程间内容共享；同步保证线程有序的修改内容，保证内容的修改在线程之间清晰可见；

同步是削弱并发性能的，所以需要注意过度的锁同步现象，尽可能减少锁区工作量，提升性能；还需要注意避免线程间互相等待所造成的死锁现象；

轻量级同步Volatile：针对原子性操作是可靠的，但是非原子性操作多线程之间也是不可靠的，如 ++ 操作，涉及到读取，以及运算+1操作，若线程A读取了变量值之后，在运算操作之前的这段时间内，其他线程完成了对于变量的修改操作，这时候线程A的运算+1操作就是不可靠的；

### 线程调度：

多线程运行时，哪些线程运行是由线程调度器所决定的，线程在调度器看来也是有优先级的，有一等二等公民之分，但是线程调度器是不可完全依赖的；想要依赖yeild()函数合理让出Cpu执行时间是不可控的；

过度细腻的线程等级控制是没有你预期的有用的，可能等级5和等级6并没有你想的那么大，Java推荐的内置等级有三种MIN，NORME，MAX等级；Java利用setPriority设定线程优先级；

但是Android内置的等级就更多了：Android基于Linux，其线程优先级调整命令是：nice——优先级的范围为-20 ～ 19 等40个等级，其中数值越小优先级越高，数值越大优先级越低；nice用于设定新建线程优先级，renice用于调整已有线程优先级；renice一般需要权限；

由于Android的40个线程等级，其内置的线程优先级值就远远比Java的三级要多了一般有：

> THREAD_PRIORITY_DEFAULT，默认的线程优先级，值为0。
>
> THREAD_PRIORITY_LOWEST，最低的线程级别，值为19。   
>  
>  THREAD_PRIORITY_BACKGROUND 后台线程建议设置这个优先级，值为10。   
>  
>  THREAD_PRIORITY_FOREGROUND 用户正在交互的UI线程，代码中无法设置该优先级，系统会按照情况调整到该优先级，值为-2。  
>  
>  THREAD_PRIORITY_DISPLAY 也是与UI交互相关的优先级界别，但是要比THREAD_PRIORITY_FOREGROUND优先，代码中无法设置，由系统按照情况调整，值为-4。  
>  
>  THREAD_PRIORITY_URGENT_DISPLAY 显示线程的最高级别，用来处理绘制画面和检索输入事件，代码中无法设置成该优先级。值为-8。   
>  
>  THREAD_PRIORITY_AUDIO 声音线程的标准级别，代码中无法设置为该优先级，值为 -16。   
>  
>  THREAD_PRIORITY_URGENT_AUDIO 声音线程的最高级别，优先程度较THREAD_PRIORITY_AUDIO要高。代码中无法设置为该优先级。值为-19。  
>  
>  THREAD_PRIORITY_MORE_FAVORABLE 相对THREAD_PRIORITY_DEFAULT稍微优先，值为-1。  
>  
>  THREAD_PRIORITY_LESS_FAVORABLE 相对THREAD_PRIORITY_DEFAULT稍微落后一些，值为1。
>  
>  以上引用自[技术小黑屋-剖析Android中进程与线程调度之nice](http://droidyue.com/blog/2015/09/05/android-process-and-thread-schedule-nice/)

而Android对线程优先级的设定比较简单：android.os.Process.setThreadPriority方法即可；


需要注意的是：Android中两种优先级设定的共存，但是nice设定线程优先级与getPriority()并不统一，也就是利用了android.os.Process.setThreadPriority()设定了优先级，并不能利用getPriority()获取到设定的优先级值，也就是二者其实不是一个系统，想想也是合理的，一个是针对JVM的，一个是针对Linux内核的，完全是两回事；





顺带提一个遇到的小**Tip**：

关于Collections.copy();函数的OutOfIndex问题；

destination List 内容长度要大于 src List，而不是容量大于，所以 new ArrayList(src.size())是错误的，正确方式是: new ArrayList(src);


---

Quote：

[剖析Android中进程与线程调度之nice](http://droidyue.com/blog/2015/09/05/android-process-and-thread-schedule-nice/)

[Java中的阻塞队列](http://www.infoq.com/cn/articles/java-blocking-queue)

[Java Thread: notify() and wait() examples](http://www.programcreek.com/2009/02/notify-and-wait-example/)

[如何在 Java 中正确使用 wait, notify 和 notifyAll](http://www.codeceo.com/article/java-wait-notify-notifyall-2.html)

Effective Java

Java程序性能优化

深入理解Java虚拟机

Java并发编程实战
