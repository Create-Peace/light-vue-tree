import TreeContent from './TreeNodeContent'
export default {
  name: 'TreeNode',
  components: {
    TreeContent
  },
  props: {
    node: [Object],
    tree: {
      type: Object
    }
  },
  computed: {
    visible () {
      return this.parentExpanded && this.node.data.expanded
    }
  },
  methods: {
    nodeView (node) {
      return (<TreeContent tree={this.tree} node={node} icon={this.icon} />)
    },
    nodeChildren (node) {
      const { tree } = this
      return (node.data.expanded ? <div>
        {
          node.children && node.children.map((subNode, index) => {
            return (subNode.data.visible && <TreeNode tree={tree} key={(subNode && subNode.data && subNode.data.name) || index} node={subNode} />)
          })
        }
      </div> : null)
    }
  },

  render () {
    const { node, nodeChildren } = this
    const currentNode = this.nodeView(node)
    const { draggable, dragStart, dragOver, dragEnd, handleDrop, dragInfo, virtual } = this.tree

    return (<div
      class={['child-node', dragInfo.dropType || '']}
      draggable={draggable}
      onDragstart={(e) => dragStart(e, this)}
      onDragover={(e) => dragOver(e, this)}
      onDragend={(e) => dragEnd(e, this)}
      onDrop={handleDrop}

    >
      {currentNode}
      <transition name='transition-drop'>
        {!virtual && nodeChildren(node)}
      </transition>
    </div>)
  }
}
