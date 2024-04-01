const fn = () => {
    return new Promise (resolve => {
        resolve(2222)
    })
}

const dealFn = () => {
    return new Promise(resolve => {

        const result = fn()
        result.then(ret => {
            console.log('aaa')
        })

        resolve(result)
    })
}
dealFn().then(ret => {
    console.log(ret)
})