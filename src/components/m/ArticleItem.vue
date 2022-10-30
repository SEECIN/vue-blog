<template>
  <van-card class="blogm-item"
            :desc="article.title"
            :thumb="article.cover">
    <template #title>
      <h3 class="van-ellipsis blogm-item--title">{{article.title}}</h3>
    </template>
    <template #desc>
      <p class="van-ellipsis">
        {{article.author.nikname}}
      </p>
      <span class="blogm-item--column">
        {{`#${article.column.name}`}}
      </span>
    </template>
    <template #num>
      <p>{{article.date}}</p>
    </template>
  </van-card>
</template>

<script>

export default {
  name: 'ArticleItem',
  components: {

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

  },
  watch: {

  },
  methods: {

  },
}
</script>
<style lang="stylus" >
.blogm-item
  margin-top 2px
  & p
    padding 4px 2px
.blogm-item--title
  font-weight 600
  font-size 1.3em
  padding-bottom 0.33em
.blogm-item--column
  float right
  color #ccc
</style>