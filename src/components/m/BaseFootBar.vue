<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o"
                     name="MArticleList"
                     :to="{name:'mArticleList'}">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o"
                     name="MColumn"
                     :to="{name:'mColumn'}">分类</van-tabbar-item>
    <van-tabbar-item icon="user-o"
                     name="MUser"
                     :to="{name:'mUser'}">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>

export default {
  name: 'BaseFootBar',
  components: {

  },
  data () {
    return {
      active: "",
    }
  },
  mounted () {
    this.active = this.$route.meta.active
  },
  computed: {

  },
  watch: {
    $route(){
      this.active = this.$route.meta.active
    }
  },
  methods: {

  },
}
</script>
<style lang='stylus'></style>