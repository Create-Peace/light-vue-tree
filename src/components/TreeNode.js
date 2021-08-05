import TreeContent from './TreeNodeContent'
export default {
  name: 'TreeNode',
  components: {
    TreeContent,
  },
  props: {
    node: [Object],
    level: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {
      tree: {}
    }
  },
  created () {
    if (this.$parent.$options.name === 'Tree') {
      this.tree = this.$parent
    } else {
      this.tree = this.$parent.tree
    }
  },
  methods: {

    nodeView (node) {
      return (<TreeContent tree={this.tree} node={node} icon={this.icon} />)
    }
  },

  render () {
    const { node, level } = this
    const currentNode = this.nodeView(node, level)
    const { draggable, dragStart, dragOver, dragEnd, handleDrop, dragInfo } = this.tree

    return (<div
      class={['child-node', dragInfo.dropType || '']}
      draggable={draggable}
      onDragstart={(e) => dragStart(e, this)}
      onDragover={(e) => dragOver(e, this)}
      onDragend={(e) => dragEnd(e, this)}
      onDrop={handleDrop}

    >
      {currentNode}
      {
        node.data.expanded && node.children && node.children.map((subNode, index) => {
          return (subNode.data.visible && <TreeNode key={(subNode && subNode.data && subNode.data.name) || index} node={subNode} />)
        })
      }
    </div>)
  }
}
