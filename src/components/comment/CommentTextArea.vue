<template>
  <el-card>
    <div class="blog-comment blog-comment--editor">
      <textarea class="blog-comment--input"
                v-model="commentVal"
                name="comment"
                ref="commentTextArea"
                autofocus></textarea>
      <el-button class="blog-comment--submit"
                 type="primary"
                 @click="submitComment">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import { Notification } from 'element-ui'
export default {
  name: 'CommentTextArea',
  props: {
    aid: {
      type: String
    }
  },
  inject: ["getArticleById"],
  components: {

  },
  data () {
    return {
      commentVal: ""
    }
  },
  mounted () {
    this.$EventBus.$on('focusComment', () => {
      this.focusComment()
    })
  },
  computed: {

  },
  watch: {

  },
  methods: {
    focusComment () {
      this.$refs.commentTextArea?.focus()
    },
    async submitComment () {
      if (this.commentVal.trim().length === 0) {
        Notification.info({
          title: '请填写评论内容',
        })
        this.focusComment()
        return
      }
      try {
        await this.$api({ type: 'postComment', data: { aid: this.aid, content: this.commentVal } })
        Notification.success({
          title: '评论成功',
        })
        this.getArticleById()
      } catch (error) {
        Notification.error({
          title: '评论失败',
          message: error.message
        })
      }
      this.commentVal = ''
    }
  }
}
</script>
<style lang='stylus'>
@import '~@/assets/css/base.styl'
.blog-comment
  font-size 16px
  background-color line-modifier-color
  border-radius radius-theme-size
  margin-top: padding-space * 2
  & h3
    padding padding-space
.blog-comment--editor
  padding 20px
  display flex
  flex-direction column
  justify-content space-between
  text-align center
  height 240px
  &>textarea
    padding padding-space
    height 120px
    resize none
.blog-comment .blog-comment--submit
  color rgb(128, 128, 128)
  background-color rgba(128, 128, 128, 0.3)
  padding padding-space
  border-radius 8px
  border 0
  &:hover
    color #fff
    background-color rgb(128, 128, 128)
</style>