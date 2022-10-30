<template>
  <el-card class="blog-editor"
           :offset="2">
    <h3 class="blog-editor-title">标题</h3>
    <el-input ref="title"
              v-model="title"
              class="blog-editor-input"
              size="medium"
              placeholder="文章标题"></el-input>
    <h3 class="blog-editor-title">内容</h3>
    <div id="blog-editor-textarea">

    </div>
    <div class="blog-editor-tags">
      <h3 class="blog-editor-title">分类选择</h3>
      <el-radio-group v-model="column">
        <el-radio-button v-for="(item) in columns"
                         :key="item.id"
                         :label="item.id">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="blog-editor-button">
      <el-button type="primary"
                 @click="emptyEditor">重置</el-button>
      <el-button type="primary"
                 @click="submitEditor">提交</el-button>
    </div>

  </el-card>
</template>

<script>
import { Notification } from 'element-ui'
import wangEditor from 'wangeditor'
export default {
  name: 'Editor',
  components: {

  },
  props: {
    columnId: {
      type: String
    }
  },
  data () {
    return {
      title: '',
      content: '',
      editor: null,
      columns: [],
      column: ''
    }
  },
  mounted () {
    const editor = new wangEditor(`#blog-editor-textarea`)
    editor.config.onchange = (newHtml) => {
      this.content = newHtml
    }
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_UPLOAD_PATH
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024 // 5M
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    editor.config.uploadImgMaxLength = 5
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
    editor.create()
    this.editor = editor
  },
  created () {
    this.getColumns()
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async getColumns () {
      try {
        let columns = await this.$api({ type: 'column' })
        this.columns = columns.list.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        if (this.columnId) {
          this.column = this.columnId
          return
        }
        this.column = this.columns[0].id
      } catch (err) {
        console.log(err)
      }
    },
    submitEditor () {
      if (!this.validateEditor()) {
        return
      }
      this.postEditorData()
    },
    emptyEditor () {
      this.editor.txt.clear()
    },
    validateEditor () {
      if (this.title.trim().length === 0) {
        Notification.error({
          title: '错误',
          message: '请填写标题'
        })
        this.$refs.title.focus()
        return false
      }
      if (this.content.trim().length === 0) {
        Notification.error({
          title: '错误',
          message: '内容不能为空'
        })
        return false
      }
      return true
    },
    async postEditorData () {
      let postData = {
        title: this.title,
        column: this.column,
        content: this.content,
        cover: this.content.match(/<img src="([^"']*)"/)?.[1] || undefined
      }
      try {
        this.$api({ type: 'postArticle', data: postData })
        Notification.success({
          title: '成功',
          message: '文章提交成功'
        })
        this.$router.push('/index')
      } catch (error) {
        Notification.error({
          title: '错误',
          message: '提交失败'
        })
      }
    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
}
</script>
<style lang='stylus'>
.blog-editor-title
  padding 12px 0
  font-size 16px
.el-input--medium.blog-editor-input
  font-size 18px
  line-height 38px
  height 38px
.blog-editor-button
  padding-top 20px
  display flex
  justify-content space-around
  & button
    flex 1
    line-height 22px
    font-size 18px
#blog-editor-textarea
  text-align left
</style>