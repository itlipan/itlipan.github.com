---
layout: post
title:  Machine Learning
category: python
keywords: [improvement,python]
---

Udacity 学习记录:  

1. Welcome  

传统编程的异同: 

传统编程:  人类定义程序的决策 ,将决策嵌入程序中

人工智能:给与数据,告诉机器什么是什么,什么样的是什么,抽象提取特征值,在后续的决策中自行决定

人工智能应用范围之广泛

机器学习并不仅仅限于使用涉及到的相关具体算法或是具体的技术问题,它更多的是何时这样做以及如何去评估结果;

问题: 
如何使用机器学习?什么时候什么场景使用机器学习的何种解决方式? 如何使用所评估的结果?

2. 机器学习概论

两大模块:人工智能与数据科学 -> 其核心是建立数据模型

人工智能: 构建类人认知系统; 机器学习关注构造能自主动作的机器,而不关心其是否像人类一样思考

关于佐治亚理工的人工智能课程:           
* 人工智能的五大难题

长时间计算与时效性的决策矛盾,相关的数据是陆续出现的,而不是一开始就有足够的数据

局部与全局问题,问题是抽象的 

演绎逻辑的传统程序与关注归纳性溯因性的ai冲突,

知识的有限与世界的动态,机器如何利用既有知识解决未知问题? 

AI 对于行为决策的合理性解释问题,Do And Why?


* AI 用于解决不确定性问题

不确定性来源的多样性

* AI 解决的问题范畴之广泛


* IBM 沃森Demo

语音识别
语义识别
决策
知识搜索
确定问题对应答案

* 关于沃森流程

理解自然语句,构造自然语义语句,同时做出决策 - 推理

构成 deliberation 的三者:

reasoning 推理
Learning 学习知识- 知道答案的正确与否?
memory 存储

三者互相推进

*  actiing && thingking 四象限 => 对应人工智能

mechine learning -> 以最佳形式 thingking ,但不一定类人

自动驾驶-> 完全理性行为,目标指向,属于基于知识的人工智能模式    

四象限:

最佳实践

最佳思考  

类人实践

类人思考

* 贝叶斯法则相关

结果与原因之间的互相推倒

贝叶斯定理: 可以利用主观估算概率进行后期推倒,进而根据实际结果反向修正估算概率;

核心在以下几个公式的推倒: 

条件概率公式

全概率公式

贝叶斯定理