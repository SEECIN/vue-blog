<template>
  <div>
    <el-form :model="form"
             ref="elForm">
      <el-form-item v-for="(item) in formData"
                    :key="item['query']"
                    :label="item.label"
                    label-width="100px"
                    :prop="item['query']"
                    :rules="rules[item['query']]">
        <el-upload v-if="item.type === 'avatar'"
                   class="avatar-uploader"
                   ref="upload"
                   :headers="{'Authorization': `Bearer ${$store.state.token}`}"
                   :action="userFileAction"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :on-error="handleAvatarError"
                   :before-upload="beforeAvatarUpload">
          <!-- 如果form里avatar值存在则显示图片 -->
          <el-image style="width: 100px; height: auto"
                    v-if="form[item['query']]"
                    :src="form[item['query']]"
                    class="avatar"
                    fit="fit"></el-image>
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- el-form-item在需要validate或者resetFileds时必须填写prop -->
        <el-input v-if="['text','password','email'].includes(item.type)"
                  v-model="form[item['query']]"
                  :disabled="item.readonly"
                  :placeholder="item.placeholder"
                  :type="item.type"
                  :name="item['query']"
                  autocomplete="off"
                  :class="{passwordInput:item['query']==='password'}"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATA from '@/config/validate.config'
import NProgress from 'nprogress'
import { Notification } from 'element-ui'
// import $ from 'jquery'
export default {
  name: 'BaseForm',
  components: {

  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      form: {},
      // str: ""
    }
  },
  created () {
    if (this.type === "userInfo") {
      this.form = Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
        return FORM_DATA['userInfo'].find(item => {
          return key == item['query']
        })
      }))
    }
    // $(document).on("input", "input[name='password']", this.replacePwd)
  },
  computed: {
    formData () {
      return FORM_DATA[this.type]
    },
    rules () {
      return VALIDATE_DATA
    },
    userFileAction () {
      return process.env.VUE_APP_USER_UPLOAD_PATH
    }
  },
  watch: {
    type () {
      this.initForm()
    }
  },
  methods: {
    // replacePwd (e) {
    //   let pwdVal = e.target.value
    //   if (pwdVal.length >= this.str.length) {
    //     this.str += pwdVal.substr(this.str.length, pwdVal.length - this.str.length)
    //   } else {
    //     this.str = this.str.substr(0, pwdVal.length)
    //   }
    //   console.log(this.str, pwdVal);
    //   this.form['password'] = pwdVal.replace(/./g, "*")
    //   this.$EventBus.$emit('pwd', this.form,this.str)
    // },
    initForm () {
      //重置表单字段 以及校验状态
      // this.str = ''
      this.form = {}
      this.resetForm()
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    beforeAvatarUpload (file) {
      let { type, size } = file
      let maxSize = 5 * 1024 * 1024
      if (size > maxSize) {
        Notification.error({
          title: '上传错误',
          message: "文件不得大于5M"
        })
        this.$refs.upload[0].abort(file)
        return false
      }
      if (!(/image/g.test(type))) {
        Notification.error({
          title: '上传错误',
          message: "请选择图片文件"
        })
        this.$refs.upload[0].abort(file)
        return false
      }
      NProgress.start()
    },
    handleAvatarSuccess (res) {
      this.form.avatar = res.data.fileURL
      NProgress.done()
    },
    handleAvatarError (err) {
      Notification.error({
        title: '上传失败',
        message: JSON.parse(err.message)?.message
      })
    }
  },
  beforeDestroy () {
    // $(document).off("input", "input[name='password']", this.replacePwd)
  }
}
</script>
<style lang="stylus">
.avatar-uploader
  line-height 100%
.avatar-uploader .el-upload
  border 0
  cursor pointer
  position relative
  overflow hidden
.avatar-uploader .el-upload:hover
  border-color #409EFF
.avatar-uploader .avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 100px
  height 100px
  line-height 100px
  border 1px dashed #d9d9d9
  border-radius 6px
  text-align center
.avatar
  width 100px
  height auto
  display block
.passwordInput
  input
    -webkit-text-security disc
</style>