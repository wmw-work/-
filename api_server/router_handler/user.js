const usersReg = require('../model/usersReg')
const usersLogin = require('../model/usersLogin')


// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    res.send(usersReg.new(userinfo))
}
  
// 登录的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    res.send(usersLogin.login(userinfo))
}
