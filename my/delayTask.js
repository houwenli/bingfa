// 包装我们原本的方法
// 包装之后什么时候resolve就是我们自己控制的了
// 像下面这样
// fn(args) => new Promise(resolve => {
//      resolve(fn(args))
// })


// function test () {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(10) 
//         }, 2000)
//     })
    
// }

// function newTest () {
//     return new Promise(resolve => {
//         // 可以劫持resove来控制test的执行
//         resolve(test())
//     })
// }

// Promise.all([test()]).then(ret => {
//     console.log(ret)
// })

// 从上面我们看出处理后的任务需要resolve和fn，以及args参数

class DelayTask {
    constructor (resolveFn, fn, args) {
        this.resolveFn = resolveFn
        this.fn = fn
        this.args = args
    }
}

module.exports = DelayTask