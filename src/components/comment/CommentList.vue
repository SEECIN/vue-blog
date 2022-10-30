<template>
  <el-card v-if="comment">
    <div class="blog-comment blog-comment--list">
      <h3>评论列表</h3>
      <ul>
        <CommentItem v-for="comment in comments"
                     :key="comment.id"
                     :comment="comment" />
      </ul>
    </div>
  </el-card>
</template>

<script>
import CommentItem from '@/components/comment/CommentItem'
export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    comment () {
      return this.comments?.length
    }
  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang='stylus'>
@import '~@/assets/css/base.styl'
.blog-comment--list
  background-color bg-theme-color
</style>