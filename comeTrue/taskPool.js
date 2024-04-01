/*
 * @Author: your name
 * @Date: 2021-01-06 10:56:00
 * @LastEditors: Please set LastEditors
 * @Description: 任务池子
 * @FilePath: /bingfa/comeTrue/dealTask.js
 */

var Queue = require('./queue');
var DelayTask = require('./delayTask');

class TaskPool {
    constructor (size) {
        this.size = size; // 任务池最多容纳任务数量
        this.queue = new Queue()
    }

    // 添加任务
    addTask (fn) {
        return (...args) => {
            return new Promise((resolve) => {
                this.queue.push(new DelayTask(resolve, fn, args))
    
                // if (this.size) {
                //     this.size--
                //     const { resolve: taskResolve, fn: taskFn, args: taskArgs } = this.queue.shift()
                //     taskResolve(this.runTask(taskFn, taskArgs))
                // }
            })
        }
    }

    // 执行任务，执行完成，再开始新任务
    runTask (fn, args) {
        const result = Promise.resolve(fn(...args))

        result.then(() => {
            this.size++
            // 执行新任务
            this.pullTask()
        }).catch(() => {
            this.size++
            // 执行新任务
            this.pullTask()
        })
        return result
    }

    // 获取新任务，并执行
    pullTask () {
        // 如果任务池为空就退出
        if (this.queue.isEmpty()) {
            return
        }
        // 如果任务池满了也退出
        if (this.size === 0) {
            return
        }
        this.size++
        const { resolve: taskResolve, fn, args } = this.queue.shift()
        taskResolve(this.runTask(fn, args))
    }
}

// addTask: 将新的任务放入队列当中，并触发任务池状态检测，如果当前任务池非满载状态，则从队列中取出任务放入任务池中执行。
// runTask: 执行当前任务，任务执行完成之后，更新任务池状态，此时触发主动拉取新任务的机制。
// pullTask: 如果当前队列不为空，且任务池不满载，则主动取出队列中的任务执行。

// 高阶函数优化参数传递
// 例子中 await Promise.all(taskList.map(item => cc.addTask(task, [item])))
// 手动传递每个任务的参数的方式显得非常繁琐，这里可以通过「高阶函数实现参数的自动透传」：


// 优化出队操作
// 数组一般都是基于一块「连续内存」来存储，当调用数组的 shift 方法时，首先是删除头部元素（时间复杂度 O(1)）
// 然后需要将未删除元素左移一位（时间复杂度 O(n)），所以 shift 操作的时间复杂度为 O(n)。


module.exports = TaskPool