// import { construct } from "core-js/fn/reflect"

const TREE_DATA = {selected: false, partialSelected: false}
class TreeData{
  constructor(data){
    this.name = 'TreeData'
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
    return !this.isAllChildrenSelected() && this.children.some((child) => child.isSelected() || child.isPartialSelected())
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
                checked: true,
                disabled: true
              },
              {
                name: '四级 1-1-1-2',
                id: '5',
                children: [],
                checked: false
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
  const {id, name, children} = data
  const node = new TreeData({id, name})
  console.log(node.name)
  children.forEach((child) => {
    // eslint-disable-next-line no-debugger
    node.addChild(generateNode(child))
  })
  return node
}

export default {
  name: 'Tree',
  data () {
    return {
      root: generateNode(demeData[0])

    }
  },
  methods: {
    nodeView (node, level) {
      const {name, selected} = node?.data ?? {}
      return (<div style={`margin-left: ${level * 10}px; display: inline-block`}>
        { node.hasChildrenPartialSelected() && `-`}
        <input type='checkbox' checked={selected} onClick={() => this.selectToggle(node)}/>
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
    getView(paths, level){
      const node = this.getNode(paths)
      const currentNode = this.nodeView(node, level)
      console.log('paths:::', paths)
      return (<div>
        {currentNode}
        {node?.children?.map((_, index) => this.getView([...paths, index], level + 1))}
      </div>)
    },
    refreshUp({parent}){
      if (!parent) return
      const toState = parent.isAllChildrenSelected()
      // eslint-disable-next-line no-debugger
      // debugger
      Object.assign(parent.data, {selected: toState, partialSelected: parent.hasChildrenPartialSelected()})
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
        {this.getView([], 0)}
      </div>
    )
  }
}