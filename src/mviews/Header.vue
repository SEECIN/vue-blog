<template>
  <div class="blogm-header">
    <component :is="headType"></component>
  </div>
</template>

<script>
import NavBar from '@/components/m/BaseNavBar'
import SearchBar from '@/components/m/BaseSearchBar'
import ArticleBar from '@/components/m/BaseArticleBar'
export default {
  name: 'Header',
  components: {
    NavBar, SearchBar, ArticleBar
  },
  data () {
    return {
      headType: 'SearchBar'
    }
  },
  created () {

  },
  watch: {
    $route (to) {
      this.headType = to.meta.headType
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style lang='stylus'>
.blogm-header
  .van-search--show-action
    padding 6px 10px
</style>