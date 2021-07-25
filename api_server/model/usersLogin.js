const fs = require('fs')

const userFilePath = 'db/ev_users.json'

class ModelUser {
    constructor(form) {
        this.username = form.username 
        this.password = form.password 
    }
}

const loadData = () => {
    let content = fs.readFileSync(userFilePath, 'utf8')
    let users = JSON.parse(content)
    return users
}

const b = {
    data: loadData(),
}

b.login = function(form) {
    let m = new ModelUser(form)
    let res = { status: 0, message: "登录成功！" }
    let index = -1
    let result = this.data.some((item, i) => {
        if (item.username === m.username) {
            index = i
            return true
        }
    })
    if (result && this.data[index].password !== m.password) {
        res = { status: 1, message: "密码错误！" }
    } else if (!result){
        res = { status: 1, message: "用户名不存在" }
    }
    return res
}

module.exports = b
