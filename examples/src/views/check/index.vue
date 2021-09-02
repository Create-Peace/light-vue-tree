<template>
  <div class="test-tree">
    <input v-model="searchVal" placeholder="请输入过滤字段" />
    <VueTree
      ref="tree1"
      draggable
      showCheckbox
      :treeData="treeData"
      :searchVal="searchVal"
      @on-drop="dropNode"
      @on-checked-item="checkedItem"
      @on-selected-change="clickNode"
      @on-checked-change="clickCheckbox"
    />
  </div>
</template>
<script>
import { treeData } from '../../assets/treeData'
export default {
  name: "Check",
  data() {
    return {
      treeData,
      searchVal: '',
    };
  },
  methods: {
    dropNode({ parentNode, targetNode, callback }) {
      console.log("dropNode", parentNode, targetNode);
      callback(targetNode);
    },
    checkedItem({ node, vNode }) {
      console.log("checkedItem", node, vNode);
    },
    clickNode(node) {
      console.log("clickNode", node);
    },
    clickCheckbox({ node, selectedData }) {
      console.log("clickCheckbox", node, selectedData);
    },
  },
};
</script>
