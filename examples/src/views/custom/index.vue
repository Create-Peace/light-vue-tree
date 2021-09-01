<template>
   <div class="test-tree">
      <VueTree
        ref="tree4"
        :treeData="treeData"
        showCheckbox>
        <template v-slot="{ node, treeNode }">
          <span style="color: #f00">{{node.name}}</span> 
          <a class="link-color ml20" @click.stop="handleAddChild(treeNode)">增加</a>
          <a class="link-color ml20" @click.stop="handleRemoveChild(treeNode)">删除</a>
          <a class="link-color ml20" @click.stop="toggleDisable(node)">{{ node.disabled ? '开启' : '禁用'}}</a>
        </template>
      </VueTree>
    </div>
</template>
<script>
import { treeData } from '../../assets/treeData'
import Mock from '../../utils/mock'

export default {
  name: 'Custom',
  data () {
    return {
      treeData
    }
  },
  methods: {
    handleAddChild(treeNode) {
      this.maxId += 1
      const { name } = Mock.mock({'name': "@ctitle(4,6)"})
      const treeData = {
        id: this.maxId,
        name
      }
      this.$refs.tree4.appendChild(treeData, treeNode)
    },
    handleRemoveChild(treeNode) {
      this.$refs.tree4.removeChild(treeNode)
    },
    toggleDisable(node) {
      this.$set(node, 'disabled', !node.disabled)
    },


  }

}
</script>