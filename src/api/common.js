import axios from "axios"
import store from "store"


//axios默认值
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT
})

//request 拦截器
instance.interceptors.request.use(async config => {
  let token = store.get(process.env.VUE_APP_TOKEN_NAME)
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

//response 拦截器
instance.interceptors.response.use(response => {
  //剥离最外层
  let result = response.data
  return result?.data
}, err => {
  return Promise.reject(err)
})
export default instance