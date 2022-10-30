<template>
  <div class='blogm-article'>
    <ArticleBarInfo :info='info' />
    <article class="markdown-body blogm-article--content"
             v-html="article.content">
    </article>
    <ArticleFoot :article='article'
                 v-if="article.id" />
  </div>
</template>

<script>
import ArticleBarInfo from '@/components/m/ArticleBarInfo'
import ArticleFoot from '@/components/m/BaseArticleFootBar'
export default {
  name: 'ArticleContent',
  components: {
    ArticleBarInfo, ArticleFoot
  },
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    info () {
      let { like_num, hit_num, comment_num, date } = this.article
      return {
        like_num, hit_num, comment_num, date, nikname: this.nikname, avatar: this.avatar, column: this.column
      }
    },
    avatar () {
      return this.article?.author?.avatar
    },
    nikname () {
      return this.article?.author?.nikname
    },
    column () {
      return this.article?.column?.name
    }
  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang='stylus'>
.blogm-article
  background-color #fff
  padding 8px
  & pre
    white-space pre-wrap
.blogm-article--content
  padding-top 1em
</style>