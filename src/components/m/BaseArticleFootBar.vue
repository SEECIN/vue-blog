<template>
  <van-tabbar active-color="#7d7e80">
    <van-tabbar-item icon="eye-o">{{hitNum}}</van-tabbar-item>
    <van-tabbar-item icon="comment-o"
                     @click="comment">{{commentNum}}</van-tabbar-item>
    <van-tabbar-item class="blogm-article--like"
                     icon="good-job-o"
                     :class="{active:isLike}"
                     @click="like">{{likeNum}}</van-tabbar-item>
    <van-action-sheet v-model="show"
                      title="评论">
      <van-cell-group v-if="commentsLength"
                      inset
                      class="blogm-article--comment">
        <Vuescroll :ops="ops"
                   ref="comment_area">
          <div v-for="(item,idx) in commentList"
               :key="item._id"
               :id='`comment${idx}`'
               class="blogm-comment--cell">
            <template icon>
              <van-image round
                         width="40"
                         height="40"
                         fit="cover"
                         class="blogm-comment--avatar "
                         :src="item.uid.avatar" />
            </template>
            <div class="blogm-comment--content">
              <van-cell cell-label-font-size="16px"
                        :title="item.uid.nikname"
                        :label="item.content" />
              <van-cell class="blogm-comment--date"
                        :value="item.date" />
            </div>
          </div>
        </Vuescroll>
      </van-cell-group>
      <van-empty v-else
                 description="暂无评论" />
      <van-field class="blogm-comment--input"
                 v-model="commentVal"
                 maxlength="50"
                 placeholder="请输入评论内容">
        <template #button>
          <van-button class="blogm-comment--btn"
                      size="small"
                      type="primary"
                      @click="submitComment">发送</van-button>
        </template>
      </van-field>
    </van-action-sheet>
  </van-tabbar>
</template>

<script>
import Vuescroll from 'vuescroll'
import { Toast } from 'vant'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('likes')
export default {
  name: 'BaseArticleFootBar',
  components: {
    Vuescroll
  },
  props: {
    article: {
      type: String
    }
  },
  data () {
    return {
      isInitLike: false,
      show: false,
      commentVal: '',
      commentList: [],
      ops: {
        bar: {
          background: '#c1c1c1',
        }
      }
    }
  },
  created () {
    this.commentList = this.article?.comments?.reverse()
    this.isInitLike = this.isLike
  },
  computed: {
    commentsLength () {
      return this.article?.comments?.length
    },
    isLike () {
      return this.hadLike(this.article?.id)
    },
    likeNum () {
      let step = Number(this.isLike) - 1
      return Math.max(this.article?.like_num + !this.isInitLike + step, 0)
    },
    hitNum () {
      return this.article?.hit_num
    },
    commentNum () {
      return this.article?.comment_num
    },
    ...mapGetters(['hadLike'])
  },
  watch: {

  },
  methods: {
    comment () {
      this.show = true
    },
    like () {
      this[this.isLike ? 'pullLikes' : 'pushLikes']({ aid: this.article._id })
      this.updateLikes({ aid: this.article._id })
    },
    ...mapActions(['pullLikes', 'pushLikes', 'updateLikes']),
    async submitComment () {
      let isLogin = this.$store.state.token
      if (!isLogin) {
        Toast({ message: '登录后即可发表评论' })
        this.$router.push({ name: 'mUser', query: 'MUser' })
        return
      }
      if (this.commentVal.trim().length === 0) {
        Toast({ message: '请输入评论内容' })
        return
      }
      try {
        await this.$api({ type: 'postComment', data: { aid: this.article._id, content: this.commentVal } })
        Toast.success('评论成功')
        this.$EventBus.$emit('uploadArticle')
        this.$EventBus.$on('articleInfo', data => {
          this.commentList = data.comments.reverse()
        })
      } catch (error) {
        Toast({ message: error })
      }
      this.commentVal = ''
    }
  },
  beforeDestroy () {
    this.$EventBus.$off('articleInfo')
  }
}
</script>
<style lang='stylus'>
.blogm-article--like.active
  color #1989fa
.blogm-comment--cell
  box-sizing border-box
  display flex
  flex-direction row
  justify-content flex-start
  margin 5px 0
  padding 0 10px
  border-radius 4px
  background-color #f1f1f1
  .van-cell
    padding 0
    background-color #f1f1f1
.blogm-article--comment
  height 40vh
  margin 0
  overflow hidden
.blogm-comment--content
  width 90%
.van-cell__title
  padding 5px
  span
    font-size 12px
    color #969799
.van-cell__label
  font-size 14px
  color #6a737d
.blogm-comment--input
  padding 0
  border 1px solid #ccc
.van-field__control
  text-indent 1em
.blogm-comment--btn
  height 33px
  background-color #969799
  border 0
.blogm-comment--avatar
  margin-top 10px
  .van-image__img
    width 40px
    height 40px
.blogm-comment--date
  span
    float right
    font-size 10px
    color #969799
</style>