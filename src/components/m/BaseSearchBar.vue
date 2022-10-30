<template>
  <van-search v-model="value"
              shape="round"
              show-action
              @search="onSearch"
              placeholder="请输入搜索关键词">
    <template #action>
      <span @click="onSearch">搜索</span>
    </template>
  </van-search>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'BaseSearchBar',
  components: {

  },
  data () {
    return {
      value: ''
    }
  },
  created () {

  },
  computed: {

  },
  watch: {

  },
  methods: {
    onSearch () {
      this.$EventBus.$emit('searchArticle',this.value)
      this.value = ''
      Toast('刷新成功')
    }
  },
}
</script>
<style lang='stylus'></style>