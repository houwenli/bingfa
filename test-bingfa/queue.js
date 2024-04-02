class Queue {
  constructor () {
    this.queue = []
  }

  // 添加
  add(task) {
    this.queue.push(task)
  }

  // 取出第一个
  getTask() {
    return this.queue.shift()
  }

  // 判断是否为空
  isEmpty() {
    return this.queue.length === 0
  }
}

module.exports = Queue