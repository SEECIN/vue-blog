<template>
  <div class="article-wrap">
    <div v-if="articles.length>0">
      <el-card class="blog-content--item"
               v-for="item in articles"
               :key="item.id">
        <router-link :to="{name:'article',params:{id:item.id}}">
          <ArticleItem :article="item" />
        </router-link>
      </el-card>
    </div>
    <article v-else
             class="blog-content--item blog-content-never">
      <el-empty description="很遗憾 没有找到对应的文章">
        <el-button type="primary"
                   @click="routeEditor">去写一篇吧</el-button>
      </el-empty>
    </article>
  </div>

</template>

<script>
import { Notification } from 'element-ui'
import ArticleItem from '@/components/article/ArticleItem'
import QS from 'qs'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  inject: ['closeLoadLock'],
  props: {
    loading: {
      type: Boolean
    }
  },
  data () {
    return {
      articles: [],
      page: 1,
      size: 4,
      q: ''
    }
  },
  mounted () {
    this.$EventBus.$on('activeSearch', q => {
      this.q = q
      this.emptyArticles()
      this.getArticles()
    })
  },
  created () {
    this.getArticles()
  },
  computed: {

  },
  watch: {
    loading (load) {
      if (load) {
        this.getArticles()
      }
    },
    $route () {
      this.emptyArticles()
      this.getArticles()
    }
  },
  methods: {
    routeEditor () {
      let columnId = this.$route.query?.columnId
      this.$router.push({ name: 'editor', query: { columnId } })
    },
    getQuery () {
      let column = this.$route.query?.columnId
      let q = this.q || undefined
      let query = QS.parse(QS.stringify({
        column, q
      }))
      return query
    },
    emptyArticles () {
      this.page = 1
      this.articles = []
    },
    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = this.getQuery()
      if (Object.entries(query).length > 0) {
        data.query = QS.stringify(query)
      }
      this.$api({ type: 'articles', data }).then(result => {
        if (this.articles.length >= result.total) {
          //没有更多了
          Notification.info({
            title:'已加载全部内容'
          })
          return
        }
        this.articles.push(...result.list)
        this.closeLoadLock()
        this.page++
      }).catch(err => {
        Notification.warning({
          title: '获取失败',
          message: err.message
        })
      })
    }
  },
}
</script>
<style lang="stylus" >
.article-wrap
  overflow hidden
  height 100%
</style>