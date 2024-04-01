# 并发控制

## 实现思路

原有的程序是所有的请求都在一次Promise.all中执行

## 解决办法

处理请求列表，给请求包装一层promise，控制请求列表，想像成一个请求池，控制并发数，从请求池中取出相应数量请求执行，任意一个请求处理完成都会继续从请求池中拿取新的请求，直到请求完成

## 代码解析

```js
// 这一步实际上就是创建了请求池
const query = taskList.map(taskControler.addTask(task))
// 当我们执行的时候，理论上可以通过，比如并发数为2，执行两遍pullTask来实现，由于写的比较繁琐，可以在addTask的时候实现
taskControler.pullTask()
taskControler.pullTask()
```
