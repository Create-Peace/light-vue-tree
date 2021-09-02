<template>
   <div class="test-tree">
      <!-- <div class="edit-container" style="border: 1px solid #ddd; border-radius: 3px ">
        <div ref="edit-box" contenteditable="true" style="padding: 4px; user-modify: read-only;">
          <Tag v-for="(item, index) in checkedValues" 
            :key="item.key" 
            contenteditable="false" 
            type="success" 
            @on-close="removeChecked(item, index)"
            :clearable="!item.disabled">{{item.name}}</Tag>
        </div>
        <Icon v-if="visibleClose" class="close-btn" @click="clearChecked" type="icon-close-bg" />
      </div> -->
     
      <VueTree
        ref="tree3"
        draggable
        showCheckbox
        checkStrictly
        :treeData="treeData"
        @on-checked-change="handleCheckedChange" />
    </div>
</template>
<script>
import { treeData } from '../../assets/treeData'
export default {
  name: 'CheckStrict',
  data () {
    return {
      checkedValues: [],
      treeData,
    }
  },
  computed: {
    visibleClose: function() {
      return this.checkedValues.filter(item => !item.disabled).length > 0
    }
  },
  mounted() {
    this.checkedValues = this.$refs.tree3.getCheckedNodes()
  },
  methods: {
    handleCheckedChange ({ node, selectedData }) {
      console.log('clickCheckbox', node, selectedData)
      this.checkedValues = selectedData
    },
    clearChecked() {
      this.$refs.tree3.clear()
      this.checkedValues = this.$refs.tree3.getCheckedNodes()
    },
    removeChecked(node, index) {
      this.$refs.tree3.removeCheckedNode(node, index)
    },
  }

}

</script>
<style lang="less" scoped>
  .test-tree {
    width: 400px;
  }
  .edit-container {
    position: relative;
    min-height: 36px;
  }
  .close-btn {
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
  }
</style>