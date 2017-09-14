---
layout: post
title:  Android Tips part (14)
category: android
keywords: [improvement,android,java]
---

### 时间管理 

先来记录一个时间管理的方法 Tips -- **子弹记事法**    
事实上无论什么记事情的方式都是 收集-处理-再过滤-以及提醒-回顾的一些集合,关键在于如何时刻提醒自己处理事情的优先级,以及回顾事情的处理进度的提醒;     

子弹记事法通过自造一些符号,结合重点标注的形式,结合图像而摒弃简单的1.2.3.这样单纯的数字标注形式,更加有助于事件的管理;


[子彈筆記術(上) Bullet Journal 快狠準清單日記法教學 
](http://www.playpcesor.com/2015/12/bullet-journal.html?m=1)

快速自定义符号构建管理方式: @ # ! ..等符号

[Workflowy Journal](https://medium.com/@amirmasoudabdol/workflowy-journal-d33405065d64)


### HttpUrlConnection  

Android 4.4之后系统通过 URLStreamHandler 的bridge 过渡到了 okhttp 进行请求,但由于系统中内置 okhttp 的版本各不相同,因而如果直接使用 HttpUrlConnection 会在网络请求中诞生 client 碎片化的问题,OkHttp 的众多 issue 都有可能被碰到;如 dns 的问题,无限请求问题等等,因而较好的实践是直接使用指定版本的 okhttp 达到一致的开发使用体验,当然后期排查问题也更好解决;   

> URL.setupStreamHandler()
> 
> URLStreamHandler.openConnection()    
> 
> HttpHandler.openConnection()     
> 
> HttpEngine........

[Http(s)URLConnection 源码流程](https://zhuanlan.zhihu.com/p/29205566)

### EventBus  3

Index 加速引擎将原来的在注册时利用反射搜寻观察者的逻辑,优化到了源码过程中,通过 apt 等源码扫描工具,扫描源码中的特定注解获取到对应的观察者,进而生成了对应的观察者缓存 Index,加速后期观察者的对应搜寻速度事实上也是非常有效的;从问题的解决角度去看源码也更加清晰;

或许这也就是大 V 们所说的 Android 的核心在 Android 之外,立足于问题看实现;

利用 processAnnotation 扫描源码注解,对于注解函数缓存构建 IndexMap,而如果未使用 Index 构建缓存,则依旧使用反射机制运行时获取;


