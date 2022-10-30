<template>
  <van-form @submit="onSubmit"
            class="blogm-form">
    <h3 class="blogm-form--title">{{title}}</h3>
    <van-field class="blogm-form--cell"
               v-for="item in formData"
               :key="item['query']"
               v-model="form[item['query']]"
               :readonly="item['query'] === 'username' && type==='userInfo'"
               :name="item['query']==='avatar'? item['lable']: 'uploader'"
               :label="item['label']"
               :type="item['type']"
               :placeholder="item['placeholder']"
               :rules="validates[item['query']] | formatRuleTrigger"
               :class="{passwordInput:item['query']==='password'}">
      <template v-if="item['query']==='avatar'"
                #input>
        <van-uploader v-model="upload"
                      :after-read="afterRead"
                      :max-count="1"
                      :max-size="500 * 1024"
                      @oversize="onOversize" />
      </template>
    </van-field>
    <p class="blogm-form--tag"
       v-if="tagValue">
      {{tagValue}}
      <span @click="changeType">{{spanValue}}</span>
    </p>
    <div style="margin: 16px;">
      <van-button round
                  block
                  type="info"
                  native-type="submit">{{btnName}}</van-button>
    </div>
  </van-form>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATA from '@/config/validate.config'
import MODAL_DATA from '@/config/modal.config'
import _padStart from 'lodash/padStart'
import _capitalize from 'lodash/capitalize'
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'vant'
const TAG_VALUE = {
  'login': '还没有账号?',
  'register': '已有账号?',
  'userInfo': ''
}
const SPAN_VALUE = {
  'login': '点击注册',
  'register': '点击登录'
}
const BTN_NAME = {
  'login': '登录',
  'register': '注册',
  'userInfo': '修改'
}
export default {
  name: 'BaseForm',
  components: {

  },
  props: {

  },
  data () {
    return {
      form: {},
      type: 'userInfo',
      upload: []
    }
  },
  created () {

  },
  updated () {

  },
  mounted () {
    let isLogin = this.$store.state.token
    if (!isLogin) {
      this.type = 'login'
    }
    if (this.type === "userInfo") {
      this.form = this.formUserInfo
    }
  },
  filters: {
    formatRuleTrigger (rules) {
      return rules?.map(item => {
        item.trigger = _padStart(_capitalize(item.trigger), 6, 'on')
        return item
      })
    },
  },
  computed: {
    formUserInfo () {
      return Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
        return FORM_DATA['userInfo'].find(item => {
          return key == item['query']
        })
      }))
    },
    formData () {
      return FORM_DATA[this.type]
    },
    title () {
      return MODAL_DATA[this.type]?.title
    },
    tagValue () {
      return TAG_VALUE[this.type]
    },
    spanValue () {
      return SPAN_VALUE[this.type]
    },
    validates () {
      return VALIDATE_DATA
    },
    btnName () {
      return BTN_NAME[this.type]
    },
    ...mapGetters(['userInfo'])
  },
  watch: {
    type (newType) {
      this.initForm()
      if (newType === 'userInfo') {
        this.form = this.formUserInfo
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        let type = this.type === 'userInfo' ? "putUserInfo" : this.type
        await this.$api({ type: type, data: this.form })
        await this.getUserInfo()
        Toast(`${BTN_NAME[this.type]}成功`)
        this.type = 'userInfo'
      } catch (error) {
        Toast({ message: error })
      }
    },
    async afterRead (upload) {
      let formData = new FormData()
      formData.append('avatar', upload.file)
      try {
        let result = await this.$api({ type: 'avatar', data: formData })
        this.form.avatar = result.fileURL
      } catch (error) {
        Toast({ message: error.message })
      }
    },
    changeType () {
      this.type = this.type === 'login' ? 'register' : 'login'
    },
    onOversize () {
      Toast('文件大小不能超过 500kb')
    },
    initForm () {
      //重置表单字段 以及校验状态
      this.form = {}
    },
    ...mapActions(['getUserInfo'])
  },
}
</script>
<style lang='stylus'>
.blogm-form
  width 100%
.blogm-form--cell
  .van-field__value
    line-height 35px
  .van-field__label
    width 5em
    margin-right 0
  .van-field__control
    text-indent 0
  .van-uploader__upload-icon
    text-indent 0
.blogm-form--title
  margin 20px 0
  font-size 20px
  font-weight 600
  text-align center
.blogm-form--tag
  margin 16px 20px 0 0
  font-size 12px
  text-align right
  span
    color #1989fa
</style>