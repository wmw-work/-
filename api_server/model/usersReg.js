const fs = require('fs')

const userFilePath = 'db/ev_users.json'

class ModelUser {
    constructor(form) {
        this.username = form.username || ''
        this.password = form.password || ''
        this.nickname = form.nickname || ''
        this.email = form.email || ''
        this.user_pic = form.user_pic || ''
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

b.all = function() {
    return this.data
}

b.new = function(form) {
    let m = new ModelUser(form)
    let d = this.data[this.data.length - 1]
    let res = { status: 0, message: "注册成功！" }
    if (d === undefined) {
        m.id = 1
    } else {
        let result = this.data.some((item) => {
            if (item.username === m.username) {
                return true
            }
        })
        if (result) {
            res = { status: 1, message: "用户名被占用，请更换其他用户名！" }
        } else {
            m.id = d.id + 1
            this.data.push(m)
            this.save()        
        }
    }
    return res
}

b.save = function() {
    let s = JSON.stringify(this.data, null, 2)
    fs.writeFile(userFilePath, s, (error) => {
        if (error !== null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}

module.exports = b
