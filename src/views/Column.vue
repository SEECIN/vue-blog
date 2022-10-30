<template>
  <div class="blog-column-words">
    <WordCloud :data="columnWords"
               nameKey="name"
               valueKey="value"
               :fontSize="[60,60]"
               :color="['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']"
               :showTooltip="false"
               :wordClick="wordClickHandler">
    </WordCloud>
  </div>
</template>

<script>
import WordCloud from 'vue-wordcloud'
export default {
  name: 'Column',
  components: {
    WordCloud
  },
  data () {
    return {
      columns: []
    }
  },
  created () {
    this.getColumns()
  },
  mounted () {
    this.$EventBus.$on('updateView', () => {
      this.getColumns()
    })
  },
  computed: {
    columnWords () {
      return this.columns.map(item => {
        return {
          name: item.name,
          value: item.aids.length || 0,
          id: item.id
        }
      })
    }
  },
  watch: {

  },
  methods: {
    wordClickHandler (name) {
      let columnId = this.columns.find(item => {
        return item.name === name
      })?.id
      this.$router.push({ name: 'index', query: { columnId } })
    },
    async getColumns () {
      try {
        let columns = await this.$api({ type: 'column' })
        this.columns = columns.list
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>
<style lang="stylus">
.blog-column-words svg
  user-select none
  & text
    cursor pointer
</style>