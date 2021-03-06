---
layout: post
title: Java IO再读
category: java
---

关于JavaIO知识再梳理，最近一直学习上层应用开发，实在是忙的团团转，GoogleDev中的ApiGuide还需要继续阅读梳理，最近涉及到一些IO缓存方面的问题，一直断断续续按需要查找，想来还是应该再整体梳理一遍。

**Java编程思想——JavaIO系统**



#### File相关：处理文件目录

* File与FilenameFilter    
* 目录的检查与创建


#### 输入输出


流的概念：流代表任何有能力产出数据的数据源对象或有能力接受数据的接收端，屏蔽数据处理细节问题。这里面需要明确输入与输出，这里只需要确定输入输出的针对对象就可以理解。

流往往不能单独使用，其装饰器模式的使用，往往一项功能需要创建流之后再多次创建更多的流对象去包装完成细节功能。

####InputStream代表你那些不同数据源产生的输入类，其数据源包括：

* 字节数组     
* String对象     
* 文件File     
* 管道通信    
* 其他种类流序列      
* 其他数据源如网络数据        
* FilterInputStream      

#### OutputStream




#### 中间转换包装类

数据的存储是字节形式，而数据的展示是字符，二者在使用时的中间转换流为：inputStreamReader、outputStreamWriter.


#### 输入输出流的经典使用：




#### 数据流：


利用DataOutputStream与DataOutinputStream用合适的方式分别处理输出与输入，可以无视平台特性而保证数据的准确读取，允许应用程序按照与机器无关的风格读取java原始数据。其通过对于流功能的拓展，可更加方便的直接读写 int、long、char等类型数据。而不关心其底层字节占用情况，其本质是一种抽象。

#### 标准IO与IO重定向

标准IO读取：利用InputStreamReader包装System.in

标准IO转换：PrintWriter包装System.in构造自有对象

IO重定向：System.SetIn();System.SetOut();System.SetErr();


### IO使用是考虑要点


1. 按照数据来源：文件？字节数组？字符串？网络数据？       
2. 格式化输出亦或输出重定向？        
3. 缓冲？Buffer？                        
4. 数据格式？               
5. 输入（InputStream Reader）？ 输出（OutPutStream Writer）？            
6. 数据格式？确定纯文本的字符流？亦或无法确定的字节流？         
7. 特殊使用场景的对象流以及进程间管道流                           

       



#### NIO相关

#### 序列化：序列化结合Android实现Paceable接口查看

序列化实现了Java对象的轻量级持久化

对比默认序列化机制与实现Externalizable接口实现序列化过程控制，这类自定义过程更加类似于Android机制中实现Paceable接口。

合适的安全性可序列化机制：transient关键字，关闭字段的序列化，与Serializable接口配合使用。

#### 压缩：Gzip与Zip高效压缩传输，Jar文件的使用

Gzip的数据压缩在Android中也经常使用，可以降低传输数据量，提升应用性能

其应用便利，将输入或者输出流封装为GZIPOutPutStream/GZIPInputStream使用。


#### Preferences

Preferences.userNodeForPackage同样结合AndroidSharePreference理解，键值对的存储方式


