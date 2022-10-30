<template>
  <article class="blog-content--item"
           v-if="article">

    <h3 class="blog-item--title">{{article.title}}</h3>
    <p class="blog-item--date">
      <i class="glyphicon glyphicon-time"></i> {{article.date}}
    </p>
    <p class="blog-item--author">{{article.author.nikname}}</p>
    <img class="blog-item--illu"
         :src="article.cover"
         alt="">
    <p class="blog-item--desc">
      {{content}}
    </p>
    <p class="blog-item--tags"><span class="blog-tags--hit">浏览
        ({{article.hit_num}})</span><span class="blog-tags--like">点赞 ({{article.like_num}})</span> <span class="blog-tags--comment">评论
        ({{article.comment_num}})</span></p>

  </article>
</template>

<script>

export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object
    }
  },
  components: {

  },
  data () {
    return {

    }
  },
  created () {

  },
  computed: {
    content () {
      return this.article.content.match(/>([^<>]+)</)?.[1]
    }
  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang='stylus'>
@import '~@/assets/css/base.styl'
.blog-content--item
  background-color line-modifier-color
  text-align center
  margin-bottom 10px
  cursor pointer
  user-select none
.blog-content-never
  display flex
  flex-direction column
  justify-content center
  align-items center
  height 600px
.blog-item--btn
  margin-top 40px
  padding: padding-space * 2 (padding-space * 3)
  border 1px solid line-theme-color
  &:hover
    background-color bg-reverse-color
.blog-item--head
  display flex
  align-items center
  height 60px
  font-size 16px
.blog-item--author
  padding-right 10px
.blog-item--title
  color font-title-color
  font-size: font-size-h * 2
.blog-item--illu
  width auto
  height 160px
  padding padding-space 0
  @media screen and (max-width 600px)
    height 180px
.blog-item--date
  padding: padding-space * 2 0
.blog-item--desc
  padding: padding-space * 3
  text-align left
  text-indent 2em
  &:hover
    color font-theme-color
.blog-item--tags
  display flex
  justify-content flex-end
  padding 0 padding-space * 2
.blog-tags--like, .blog-tags--hit, .blog-tags--comment
  padding 0 padding-space
  cursor pointer
  color lighten(font-theme-color, 60%)
  &:hover
    color lighten(font-theme-color, 20%)
</style>