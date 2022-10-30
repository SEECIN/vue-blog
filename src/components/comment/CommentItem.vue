<template>
  <li class="blog-comment--item">
    <div class="blog-comment--user blog-line blog-line--row ">
      <el-avatar class="blog-comment--avatar"
                 :src="comment.uid.avatar"
                 fit="cover"></el-avatar>
      <span class="blog-comment--name">{{comment.uid.nikname}}</span>
    </div>
    <p class="blog-comment-content">{{comment.content}}</p>
    <p class="blog-comment-date">{{comment.date}}</p>
  </li>
</template>

<script>

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object
    }
  },
  components: {

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

  },
}
</script>
<style lang='stylus'>
@import '~@/assets/css/base.styl'
.blog-comment--item
  margin-bottom padding-space
  padding: padding-space * 2
  background-color line-modifier-color
.blog-comment--user
  display flex
  align-items center
  padding padding-space 0
  font-size 14px
  line-height 24px
  .blog-comment--avatar
    width 34px
    height 34px
.blog-comment--name
  padding-top 6px
  padding-left padding-space
  color font-theme-color
.blog-comment-content
  overflow hidden
  padding 20px 0
  text-align left
  text-indent 2em
  word-wrap break-word
  word-break break-word
  
.blog-comment-date
  font-size 12px
  text-align right
  color font-theme-color
</style>