<template>
  <div class=" blog-header--login">
    <el-avatar class="blog-avatar-img"
               :src="src"
               fit="cover"></el-avatar>
    <span class="el-icon-download blog-header--logout"
          @click="logout"></span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserLogin',
  components: {

  },
  data () {
    return {

    }
  },
  created () {


  },
  computed: {
    src () {
      return this.$store.state.userInfo?.avatar
    }
  },
  watch: {

  },
  methods: {
    ...mapActions(['logout'])
  },
}
</script>
<style lang="stylus" >
.blog-header--login
  position relative
  width 100%
  height 40px
  line-height 40px
  &:hover .blog-header--logout
    transform scale(1)
.blog-avatar-img
  position absolute
  overflow hidden
  width 40px
  height 40px
.blog-header--login .blog-header--logout
  position absolute
  top 5px
  left 0
  width 40px
  height 40px
  border-radius 50%
  text-align center
  color #ccc
  font-size 30px
  transform scale(0)
  transition all 0.3s
</style>