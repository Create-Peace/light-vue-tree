// import { construct } from "core-js/fn/reflect"

const TREE_DATA = {selected: false, partialSelected: false}
class TreeData{
  constructor(data){
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

const generateNode = (data) => {
  const {children, ...rest} = data
  const node = new TreeData(rest)
  children.forEach((child) => {
    // eslint-disable-next-line no-debugger
    node.addChild(generateNode(child))
  })
  return node
}

import TreeNode from './TreeNode'

export default {
  name: 'Tree',
  components: {
    TreeNode
  },
  data () {
    const dataOrr = {
      children: demeData
    }




    return {
      dataMap: {},
      root: generateNode(dataOrr)

    }
  },
  created() {
    // console.log(this.root)
    this.walk()
  },
  methods: {
    walk(root = this.root) {
      const {children = []} = root
      // const {selected: parentSelected} = data
      // let isSelectedAll = false
      // let partialSelected = false
      children?.forEach(child => {
        const { data } = child
        // eslint-disable-next-line no-debugger
        // debugger
        if (data.selected) {
          this.refreshUp(child)

          // if (!data.parent.data.isSelected) {
          // }
          this.refreshDown(child)
        } else {
          this.walk(child)
        }
        // 如果父级节点选中
        // if (parentSelected) {
        //   data.selected = parentSelected
        // } else {
        //   isSelectedAll = data.isSelected
        // }
        // if (!partialSelected) {
        //   partialSelected = data.isSelected
      })
    },
    nodeView (node, level) {
      const {name, selected, disabled, partialSelected} = node?.data ?? {}
      return (name && <div style={`margin-left: ${level * 10}px; display: inline-block`}>
        { partialSelected && `-`}
        <input type='checkbox' disabled={disabled} checked={selected} onClick={() => this.selectToggle(node)}/>
        {name}
      </div>)
    },
    getNode(paths) {
      let node = this.root
      // eslint-disable-next-line no-debugger
      // debugger
      // 通过索引找到对应的元素
      paths.forEach((path) => {
        node = node.children[path]
      })
      return node
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