<template>
  <van-nav-bar :title="title"
               left-text="返回"
               left-arrow
               @click-left="$router.back()" />

</template>

<script>

export default {
  name: 'BaseArticleBar',
  components: {

  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = this.$route.params.title
  },
  computed: {

  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang='stylus'></style>