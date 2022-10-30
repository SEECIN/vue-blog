import instance from '@/api/common'
import store from "store"
import API_LIST from '@/config/api.config'
import encrypt from '@/util/encrypt'

import { Notification } from 'element-ui'
import { Toast } from 'vant'
import _isMobile from '@/util/isMobile'
export default async function Http ({ type, data, params }) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, rsaKey = false, setToken = false, noMessage = false, rest = false } = API_LIST[type]
  try {
    method = method.toLowerCase()
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    if (rest) {
      // :id , :classify  ....
      let restSymbol = url.match(/:(.*)$/)[1]
      url = url.replace(/:(.*)$/, data[restSymbol])
    }
    data = method === 'get' ? { params: data } : data
    let result = await instance[method](url, data, { params })
    if (setToken) {
      let token = result.token;
      let uid = result.userId
      // localStorage.setItem('uid',uid)
      store.set('uid', uid)
      //本地存储token
      // localStorage.setItem(process.env.VUE_APP_TOKEN_NAME, token)
      store.set(process.env.VUE_APP_TOKEN_NAME, token)
      this.$store.dispatch('login')
    }
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      if (!noMessage) {
        if(_isMobile()){
          Toast({message:message})
          return
        }
        Notification.error({
          title: '错误',
          message
        })
      }
    }
    return Promise.reject(error);
  }
}