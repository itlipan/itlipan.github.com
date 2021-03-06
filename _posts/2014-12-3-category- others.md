---
layout: post
title: 解决Jekyll-category大小写问题
category: others
---

# Jekyll-category大小写

近两天一直在调探索个人`Blog`的搭建，除了站内搜索`Google`没有解决之外，其他问题目前已经基本解决；

关于文章的聚类问题，最后困扰了我大半天:

>核心问题是文章无法按照既定约束去聚类

最后发现是文章头`category`转换问题；也就是说当我`category`设定为大写时：

         - category: Java
         - category: JAVA

之类的时候，默认文章全部设定为：

         - category: java

这点是在输出之后发现的：[参考链接](http://www.tuicool.com/articles/INBnMz)

{% highlight javascript %}

for category in site.categories
category | first 
category | last | size
<ul class="arc-list">
for post in category.last 
    post.date | date:"%d/%m/%Y"
        href=" post.url "  post.title 
  endfor
</ul> 
endfor 

{% endhighlight  %}

也就是全部小写转换，而如果在js代码中设定的是对于Java或者JAVA的匹配，文章将无法正确聚类；

>在探索中发现了对于中文其实也是可以正确匹配的。

对此和3\-Jekyll作者进行了一些沟通。作者的回复如下：

>Jekyll 在输出分类名（作为 class 筛选文章）的时候会全部转换成小写字母， 所以在文章中无论使用 Java 还是 JAVA 输出的都是 java。 而且 JavaScript 对大小写非常敏感。 所以只要保证在 js 中全部使用小写就好了。

对于前端的知识遗忘的很厉害啊，做Web开发的时候还开发过一些,现在却基本都遗忘干净了，教训就是对于**需要的知识一定要经常回顾，加强遗忘曲线****





