<template>
  <div class='blogm-user'>
    <Vuescroll :ops="ops">
      <div v-if="!this.$store.state.token"
           class="blogm-user--logo">
        <van-image round
                   alt="blog"
                   width="5rem"
                   height="5rem"
                   :src="require('@/assets/img/logo.jpg')" />
      </div>
      <van-card v-else
                class="blogm-item">
        <template #thumb>
          <van-image round
                     width="80"
                     height="80"
                     fit="cover"
                     class="blogm-card--image"
                     :src="avatar" />
        </template>
        <template #title>
          <h3 class="van-ellipsis blogm-item--title">{{nikname}}</h3>
        </template>
        <template #desc>
          <p class="van-ellipsis">
            {{signature}}
          </p>
        </template>
      </van-card>
      <BaseForm />
      <div class="blogm-logout--wrap">
        <van-button v-if="this.$store.state.token"
                    class="blogm-btn--logout"
                    type="primary"
                    @click="logOut"
                    block>退出登录</van-button>
      </div>
    </Vuescroll>
  </div>
</template>

<script>
import Vuescroll from 'vuescroll'
import { mapGetters, mapActions } from 'vuex'
import BaseForm from '@/components/m/BaseForm'
export default {
  name: 'User',
  components: {
    BaseForm, Vuescroll
  },
  inject: ['reload'],
  data () {
    return {
      isLogin: false,
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
          disable: true,
        }
      }
    }
  },
  mounted () {

  },
  computed: {
    avatar () {
      return this.userInfo?.avatar
    },
    nikname () {
      return this.userInfo?.nikname
    },
    signature () {
      return this.userInfo?.signature
    },
    ...mapGetters(['userInfo'])
  },
  watch: {

  },
  methods: {
    logOut () {
      this.logout()
      this.reload()
    },
    ...mapActions(['logout'])
  },
}
</script>
<style lang='stylus'>
.blogm-user
  overflow hidden
  display flex
  height 100%
  flex-direction column
  align-items center
  padding 20px
.blogm-logout--wrap
  width 100%
  padding 0 16px
  button
    border-radius 999px
.blogm-user--logo
  text-align center
</style>