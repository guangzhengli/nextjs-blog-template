---
title: Markdown 基本用法
date: 2025-04-05T20:10:00+08:00
updated: 2025-04-05T20:10:00+08:00
keywords: ["hello", "world"]
featured: true
summary: "这篇文章包含markdown语法基本的内容。"
category: "tutorial"
categoryDisplay: "教程"
tags: ["markdown", "syntax", "beginner"]
tagsDisplay: ["Markdown", "语法", "入门"]
---

这篇文章包含markdown语法基本的内容。

在markdown里可以使用 \ 对特殊符号进行转义。  

# 1. 标题

**语法**
```md
# This is an <h1> tag
## This is an <h2> tag
### This is an <h3> tag
#### This is an <h4> tag
```

**实例**

# This is an h1 tag
## This is an h2 tag
### This is an h3 tag
#### This is an h4 tag

# 2. 强调和斜体

**语法**
```md
*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__
```

**实例**

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

# 3. 有序列表和无序列表

**语法**
```md
* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3
```

**实例**
* Item 1
* Item 2
* Item 3

1. Item 1
2. Item 2
3. Item 3

# 4. 图片

**语法**
```
![img-name](img-url)
```

**实例**
![微信公众号](https://storage.guangzhengli.com/images/wechat-official-account.png)

# 5. 超链接

**语法**
```
[link-name](link-url)
```

**实例**

[微信公众号链接](https://storage.guangzhengli.com/images/wechat-official-account.png)

# 6. 引用

**语法**
```md
> 引用本意是引用别人的话之类  
```

**实例**

> If you please draw me a sheep!  
> 不想当将军的士兵, 不是好士兵.  

# 7. 单行代码

**语法**
```
`This is an inline code.`
```

**实例**

`同样的单行代码, 我经常用来显示特殊名词`

# 8. 多行代码

**语法**

```md
​```js
for (var i=0; i<100; i++) {
    console.log("hello world" + i);
}
​```
```

**实例**

```js
for (var i=0; i<100; i++) {
    console.log("hello world" + i);
}
```

也可以通过缩进来显示代码, 下面是示例:  

    console.loe("Hello_World");

# 9. 表格

## Table

| Table Header 1 | Table Header 2 | Table Header 3 |
| - | - | - |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |
| Division 1 | Division 2 | Division 3 |

# 参考链接

- https://guides.github.com/features/mastering-markdown/  
- https://help.github.com/articles/basic-writing-and-formatting-syntax/
