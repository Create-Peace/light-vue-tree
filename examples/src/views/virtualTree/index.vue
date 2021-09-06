<template>
  <div class="test-tree">
    <VueTree
      ref="tree"
      :height="300"
      draggable
      virtual
      :keeps="100"
      :treeData="bigTreeData"
      expandedAll
      @on-drop="dropNode"
      @on-selected-change="clickNode"
      />
  </div>
</template>
<script>
let index = 0

function dig(path = '0', level = 4) {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    index += 1
    const key = `${path}-${i}`;
    const treeNode = {
      name: key,
      id: key,
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
}

const bigTreeData = dig();

console.log('大数据量的节点数:', index)

export default {
  name: 'VirtualTree',
  data () {
    return {
      bigTreeData
    }
  },
  methods: {
    dropNode ({ parentNode, targetNode, callback }) {
      console.log('dropNode', parentNode, targetNode)
      callback(targetNode)
    },
    clickNode (node) {
      console.log('clickNode', node)
    },

  }

}
</script>
<style lang="less" scoped>
  .test-tree {
    width: 400px;
  }
</style>