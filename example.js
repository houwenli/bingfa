/*
 * @Author: your name
 * @Date: 2021-01-06 10:37:54
 * @LastEditTime: 2021-01-06 10:40:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bingfa/explaml.js
 */
const task = timeout => new Promise((resolve) => 
    setTimeout(() => {
        console.log(timeout)
        resolve(timeout);  
    }, timeout))
const taskList = [1000, 3000, 200, 1300, 800, 2000];
async function startNoConcurrentControl() {    
    console.time();    
    await Promise.all(taskList.map(item => task(item)));    
    console.timeEnd();  
}
startNoConcurrentControl();
