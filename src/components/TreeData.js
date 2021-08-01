const TREE_DATA = { selected: false, partialSelected: false, expanded: false };
export default class TreeData {
  constructor(data) {
    this.data = { ...TREE_DATA, ...data };
    this.children = [];
  }
  setParent(node) {
    this.parent = node;
  }
  addChild(node, index = -1) {
    if(index === -1){
      this.children.push(node);
    }else{
      this.children.splice(index, 0, node)
    }
    node.setParent(this);
  }
  isSelected() {
    return this?.data?.selected ?? false;
  }
  isExpanded() {
    return this?.data?.expanded ?? false;
  }
  isPartialSelected() {
    return this?.data?.partialSelected ?? false;
  }
  // TODO 这里两个方法需要合并一下
  isAllChildrenSelected() {
    // eslint-disable-next-line no-debugger
    // debugger
    return this.children.every((child) => child.isSelected());
  }
  hasChildrenPartialSelected() {
    return this.children.some(
      (child) => child.isSelected() || child.isPartialSelected()
    )
  }
  contains(target, deep = true) {
    const walk = function(parent) {
      const children = parent.children || [];
      let result = false;
      for (let i = 0, j = children.length; i < j; i++) {
        const child = children[i];
        if (child === target || (deep && walk(child))) {
          result = true;
          break;
        }
      }
      return result;
    };
    return walk(this);
  }
  get nextSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.children.indexOf(this);
      if (index > -1) {
        return parent.children[index + 1];
      }
    }
    return null;
  }

  get previousSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.children.indexOf(this);
      if (index > -1) {
        return index > 0 ? parent.children[index - 1] : null;
      }
    }
    return null;
  }

  insertBefore(child, ref) {
    let index;
    if (ref) {
      index = this.children.indexOf(ref);
    }
    this.insertChild(child, index);
  }

  insertAfter(child, ref) {
    let index;
    if (ref) {
      index = this.children.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  }

  removeChild(child) {
    const dataIndex = this.children.indexOf(child)
    if (dataIndex > -1) {
      child.parent = null;
      this.children.splice(dataIndex, 1);
    }
  }

  remove() {
    const parent = this.parent;
    if (parent) {
      parent.removeChild(this);
    }
  }

  insertChild(child, index) {

    if (typeof index === 'undefined' || index < 0) {
      this.children.push(child);
    } else {
      this.children.splice(index, 0, child);
    }
  }

  moveNode(node, toParent, toIndex = -1){
    const fromIndex = this.getIndex(node)
    node.parent.children.splice(fromIndex, 1)
    toParent.addChild(node, toIndex)
  }

  getIndex(node){
    if(!node?.parent){
      return 0
    }
    return node.parent.indexOf(node)
  }
  
}