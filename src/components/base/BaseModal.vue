<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="isShow"
               :width="width"
               :before-close="close">
      <BaseForm v-if="formType"
                :type="type"
                ref="form" />
      <div slot="footer"
           class="dialog-footer">
        <el-button v-for="btn in btns"
                   :key="btn.targetName"
                   @click="handlerBtn(btn.targetName,btn.isSubmit)">{{btn.name}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MODAL_DATA from '@/config/modal.config'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('modal')

import BaseForm from '@/components/base/BaseForm'

export default {
  name: 'BlogBasemodal',

  components: {
    BaseForm
  },

  directives: {},

  data () {
    return {

    };
  },
  watch: {

  },

  computed: {
    ...mapState(['isShow', 'type']),
    title () {
      return MODAL_DATA[this.type]?.title
    },
    width () {
      return MODAL_DATA[this.type]?.width ?? '60%'
    },
    formType () {
      return MODAL_DATA[this.type]?.formType
    },
    needUpdate () {
      return MODAL_DATA[this.type]?.needUpdate
    },
    btns () {
      return MODAL_DATA[this.type]?.btns ?? [{
        targetName: 'close',
        name: '取消'
      },
      {
        targetName: 'confirm',
        name: '提交',
      }]
    }
  },

  methods: {
    handlerBtn (action, isSubmit) {
      if (isSubmit) {
        this.submitForm()
        return
      }
      this[action]?.()
    },
    submitForm () {
      if (!this.formType) {
        return false
      }
      this.$refs['form'].$refs['elForm'].validate(async valid => {
        if (valid) {
          try {
            await this.$api({ type: this.formType, data: this.$refs['form'].form })
            this.close()
            if (this.needUpdate) {
              this.$EventBus.$emit('updateView')
            }
          } catch (error) {
            this.$refs['form'].$refs['elForm'].resetFields()
          }
        } else {
          return false
        }
      })
    },
    ...mapActions(['close', 'open', 'confirm'])
  },
};
</script>

<style lang="scss" scoped>
</style>