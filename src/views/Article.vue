<template>
  <div>
    <ArticleContent v-if="article.id"
                    :article="article" />
    <CommentTextArea :aid="article.id" />
    <CommentList :comments="article.comments" />
  </div>

</template>

<script>
import { Notification } from 'element-ui'
import ArticleContent from '@/components/article/ArticleContent'
import CommentTextArea from '@/components/comment/CommentTextArea'
import CommentList from '@/components/comment/CommentList'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('likes')
export default {
  name: '',
  components: {
    ArticleContent, CommentTextArea, CommentList
  },
  provide () {
    return {
      getArticleById: this.getArticleById
    }
  },
  data () {
    return {
      articleId: "",
      article: {}
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.articleId = this.$route.params.id
    this.getArticleById()
  },
  methods: {
    async getArticleById () {
      try {
        this.article = await this.$api({ type: "getArticleById", data: { id: this.articleId } })
        let likeUsers = this.article?.like_users || []
        let uid = this.$store.getters.userInfo?._id
        let aid = this.article?.id
        if (likeUsers.includes(uid)) {
          this.pushLikes({ aid })
        }
      } catch (error) {
        Notification.warning({
          title: '获取失败',
          message: error.message
        })
      }
    },
    ...mapActions(['pushLikes', 'sendLikes'])
  },
}
</script>
<style scoped>
</style>