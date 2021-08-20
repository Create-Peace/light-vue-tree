import TreeData from './TreeData'
export default {
  name: 'GenTree',
  data () {
    return {
      nodeMap: {}
    }
  },
  methods: {
    updateNodeChecked (nodeId) {
      if (!nodeId || nodeId === 'root') return
      const res = {
        checked: this.showCheckbox,
        selected: !this.showCheckbox
      }
      if ((Array.isArray(this.checkedValue) && this.checkedValue.includes(nodeId)) || this.checkedValue === nodeId) {
        return res
      }
    },
    generateTree (rootNode, props, level = 0) {
      const { children, ...rest } = rootNode
      const tmpProps = {}
      if (rest.id === 'root') { // root node must expanded
        tmpProps.expanded = true
      }
      const node = new TreeData({ ...rest, ...props, ...tmpProps, level, ...this.updateNodeChecked(rest.id) })
      this.nodeMap[rest.id] = node
      children && children.forEach((child) => {
        node.addChild(this.generateTree(child, props, level + 1))
      })
      return node
    },
    genFlatTree (node) {
      const { children, data = {} } = node
      if (!data.expanded || !children || !children.length) return []
      return children && children.reduce((total, cur) => {
        return total.concat(cur, this.genFlatTree(cur))
      }, [])
    }

  }
}

// export { generateTree, genFlatTree }
