export default {
  name: 'TreeContent',
  props: {
    node: [Object],
    tree: [Object]
  },
  methods: {
    toggleFold (node) {
      Object.assign(node.data, { expanded: !node.data.expanded })
      // if (!node.data.expanded) { // 折叠需要向下更新状态
      //   this.tree.refreshExpandedDown(node)
      // }
    },
    selectToggle (val, node) {
      if (!this.tree.checkStrictly) {
        const exceptDisabledChecked = node.isExceptDisabledChecked()
        Object.assign(node.data, { checked: !exceptDisabledChecked, exceptDisabledChecked: !exceptDisabledChecked })
        this.$nextTick(() => {
          this.tree.refreshDown(node)
          this.tree.$emit('on-checked-change', { node: node.data, selectedData: this.tree.checkedNodes })
          this.tree.$emit('on-checked-item', { node: node.data, vNode: this })
        })
      } else {
        Object.assign(node.data, { checked: val })
        this.tree.getCheckedValue(node)
        this.tree.$emit('on-checked-change', { node: node.data, selectedData: this.tree.checkedNodes })
        this.tree.$emit('on-checked-item', { node: node.data, vNode: this })
      }
    },
    clickContent () {
      this.tree.handleClickNode(this)
    }
  },
  render () {
    const { tree, node, clickContent } = this
    const { name, checked, disabled, partialSelected, expanded, exceptDisabledChecked } = node.data || {}
    const { renderTreeNode, $scopedSlots: { default: defaultSlot }, dragInfo, showCheckbox } = tree

    return (<div
      class={['node-content', { 'active-li': dragInfo.draggingNode && this.node === dragInfo.draggingNode.node }]}
    >
      {<span class={['icon', expanded ? 'rotate180-enter icon-expand' : 'rotate180-leave icon-unexpand']} onClick={() => this.toggleFold(node)} style={{ visibility: node.children && node.children.length ? 'visible' : 'hidden' }}>▲</span> }
      <span>{ partialSelected && '-' }</span>
      <div class={['inner-wrap']}>
        {
          showCheckbox && <input
            type='checkbox'
            checked={checked}
            style="margin-right: 10px;"
            key={exceptDisabledChecked}
            disabled={disabled}
            on-on-change={(val) => this.selectToggle(val, node)} />
        }
        <div onClick={clickContent} class='node-name'>{ renderTreeNode ? renderTreeNode(node.data) : defaultSlot ? defaultSlot({ node: node.data }) : <span>{name}</span> }</div>
      </div>
    </div>)
  }
}