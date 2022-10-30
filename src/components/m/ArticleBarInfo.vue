<template>
  <van-card class="blogm-item"
            :desc="info.nikname">
    <template #thumb>
      <van-image round
                 width="80"
                 height="80"
                 fit="cover"
                 :src="info.avatar" />
    </template>
    <template #title>
      <h3 class="van-ellipsis blogm-item--title">{{info.nikname}}</h3>
    </template>
    <template #desc>
      <p class="van-ellipsis">
        {{info.date}}
      </p>
      <span class="blogm-item--column">
        {{`#${info.column}`}}
      </span>
    </template>
  </van-card>
</template>

<script>

export default {
  name: 'ArticleBarInfo',
  components: {

  },
  props: {
    info: {
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
<style lang='stylus'>
.blogm-item
  padding-top 20px
</style>