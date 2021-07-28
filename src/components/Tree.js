// import { construct } from "core-js/fn/reflect"

const TREE_DATA = {selected: false, partialSelected: false, expanded: false}
class TreeData{
  constructor(data){
    console.log(data)
    this.data = {...TREE_DATA, ...data}
    this.children = []
  }
  setParent(node){
    this.parent = node
  }
  addChild(node){
    this.children.push(node)
    node.setParent(this)
  }
  isSelected(){
    return this?.data?.selected ?? false
  }
  isExpanded() {
    return this?.data?.expanded ?? false
  }
  isPartialSelected(){
    return this?.data?.partialSelected ?? false
  }
  isAllChildrenSelected(){
    // eslint-disable-next-line no-debugger
    // debugger
    return this.children.every((child) => child.isSelected())
  }
  hasChildrenPartialSelected(){
    return this.children.some((child) => child.isSelected() || child.isPartialSelected())
  }
}

const demeData = [
  {
    name: '一级 1',
    id: '1',
    children: [
      {
        name: '二级 1-1',
        id: '2',
        children: [
          {
            name: '三级 1-1-1',
            id: '3',
            children: [
              {
                name: '四级 1-1-1-1',
                id: '4',
                children: [],
                selected: true,
                disabled: false
              },
              {
                name: '四级 1-1-1-2',
                id: '5',
                children: [],
                selected: true
              }
            ]
          }
        ]
      },
      {
        name: '二级 1-2',
        id: '8',
        children: [
          {
            name: '三级 1-2-1',
            id: '9',
            children: [
              {
                name: '四级 1-2-1-1',
                id: '10',
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: '一级 2',
    id: '11',
    children: [
      {
        name: '二级 2-1',
        id: '12',
        children: [
          {
            name: '三级 2-1-1',
            id: '13',
            children: [
              {
                name: '四级 2-1-1-1',
                id: '14',
                children: []
              }
            ]
          }
        ]
      },
      {
        name: '二级 2-2',
        id: '15',
        children: [
          {
            name: '三级 2-2-1',
            id: '16',
            children: [
              {
                name: '四级 2-2-1-1',
                id: '17',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]

const generateNode = (data, props) => {
  const {children, ...rest} = data
  const node = new TreeData({...rest, ...props}) // TODO 初始化带有 expandedAll
  children.forEach((child) => {
    // eslint-disable-next-line no-debugger
    node.addChild(generateNode(child, props))
  })
  return node
}

import TreeNode from './TreeNode'

export default {
  name: 'Tree',
  components: {
    TreeNode
  },
  props: {
    expandedAll: {
      type: Boolean,
      default: true
    },
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const dataOrr = {
      children: demeData
    }

    return {
      // isTree: true,
      dataMap: {},
      root: generateNode(dataOrr, {expanded: this.expandedAll})
    }
  },
  created() {
    // console.log(this.root)
    this.walk()
  },
  methods: {
    walk(root = this.root) {
      if (this.checkStrictly) return
      const {children = []} = root
      children?.forEach(child => {
        const { data } = child
        // eslint-disable-next-line no-debugger
        // debugger
        if (data.selected) {
          this.refreshUp(child)
          this.refreshDown(child)
        } else {
          this.walk(child)
        }
      })
    },
    refreshExpandedDown(node) {
      // eslint-disable-next-line no-debugger
      // debugger
      const expanded = node.isExpanded()
      node?.children.forEach((child) => {
        Object.assign(child.data, {expanded})
        this.refreshExpandedDown(child)
      })
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
      const toState = node.isSelected() // 这里的名称需要换掉 nodeData 避免混淆
      node?.children.forEach((child) => {
        const fromState = child.isSelected()
        if(fromState === toState){
          return
        }
        Object.assign(child.data, {selected: toState, partialSelected: false})
        this.refreshDown(child)
      })
    },
  },
  render () {
    return (
      <div style='text-align: left'>
        {/* {this.getView(this.root, 0)} */}
        {
          this.root?.children?.map((node, index) => {
            return (<TreeNode key={node?.data?.name ?? index} node={node}  />)
          })
        }
      </div>
    )
  }
}