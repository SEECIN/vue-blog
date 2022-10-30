<template>
  <div>
    <BaseFoot v-if="useBaseFoot" />
  </div>
</template>

<script>
import BaseFoot from '@/components/m/BaseFootBar'

export default {
  name: 'FootBar',
  components: {
    BaseFoot
  },
  data () {
    return {
      useBaseFoot: true
    }
  },
  created () {

  },
  computed: {

  },
  watch: {
    $route (to) {
      this.useBaseFoot = to.meta.useBaseFoot
    }
  },
  methods: {

  },
}
</script>
<style lang='stylus'></style>