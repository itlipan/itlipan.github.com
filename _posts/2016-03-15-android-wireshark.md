---
layout: post
title: 网络抓包相关
category: android
---

### Fiddler

早期基于.Net开发，所以一般对于Windows支持更加好，所以Windows上比较常用，而且软件上手简单，作为主要针对 Http Https的抓包工具,一般安装后设置相应的代理地址后直接上手，比较简单；

说到代理：其实 Fiddler的原理就是作为客户端与服务器中介，完成请求与返回的截获；

其既可以通过断点用于截获 http返回包，自行模拟返回；也可以解密 https 内容，同时也常用于 app 性能优化相关测试；总之就是非常好用；

Fiddler 模式： 流模式，实时响应；缓冲模式，更加高度可控的服务器响应模式；



### Wireshark

WireShark 是一款比较全能的软件，属于一款比较高级的网络封包查看工具，用于监听电脑某个接口的网络行为，Wireshark 一般用于捕获网络包，由于开源以及安全原因其不能修改或篡改发送包内容；

在调试手机时，可以利用共享网络去间接调试手机网络包情况；详细的说就是利用电脑设定虚拟网络，手机连接电脑网络后，利用WireShark 监控电脑网络，进而也就是间接监控抓包手机网络；

常见的用于调试Socket链接情况，调试TCP/UDP 协议；




### tcpdump

[Android tcpdump](http://www.strazzere.com/android/tcpdump)

多设备调试ADB SHELL：

`adb -s devicename shell`


Android L 以上执行 tcpdump  

> error: only position independent executables (PIE) are supported.

[[FIX] [Android 'L'] Bypassing the new PIE security check](http://forum.xda-developers.com/google-nexus-5/development/fix-bypassing-pie-security-check-t2797731)

`/system/bin/linker` 文件的替换，新增二进制代码绕过google安全检查机制；

不要忘记`/data/local/tmp`文件夹；


---

Quote:


[Download Fiddler](https://www.telerik.com/download/fiddler)

[Fiddler实用教程](https://segmentfault.com/a/1190000004240812)

[使用fiddler进行安卓手机抓包](https://segmentfault.com/a/1190000002597285)

[Wireshark User’s Guide](https://www.wireshark.org/docs/wsug_html_chunked/)

[Download Wireshark](https://www.wireshark.org/download.html)

[Wireshark基本介绍和学习TCP三次握手](http://www.cnblogs.com/TankXiao/archive/2012/10/10/2711777.html#who)

[一站式学习Wireshark](http://blog.jobbole.com/70907/)

[一站式学习Wireshark(全)](https://community.emc.com/thread/194901)

[Android 手机上实现抓包](https://www.zhihu.com/question/20467503)
