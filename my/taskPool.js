
// 任务池

const Queue = require('./queue')
const DelayTask = require('./delayTask')

class TaskPool {
    constructor (size) {
        this.size = size
        this.queue = new Queue()
    }

    // 这里会作为传给map的参数，即需要返回一个函数
    addTask (task) {
        // 接收map的参数
        return (...args) => {
            return new Promise(resolve => {
                // 把每个新的task存起来
                this.queue.push(new DelayTask(resolve, task, args))

                // 在这里实现并发，多少个任务可以同时执行
                if (this.size) {
                    this.size--
                    const { resolveFn, fn: taskFn, args: taskArgs } = this.queue.shift()
                    // 这里实际上直接执行的是resolveFn(taskFn(...taskArgs))，因为我们需要处理后续的操作，所以放在runTask中执行
                    this.runTask(resolveFn, taskFn, taskArgs)
                }
            })
        }
    }

    // 执行任务
    runTask (resolve, fn, args) {
        // 防止有些任务返回的不是promise，所以需要包裹一层
        const result = Promise.resolve(fn(...args))

        result.finally(() => {
            this.size++
            // 获取新任务执行
            this.pullTask()
        })

        resolve(result)
    }

    // 新任务
    pullTask() {
        // 如果池子为空，或者并发任务数满了就退出执行
        if (this.queue.checkIsEmpty() || this.size == 0) {
            return
        }
        // this.size++
        const { resolveFn, fn: taskFn, args: taskArgs } = this.queue.shift()
        this.runTask(resolveFn, taskFn, taskArgs)
    }
}

module.exports = TaskPool