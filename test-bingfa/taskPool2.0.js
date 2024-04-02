// 核心处理
// 管理任务池子，处理并发操作

// 进阶版
// 不使用falg，用并发数控制同时可以执行多少个

const Queue = require('./queue')
const DelayTask = require('./delayTask')

class TaskPool {
  constructor(size = 1) {
    this.queue = new Queue()
    // 任务池容纳任务数
    this.size = size
  }

  // 这一步是关键
  // 对传入的方法进行包装，返回一个新的方法
  // 包装的目的是为了添加一个promise方法，便于处理并发
  // 当再次调用时才会真正的加入队列中
  addTask(fn) {
    return (...args) => {
      console.log('开始添加并执行任务')
      return new Promise(resolve => {
        let task = new DelayTask(resolve, fn, args)
        this.queue.add(task)

        // 取出任务开始执行
        this.getTask()
      })
    }
  }

  // 获取任务
  getTask() {
    // 如果当前任务队列为空，或者任务正在执行就退出
    if (this.size == 0 || this.queue.isEmpty()) {
      return
    }

    this.size--

    let task = this.queue.getTask()
    let {
      resolve, fn, args
    } = task

    return this.runTask(resolve, fn, args)
  }

  // 执行任务
  runTask(resolve, fn, args) {
    console.log('进入runTask')
    // 给fn包装一下，因为fn可能不是一个promise
    let result = Promise.resolve(fn.apply(null, args))

    // 执行完成之后才能开始下一个
    result.finally(() => {
      this.size++
      this.getTask()
    })

    console.log(`要执行resolve了`, resolve)
    resolve(result)
  }
}

module.exports = TaskPool