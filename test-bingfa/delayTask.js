/**
 * 管理单个任务，单个方法不执行，维护进队列中，让任务池去拉取执行
 */

class DelayTask {
  constructor (resolveFn, fn, args) {
    this.resolve = resolveFn
    this.fn = fn
    this.args = args
  }
}

module.exports = DelayTask