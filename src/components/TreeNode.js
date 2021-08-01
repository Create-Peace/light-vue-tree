

import Emitter from '../mixins/Emitter'
import TreeNodeContent from './TreeNodeContent'
export default {
  name: 'TreeNode',
  mixins: [Emitter],
  component: {
    TreeNodeContent
  },
  props: {
    node: [Object],
    level: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      tree: {}
    }
  },
  created() {
    if (this.$parent.$options.name === 'Tree') {
      this.tree = this.$parent
    } else {
      this.tree = this.$parent.tree
    }
  },
  methods: {  
    nodeView (node, level) {
      return (<TreeNodeContent node={node} level={level} tree={this.tree} />)
    }
  },

  render () {
    const { node, level } = this
    const currentNode = this.nodeView(node, level)
    const {  draggable, dragStart, dragOver, dragEnd, handleDrop} = this.tree

    return (<div
      class="tree-node"
      draggable={draggable}
      onDragstart={(e) => dragStart(e, this)}
      onDragover={(e) => dragOver(e)}
      onDragend={(e) => dragEnd(e)}
      onDrop={handleDrop}
    >
      {currentNode}
      {
        node?.data?.expanded && node.children?.map(subNode => {
          return (<TreeNode node={subNode} level={level + 1}  />)
        })
      }
    </div>)
  }
}
