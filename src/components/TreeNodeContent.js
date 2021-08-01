export default {
  name: 'TreeNodeContent',
  props: {
    tree: [Object],
    level: [Number],
    node: [Object]
  },
  methods: {
    foldToggle(node) {
      Object.assign(node.data, {expanded: !node.data.expanded})
      if (!node.data.expanded) {
        this.tree.refreshExpandedDown(node)
      }
    },
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
    }
  },
  render () {
    const { level, node, tree } = this
    const {name, selected, disabled, partialSelected, expanded} = node?.data ?? {}
    const { renderTreeNode, $scopedSlots: { default: defaultSlot } } = tree

    return (name && <div
      class="tree-node-content"
       style={`margin-left: ${level * 10}px; display: inline-block;`}
       >
        {<span class={['icon', 'sh__expand-icon', expanded ? 'rotate180-enter icon-expand' : 'rotate180-leave icon-unexpand']} onClick={() => this.foldToggle(node)} style={{padding: 1,  background: '#eee', cursor: 'pointer', visibility: node.children && node.children.length ? 'visible' : 'hidden'}}>▲</span>}
        { partialSelected && `-`}
        {this.tree.showCheckbox && <input type='checkbox' disabled={disabled} checked={selected} onClick={() => this.selectToggle(node)} />}
        <div class='tree-node-name'>{ renderTreeNode ? renderTreeNode(node) : defaultSlot? defaultSlot({node}): <span>{name}</span> }</div>
      </div>)
  }
}