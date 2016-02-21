---
layout: post
title: Android Tips part (6)
category: android
---




### LoaderManager initLoader VS  restartLoader

initLoader:

> Call to initialize a particular ID with a Loader. If this ID already has a Loader associated with it, it is left unchanged and any previous callbacks replaced with the newly provided ones. If there is not currently a Loader for the ID, a new one is created and started.

> This function should generally be used when a component is initializing, to ensure that a Loader it relies on is created. This allows it to re-use an existing Loader's data if there already is one, so that for example when an Activity is re-created after a configuration change it does not need to re-create its loaders.  




虽然Android Doc文档的描叙上二者很相似，但是其实还是有一些区别的：

* 当 loader 不存在时二者都会创建新的 Loader并激活其，处于active状态；       
* 当 ID 所对应标识的 loader存在时，initLoader 直接复用该 loader 更换其 loaderCallBack，可以用于当 Activity 配置变化，Activity重建但数据查找等不需要变化时重用 loader，更换其 callback更新UI；而 restartLoader 则更加激进，直接停止当前的loader，重新创建新的 loader，我们知道loader的加载是异步的，对象创建必然有开销,所以处处用restart是低效的；

> This decision is made solely based on the "need" for a new loader. If we want to run the same query we use initLoader, if we want to run a different query we use restartLoader. 


> It's very important to understand the difference between the data that is loaded and the "query" to load that data. Let's assume we use a CursorLoader querying a table for orders. If a new order is added to that table the CursorLoader uses onContentChanged() to inform the ui to update and show the new order (no need to use restartLoader in this case). If we want to display only open orders we need a new query and we would use restartLoader to return a new CursorLoader reflecting the new query.



### ProgressDialog  show（）函数调用之后不显示问题

最近解同事的一个坑，将数据查找放在主线程中，结果当海量数据时出现了Dialog.show()函数调用后进度无法显示的问题；

结论：UI 线程阻塞引起；

Dialog.show()函数调用后，后续的UI线程中操作挤占了 
界面的更改时间，造成界面卡顿，Dialog无法马上显示出来，严重者会出现ANR；

典型的重试可以尝试 ProgressDialog.Show() 之后 Thread.sleep(5000); 进度条不会里面显示出来就是这个原因；











---


Quote:



[Difference between `initLoader` and `restartLoader` in `LoaderManager`](http://stackoverflow.com/questions/14445070/difference-between-initloader-and-restartloader-in-loadermanager)