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

#### 知识整理  

知识的记忆通常依赖两个途径: 重复记忆以及理解记忆; 而理解记忆则依赖于对于知识的解构,抽象与整理,对于知识的整理与回顾是非常重要的;事实上这也承接上文事件管理中 Task 的回顾与整理;日回顾,周回顾,月回顾

[关于知识整理、积累与记忆](http://freemind.pluskid.org/misc/knowledge-accumulate/)

### Js this 

记录一篇好文章: this 的动态绑定,谁调用的函数? 多层 this 中的 that 应用;利用bind 等明确 this;

[JavaScript 中 this 是如何工作的？](http://snailsky.me/2014/08/31/javascript-%E4%B8%AD-this-%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84%EF%BC%9F/)

### Custom View 

自定义 View的一篇好文章,早咋没看到...测量布局绘制每个步骤涉及的细节都比较多,虽然现在看来自定义 View 只是基础,但最初上手时还是谈自定义变色的,同时优化 UI 时自定义 View 也是非常重要的,自定义 View 优化布局结构,对于 overdraw 改善是非常明显的;

[Custom Layouts on Android](http://lucasr.org/2014/05/12/custom-layouts-on-android/)

译文:

[Android: 自定义View](http://www.jianshu.com/p/29bb35a4860e)

### Android 构建

Android 多 Module 构建,对应 sdk 版本以及 buildTools 版本不一致时在 jenkins 上会有各种问题,如processReleaseResources...等等,可更新对应 sdkmanager 后重新构建,但更好的方式是使用同 sdk 版本控制,利用 rootproject.ext 变量统一控制;


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


### USB Hub 

MBP 上,USB Hub 的 jam 问题:

> 基于集线器的网络仍然是一个共享介质的局域网，这里的"共享"其实就是集线器内部总线，所以当上行通道与下行通道同时发送数据时仍然会存在信号碰撞现象。当集线器将从其内部端口检测到碰撞时，产生碰撞强化信号（Jam）向集线器所连接的目标端口进行传送。这时所有数据都将不能发送成功，形成网络"大塞车"。

在MBP上表现合盖后导致 wifi 断连无法重连的问题 - 处处皆是知识

解决办法: 拔掉 HUB 合盖,再重新插入 Hub


### Fresco  Lib 中的 Scaletype 问题

Fresco 设置 ScaleType 的问题,在 Lib 中若设置 Fresco 依赖为 provided,在配置 xml 时需要使用:

`xmlns:fresco="http://schemas.android.com/apk/lib-auto"`

而问题是,一旦使用这种声明方式, fresco配置的 scaleType 就无法生效,只能更改依赖为: compile 同时将声明方式改为正常的:

`xmlns:fresco="http://schemas.android.com/apk/res-auto"`

