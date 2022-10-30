<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import _isMobile from '@/util/isMobile'
export default {
  name: 'app',
  components: {

  },
  mounted () {
    if (!_isMobile()) {
      this.$router.replace('/')
      return
    }
    if(this.$route.name === 'mHome'){
      return
    }
    _isMobile() && this.$router.replace('/m')
  },
  beforeDestroy () {

  }
}
</script>

<style lang="stylus">
html, body
  overflow hidden
  height 100vh
</style>
