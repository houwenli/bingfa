/*
 * @Author: your name
 * @Date: 2021-01-06 15:30:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bingfa/comeTrue/example.js
 */

var TaskPool = require('./taskPool')

// 拿之前的例子测试
const task = timeout => new Promise((resolve) => 
    setTimeout(() => {
        console.log(timeout)
        resolve(timeout);  
    }, timeout))
const taskControler = new TaskPool(3)
const taskList = [1000, 3000, 200, 1300, 800, 2000];
async function startNoConcurrentControl() {
    console.time()
    const query = taskList.map(taskControler.addTask(task))
    taskControler.pullTask()
    taskControler.pullTask()
    taskControler.pullTask()
    await Promise.all(query).then(ret => {
        console.log(ret)
    });
    console.timeEnd();
}
startNoConcurrentControl();
