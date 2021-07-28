

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
      this.tree.refreshUp(node)
      this.tree.refreshDown(node)
    },
    nodeView (node, level) {
      const {name, selected, disabled, partialSelected} = node?.data ?? {}
      return (name && <div style={`margin-left: ${level * 10}px; display: inline-block`}>
        { partialSelected && `-`}
        <input type='checkbox' disabled={disabled} checked={selected} onClick={() => this.selectToggle(node)} />
        {name}
      </div>)
    }
  },

  render () {
    const { node, level } = this
    const currentNode = this.nodeView(node, level)
    return (<div>
      {currentNode}
      {
        node.children?.map(subNode => {
          return (<TreeNode node={subNode} level={level + 1}  />)
        })
      }
    </div>)
  }
}