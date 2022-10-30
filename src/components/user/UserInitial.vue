<template>
  <div class="blog-header--login">
    <span @click="refreshModal('login')">登录</span><i class="blog-header--split">|</i> <span @click="refreshModal('register')">注册</span>
  </div>
</template>

<script>
import MIXIN from '@/core/mixin'
export default {
  name: 'UserInitial',
  mixins: [MIXIN],
  components: {

  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang="stylus">
.blog-header--login span
  color rgb(255, 255, 255)
  font-size 14px
  cursor pointer
.blog-header--split
  color #ccc
  font-size 18px
  padding 0 4px
</style>