// 任务队列
// 提供基本的添加删除功能

class Queue {
    constructor() {
        this.queue = []
    }

    // 队列中添加
    push (value) {
        return this.queue.push(value)
    }

    // 队列取出第一个
    shift () {
        return this.queue.shift()
    }

    // 检查队列是否为空
    checkIsEmpty () {
        return this.queue.length === 0
    }

}

module.exports = Queue