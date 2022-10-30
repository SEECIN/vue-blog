export default {
  username: [
    { required: true, message: '账号必填', trigger: 'blur' },
    { pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{4,8}$/, message: '账号格式 4-8位 有效字符', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱必填', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [
    { required: true, message: '密码必填', trigger: 'blur' },
    { pattern: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/, message: '密码格式 8-12位 最少包含一位(数字/字母)', trigger: 'blur' }],
  name: [
    { required: true, message: '名称必填', trigger: 'blur' }],
  nikname: [
    { required: true, message: '昵称必填', trigger: 'blur' }
  ]
}