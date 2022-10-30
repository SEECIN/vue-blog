<template>
  <van-pull-refresh class="blogm-item--list"
                    v-model="isLoading"
                    @refresh="onRefresh">
    <Vuescroll :ops="ops">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                error-text="获取失败，点击重新加载"
                @load="onLoad">

        <router-link v-for="article in articleList"
                     :key="article.id"
                     :to="{name:'mArticle',params:{id:article.id,title:article.title}}">
          <ArticleItem :article="article" />
        </router-link>

      </van-list>
    </Vuescroll>
  </van-pull-refresh>
</template>

<script>
import Vuescroll from 'vuescroll'
import ArticleItem from '@/components/m/ArticleItem'
import QS from 'qs'
import { Toast } from 'vant'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem, Vuescroll
  },
  props: {
    columnId: {
      type: String
    }
  },
  data () {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      articleList: [],
      size: 4,
      page: 1,
      q: '',
      columnCacheArticle: {},
      ops: {
        rail: {
          background: '#f90',
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '2px',
          keepShow: false
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: true,
        }
      }
    }
  },
  mounted () {
    this.$EventBus.$off('searchArticle')
    this.$EventBus.$on('searchArticle', q => {
      this.q = q
      this.isLoading = true
      this.resetParams()
      this.getArticles()
    })
  },
  computed: {

  },
  watch: {
    columnId (newColumnId) {

      if (newColumnId.trim().length === 0) {
        return false
      }
      if (this.columnCacheArticle[newColumnId]) {
        this.articleList = this.columnCacheArticle[newColumnId]
        return false
      }
      this.isLoading = true
      // this.onRefresh()
      this.$once('onRefresh')
      this.isLoading = false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.resetParams()
        this.onLoad()
        Toast('刷新成功')
      }, 500)

    },
    onLoad () {
      this.getArticles()
    },
    getQuery () {
      let column = this.columnId || undefined
      let q = this.q || undefined
      let query = JSON.parse(JSON.stringify({
        column, q
      }))
      return query
    },
    resetParams () {
      this.page = 1
      this.finished = false
      this.loading = true
    },
    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = this.getQuery()
      if (Object.entries(query).length > 0) {
        data.query = QS.stringify(query)
      }
      this.$api({ type: 'articles', data }).then(result => {
        if (this.isLoading) {
          this.articleList = []
          this.isLoading = false
        }
        if (this.articleList.length >= result.total) {
          //没有更多了
          this.finished = true
          return
        }
        this.articleList.push(...result.list)
        this.cacheColumnList()
        this.loading = false
        this.page++

      }).catch(err => {
        Toast({ message: err })
      })
    },
    cacheColumnList () {
      if (this.columnId) {
        this.columnCacheArticle[this.columnId] = JSON.parse(JSON.stringify(this.articleList))
      }
    }
  },
  beforeDestroy () {

  }
}
</script>
<style lang="stylus" >
.blogm-item--list
  height 100%
  overflow hidden
  .van-pull-refresh__track
    height 100%
</style>