// const TaskPool = require("./taskPool");
const TaskPool = require("./taskPool2.0");

const taskPool = new TaskPool(3)
const task = timeout => new Promise((resolve) => 
    setTimeout(() => {
        console.log(timeout)
        resolve(timeout);  
    }, timeout))
const taskList = [1000, 3000, 200, 1300, 800, 2000];
async function startNoConcurrentControl() {
    console.time();    
    // await Promise.all(taskList.map(item => task(item))); 

    // console.log(taskList.map(taskPool.addTask(task)))
    
    await Promise.all(taskList.map(taskPool.addTask(task)))
    
    console.timeEnd();  
}

try{
  startNoConcurrentControl();
}catch(err) {
  console.log(err)
}