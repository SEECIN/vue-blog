<template>
  <div class=''>
    <van-tabs v-model="columnId">
      <van-tab v-for="tab in columnList"
               :key="tab.id"
               :title="tab.name"
               :name="tab.id">
        <ArticleList :columnId="columnId" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Toast } from 'vant'
import ArticleList from '@/mviews/ArticleList'
export default {
  name: 'Column',
  components: {
    ArticleList
  },
  data () {
    return {
      columnId: '',
      columnList: []
    }
  },
  mounted () {
    this.getColumns()
  },
  computed: {

  },
  watch: {

  },
  methods: {
    async getColumns () {
      try {
        let result = await this.$api({ type: 'column' })
        this.columnList = result.list
        this.columnId = this.columnList[0].id
      } catch (err) {
        Toast({message:err})
      }
    }
  },
}
</script>
<style lang='stylus'>
.van-tabs__content
  height calc(100vh - 96px - 44px)
  .van-tab__pane
    height 100%
</style>