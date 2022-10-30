<template>
  <van-nav-bar :title="title" />
</template>

<script>

export default {
  name: 'BaseNavBar',
  components: {

  },
  data () {
    return {
      title: ''
    }
  },
  created () {
    this.title = this.$route.meta.title
  },
  computed: {

  },
  watch: {
    $route (to) {
      this.title = to.meta.title
    }
  },
  methods: {

  },
}
</script>
<style lang='stylus'></style>