import Checkbox from './Checkbox'
export default {
  name: 'TreeContent',
  components: {
    Checkbox
  },
  props: {
    node: [Object],
    tree: [Object]
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    activeNode: function () {
      const { node } = this
      return node.isSelected()
    },
    visibleExpand: function () {
      const { node } = this
      const { lazy } = this.tree
      return (node.children && node.children.length) || (lazy && !node.data.isLeaf) ? 'inline' : 'none'
    }
  },
  methods: {
    toggleFold (node) {
      const { load, lazy, appendChildren } = this.tree
      Object.assign(node.data, { expanded: !node.data.expanded })
      if (this.tree.virtual) {
        this.tree.getFlatTree()
      }
      // 当前没有children进行lazyLoad
      if (node.data.expanded && lazy && (!node.children || !node.children.length)) {
        if (!load) {
          throw new Error('[Tree] when lazy is true, load method must be set')
        }
        this.loading = true
        load(node.data,
          (data) => {
            this.loading = false
            if (data && data.length) {
              appendChildren(data, node)
            } else {
              Object.assign(node.data, { isLeaf: true })
            }
          })
      }
    },
    selectToggle (val, node) {
      if (!this.tree.checkStrictly) {
        const exceptDisabledChecked = node.isExceptDisabledChecked()
        Object.assign(node.data, { checked: !exceptDisabledChecked, exceptDisabledChecked: !exceptDisabledChecked })
        this.$nextTick(() => {
          this.tree.refreshNode(node)
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
      console.log('clickContent')
      this.tree.handleClickNode(this)
    },
    handleClickCheckBox (e) {
      e.stopPropagation()
    },
    renderExpandSlot () {
      const { $scopedSlots: { expandIcon: expandIconSlot } } = this.tree
      const { node, toggleFold, visibleExpand } = this
      const { data: { expanded }, children } = node
      return children && children.length ? expandIconSlot ? <div style={{ display: visibleExpand }}>{expandIconSlot({ expanded, node, toggleFold })}</div> : (<span class={['icon', expanded ? 'rotate180-enter icon-expand' : 'rotate180-leave icon-unexpand']} onClick={() => toggleFold(node)} >▼</span>) : null
    },
    renderCheckbox () {
      const { node, handleClickCheckBox, selectToggle } = this
      const { $scopedSlots: { checkbox: checkboxSlot }, showCheckbox } = this.tree
      const { checked, partialSelected, exceptDisabledChecked, disabled, } = node.data
      return showCheckbox ? checkboxSlot ? checkboxSlot({handleClickCheckBox, selectToggle, node: node.data }) : (<Checkbox
        value={checked}
        style="margin-right: 10px;"
        indeterminate={partialSelected}
        key={exceptDisabledChecked}
        disabled={disabled}
        nativeOnClick={handleClickCheckBox}
        onChange={(val) => selectToggle(val, node)} />) : null
    },
    renderLoading () {
      const { $scopedSlots: { loading: loadingSlot } } = this.tree
      const { loading } = this
      return loading? loadingSlot ? loadingSlot({ loading }) : (<div>↻</div>) : null
    },
    renderNodeName () {
      const { tree, node} = this
      const { name } = node.data
      const { renderTreeNode, $scopedSlots: { default: defaultSlot } } = tree

      return renderTreeNode ? renderTreeNode(node.data) : defaultSlot ? defaultSlot({ node: node.data, treeNode: node }) : <span>{name}</span> 
    }
  },
  render () {
    const { clickContent, activeNode, renderExpandSlot, renderCheckbox, renderLoading, renderNodeName } = this

    return (<div
      class={['node-content', { 'active-li': activeNode }]}
    >
      {renderExpandSlot()}
      <div class={['inner-wrap']} onClick={clickContent}>
        {
          renderCheckbox()
        }
        { renderLoading()}
        <div class='node-name'>
          { renderNodeName() }
        </div>
      </div>
    </div>)
  }
}
