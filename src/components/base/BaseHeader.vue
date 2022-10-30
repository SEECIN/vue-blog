<template>
  <el-row class="blog-header--wrap"
          type="flex"
          justify="flex-wrap"
          align="center">
    <el-col :span="2"
            :offset="1"
            :xs="{span:24}"
            class="blog-logo--wrap">
      <div class="blog-logo">
        <el-image class="blog-head--logo"
                  :src="require('@/assets/img/logo.jpg')"
                  fit="cover"></el-image>
      </div>
    </el-col>
    <el-col class="hidden-xs-only blog-menu--wrap"
            type="flex"
            justify="flex-wrap"
            align="center"
            :span="10"
            :offset="2">
      <el-menu class="blog-menu "
               mode="horizontal"
               background-color="#2d2f33"
               text-color="#fff"
               active-text-color="#fff"
               :default-active="`/${activeIndex}`"
               ref="navMenu"
               router>
        <el-menu-item index="/index">首页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <el-menu-item index="/chat">Chat</el-menu-item>
        <el-menu-item v-if="$store.state.userInfo.nikname"
                      index="/user">个人信息</el-menu-item>
      </el-menu>
    </el-col>
    <el-col class="hidden-xs-only"
            :span="4">
      <div class="blog-head--search">
        <el-input class="blog-head--input"
                  v-model="searchVal"
                  @keydown.native.enter="activeSearch"
                  placeholder="搜索文章">
          <i slot="prefix"
             class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>

    </el-col>
    <el-col :span="2"
            :offset="2"
            class="hidden-xs-only">
      <component :is="userState"></component>
    </el-col>
  </el-row>
</template>

<script>
import UserInitial from '@/components/user/UserInitial'
import UserLogin from '@/components/user/UserLogin'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseHeader',
  components: {
    UserInitial, UserLogin
  },
  props: {
    activeIndex: {
      type: String
    }
  },
  data () {
    return {
      searchVal: ''
    }
  },
  watch: {

  },
  computed: {
    userState () {
      return this.$store.state.token ? 'UserLogin' : 'UserInitial'
    },
    ...mapGetters(['userInfo'])
  },
  created () {
    let isLogin = this.$store.state.token
    let nikname = this.userInfo?.nikname
    if (isLogin && !nikname) {
      this.$store.dispatch('getUserInfo')
    }
  },
  methods: {
    activeSearch () {
      this.$EventBus.$emit('activeSearch', this.searchVal)
      this.searchVal = ''
    }
  }
}
</script>
<style lang="stylus">
@import '~@/assets/css/base.styl'
.blog-header
  height 60px
  background-color bg-reverse-color
.blog-header--wrap
  display flex
  align-items center
  height 60px
.blog-head--logo
  width 40px
  height 40px
  overflow hidden
  border-radius 50%
  text-align center
  vertical-align middle
  & img
    display block
    width auto
    height 40px
.blog-head--search
  .blog-head--input, input
    height 30px
    border 0
    .el-input__icon
      line-height 30px
.el-menu.el-menu--horizontal.blog--menu
  height 60px
  border-bottom-color bg-reverse-color
</style>