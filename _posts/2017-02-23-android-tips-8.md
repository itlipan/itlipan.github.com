---
layout: post
title:  Android Tips part (8)
category: android
keywords: [improvement,android,java]
---

###  App 捕获所有Crash

很有意思的想法，通过研究了Android Looper的源码，以及其消息处理机制，自行构建可TryCath的主线程Lopper.loop();

原文如下：

[构建永不Crash应用——原理](https://github.com/android-notes/Cockroach/blob/master/%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90.md)



### MVVM

在DataBinding最初遍根据googleDoc学习过一阵子，最近学习到iOS以及一些前端MVVM思想，事实上，MVVM的核心是ViewModel的如何建立，View的操作事件对于数据Model的改变以及Model数据的改变如何影响到View的显示的双向关系的建立；也就是双向绑定机制。

Android中的DataBinding就是这样的框架，其增强了XML对于View的表象能力，但是对于将逻辑表达式写入XML中，会导致项目结构以及规则不统一显得项目非常凌乱，显然，项目结构的清晰化更加重要，这也是我不喜欢DataBinding的原因，这是Google的一次好的尝试；

目前个人依旧比较推崇MVP，虽然其有这一类膨胀以及Presenter复杂化问题，但是如果使用得当依旧是一个组织结构清晰化的利器，我始终记得8000余行Activity给我带来的痛苦；

一些好的实践比如对于View层的层层ViewGroup封装，在无需Fragment生命周期时，封装ViewGroup往往比Fragment更加直观有效，丰富的Repository数据层封装简化Presenter逻辑，结合RX的异步逻辑简化可以极大的优化代码结构


### Dialog 不触发 Activity onPause生命周期

Dialog依附于Activity，其作为Activity的一部分，其操作不会影响Activity生命周期，Dialog.show() 时, Activity不执行 onPause生命周期函数 - 实测

### adb

简单的输出重定向命令：

`adb logcat >  ~/Document/templogs.txt`

### Proguard

`consumerProguardFiles`生成带混淆配置文件的库：   

指定aar库ProGuard配置文件，在库生成aar的混淆过程中会自动使用该配置文件,且pro配置文件会被aar文件包含，同时该配置文件仅对该库生效；


#### Proguard 配置

我们知道Proguard的几个过程: 压缩,优化,混淆,预校验;

Proguard 几个过程会有对应生成文件产生:

-  混淆映射表文件- mapping.txt,可以通过此文件从混淆文件中的位置映射到源码对应位置,帮助定位线上Bug

-  class 内部结构文件 - dump.txt

-  未混淆类以及成员汇总文件 - seeds.txt  

-  被删除源码汇总文件  - usage.txt


我们知道 Proguard会变更类名,函数名称,以及class文件结构,一些特殊的情况我们是要避过proguard处理的,如:

- 反射所使用的类    

-  AndroidManifest中配置类 - 四大组件及其子类以及相关FramWork相关类  V4包等   

- jni相关native类      

- js与本地原生组件互相调用的类     

-  运行时以及Class级别注解类 以及系统注解包: annotation包等     

-  序列化相关Model类 以及 枚举等类

-  一些三方jar包 如微信分享SDK相关类    


#### Proguard 管理

Proguard 在配置时可以指定多个文件,最近看到一种新的方式,非常清晰明了,由于所引入的库或者Model都有对应的混淆规则需求,每一个开源库对应一个配置文件管理将极大的增加管理项目的清晰程度,以及后期可维护性;

以下开源项目已经列出了常用开源库说需要的混淆配置文件-**非常有用**:

[android-proguard-snippets](https://github.com/krschultz/android-proguard-snippets)

附:

[Android Proguard(混淆)](http://www.jianshu.com/p/60e82aafcfd0)

[ProGuard在插件化里的应用](https://www.easydone.cn/2017/01/02/)


### Android 远程进程重复初始化Application问题



{% highlight java %}

// 通常做法：
public static String getProcessName(Context cxt, int pid) {
  ActivityManager am = (ActivityManager) cxt.getSystemService(Context.ACTIVITY_SERVICE);
  List<RunningAppProcessInfo> runningApps = am.getRunningAppProcesses();
  if (runningApps == null) {
  return null;
  }
  for (RunningAppProcessInfo procInfo : runningApps) {
  if (procInfo.pid == pid) {
  return procInfo.processName;
  }
  }
  return null;
}

//高效的读取Proc文件：
public static String getProcessName() {
  try {
    File file = new File("/proc/" + android.os.Process.myPid() + "/" + "cmdline");
    BufferedReader mBufferedReader = new BufferedReader(new FileReader(file));
    String processName = mBufferedReader.readLine().trim();
    mBufferedReader.close(); return processName;
    } catch (Exception e) {
       e.printStackTrace();
       return null; }
}

{% endhighlight %}

### DownLoadManager  

> The Android DownloadManager introduced in Android 2.3. (API 9) is a system service which allows to handle long-running HTTP downloads in the background and notify the triggering application via a broadcast receiver once the download is finished.

DownLoadManager 作为系统Service，有独立进程，在下载时不干扰App内存使用开销问题；

使用方式：

DownLoadManager.Request 构建下载请求

DownLoadManager.Query 用于查看下载信息，如下载进度查询等；

对于进度的查询需要轮询查看进度，直到收到下载完成的通知： 轮询任务可以使用 ScheduledExecutorService

[Android系统下载管理DownloadManager功能介绍及使用示例](http://www.trinea.cn/android/android-downloadmanager/)

###  manifest MetaData - TAG

利用Gradle注入 manifest metaData标签值：

{% highlight java %}

<meta-data
           android:name="UMENG_CHANNEL"
           android:value="${UMENG_CHANNEL_VALUE}" />

defaultConfig {
       manifestPlaceholders = [UMENG_CHANNEL_VALUE: 'dev']
 }

{%  endhighlight  %}

如何在程序中获取 metaData值：

{% highlight j %}

//在Activity应用<meta-data>元素。
ActivityInfo info = this.getPackageManager()
        .getActivityInfo(getComponentName(),PackageManager.GET_META_DATA);
info.metaData.getString("meta_name");

//在application应用<meta-data>元素。
ApplicationInfo appInfo = this.getPackageManager()
        .getApplicationInfo(getPackageName(),PackageManager.GET_META_DATA);
appInfo.metaData.getString("meta_name");

//在service应用<meta-data>元素。
ComponentName cn = new ComponentName(this, MetaDataService.class);
ServiceInfo info = this.getPackageManager().getServiceInfo(cn, PackageManager.GET_META_DATA);
info.metaData.getString("meta_name");

//在receiver应用<meta-data>元素。
ComponentName cn = new ComponentName(context, MetaDataReceiver.class);
ActivityInfo info = context.getPackageManager().getReceiverInfo(cn, PackageManager.GET_META_DATA);
info.metaData.getString("meta_name");

{% endhighlight %}

### ApplicationID 与 PkgName

在初期Eclipse构建时期，二者是有一致性关系，PkgName 可以作为应用AppID作为应用标识，但当AS引入Gradle管理之后，ApplicationID随之引入，被分离出来，可以通过Gradle构建工具，构建不同的版本ID的App：

{% highlight  java %}

productFlavors {
    pro {
        applicationId = "com.example.my.pkg.pro"
    }
    free {
        applicationId = "com.example.my.pkg.free"
    }
}

{% endhighlight %}
