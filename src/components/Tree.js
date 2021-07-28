// import { construct } from "core-js/fn/reflect"

const TREE_DATA = { selected: false, partialSelected: false, expanded: false };
class TreeData {
  constructor(data) {
    this.data = { ...TREE_DATA, ...data };
    this.children = [];
  }
  setParent(node) {
    this.parent = node;
  }
  addChild(node) {
    this.children.push(node);
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
    );
  }
}

const demeData = [
  {
    name: "一级 1",
    id: "1",
    children: [
      {
        name: "二级 1-1",
        id: "2",
        children: [
          {
            name: "三级 1-1-1",
            id: "3",
            children: [
              {
                name: "四级 1-1-1-1",
                id: "4",
                children: [],
                selected: true,
                disabled: false,
              },
              {
                name: "四级 1-1-1-2",
                id: "5",
                children: [],
                selected: true,
              },
            ],
          },
        ],
      },
      {
        name: "二级 1-2",
        id: "8",
        children: [
          {
            name: "三级 1-2-1",
            id: "9",
            children: [
              {
                name: "四级 1-2-1-1",
                id: "10",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "一级 2",
    id: "11",
    children: [
      {
        name: "二级 2-1",
        id: "12",
        children: [
          {
            name: "三级 2-1-1",
            id: "13",
            children: [
              {
                name: "四级 2-1-1-1",
                id: "14",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "二级 2-2",
        id: "15",
        children: [
          {
            name: "三级 2-2-1",
            id: "16",
            children: [
              {
                name: "四级 2-2-1-1",
                id: "17",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

const generateNode = (data, props) => {
  const { children, ...rest } = data;
  const node = new TreeData({ ...rest, ...props });
  children.forEach((child) => {
    // eslint-disable-next-line no-debugger
    node.addChild(generateNode(child, props));
  });
  return node;
};

import TreeNode from "./TreeNode";
import { addClass, findNearestComponent, removeClass } from "../utils/assist";

export default {
  name: "Tree",
  components: {
    TreeNode,
  },
  props: {
    expandedAll: {
      type: Boolean,
      default: true,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const dataOrr = {
      children: demeData,
    };

    return {
      // isTree: true,
      dataMap: {},
      root: generateNode(dataOrr, { expanded: this.expandedAll }),
      dragInfo: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true,
      },
    };
  },
  created() {
    // console.log(this.root)
    this.walk();
  },
  methods: {
    walk(root = this.root) {
      if (this.checkStrictly) return;
      const { children = [] } = root;
      children?.forEach((child) => {
        const { data } = child;
        // eslint-disable-next-line no-debugger
        // debugger
        if (data.selected) {
          this.refreshUp(child);
          this.refreshDown(child);
        } else {
          this.walk(child);
        }
      });
    },
    refreshExpandedDown(node) {
      // eslint-disable-next-line no-debugger
      // debugger
      const expanded = node.isExpanded();
      node?.children.forEach((child) => {
        Object.assign(child.data, { expanded });
        this.refreshExpandedDown(child);
      });
    },
    refreshUp({ parent }) {
      if (!parent) return;
      const toState = parent.isAllChildrenSelected();
      // eslint-disable-next-line no-debugger
      // debugger
      Object.assign(parent.data, {
        selected: toState,
        partialSelected: !toState && parent.hasChildrenPartialSelected(),
      });
      this.refreshUp(parent);
    },
    refreshDown(node) {
      const toState = node.isSelected(); // 这里的名称需要换掉 nodeData 避免混淆
      node?.children.forEach((child) => {
        const fromState = child.isSelected();
        if (fromState === toState) {
          return;
        }
        Object.assign(child.data, {
          selected: toState,
          partialSelected: false,
        });
        this.refreshDown(child);
      });
    },
    dragStart(event, treeNode) {
      if (
        typeof this.allowDrag === "function" &&
        !this.allowDrag(treeNode.node)
      ) {
        event.preventDefault();
        return false;
      }
      event.dataTransfer.effectAllowed = "move";

      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData("text/plain", "");
      } catch (e) {
        console.error(e);
      }
      this.draggingNode = treeNode;
      this.$emit("node-drag-start", treeNode.node, event);
    },
    dragOver(event) {
      const dragInfo = this.dragInfo;
      const dropNode = findNearestComponent(event.target, "TreeNode");
      const oldDropNode = dragInfo.dropNode;
      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$el, "is-drop-inner");
      }
      const draggingNode = dragInfo.draggingNode;
      if (!draggingNode || !dropNode) return;

      let dropPrev = true;
      let dropInner = true;
      let dropNext = true;
      let userAllowDropInner = true;
      if (typeof this.allowDrop === "function") {
        dropPrev = this.allowDrop(draggingNode.node, dropNode.node, "prev");
        userAllowDropInner = dropInner = this.allowDrop(
          draggingNode.node,
          dropNode.node,
          "inner"
        );
        dropNext = this.allowDrop(draggingNode.node, dropNode.node, "next");
      }
      event.dataTransfer.dropEffect = dropInner ? "move" : "none";
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          this.$emit(
            "node-drag-leave",
            draggingNode.node,
            oldDropNode.node,
            event
          );
        }
        this.$emit("node-drag-enter", draggingNode.node, dropNode.node, event);
      }

      if (dropPrev || dropInner || dropNext) {
        dragInfo.dropNode = dropNode;
      }
      // TODO 这里的逻辑需要实现
      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false;
      }
      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false;
      }
      // TODO contains  需要实现
      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false;
      }
      if (
        draggingNode.node === dropNode.node ||
        draggingNode.node.contains(dropNode.node)
      ) {
        dropPrev = false;
        dropInner = false;
        dropNext = false;
      }

      const targetPosition = dropNode.$el.getBoundingClientRect();
      const treePosition = this.$el.getBoundingClientRect();

      let dropType;
      const prevPercent = dropPrev
        ? dropInner
          ? 0.25
          : dropNext
          ? 0.45
          : 1
        : -1;
      const nextPercent = dropNext
        ? dropInner
          ? 0.75
          : dropPrev
          ? 0.55
          : 0
        : 1;

      let indicatorTop = -9999;
      const distance = event.clientY - targetPosition.top;
      if (distance < targetPosition.height * prevPercent) {
        dropType = "before";
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = "after";
      } else if (dropInner) {
        dropType = "inner";
      } else {
        dropType = "none";
      }

      const iconPosition = dropNode.$el
        .querySelector("sh__expand-icon")
        .getBoundingClientRect();
      const dropIndicator = this.$refs.dropIndicator;
      if (dropType === "before") {
        indicatorTop = iconPosition.top - treePosition.top;
      } else if (dropType === "after") {
        indicatorTop = iconPosition.bottom - treePosition.top;
      }
      dropIndicator.style.top = indicatorTop + "px";
      dropIndicator.style.left = iconPosition.right - treePosition.left + "px";

      if (dropType === "inner") {
        addClass(dropNode.$el, "is-drop-inner");
      } else {
        removeClass(dropNode.$el, "is-drop-inner");
      }

      dragInfo.showDropIndicator =
        dropType === "before" || dropType === "after";
      dragInfo.allowDrop = dragInfo.showDropIndicator || userAllowDropInner;
      dragInfo.dropType = dropType;
      this.$emit("node-drag-over", draggingNode.node, dropNode.node, event);
    },
    dragEnd(event) {
      const dragInfo = this.dragInfo;
      const { draggingNode, dropType, dropNode } = dragInfo;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";

      if (draggingNode && dropNode) {
        const draggingNodeCopy = { data: draggingNode.node.data };
        if (dropType !== "none") {
          draggingNode.node.remove();
        }
        if (dropType === "before") {
          dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
        } else if (dropType === "after") {
          dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
        } else if (dropType === "inner") {
          dropNode.node.insertChild(draggingNodeCopy);
        }
        if (dropType !== "none") {
          // this.store.registerNode(draggingNodeCopy);
        }

        removeClass(dropNode.$el, "is-drop-inner");

        this.$emit(
          "node-drag-end",
          draggingNode.node,
          dropNode.node,
          dropType,
          event
        );
        if (dropType !== "none") {
          this.$emit(
            "node-drop",
            draggingNode.node,
            dropNode.node,
            dropType,
            event
          );
        }
      }
      if (draggingNode && !dropNode) {
        this.$emit("node-drag-end", draggingNode.node, null, dropType, event);
      }

      dragInfo.showDropIndicator = false;
      dragInfo.draggingNode = null;
      dragInfo.dropNode = null;
      dragInfo.allowDrop = true;
    },
  },
  render() {
    return (
      <div style="text-align: left">
        {/* {this.getView(this.root, 0)} */}
        {this.root?.children?.map((node, index) => {
          return <TreeNode key={node?.data?.name ?? index} node={node} />;
        })}
      </div>
    );
  },
};
