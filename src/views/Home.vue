<template>
  <div class="blog-page">
    <el-container class="blog-container">
      <el-header class="blog-header">
        <BaseHeader :activeIndex="activeIndex" />
      </el-header>
      <el-container class="blog-middle">
        <el-row class="blog-middle--wrap"
                type="flex"
                justify="flex-wrap"
                align="center">
          <el-col :span="2"
                  class="hidden-xs-only"
                  v-if="slideMenuList.length>0">
            <BaseSlideMenu :slideMenuList="slideMenuList" />
          </el-col>
          <el-col :span="22"
                  :lg="{span:16}"
                  :xs="{span:24}">
            <el-main class="blog-main">
              <Vuescroll :ops="ops"
                         ref="scrollView"
                         @handle-scroll="loadMore">
                <router-view v-if="isRouteLoading"
                             :loading="loading"></router-view>
              </Vuescroll>
            </el-main>
          </el-col>
          <el-col :span="6"
                  type="flex"
                  justify="flex-wrap"
                  align="center"
                  class="hidden-md-and-down">
            <BaseAside v-if="$store.state.token" />
          </el-col>
        </el-row>
      </el-container>
    </el-container>

    <BaseModal />
    <Live2D />
  </div>
</template>

<script>
// @ is an alias to /src
import Vuescroll from 'vuescroll'
import BaseModal from '@/components/base/BaseModal'
import BaseHeader from '@/components/base/BaseHeader'
import BaseAside from '@/components/base/BaseAside'
import BaseSlideMenu from '@/components/base/BaseSlideMenu'
import slideMenuConfig from '@/config/baseSlideMenu.config'
import Live2D from '@/components/Live2d'
import _throttle from 'lodash/throttle'
const TH = 200;

export default {
  name: 'Home',
  components: {
    BaseModal, BaseHeader, BaseAside, BaseSlideMenu, Live2D, Vuescroll
  },
  provide () {
    return { 'closeLoadLock': this.closeLoadLock }
  },
  data () {
    return {
      loading: false,
      slideMenuList: [],
      activeIndex: '',
      isRouteLoading: true,
      ops: {
        rail: {
          background: '#f90',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      }
    }
  },
  created () {
    this.slideMenuList = slideMenuConfig[this.$route.name] || []
  },
  mounted () {
    this.activeIndex = this.$route.name
  },
  watch: {
    $route (to) {
      this.activeIndex = to.name
      this.slideMenuList = slideMenuConfig[to.name] || []
      this.loading = true
      this.reload()
    }
  },
  computed: {

  },
  methods: {
    reload () {
      this.isRouteLoading = false
      //实际DOM渲染完成之后触发
      this.$nextTick(function () {
        this.isRouteLoading = true
      })
    },
    closeLoadLock () {
      this.loading = false
    },
    loadMore: _throttle(function (vertical, horizontal, nativeEvent) {
      this.scrollTop = vertical.scrollTop
      if (this.loading) {
        return
      }
      let st = vertical.scrollTop
      let sh = nativeEvent.srcElement.scrollHeight - nativeEvent.srcElement.clientHeight

      if (st + TH > sh) {
        this.loading = true
      }
    }, 500, false)

  }
}
</script>
<style lang="stylus">
.blog-container
  overflow hidden
  height 100%
.blog-middle
  padding 20px
  height calc(100vh - 60px)
  background-color #f1f1f1
.el-main.blog-main
  padding 0 20px
  height 100%
  .__view
    width 100%!important
.blog-middle--wrap
  max-width 1440px
  margin 0 auto
  width 100% 
</style>