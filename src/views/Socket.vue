<template>
  <div class='blog-chat'>
    <div class="blog-chat--msg">

      <div class="blog-chat-container">
        <Vuescroll :ops="ops"
                   ref='chat'>
          <div class="blog-chat--notify">
            <p>{{notify}}</p>
          </div>
          <div class="blog-chat--item"
               v-for="chat in chatItemList"
               :id="`chat${chat.id}`"
               :key="chat.id"
               :class="chat.position">
            <span class="blog-chat--img"><img class="blog-chat--avatar"
                   width="40"
                   height="40"
                   src="@/assets/img/avatar.jpg"
                   alt=""></span>
            <div class="blog-chat--info">
              <div class="blog-info--details">
                <i class="blog-info--name">{{chat.nikname}}</i>
                <i class="blog-info--time">{{chat.time}}</i>
              </div>
              <p class="blog-info--main">{{chat.info}}</p>
            </div>
          </div>
        </Vuescroll>
      </div>

    </div>
    <div class="blog-chat--send">
      <el-input v-model="info"
                @keydown.native.enter="sendChatMsg"></el-input>
      <el-button type="primary"
                 @click="sendChatMsg">发送</el-button>
    </div>
  </div>
</template>

<script>
import Vuescroll from 'vuescroll'
import { Notification } from 'element-ui'
import { mapActions, mapGetters } from 'vuex'
import formatDate from '@/util/formatDate'
import { io } from 'socket.io-client'
import store from 'store'
import Vue from 'vue'
let idx = 0
import MIXIN from '@/core/mixin'
export default {
  name: 'socket',
  components: {
    Vuescroll
  },
  mixins: [MIXIN],
  data () {
    return {
      notify: '',
      ws: null,
      info: '',
      ops: {
        bar: {
          background: '#c1c1c1',
        }
      }
    }
  },
  created () {
    if (this.ws) {
      return
    }
    this.ws = io(process.env.VUE_APP_USER_CHAT_PATH, { transports: ['websocket'] })
    Vue.prototype.$ws = this.ws
    this.notify = '聊天室连接成功'
    this.ws.on('chatItem', data => {
      this.addChatItem(data)
    })
  },
  mounted () {
    let id = this.$store.state.chatItemList.length - 1
    if (id >= 0) {
      this.$refs['chat'].scrollIntoView(`#chat${id}`)
    }
  },
  beforeDestroy () {
    Vue.prototype.$ws.emit('disconnection')
  },
  computed: {
    chatItemList () {
      return this.$store.state.chatItemList
    }
  },
  watch: {

  },
  methods: {
    ...mapActions(['online']),
    ...mapGetters(['userInfo']),
    sendChatMsg () {
      if (!store.get(process.env.VUE_APP_TOKEN_NAME)) {
        Notification.warning({
          title: '请先登录',
          message: '登录后即可参与互动',
          onClick: () => {
            this.refreshModal('login')
          }
        })
        return
      }
      if (this.info.trim() === '') {
        Notification.info({
          title: '请输入内容',
        })
        return
      }
      let data = {
        info: this.info,
        nikname: this.$store.state.userInfo.nikname
      }
      this.addChatItem({
        nikname: this.$store.state.userInfo.nikname,
        info: this.info,
        isMe: true
      })
      this.ws.emit('sendMsg', data)
      this.info = ''
    },
    addChatItem ({
      info,
      nikname,
      time = formatDate(),
      isMe = false }) {
      let position = 'left'
      if (isMe) {
        position = 'right'
      }
      this.$store.state.chatItemList.push({
        info, nikname, time, isMe, position, id: ++idx
      })
      let id = this.$store.state.chatItemList.length - 1
      this.$refs['chat'].scrollIntoView(`#chat${id}`)
    }
  },
}
</script>
<style lang='stylus'>
.blog-chat
  display flex
  flex-direction column
  justify-content space-between
  width 90%
  height 80vh
  background-color rgba(255, 255, 255, 0.2)
  box-shadow 0 0 20px rgba(122, 122, 122, 0.8) inset
  border-radius 22px 22px 4px 4px
.blog-chat--msg
  width 100%
  height 100%
.blog-chat-container
  width 100%
  height 100%
  padding 5px 10px
.blog-chat--notify
  text-align center
  font-size 14px
  color #c1c1c1
.blog-chat--item
  display flex
  justify-content flex-start
  flex-direction row
  width 100%
  height auto
  padding 10px
  vertical-align top
.blog-chat--item.left
  justify-content flex-start
  .blog-info--name
    float left
.blog-chat--item.right
  justify-content flex-start
  flex-direction row-reverse
  .blog-info--main
    float right
    background-color rgb(64, 158, 255)
  .blog-info--name, .blog-info--time
    float right
.blog-chat--img
  width 40px
  height 100%
.blog-chat--avatar
  width 40px
  height 40px
  border-radius 50%
.blog-chat--info
  padding 0 5px
.blog-info--details
  height 23px
  padding 2px
.blog-info--name
  padding 2px 8px
  border-radius 8px
  background-color #ccc
  font-size 12px
.blog-info--time
  display block
  float left
  padding 2px 10px
  font-size 12px
  color #999
.blog-info--main
  display inline-block
  justify-content end
  float left
  max-width 20vw
  padding 10px 15px
  margin-top 10px
  border-radius 8px
  box-shadow 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  font-size 16px
.blog-chat--send
  display flex
  justify-content space-between
</style>