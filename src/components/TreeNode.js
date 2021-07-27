

// const TREE_DATA = {selected: false, partialSelected: false}

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
    nodeView (node, level) {
      const {name, selected, disabled, partialSelected} = node?.data ?? {}
      return (name && <div style={`margin-left: ${level * 10}px; display: inline-block`}>
        { partialSelected && `-`}
        <input type='checkbox' disabled={disabled} checked={selected} onClick={() => this.selectToggle(node)}/>
        {name}
      </div>)
    },
    getView(node, level){
      // const node = this.getNode(paths)
      // eslint-disable-next-line no-debugger
      // debugger
      const currentNode = this.nodeView(node, level)
      return (<div>
        {currentNode}
        {node?.children?.map((child) => this.getView(child, level+1))}
      </div>)
    },
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

      console.log("1:", node)
      Object.assign(node.data, {selected: !node.isSelected(), partialSelected: false})
      console.log("2:", node)
      this.refreshUp(node)
      console.log("3:", node)
      this.refreshDown(node)
      console.log("4:", node)
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