<template>
  <el-card>
    <div slot="header"
         class="clearfix">
      <span>个人信息</span>
    </div>
    <BaseForm ref="form"
              type="userInfo" />

    <div class="blog-btn--wrap">
      <el-button type="success"
                 @click="submit">提交修改</el-button>
      <el-button type="primary"
                 @click="reset">重置信息</el-button>
    </div>

  </el-card>
</template>

<script>
import BaseForm from '@/components/base/BaseForm'
export default {
  name: 'User',
  components: {
    BaseForm
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {

  },
  watch: {

  },
  methods: {
    submit () {
      this.$refs['form'].$refs['elForm'].validate(async valid => {
        if (valid) {
          try {
            await this.$api({ type: 'putUserInfo', data: this.$refs['form'].form })
            this.$store.dispatch('getUserInfo')
            this.$router.push('/index')
          } catch (error) {
            this.$refs['form'].$refs['elForm'].resetFields()
          }
        } else {
          return false
        }
      })
    },
    reset () {
      this.$store.dispatch('getUserInfo')
    }
  },
}
</script>
<style lang="stylus" >
.blog-btn--wrap
  padding-top 20px
  display flex
  justify-content flex-end
</style>