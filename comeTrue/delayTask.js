/*
 * @Author: your name
 * @Date: 2021-01-06 10:54:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bingfa/comeTrue/delayTask.js
 */

class DelayTask {
    constructor (resolve, fn, args) {
        this.resolve = resolve;
        this.fn = fn;
        this.args = args
    }
}

module.exports = DelayTask