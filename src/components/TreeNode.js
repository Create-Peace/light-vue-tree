

import Emitter from '../mixins/Emitter'
export default {
  name: 'TreeNode',
  mixins: [Emitter],
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
  // watch: {
  //   'node.data': {
  //     handler: function(val) {
  //       if (val.selected) {
  //         // this.dispatch('')
          
  //       }
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  created() {
    if (this.$parent.$options.name === 'Tree') {
      this.tree = this.$parent
    } else {
      this.tree = this.$parent.tree
    }
  },
  methods: {
    selectToggle(node){
      Object.assign(node.data, {selected: !node.isSelected(), partialSelected: false})
      if (!this.tree.checkStrictly) {
        this.tree.refreshUp(node)
        this.tree.refreshDown(node)
      } else {
        this.tree.getCheckedValue(node)
      }
      
      this.tree.$emit('on-checkbox-change', this.tree.checkedNodes, this.tree.checkedNodeKeys)
      this.tree.$emit('on-checked-item', node.data)
    },
    nodeView (node, level) {
      const {name, selected, disabled, partialSelected, expanded} = node?.data ?? {}
      const { renderTreeNode, $scopedSlots: { default: defaultSlot }} = this.tree

      return (name && <div style={`margin-left: ${level * 10}px; margin-bottom: 6px; display: inline-block;`}>
        {node.children && node.children.length? <span class={['icon', expanded ? 'rotate180-enter icon-expand' : 'rotate180-leave icon-unexpand']} onClick={() => this.toggleFold(node)} style="padding: 1px; background: #eee; cursor: pointer">▲</span> : null}
        { partialSelected && `-`}
        {this.tree.showCheckbox && <input type='checkbox' disabled={disabled} checked={selected} onClick={() => this.selectToggle(node)} />}
        { renderTreeNode ? renderTreeNode(node) : defaultSlot? defaultSlot({node}): <span>{name}</span> }
      </div>)
    },
    toggleFold(node) {
      Object.assign(node.data, {expanded: !node.data.expanded})
      if (!node.data.expanded) {
        this.tree.refreshExpandedDown(node)
      }
    },
    
  },

  render () {
    const { node, level } = this
    const currentNode = this.nodeView(node, level)
    return (<div>
      {currentNode}
      {
        node?.data?.expanded && node.children?.map(subNode => {
          return (<TreeNode node={subNode} level={level + 1}  />)
        })
      }
    </div>)
  }
}
