export const treeData = 
[
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
                name: '四级 1-1-1-3',
                id: '6',
                children: [],
                checked: false,
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
        children: []
      },
      {
        name: '二级 2-2',
        id: '15',
        children: []
      }
    ]
  }
]

let id = 0

export function makeTree(number, hierarchy, tree = { id: 1, name: '一级', children: []}, result) {
  if (!result) result = []
  if (hierarchy === 0) return
  for (let i = 0; i < number; i++) {
    id++
    tree = {...tree}
    tree.id = id
    tree.name = id
    tree.children = makeTree(number, hierarchy - 1, {...tree}) || []
    result.push(tree)
  }
  return result
}