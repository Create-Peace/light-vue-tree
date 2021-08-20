import TreeNode from './TreeNode'
import VirtualList from '../VirtualList/VirtualList'

const prefixCls = 'vue-tree'

export default {
  name: 'VirtualTreeList',
  components: {
    TreeNode,
    VirtualList
  },
  props: {
    treeNodes: [Array],
    tree: {
      type: Object
    },
    height: {
      type: Number
    },
    keeps: [Number]
  },
  computed: {
    conStyles: function () {
      return this.height ? { height: `${this.height}px` } : { height: 'auto' }
    }
  },
  methods: {
    renderTreeNode ({ source: node }) {
      const { tree } = this
      return (node.data.visible && node.parent.data.expanded ? <TreeNode tree={tree} style={{ marginLeft: `${10 * node.data.level}px` }} key={(node && node.data && node.data.name)} node={node} /> : null)
    },
    getRowKey (node) {
      return node.data.id
    }
  },
  render () {
    const { treeNodes, renderTreeNode, getRowKey, conStyles, keeps } = this
    return (<virtual-list
      class={`${prefixCls}-virtual-container`}
      ref="container"
      style={conStyles}
      row-key={getRowKey}
      data-sources={treeNodes}
      data-component={renderTreeNode}
      keeps={keeps}
      {...{ props: this.$attrs }}
    />)
  }
}
