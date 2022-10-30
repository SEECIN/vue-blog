<template>
  <!-- <transition-group tag="div"
                    name="circle"> -->
  <div class="blog-slide--wrap">
    <el-button class="blog-slide--menu animate__animated animate__wobble"
               v-for="item in slideMenuList"
               :key="item.icon"
               :icon="item.icon"
               :class="{active:isLike && item['query'] === 'likes'}"
               @click="clickMenu(item)"
               circle>
    </el-button>
  </div>
  <!-- </transition-group> -->
</template>

<script>
import MIXIN from '@/core/mixin'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('likes')
export default {
  name: 'BaseSlideMenu',
  components: {

  },
  mixins: [MIXIN],
  props: {
    slideMenuList: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    isLike () {
      let aid = this.$route.params.id
      return this.hadLike(aid)
    },
    ...mapGetters(['hadLike'])
  },
  watch: {

  },
  methods: {
    clickMenu (item) {
      let { route, handler } = item
      if (route) {
        this.$router.push(route)
      }
      if (handler) {
        this[handler]?.()
      }
    },
    addColumn () {
      this.refreshModal('column')
    },
    focusComment () {
      this.$EventBus.$emit('focusComment')
    },
    changeLikes () {
      let aid = this.$route.params.id
      this[this.isLike ? 'pullLikes' : 'pushLikes']({ aid })
      this.updateLikes({ aid })
    },
    ...mapActions(['pullLikes', 'pushLikes', 'updateLikes'])
  },
}
</script>
<style lang='stylus'>
.el-button--default.blog-slide--menu
  width 60px
  height 60px
  i
    font-size 28px
  &:hover, &:focus
    background #FFF
    border 1px solid #DCDFE6
    color #606266
  &:active
    color #3a8ee6
    border-color #3a8ee6
    background-color #fff
    outline 0
.blog-slide--wrap
  display flex
  flex-direction column
  .blog-slide--menu+.el-button
    border 1px solid #DCDFE6
    margin 10px 0 0
    &:hover, &:focus
      background #FFF
      border 1px solid #DCDFE6
      color #606266
    &.active
      color #3a8ee6
      border-color #3a8ee6
      background-color #fff
      outline 0
</style>