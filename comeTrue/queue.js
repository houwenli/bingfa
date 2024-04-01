/*
 * @Author: your name
 * @Date: 2021-01-06 10:44:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bingfa/comeTrue/queue.js
 */

class Queue {
    constructor () {
        this.__queue = []
    }

    push (value) {
        return this.__queue.push(value)
    }

    shift () {
        return this.__queue.shift()
    }

    isEmpty () {
        return this.__queue.length === 0
    }
}

module.exports = Queue