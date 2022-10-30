<template>
  <div class=''>
    <Header />
    <div class="blogm-content">
      <transition enter-active-class="animate__animated animate__fadeInRight"
                  appear
                  mode="out-in">
        <router-view v-if="isRouterAlive"></router-view>
      </transition>
    </div>
    <FootBar />
  </div>

</template>

<script>
import FootBar from '@/mviews/FootBar'
import Header from '@/mviews/Header'
import { mapActions } from 'vuex'
export default {
  name: 'mHome',
  components: {
    FootBar, Header
  },
  data () {
    return {
      isRouterAlive: true,
      footActive: ""
    }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  mounted () {
    let isLogin = this.$store.state.token
    let nikname = this.userInfo?.nikname
    if (isLogin && !nikname) {
      this.getUserInfo()
    }
  },
  computed: {

  },
  watch: {
    
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    ...mapActions(['getUserInfo'])
  },
}
</script>
<style lang="stylus" >
.blogm-content
  overflow hidden
  overflow-y auto
  height calc(100vh - 96px)
  background-color #f1f1f1
.animate__fadeInRight
  animation-duration 0.5s
</style>