<template>
  <div class="blog-article--info">
    <span class="blog-info--item">
      作者: {{info.nikname}}
    </span>
    <span class="blog-info--item">
      <i class="el-icon-time"></i> {{info.date}}
    </span>
    <div class="hidden-xs-only">
      <span class="blog-info--item">
        <i class="blog-info--likes el-icon-star-on"
           @click="like"
           :class="{active:isLike}"></i> {{likeNum}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-view"></i> {{info.hit_num}}
      </span>
      <span class="blog-info--item">
        <i class="el-icon-chat-line-square"
           @click="focusComment"></i> {{info.comment_num}}
      </span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('likes')
export default {
  name: 'ArticleBarInfo',
  props: {
    info: {
      type: Object
    },
    id: {
      type: String
    }
  },
  components: {

  },
  data () {
    return {
      isInitLike: false
    }
  },
  created () {
    this.isInitLike = this.isLike
  },
  watch: {

  },
  computed: {
    isLike () {
      let aid = this.id
      return this.hadLike(aid)
    },
    likeNum () {
      let step = Number(this.isLike) - 1
      return Math.max(this.info.like_num + !this.isInitLike + step, 0)
    },
    ...mapGetters(['hadLike'])
  },
  methods: {
    focusComment () {
      this.$EventBus.$emit('focusComment')
    },
    like () {
      this[this.isLike ? 'pullLikes' : 'pushLikes']({ aid: this.id })
      this.updateLikes({ aid: this.id })
    },
    ...mapActions(['pullLikes', 'pushLikes', 'updateLikes'])
  },
}
</script>
<style lang='stylus'>
.blog-info--item
  user-select none
  .blog-info--likes.active
    color #409EFF
  i
    cursor pointer
</style>