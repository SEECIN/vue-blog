<template>
  <div class=''>
    <ArticleContent v-if="article.id"
                    :article="article" />

  </div>
</template>

<script>
import ArticleContent from '@/components/m/ArticleContent'
export default {
  name: 'Article',
  components: {
    ArticleContent
  },
  data () {
    return {
      articleId: "",
      article: {},

    }
  },
  created () {
    this.articleId = this.$route.params.id
    this.getArticleById()
  },
  mounted () {
    this.$EventBus.$off('uploadArticle')
    this.$EventBus.$on('uploadArticle', () => {
      this.getArticleById()
    })
  },
  computed: {

  },
  watch: {
    
  },
  methods: {
    async getArticleById () {
      try {
        this.article = await this.$api({ type: "getArticleById", data: { id: this.articleId } })
        this.$EventBus.$emit('articleInfo', this.article)
      } catch (error) {
        return error
      }
    }
  },
}
</script>
<style lang='stylus'></style>