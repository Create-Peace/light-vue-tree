

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
  methods: {
    refreshUp({parent}){
      if (!parent) return
      const toState = parent.isAllChildrenSelected()
      // eslint-disable-next-line no-debugger
      // debugger
      Object.assign(parent.data, {selected: toState, partialSelected: !toState && parent.hasChildrenPartialSelected()})
      this.refreshUp(parent)
    },
    refreshDown(node){
      const toState = node.isSelected()
      node?.children.forEach((child) => {
        const fromState = child.isSelected()
        if(fromState === toState){
          return
        }
        Object.assign(child.data, {selected: toState, partialSelected: false})
        this.refreshDown(child)
      })
    },
    selectToggle(node){
      Object.assign(node.data, {selected: !node.isSelected(), partialSelected: false})
      this.refreshUp(node)
      this.refreshDown(node)
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