/*!
 * light-vue-tree v0.1.1
 * open source under the MIT license
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('core-js/modules/es.function.name.js'), require('core-js/modules/es.number.constructor.js'), require('core-js/modules/es.array.filter.js'), require('core-js/modules/web.dom-collections.for-each.js'), require('core-js/modules/es.array.includes.js'), require('core-js/modules/es.string.includes.js'), require('core-js/modules/es.array.splice.js'), require('core-js/modules/es.array.find-index.js'), require('core-js/modules/es.array.map.js'), require('core-js/modules/es.array.concat.js'), require('core-js/modules/es.map.js'), require('core-js/modules/es.object.to-string.js'), require('core-js/modules/es.string.iterator.js'), require('core-js/modules/web.dom-collections.iterator.js'), require('core-js/modules/es.regexp.exec.js'), require('core-js/modules/es.string.split.js'), require('core-js/modules/es.string.replace.js')) :
  typeof define === 'function' && define.amd ? define(['core-js/modules/es.function.name.js', 'core-js/modules/es.number.constructor.js', 'core-js/modules/es.array.filter.js', 'core-js/modules/web.dom-collections.for-each.js', 'core-js/modules/es.array.includes.js', 'core-js/modules/es.string.includes.js', 'core-js/modules/es.array.splice.js', 'core-js/modules/es.array.find-index.js', 'core-js/modules/es.array.map.js', 'core-js/modules/es.array.concat.js', 'core-js/modules/es.map.js', 'core-js/modules/es.object.to-string.js', 'core-js/modules/es.string.iterator.js', 'core-js/modules/web.dom-collections.iterator.js', 'core-js/modules/es.regexp.exec.js', 'core-js/modules/es.string.split.js', 'core-js/modules/es.string.replace.js'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueTree = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var TREE_DATA = {
    checked: false,
    partialSelected: false,
    expanded: false,
    visible: true,
    exceptDisabledChecked: false,
    isLeaf: false,
    isSearchAdd: false,
    isSearchingAdd: false,
    level: 0,
    selected: false // 设置multiple使用

  };

  var TreeData = /*#__PURE__*/function () {
    function TreeData(data) {
      _classCallCheck(this, TreeData);

      this.data = _objectSpread2(_objectSpread2({}, TREE_DATA), data);
      this.children = [];
    }

    _createClass(TreeData, [{
      key: "setParent",
      value: function setParent(node) {
        this.parent = node;
      }
    }, {
      key: "prependChild",
      value: function prependChild(node) {
        if (this === node) return;
        node.setParent(this);
        this.children.unshift(node);
      }
    }, {
      key: "addChild",
      value: function addChild(node) {
        if (this === node) return;
        this.children.push(node);
        node.setParent(this);
      }
    }, {
      key: "isExceptDisabledChecked",
      value: function isExceptDisabledChecked() {
        return this.children && this.children.length ? this.children.every(function (child) {
          return child.data.disabled || child.data.checked || child.data.exceptDisabledChecked;
        }) : this.data.checked;
      }
    }, {
      key: "isChecked",
      value: function isChecked() {
        return this.data.checked || false;
      }
    }, {
      key: "isSelected",
      value: function isSelected() {
        return this.data.selected || false;
      }
    }, {
      key: "isExpanded",
      value: function isExpanded() {
        return this.data.expanded || false;
      }
    }, {
      key: "isPartialSelected",
      value: function isPartialSelected() {
        return this.data.partialSelected || false;
      } // TODO 这里两个方法需要合并一下

    }, {
      key: "isAllChildrenSelected",
      value: function isAllChildrenSelected() {
        // eslint-disable-next-line no-debugger
        // debugger
        return this.children.every(function (child) {
          return child.isChecked();
        });
      }
    }, {
      key: "hasChildrenPartialSelected",
      value: function hasChildrenPartialSelected() {
        return this.children.some(function (child) {
          return child.isChecked() || child.isPartialSelected();
        });
      }
    }, {
      key: "contains",
      value: function contains(target) {
        var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var walk = function walk(parent) {
          var children = parent.children || [];
          var result = false;

          for (var i = 0, j = children.length; i < j; i++) {
            var child = children[i];

            if (child === target || deep && walk(child)) {
              result = true;
              break;
            }
          }

          return result;
        };

        return walk(this);
      }
    }, {
      key: "nextSibling",
      get: function get() {
        var parent = this.parent;

        if (parent) {
          var index = parent.children.indexOf(this);

          if (index > -1) {
            return parent.children[index + 1];
          }
        }

        return null;
      }
    }, {
      key: "previousSibling",
      get: function get() {
        var parent = this.parent;

        if (parent) {
          var index = parent.children.indexOf(this);

          if (index > -1) {
            return index > 0 ? parent.children[index - 1] : null;
          }
        }

        return null;
      }
    }, {
      key: "insertBefore",
      value: function insertBefore(child, ref) {
        var index;

        if (ref) {
          index = this.children.indexOf(ref);
        }

        this.insertChild(child, index);
      }
    }, {
      key: "insertAfter",
      value: function insertAfter(child, ref) {
        var index;

        if (ref) {
          index = this.children.indexOf(ref);
          if (index !== -1) index += 1;
        }

        this.insertChild(child, index);
      }
    }, {
      key: "removeChild",
      value: function removeChild(child) {
        var dataIndex = this.children.indexOf(child);

        if (dataIndex > -1) {
          child.parent = null;
          this.children.splice(dataIndex, 1);
        }
      }
    }, {
      key: "remove",
      value: function remove() {
        var parent = this.parent;

        if (parent) {
          parent.removeChild(this);
        }
      }
    }, {
      key: "insertChild",
      value: function insertChild(child, index) {
        child.parent = this;

        if (typeof index === 'undefined' || index < 0) {
          this.children.push(child);
        } else {
          this.children.splice(index, 0, child);
        }
      }
    }]);

    return TreeData;
  }();

  var prefixCls$1 = 'vue-checkbox';
  var Checkbox = {
    name: 'Checkbox',
    props: {
      value: [Boolean],
      indeterminate: [Boolean],
      disabled: [Boolean]
    },
    methods: {
      handleClick: function handleClick() {
        this.$emit('change', this.value);
      }
    },
    render: function render() {
      var h = arguments[0];
      var value = this.value,
          disabled = this.disabled,
          indeterminate = this.indeterminate,
          handleClick = this.handleClick;
      return h("div", {
        "class": prefixCls$1,
        "on": {
          "click": handleClick
        }
      }, [indeterminate && h("div", {
        "class": "".concat(prefixCls$1, "-indeterminate")
      }), h("input", {
        "class": "".concat(prefixCls$1, "-input"),
        "domProps": {
          "checked": value
        },
        "attrs": {
          "disabled": disabled,
          "type": "checkbox"
        }
      })]);
    }
  };

  var TreeContent = {
    name: 'TreeContent',
    components: {
      Checkbox: Checkbox
    },
    props: {
      node: [Object],
      tree: [Object]
    },
    data: function data() {
      return {
        loading: false
      };
    },
    computed: {
      activeNode: function activeNode() {
        var node = this.node;
        return node.isSelected();
      },
      visibleExpand: function visibleExpand() {
        var node = this.node;
        var lazy = this.tree.lazy;
        return node.children && node.children.length || lazy && !node.data.isLeaf ? 'inline' : 'none';
      }
    },
    methods: {
      toggleFold: function toggleFold(node) {
        var _this = this;

        var _this$tree = this.tree,
            load = _this$tree.load,
            lazy = _this$tree.lazy,
            appendChildren = _this$tree.appendChildren;
        Object.assign(node.data, {
          expanded: !node.data.expanded
        });

        if (this.tree.virtual) {
          this.tree.getFlatTree();
        } // 当前没有children进行lazyLoad


        if (node.data.expanded && lazy && (!node.children || !node.children.length)) {
          if (!load) {
            throw new Error('[Tree] when lazy is true, load method must be set');
          }

          this.loading = true;
          load(node.data, function (data) {
            _this.loading = false;

            if (data && data.length) {
              appendChildren(data, node);
            } else {
              Object.assign(node.data, {
                isLeaf: true
              });
            }
          });
        }
      },
      selectToggle: function selectToggle(val, node) {
        var _this2 = this;

        console.log('val:::', val);

        if (!this.tree.checkStrictly) {
          var exceptDisabledChecked = node.isExceptDisabledChecked();
          Object.assign(node.data, {
            checked: !exceptDisabledChecked,
            exceptDisabledChecked: !exceptDisabledChecked
          });
          this.$nextTick(function () {
            _this2.tree.refreshNode(node);

            _this2.tree.$emit('on-checked-change', {
              node: node.data,
              selectedData: _this2.tree.checkedNodes
            });

            _this2.tree.$emit('on-checked-item', {
              node: node.data,
              vNode: _this2
            });
          });
        } else {
          Object.assign(node.data, {
            checked: val
          });
          this.tree.getCheckedValue(node);
          this.tree.$emit('on-checked-change', {
            node: node.data,
            selectedData: this.tree.checkedNodes
          });
          this.tree.$emit('on-checked-item', {
            node: node.data,
            vNode: this
          });
        }

        console.log('this.tree.checkedNodes:::', this.tree.checkedNodes);
      },
      clickContent: function clickContent() {
        console.log('clickContent');
        this.tree.handleClickNode(this);
      },
      handleClickCheckBox: function handleClickCheckBox(e) {
        e.stopPropagation();
      },
      renderExpandSlot: function renderExpandSlot() {
        var h = this.$createElement;
        var expandIconSlot = this.tree.$scopedSlots.expandIcon;
        var node = this.node,
            toggleFold = this.toggleFold,
            visibleExpand = this.visibleExpand;
        var expanded = node.data.expanded;
        return expandIconSlot ? h("div", {
          "style": {
            display: visibleExpand
          }
        }, [expandIconSlot({
          expanded: expanded,
          node: node,
          toggleFold: toggleFold
        })]) : h("span", {
          "class": ['icon', expanded ? 'rotate180-enter icon-expand' : 'rotate180-leave icon-unexpand'],
          "on": {
            "click": function click() {
              return toggleFold(node);
            }
          }
        }, ["\u25BC"]);
      },
      renderCheckbox: function renderCheckbox() {
        var h = this.$createElement;
        var node = this.node,
            handleClickCheckBox = this.handleClickCheckBox,
            selectToggle = this.selectToggle;
        var _this$tree2 = this.tree,
            checkboxSlot = _this$tree2.$scopedSlots.checkbox,
            showCheckbox = _this$tree2.showCheckbox;
        var _node$data = node.data,
            checked = _node$data.checked,
            partialSelected = _node$data.partialSelected,
            exceptDisabledChecked = _node$data.exceptDisabledChecked,
            disabled = _node$data.disabled;
        return showCheckbox ? checkboxSlot ? checkboxSlot({
          handleClickCheckBox: handleClickCheckBox,
          selectToggle: selectToggle,
          node: node.data
        }) : h(Checkbox, {
          "attrs": {
            "value": checked,
            "indeterminate": partialSelected,
            "disabled": disabled
          },
          "style": "margin-right: 10px;",
          "key": exceptDisabledChecked,
          "nativeOn": {
            "click": handleClickCheckBox
          },
          "on": {
            "change": function change(val) {
              return selectToggle(val, node);
            }
          }
        }) : null;
      },
      renderLoading: function renderLoading() {
        var h = this.$createElement;
        var loadingSlot = this.tree.$scopedSlots.loading;
        var loading = this.loading;
        return loading ? loadingSlot ? loadingSlot({
          loading: loading
        }) : h("div", ["\u21BB"]) : null;
      },
      renderNodeName: function renderNodeName() {
        var h = this.$createElement;
        var tree = this.tree,
            node = this.node;
        var name = node.data.name;
        var renderTreeNode = tree.renderTreeNode,
            defaultSlot = tree.$scopedSlots.default;
        return renderTreeNode ? renderTreeNode(node.data) : defaultSlot ? defaultSlot({
          node: node.data,
          treeNode: node
        }) : h("span", [name]);
      }
    },
    render: function render() {
      var h = arguments[0];
      var clickContent = this.clickContent,
          activeNode = this.activeNode,
          renderExpandSlot = this.renderExpandSlot,
          renderCheckbox = this.renderCheckbox,
          renderLoading = this.renderLoading,
          renderNodeName = this.renderNodeName;
      return h("div", {
        "class": ['node-content', {
          'active-li': activeNode
        }]
      }, [renderExpandSlot(), h("div", {
        "class": ['inner-wrap'],
        "on": {
          "click": clickContent
        }
      }, [renderCheckbox(), renderLoading(), h("div", {
        "class": 'node-name'
      }, [renderNodeName()])])]);
    }
  };

  var TreeNode = {
    name: 'TreeNode',
    components: {
      TreeContent: TreeContent
    },
    props: {
      node: [Object],
      tree: {
        type: Object
      }
    },
    computed: {
      visible: function visible() {
        return this.parentExpanded && this.node.data.expanded;
      }
    },
    methods: {
      nodeView: function nodeView(node) {
        var h = this.$createElement;
        return h(TreeContent, {
          "attrs": {
            "tree": this.tree,
            "node": node,
            "icon": this.icon
          }
        });
      },
      nodeChildren: function nodeChildren(node) {
        var h = this.$createElement;
        var tree = this.tree;
        return node.data.expanded ? h("div", [node.children && node.children.map(function (subNode, index) {
          return subNode.data.visible && h("TreeNode", {
            "attrs": {
              "tree": tree,
              "node": subNode
            },
            "key": subNode && subNode.data && subNode.data.name || index
          });
        })]) : null;
      }
    },
    render: function render() {
      var _this = this;

      var h = arguments[0];
      var node = this.node,
          nodeChildren = this.nodeChildren;
      var currentNode = this.nodeView(node);
      var _this$tree = this.tree,
          draggable = _this$tree.draggable,
          dragStart = _this$tree.dragStart,
          dragOver = _this$tree.dragOver,
          dragEnd = _this$tree.dragEnd,
          handleDrop = _this$tree.handleDrop,
          dragInfo = _this$tree.dragInfo,
          virtual = _this$tree.virtual;
      return h("div", {
        "class": ['child-node', dragInfo.dropType || ''],
        "attrs": {
          "draggable": draggable
        },
        "on": {
          "dragstart": function dragstart(e) {
            return dragStart(e, _this);
          },
          "dragover": function dragover(e) {
            return dragOver(e, _this);
          },
          "dragend": function dragend(e) {
            return dragEnd(e, _this);
          },
          "drop": handleDrop
        }
      }, [currentNode, h("transition", {
        "attrs": {
          "name": 'transition-drop'
        }
      }, [!virtual && nodeChildren(node)])]);
    }
  };

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var DIRECTION_TYPE = {
    FRONT: 'FRONT',
    // scroll to up || left
    BEHIND: 'BEHIND' // scroll to down || right

  };
  var CALC_TYPE = {
    INIT: 'INIT',
    FIXED: 'FIXED',
    DYNAMIC: 'DYNAMIC'
  };
  var LEADING_BUFFER = 2;

  var Virtual = /*#__PURE__*/function () {
    function Virtual(param, callUpdate) {
      _classCallCheck(this, Virtual);

      this.init(param, callUpdate);
    }

    _createClass(Virtual, [{
      key: "init",
      value: function init(param, callUpdate) {
        // param data
        this.param = param;
        this.callUpdate = callUpdate; // size data

        this.sizes = new Map();
        this.firstRangeTotalSize = 0;
        this.firstRangeAverageSize = 0;
        this.lastCalcIndex = 0;
        this.fixedSizeValue = 0;
        this.calcType = CALC_TYPE.INIT; // scroll data

        this.offset = 0;
        this.direction = ''; // range data

        this.range = Object.create(null);

        if (param) {
          this.checkRange(0, param.keeps - 1);
        } // benchmark test data
        // this.__bsearchCalls = 0
        // this.__getIndexOffsetCalls = 0

      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.init(null, null);
      } // return current render range

    }, {
      key: "getRange",
      value: function getRange() {
        var range = Object.create(null);
        range.start = this.range.start;
        range.end = this.range.end;
        range.padFront = this.range.padFront;
        range.padBehind = this.range.padBehind;
        return range;
      }
    }, {
      key: "isBehind",
      value: function isBehind() {
        return this.direction === DIRECTION_TYPE.BEHIND;
      }
    }, {
      key: "isFront",
      value: function isFront() {
        return this.direction === DIRECTION_TYPE.FRONT;
      } // return start index offset

    }, {
      key: "getOffset",
      value: function getOffset(start) {
        return (start < 1 ? 0 : this.getIndexOffset(start)) + this.param.slotHeaderSize;
      }
    }, {
      key: "updateParam",
      value: function updateParam(key, value) {
        var _this = this;

        if (this.param && key in this.param) {
          // if uniqueIds change, find out deleted id and remove from size map
          if (key === 'uniqueIds') {
            this.sizes.forEach(function (v, key) {
              if (!value.includes(key)) {
                _this.sizes.delete(key);
              }
            });
          }

          this.param[key] = value;
        }
      } // save each size map by id

    }, {
      key: "saveSize",
      value: function saveSize(id, size) {
        this.sizes.set(id, size); // we assume size type is fixed at the beginning and remember first size value
        // if there is no size value different from this at next comming saving
        // we think it's a fixed size list, otherwise is dynamic size list

        if (this.calcType === CALC_TYPE.INIT) {
          this.fixedSizeValue = size;
          this.calcType = CALC_TYPE.FIXED;
        } else if (this.calcType === CALC_TYPE.FIXED && this.fixedSizeValue !== size) {
          this.calcType = CALC_TYPE.DYNAMIC; // it's no use at all

          delete this.fixedSizeValue;
        } // calculate the average size only in the first range


        if (this.calcType !== CALC_TYPE.FIXED && typeof this.firstRangeTotalSize !== 'undefined') {
          if (this.sizes.size < Math.min(this.param.keeps, this.param.uniqueIds.length)) {
            this.firstRangeTotalSize = _toConsumableArray(this.sizes.values()).reduce(function (acc, val) {
              return acc + val;
            }, 0);
            this.firstRangeAverageSize = Math.round(this.firstRangeTotalSize / this.sizes.size);
          } else {
            // it's done using
            delete this.firstRangeTotalSize;
          }
        }
      } // in some special situation (e.g. length change) we need to update in a row
      // try goiong to render next range by a leading buffer according to current direction

    }, {
      key: "handleDataSourcesChange",
      value: function handleDataSourcesChange() {
        var start = this.range.start;

        if (this.isFront()) {
          start = start - LEADING_BUFFER;
        } else if (this.isBehind()) {
          start = start + LEADING_BUFFER;
        }

        start = Math.max(start, 0);
        this.updateRange(this.range.start, this.getEndByStart(start));
      } // when slot size change, we also need force update

    }, {
      key: "handleSlotSizeChange",
      value: function handleSlotSizeChange() {
        this.handleDataSourcesChange();
      } // calculating range on scroll

    }, {
      key: "handleScroll",
      value: function handleScroll(offset) {
        this.direction = offset < this.offset ? DIRECTION_TYPE.FRONT : DIRECTION_TYPE.BEHIND;
        this.offset = offset;

        if (!this.param) {
          return;
        }

        if (this.direction === DIRECTION_TYPE.FRONT) {
          this.handleFront();
        } else if (this.direction === DIRECTION_TYPE.BEHIND) {
          this.handleBehind();
        }
      } // ----------- public method end -----------

    }, {
      key: "handleFront",
      value: function handleFront() {
        var overs = this.getScrollOvers(); // should not change range if start doesn't exceed overs

        if (overs > this.range.start) {
          return;
        } // move up start by a buffer length, and make sure its safety


        var start = Math.max(overs - this.param.buffer, 0);
        this.checkRange(start, this.getEndByStart(start));
      }
    }, {
      key: "handleBehind",
      value: function handleBehind() {
        var overs = this.getScrollOvers(); // range should not change if scroll overs within buffer

        if (overs < this.range.start + this.param.buffer) {
          return;
        }

        this.checkRange(overs, this.getEndByStart(overs));
      } // return the pass overs according to current scroll offset

    }, {
      key: "getScrollOvers",
      value: function getScrollOvers() {
        // if slot header exist, we need subtract its size
        var offset = this.offset - this.param.slotHeaderSize;

        if (offset <= 0) {
          return 0;
        } // if is fixed type, that can be easily


        if (this.isFixedType()) {
          return Math.floor(offset / this.fixedSizeValue);
        }

        var low = 0;
        var middle = 0;
        var middleOffset = 0;
        var high = this.param.uniqueIds.length;

        while (low <= high) {
          // this.__bsearchCalls++
          middle = low + Math.floor((high - low) / 2);
          middleOffset = this.getIndexOffset(middle);

          if (middleOffset === offset) {
            return middle;
          } else if (middleOffset < offset) {
            low = middle + 1;
          } else if (middleOffset > offset) {
            high = middle - 1;
          }
        }

        return low > 0 ? --low : 0;
      } // return a scroll offset from given index, can efficiency be improved more here?
      // although the call frequency is very high, its only a superposition of numbers

    }, {
      key: "getIndexOffset",
      value: function getIndexOffset(givenIndex) {
        if (!givenIndex) {
          return 0;
        }

        var offset = 0;
        var indexSize = 0;

        for (var index = 0; index < givenIndex; index++) {
          // this.__getIndexOffsetCalls++
          indexSize = this.sizes.get(this.param.uniqueIds[index]);
          offset = offset + (typeof indexSize === 'number' ? indexSize : this.getEstimateSize());
        } // remember last calculate index


        this.lastCalcIndex = Math.max(this.lastCalcIndex, givenIndex - 1);
        this.lastCalcIndex = Math.min(this.lastCalcIndex, this.getLastIndex());
        return offset;
      } // is fixed size type

    }, {
      key: "isFixedType",
      value: function isFixedType() {
        return this.calcType === CALC_TYPE.FIXED;
      } // return the real last index

    }, {
      key: "getLastIndex",
      value: function getLastIndex() {
        return this.param.uniqueIds.length - 1;
      } // in some conditions range is broke, we need correct it
      // and then decide whether need update to next range

    }, {
      key: "checkRange",
      value: function checkRange(start, end) {
        var keeps = this.param.keeps;
        var total = this.param.uniqueIds.length; // datas less than keeps, render all

        if (total <= keeps) {
          start = 0;
          end = this.getLastIndex();
        } else if (end - start < keeps - 1) {
          // if range length is less than keeps, corrent it base on end
          start = end - keeps + 1;
        }

        if (this.range.start !== start) {
          this.updateRange(start, end);
        }
      } // setting to a new range and rerender

    }, {
      key: "updateRange",
      value: function updateRange(start, end) {
        this.range.start = start;
        this.range.end = end;
        this.range.padFront = this.getPadFront();
        this.range.padBehind = this.getPadBehind();
        this.callUpdate(this.getRange());
      } // return end base on start

    }, {
      key: "getEndByStart",
      value: function getEndByStart(start) {
        var theoryEnd = start + this.param.keeps - 1;
        var truelyEnd = Math.min(theoryEnd, this.getLastIndex());
        return truelyEnd;
      } // return total front offset

    }, {
      key: "getPadFront",
      value: function getPadFront() {
        if (this.isFixedType()) {
          return this.fixedSizeValue * this.range.start;
        } else {
          return this.getIndexOffset(this.range.start);
        }
      } // return total behind offset

    }, {
      key: "getPadBehind",
      value: function getPadBehind() {
        var end = this.range.end;
        var lastIndex = this.getLastIndex();

        if (this.isFixedType()) {
          return (lastIndex - end) * this.fixedSizeValue;
        } // if it's all calculated, return the exactly offset


        if (this.lastCalcIndex === lastIndex) {
          return this.getIndexOffset(lastIndex) - this.getIndexOffset(end);
        } else {
          // if not, use a estimated value
          return (lastIndex - end) * this.getEstimateSize();
        }
      } // get the item estimate size

    }, {
      key: "getEstimateSize",
      value: function getEstimateSize() {
        return this.isFixedType() ? this.fixedSizeValue : this.firstRangeAverageSize || this.param.estimateSize;
      }
    }]);

    return Virtual;
  }();

  var VirtualProps = {
    rowKey: {
      type: [String, Function],
      required: true
    },
    dataSources: {
      type: Array,
      required: true
    },
    dataComponent: {
      type: [Object, Function]
    },
    keeps: {
      type: Number,
      default: 30
    },
    extraProps: {
      type: Object
    },
    estimateSize: {
      type: Number,
      default: 50
    },
    direction: {
      type: String,
      default: 'vertical' // vertical || horizontal

    },
    start: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    topThreshold: {
      type: Number,
      default: 0
    },
    bottomThreshold: {
      type: Number,
      default: 0
    },
    pageMode: {
      type: Boolean,
      default: false
    },
    rootTag: {
      type: String,
      default: 'div'
    },
    wrapTag: {
      type: String,
      default: 'div'
    },
    wrapClass: {
      type: String,
      default: ''
    },
    wrapStyle: {
      type: Object
    },
    itemTag: {
      type: String,
      default: 'div'
    },
    itemClass: {
      type: String,
      default: ''
    },
    itemClassAdd: {
      type: Function
    },
    itemStyle: {
      type: Object
    },
    headerTag: {
      type: String,
      default: 'div'
    },
    headerClass: {
      type: String,
      default: ''
    },
    headerStyle: {
      type: Object
    },
    footerTag: {
      type: String,
      default: 'div'
    },
    footerClass: {
      type: String,
      default: ''
    },
    footerStyle: {
      type: Object
    },
    itemScopedSlots: {
      type: Object
    },
    transitionName: {
      type: String
    }
  };
  var ItemProps = {
    index: {
      type: Number
    },
    event: {
      type: String
    },
    tag: {
      type: String
    },
    horizontal: {
      type: Boolean
    },
    source: {
      type: Object
    },
    component: {
      type: [Object, Function]
    },
    uniqueKey: {
      type: [String, Number]
    },
    extraProps: {
      type: Object
    },
    scopedSlots: {
      type: Object
    }
  };
  var SlotProps = {
    event: {
      type: String
    },
    uniqueKey: {
      type: String
    },
    tag: {
      type: String
    },
    horizontal: {
      type: Boolean
    }
  };

  var Wrapper = {
    created: function created() {
      this.shapeKey = this.horizontal ? 'offsetWidth' : 'offsetHeight';
    },
    mounted: function mounted() {
      var _this = this;

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(function () {
          _this.dispatchSizeChange();
        });
        this.resizeObserver.observe(this.$el);
      }
    },
    // since componet will be reused, so disptach when updated
    updated: function updated() {
      this.dispatchSizeChange();
    },
    beforeDestroy: function beforeDestroy() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },
    methods: {
      getCurrentSize: function getCurrentSize() {
        return this.$el ? this.$el[this.shapeKey] : 0;
      },
      // tell parent current size identify by unqiue key
      dispatchSizeChange: function dispatchSizeChange() {
        this.$parent.$emit(this.event, this.uniqueKey, this.getCurrentSize(), this.hasInitial);
      }
    }
  };

  var Item = {
    name: 'virtual-list-item',
    mixins: [Wrapper],
    props: ItemProps,
    methods: {
      renderItem: function renderItem(_ref) {
        var source = _ref.source;
        var h = this.$createElement;
        return h("div", [source.name]);
      }
    },
    render: function render() {
      var h = arguments[0];
      // scopedSlots = {}, uniqueKey tag,
      var component = this.component,
          _this$extraProps = this.extraProps,
          extraProps = _this$extraProps === void 0 ? {} : _this$extraProps,
          index = this.index,
          source = this.source,
          uniqueKey = this.uniqueKey,
          tag = this.tag;

      var props = _objectSpread2(_objectSpread2({}, extraProps), {}, {
        source: source,
        rowKey: uniqueKey,
        index: index
      });

      var ItemTag = tag;
      return h(ItemTag, {
        "key": uniqueKey,
        "attrs": {
          "role": "listitem"
        }
      }, [component ? component(props) : this.renderItem(props)]);
    }
  };

  var Slot = {
    name: 'virtual-list-slot',
    mixins: [Wrapper],
    props: SlotProps,
    render: function render(h) {
      var tag = this.tag,
          uniqueKey = this.uniqueKey;
      return h(tag, {
        key: uniqueKey,
        attrs: {
          role: uniqueKey
        }
      }, this.$slots.default);
    }
  };

  var EVENT_TYPE = {
    ITEM: 'item_resize',
    SLOT: 'slot_resize'
  };
  var SLOT_TYPE = {
    HEADER: 'thead',
    // string value also use for aria role attribute
    FOOTER: 'tfoot'
  };
  var VirtualList = {
    name: 'virtual-list',
    props: VirtualProps,
    data: function data() {
      return {
        range: null,
        isBottom: false
      };
    },
    watch: {
      'dataSources.length': function dataSourcesLength(oldVal, newVal) {
        this.virtual.updateParam('uniqueIds', this.getUniqueIdFromDataSources());
        this.virtual.handleDataSourcesChange();

        if (newVal !== oldVal) {
          this.isBottom = false;
        }
      },
      keeps: function keeps(newValue) {
        this.virtual.updateParam('keeps', newValue);
        this.virtual.handleSlotSizeChange();
      },
      start: function start(newValue) {
        this.scrollToIndex(newValue);
      },
      offset: function offset(newValue) {
        this.scrollToOffset(newValue);
      }
    },
    created: function created() {
      this.isHorizontal = this.direction === 'horizontal';
      this.directionKey = this.isHorizontal ? 'scrollLeft' : 'scrollTop';
      this.installVirtual(); // listen item size change

      this.$on(EVENT_TYPE.ITEM, this.onItemResized); // listen slot size change

      if (this.$slots.header || this.$slots.footer) {
        this.$on(EVENT_TYPE.SLOT, this.onSlotResized);
      }
    },
    // set back offset when awake from keep-alive
    activated: function activated() {
      this.scrollToOffset(this.virtual.offset);
    },
    mounted: function mounted() {
      // set position
      if (this.start) {
        this.scrollToIndex(this.start);
      } else if (this.offset) {
        this.scrollToOffset(this.offset);
      } // in page mode we bind scroll event to document


      if (this.pageMode) {
        this.updatePageModeFront();
        document.addEventListener('scroll', this.onScroll, {
          passive: false
        });
      }
    },
    beforeDestroy: function beforeDestroy() {
      this.virtual.destroy();

      if (this.pageMode) {
        document.removeEventListener('scroll', this.onScroll);
      }
    },
    methods: {
      // get item size by id
      getSize: function getSize(id) {
        return this.virtual.sizes.get(id);
      },
      // get the total number of stored (rendered) items
      getSizes: function getSizes() {
        return this.virtual.sizes.size;
      },
      // return current scroll offset
      getOffset: function getOffset() {
        if (this.pageMode) {
          return document.documentElement[this.directionKey] || document.body[this.directionKey];
        } else {
          var root = this.$refs.root;
          return root ? Math.ceil(root[this.directionKey]) : 0;
        }
      },
      // return client viewport size
      getClientSize: function getClientSize() {
        var key = this.isHorizontal ? 'clientWidth' : 'clientHeight';

        if (this.pageMode) {
          return document.documentElement[key] || document.body[key];
        } else {
          var root = this.$refs.root;
          return root ? Math.ceil(root[key]) : 0;
        }
      },
      // return all scroll size
      getScrollSize: function getScrollSize() {
        var key = this.isHorizontal ? 'scrollWidth' : 'scrollHeight';

        if (this.pageMode) {
          return document.documentElement[key] || document.body[key];
        } else {
          var root = this.$refs.root;
          return root ? Math.ceil(root[key]) : 0;
        }
      },
      // set current scroll position to a expectant offset
      scrollToOffset: function scrollToOffset(offset) {
        if (this.pageMode) {
          document.body[this.directionKey] = offset;
          document.documentElement[this.directionKey] = offset;
        } else {
          var root = this.$refs.root;

          if (root) {
            root[this.directionKey] = offset;
          }
        }
      },
      // set current scroll position to a expectant index
      scrollToIndex: function scrollToIndex(index) {
        // scroll to bottom
        if (index >= this.dataSources.length - 1) {
          this.scrollToBottom();
        } else {
          var offset = this.virtual.getOffset(index);
          this.scrollToOffset(offset);
        }
      },
      // set current scroll position to bottom
      scrollToBottom: function scrollToBottom() {
        var _this = this;

        var shepherd = this.$refs.shepherd;

        if (shepherd) {
          var offset = shepherd[this.isHorizontal ? 'offsetLeft' : 'offsetTop'];
          this.scrollToOffset(offset); // check if it's really scrolled to the bottom
          // maybe list doesn't render and calculate to last range
          // so we need retry in next event loop until it really at bottom

          setTimeout(function () {
            if (_this.getOffset() + _this.getClientSize() < _this.getScrollSize()) {
              _this.scrollToBottom();
            }
          }, 3);
        }
      },
      // when using page mode we need update slot header size manually
      // taking root offset relative to the browser as slot header size
      updatePageModeFront: function updatePageModeFront() {
        var root = this.$refs.root;

        if (root) {
          var rect = root.getBoundingClientRect();
          var defaultView = root.ownerDocument.defaultView;
          var offsetFront = this.isHorizontal ? rect.left + defaultView.pageXOffset : rect.top + defaultView.pageYOffset;
          this.virtual.updateParam('slotHeaderSize', offsetFront);
        }
      },
      // reset all state back to initial
      reset: function reset() {
        this.virtual.destroy();
        this.scrollToOffset(0);
        this.installVirtual();
      },
      installVirtual: function installVirtual() {
        this.virtual = new Virtual({
          slotHeaderSize: 0,
          slotFooterSize: 0,
          keeps: this.keeps,
          estimateSize: this.estimateSize,
          buffer: Math.round(this.keeps / 3),
          // recommend for a third of keeps
          uniqueIds: this.getUniqueIdFromDataSources()
        }, this.onRangeChanged); // sync initial range

        this.range = this.virtual.getRange();
      },
      getUniqueIdFromDataSources: function getUniqueIdFromDataSources() {
        var rowKey = this.rowKey;
        return this.dataSources.map(function (dataSource) {
          return typeof rowKey === 'function' ? rowKey(dataSource) : dataSource[rowKey];
        });
      },
      // event called when each item mounted or size changed
      onItemResized: function onItemResized(id, size) {
        this.virtual.saveSize(id, size);
        this.$emit('resized', id, size);
      },
      // event called when slot mounted or size changed
      onSlotResized: function onSlotResized(type, size, hasInit) {
        if (type === SLOT_TYPE.HEADER) {
          this.virtual.updateParam('slotHeaderSize', size);
        } else if (type === SLOT_TYPE.FOOTER) {
          this.virtual.updateParam('slotFooterSize', size);
        }

        if (hasInit) {
          this.virtual.handleSlotSizeChange();
        }
      },
      // here is the rerendering entry
      onRangeChanged: function onRangeChanged(range) {
        this.range = range;
      },
      // debounceVirtualScroll: debounce(function (offset) { this.virtual.handleScroll(offset) }, 200),
      onScroll: function onScroll(evt) {
        var offset = this.getOffset();
        var clientSize = this.getClientSize();
        var scrollSize = this.getScrollSize(); // iOS scroll-spring-back behavior will make direction mistake

        if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
          return;
        } // if (this.transitionName) {
        //   this.debounceVirtualScroll(offset)
        // } else {


        this.virtual.handleScroll(offset); // }

        this.emitEvent(offset, clientSize, scrollSize, evt);
      },
      // emit event in special position
      emitEvent: function emitEvent(offset, clientSize, scrollSize, evt) {
        this.$emit('scroll', evt, this.virtual.getRange());

        if (this.virtual.isFront() && this.isBottom) {
          this.isBottom = false;
        }

        if (this.virtual.isFront() && !!this.dataSources.length && offset - this.topThreshold <= 0) {
          this.$emit('totop');
        } else if (!this.isBottom && this.virtual.isBehind() && offset + clientSize + this.bottomThreshold >= scrollSize) {
          this.isBottom = true; // 防止滚动到底部时触发两次加载\

          this.$emit('tobottom');
        }
      },
      // get the real render slots based on range data
      // in-place patch strategy will try to reuse components as possible
      // so those components that are reused will not trigger lifecycle mounted
      getRenderSlots: function getRenderSlots() {
        var h = this.$createElement;
        var slots = [];
        var _this$range = this.range,
            start = _this$range.start,
            end = _this$range.end;
        var dataSources = this.dataSources,
            rowKey = this.rowKey,
            itemClass = this.itemClass,
            itemTag = this.itemTag,
            itemStyle = this.itemStyle,
            isHorizontal = this.isHorizontal,
            extraProps = this.extraProps,
            dataComponent = this.dataComponent,
            itemScopedSlots = this.itemScopedSlots;

        for (var index = start; index <= end; index++) {
          var dataSource = dataSources[index];

          if (dataSource) {
            var uniqueKey = typeof rowKey === 'function' ? rowKey(dataSource) : dataSource[rowKey];

            if (typeof uniqueKey === 'string' || typeof uniqueKey === 'number') {
              slots.push(h(Item, {
                "props": _objectSpread2({}, {
                  index: index,
                  tag: itemTag,
                  event: EVENT_TYPE.ITEM,
                  horizontal: isHorizontal,
                  uniqueKey: uniqueKey,
                  source: dataSource,
                  extraProps: extraProps,
                  component: dataComponent,
                  scopedSlots: itemScopedSlots
                }),
                "key": uniqueKey,
                "style": itemStyle,
                "class": "".concat(itemClass).concat(this.itemClassAdd ? ' ' + this.itemClassAdd(index) : '')
              }));
            } else {
              console.warn("Cannot get the rowKey '".concat(rowKey, "' from data-sources."));
            }
          } else {
            console.warn("Cannot get the index '".concat(index, "' from data-sources."));
          }
        }

        return slots;
      } // debounceScroll: debounce(function () { this.onScroll() }, 10)

    },
    render: function render() {
      var h = arguments[0];
      var _this$$slots = this.$slots,
          header = _this$$slots.header,
          footer = _this$$slots.footer;
      var _this$range2 = this.range,
          padFront = _this$range2.padFront,
          padBehind = _this$range2.padBehind;
      var isHorizontal = this.isHorizontal,
          pageMode = this.pageMode,
          RootTag = this.rootTag,
          wrapTag = this.wrapTag,
          wrapClass = this.wrapClass,
          wrapStyle = this.wrapStyle,
          headerTag = this.headerTag,
          headerClass = this.headerClass,
          headerStyle = this.headerStyle,
          footerTag = this.footerTag,
          footerClass = this.footerClass,
          footerStyle = this.footerStyle,
          transitionName = this.transitionName,
          onScroll = this.onScroll;
      var paddingStyle = {
        padding: isHorizontal ? "0px ".concat(padBehind, "px 0px ").concat(padFront, "px") : "".concat(padFront, "px 0px ").concat(padBehind, "px")
      };
      var wrapperStyle = wrapStyle ? Object.assign({}, wrapStyle, paddingStyle) : paddingStyle;
      var ListTag = transitionName ? 'transition-group' : wrapTag;
      return h(RootTag, {
        "ref": 'root',
        "on": {
          "scroll": !pageMode && onScroll
        }
      }, [header && h(Slot, {
        "class": headerClass,
        "style": headerStyle,
        "props": _objectSpread2({}, {
          tag: headerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.HEADER
        })
      }, [header]), h(ListTag, {
        "class": wrapClass,
        "style": wrapperStyle,
        "attrs": {
          "role": 'group',
          "tag": wrapTag
        }
      }, [this.getRenderSlots()]), footer && h(Slot, {
        "class": footerClass,
        "style": footerStyle,
        "props": _objectSpread2({}, {
          tag: footerTag,
          event: EVENT_TYPE.SLOT,
          uniqueKey: SLOT_TYPE.FOOTER
        })
      }, [footer]), h("div", {
        "ref": 'shepherd',
        "style": {
          width: isHorizontal ? '0px' : '100%',
          height: isHorizontal ? '100%' : '0px'
        }
      })]);
    }
  };

  var prefixCls = 'vue-tree';
  var VirtualTreeList = {
    name: 'VirtualTreeList',
    components: {
      TreeNode: TreeNode,
      VirtualList: VirtualList
    },
    props: {
      treeNodes: [Array],
      tree: {
        type: Object
      },
      height: {
        type: Number
      },
      keeps: [Number]
    },
    computed: {
      conStyles: function conStyles() {
        return this.height ? {
          height: "".concat(this.height, "px"),
          overflow: 'scroll'
        } : {
          height: 'auto'
        };
      }
    },
    methods: {
      renderTreeNode: function renderTreeNode(_ref) {
        var node = _ref.source;
        var h = this.$createElement;
        var tree = this.tree;
        return node.data.visible && node.parent.data.expanded ? h(TreeNode, {
          "attrs": {
            "tree": tree,
            "node": node
          },
          "style": {
            marginLeft: "".concat(10 * node.data.level, "px")
          },
          "key": node && node.data && node.data.name
        }) : null;
      },
      getRowKey: function getRowKey(node) {
        return node.data.id;
      }
    },
    render: function render() {
      var h = arguments[0];
      var treeNodes = this.treeNodes,
          renderTreeNode = this.renderTreeNode,
          getRowKey = this.getRowKey,
          conStyles = this.conStyles,
          keeps = this.keeps;
      return h("virtual-list", {
        "class": "".concat(prefixCls, "-virtual-container"),
        "ref": "container",
        "style": conStyles,
        "attrs": {
          "row-key": getRowKey,
          "data-sources": treeNodes,
          "data-component": renderTreeNode,
          "keeps": keeps
        },
        "props": _objectSpread2({}, this.$attrs)
      });
    }
  };

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  var _excluded = ["children"];
  var GenTree = {
    name: 'GenTree',
    data: function data() {
      return {
        nodeMap: {}
      };
    },
    methods: {
      updateNodeChecked: function updateNodeChecked(nodeId) {
        if (!nodeId || nodeId === 'root') return;
        var res = {
          checked: this.showCheckbox,
          selected: !this.showCheckbox
        };

        if (Array.isArray(this.checkedValue) && this.checkedValue.includes(nodeId) || this.checkedValue === nodeId) {
          return res;
        }
      },
      generateTree: function generateTree(rootNode, props) {
        var _this = this;

        var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var children = rootNode.children,
            rest = _objectWithoutProperties(rootNode, _excluded);

        var tmpProps = {};

        if (rest.id === 'root') {
          // root node must expanded
          tmpProps.expanded = true;
        }

        var node = new TreeData(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, rest), props), tmpProps), {}, {
          level: level
        }, this.updateNodeChecked(rest.id)));
        this.nodeMap[rest.id] = node;
        children && children.forEach(function (child) {
          node.addChild(_this.generateTree(child, props, level + 1));
        });
        return node;
      },
      genFlatTree: function genFlatTree(node) {
        var _this2 = this;

        var children = node.children,
            _node$data = node.data,
            data = _node$data === void 0 ? {} : _node$data;
        if (!data.expanded || !children || !children.length) return [];
        return children && children.reduce(function (total, cur) {
          return total.concat(cur, _this2.genFlatTree(cur));
        }, []);
      }
    }
  }; // export { generateTree, genFlatTree }

  var findNearestComponent = function findNearestComponent(element, componentName) {
    var target = element;

    while (target && target.tagName !== 'BODY') {
      if (target.__vue__ && target.__vue__.$options.name === componentName) {
        return target.__vue__;
      }

      target = target.parentNode;
    }

    return null;
  };
  function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');

    if (el.classList) {
      return el.classList.contains(cls);
    } else {
      return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  }
  function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }

    if (!el.classList) {
      el.setAttribute('class', trim(curClass));
    }
  }
  function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    }

    if (!el.classList) {
      el.setAttribute('class', curClass);
    }
  }

  var trim = function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
  };

  var prefixClass = 'vue-tree';
  var Tree = {
    name: 'VueTree',
    components: {
      TreeNode: TreeNode
    },
    mixins: [GenTree],
    props: {
      expandedAll: {
        type: Boolean,
        default: false
      },
      checkStrictly: {
        type: Boolean,
        default: false
      },
      draggable: {
        type: Boolean,
        default: false
      },
      renderTreeNode: {
        type: Function
      },
      searchVal: {
        type: String
      },
      hasHalfelEction: {
        type: Boolean
      },
      icon: {
        type: String,
        default: 'icon-down'
      },
      showCheckbox: {
        type: Boolean,
        default: false
      },
      treeData: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      level: {
        type: Number,
        default: 0
      },
      lazy: [Boolean],
      load: [Function],
      multiple: [Boolean],
      immediatelyLoad: [Boolean],
      isEditOption: [Boolean],
      virtual: [Boolean],
      isLoading: [Boolean],
      checkedValue: [Number, String, Array]
    },
    data: function data() {
      return {
        hasSearchResult: false,
        dataMap: {},
        prefixClass: prefixClass,
        root: {},
        dragInfo: {
          showDropIndicator: false,
          draggingNode: null,
          dropNode: null,
          allowDrop: true,
          isInitData: false
        },
        activatedNode: {},
        checkedNodes: [],
        checkedNodeKeys: [],
        isSearchingAddNode: {},
        flatTreeNodes: [],
        nodeMap: {},
        syncSelectData: true
      };
    },
    created: function created() {
      var _this = this;

      if (this.lazy && this.immediatelyLoad) {
        if (!this.load) {
          throw new Error('[Tree] when lazy is true, load method must be set');
        }

        this.load(this.root, function (data) {
          var dataOrr = {
            children: data,
            id: 'root',
            expanded: true
          };
          _this.root = _this.generateTree(dataOrr, {
            expanded: !_this.lazy && _this.expandedAll
          });

          _this.initData();
        });
      }
    },
    computed: {
      localeNotFoundText: function localeNotFoundText() {
        if (typeof this.notFoundText === 'undefined') {
          return '无匹配数据';
        } else {
          return this.notFoundText;
        }
      },
      isNoData: function isNoData() {
        return this.searchVal && !this.hasSearchResult || !this.isLoading && (!this.root.children || !this.root.children.length);
      }
    },
    watch: {
      searchVal: {
        handler: function handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            this.filter(newVal);
          }
        }
      },
      treeData: {
        handler: function handler() {
          var dataOrr = {
            children: this.treeData,
            id: 'root',
            expanded: true
          };
          this.root = this.generateTree(dataOrr, {
            expanded: !this.lazy && this.expandedAll
          }); // 懒加载时 默认全部展开失效

          this.initData();

          if (this.virtual) {
            this.getFlatTree();
          }
        },
        immediate: true
      }
    },
    methods: {
      getFlatTree: function getFlatTree() {
        this.flatTreeNodes = this.genFlatTree(this.root);
      },
      removeChild: function removeChild(node) {
        Object.assign(node.data, {
          checked: false,
          selected: false
        });

        if (this.showCheckbox) {
          this.refreshNode(node);
        }

        node.parent.removeChild(node);
        this.initData();
      },
      appendChild: function appendChild(nodeData, parent) {
        var treeNode = new TreeData(_objectSpread2(_objectSpread2({}, nodeData), {}, {
          expanded: this.expandedAll
        })); // TODO this.expandedAll 是不是应该去掉

        this.nodeMap[nodeData.id] = treeNode;
        parent.addChild(treeNode);
        this.refreshDown(parent);
      },
      // 给手动添加的条目 在root 节点上添加
      prependChild: function prependChild(nodeData, parent) {
        if (nodeData instanceof TreeData) {
          parent.prependChild(nodeData);
          return;
        }

        var treeNode = new TreeData(_objectSpread2(_objectSpread2({}, nodeData), {}, {
          expanded: this.expandedAll
        })); // TODO this.expandedAll 是不是应该去掉

        this.nodeMap[nodeData.id] = treeNode;
        parent.prependChild(treeNode);
      },
      appendChildren: function appendChildren(children, parent) {
        var _this2 = this;

        children && children.forEach(function (child) {
          _this2.appendChild(child, parent);
        });
      },
      filter: function filter(keyWord) {
        var _this3 = this;

        this.hasSearchResult = false;

        var walk = function walk() {
          var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.root;
          var children = node.children;
          children && children.forEach(function (child) {
            if (!keyWord) {
              Object.assign(child.data, {
                visible: true
              });
              walk(child);
              return;
            }

            if (child.data && child.data.name && child.data.name.includes(keyWord)) {
              if (!_this3.hasSearchResult) {
                _this3.hasSearchResult = true;
              }

              Object.assign(child.data, {
                visible: true,
                expanded: !_this3.lazy || child.children && child.children.length
              });

              _this3.refreshDownVisible(child);

              _this3.refreshUpVisible(child);
            } else {
              Object.assign(child.data, {
                visible: false
              });
              walk(child);
            }
          });
        };

        walk();
      },
      refreshDownVisible: function refreshDownVisible(node) {
        var _this4 = this;

        var children = node.children;
        children && children.forEach(function (child) {
          Object.assign(child.data, {
            visible: true,
            expanded: true
          });

          _this4.refreshDownVisible(child);
        });
      },
      refreshUpVisible: function refreshUpVisible(node) {
        var parent = node.parent;
        if (!parent) return;
        Object.assign(parent.data, {
          visible: true,
          expanded: true
        });
        this.refreshUpVisible(parent);
      },
      clear: function clear() {
        var _this5 = this;

        var checkedNodes = [];
        var removeNodes = [];
        this.checkedNodes.forEach(function (node) {
          if (!node.disabled) {
            Object.assign(node, {
              checked: false,
              selected: false
            });
            var treeNode = _this5.nodeMap[node.id];
            removeNodes.push(treeNode);
          } else {
            checkedNodes.push(node);
          }
        });

        if (this.showCheckbox && !this.checkStrictly) {
          removeNodes.forEach(function (node) {
            _this5.refreshNode(node);
          });
        }

        this.checkedNodes = checkedNodes;
      },
      setCheckedNodeKeys: function setCheckedNodeKeys(values) {
        var _this6 = this;

        if (Array.isArray(values)) {
          values.forEach(function (val) {
            _this6.setNodeValue(val);
          });
        } else {
          this.setNodeValue(values);
        }

        this.updateSelectValue();
      },
      updateSelectValue: function updateSelectValue() {
        var _this7 = this;

        // 向select 更新数据
        this.$nextTick(function () {
          if (_this7.showCheckbox) {
            _this7.$emit('on-checked-change', {
              selectedData: _this7.checkedNodes
            });
          } else {
            _this7.checkedNodes.forEach(function (node) {
              _this7.$emit('on-selected-change', node);
            });
          }
        });
      },
      setNodeValue: function setNodeValue(val) {
        var node = this.nodeMap[val];
        if (!node) return;

        if (this.showCheckbox) {
          Object.assign(node.data, {
            checked: true
          });
          this.refreshNode(node);
        } else if (this.multiple) {
          Object.assign(node.data, {
            selected: true
          });
          this.checkedNodes.push(node.data);
        } else {
          Object.assign(node.data, {
            selected: true
          });
          this.checkedNodes = [node.data];
        }
      },
      removeCheckedNode: function removeCheckedNode(node, index) {
        Object.assign(node, {
          checked: false,
          selected: false
        });
        this.checkedNodes.splice(index, 1);
      },
      getCheckedNodes: function getCheckedNodes() {
        return this.checkedNodes;
      },
      initData: function initData() {
        this.recurTree(this.root);

        if (this.syncSelectData && this.treeData && this.treeData.length && this.checkedValue) {
          this.syncSelectData = false;
          this.updateSelectValue();
        }
      },
      recurTree: function recurTree(node) {
        var _this8 = this;

        if (node.isSelected() || node.isChecked() || this.hasHalfelEction && node.isPartialSelected()) {
          if (this.checkStrictly || !this.showCheckbox) {
            this.getCheckedValue(node);
          } else {
            this.refreshNode(node); //  现在改为了 先下刷新 再向上刷新
          }
        } else {
          node.children && node.children.forEach(function (child) {
            return _this8.recurTree(child);
          });
        }
      },
      refreshExpandedDown: function refreshExpandedDown(node) {
        var _this9 = this;

        var children = node.children;
        var expanded = node.isExpanded();
        children && children.forEach(function (child) {
          Object.assign(child.data, {
            expanded: expanded
          });

          _this9.refreshExpandedDown(child);
        });
      },
      getCheckedValue: function getCheckedValue(node) {
        if (!node.data || !node.data.id) return;
        var index = this.checkedNodes.findIndex(function (item) {
          return item === node.data;
        });

        if (node.isChecked() || !this.showCheckbox && node.isSelected() || this.hasHalfelEction && node.isPartialSelected()) {
          if (index < 0) {
            this.nodeMap[node.data.id] = node;
            this.checkedNodes.push(node.data);
          } else {
            this.checkedNodes.splice(index, 1, node.data);
          }
        } else if (index >= 0) {
          // 当前的节点 !(选中 || 半选) && exist
          this.checkedNodes.splice(index, 1);
        }
      },
      refreshUp: function refreshUp(node) {
        var parent = node.parent;
        this.getCheckedValue(node);
        if (!parent || parent.data.id === 'root') return;
        var toState = parent.isAllChildrenSelected();
        var partialSelected = !toState && parent.hasChildrenPartialSelected();
        var exceptDisabledChecked = parent.isExceptDisabledChecked();
        Object.assign(parent.data, {
          checked: toState,
          partialSelected: partialSelected,
          exceptDisabledChecked: exceptDisabledChecked
        });
        this.refreshUp(parent);
      },
      refreshNode: function refreshNode(node) {
        // eslint-disable-next-line no-debugger
        // debugger
        this.refreshDown(node);
      },
      refreshDown: function refreshDown(node) {
        var _this10 = this;

        var children = node.children;

        if (!children || !children.length) {
          this.refreshUp(node);
          return;
        }

        var toState = node.isChecked();
        children && children.forEach(function (child) {
          if (!child.data.disabled) {
            Object.assign(child.data, {
              checked: toState,
              partialSelected: false,
              exceptDisabledChecked: toState
            });
          } // const fromState = child.isChecked() // 状态一致不向下刷新
          // if (fromState === toState) {
          //   return
          // }


          _this10.getCheckedValue(child);

          _this10.refreshDown(child);
        });
      },
      handleDrop: function handleDrop(event) {
        event.stopPropagation();
      },
      handleClickNode: function handleClickNode(treeNode) {
        if (!this.showCheckbox) {
          this.nodeMap[treeNode.node.data.id] = treeNode.node;

          if (this.multiple) {
            Object.assign(treeNode.node.data, {
              selected: !treeNode.node.data.selected
            });
            var index = this.checkedNodes.findIndex(function (checkedNode) {
              return checkedNode === treeNode.node.data;
            });

            if (index < 0) {
              this.checkedNodes.push(treeNode.node.data);
            } else {
              this.checkedNodes.splice(index, 1);
            }
          } else {
            if (this.checkedNodes && this.checkedNodes.length) {
              var oldActivatedNode = this.checkedNodes[0];
              Object.assign(this.nodeMap[oldActivatedNode.id].data, {
                selected: false
              });
              this.checkedNodes = [];
            }

            Object.assign(treeNode.node.data, {
              selected: true
            });
            this.getCheckedValue(treeNode.node);
          }
        }

        this.activatedNode = treeNode.node;
        this.$emit('on-selected-change', treeNode.node.data);
      },
      dragStart: function dragStart(event, treeNode) {
        event.stopPropagation();

        if (typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)) {
          event.preventDefault();
          return false;
        }

        event.dataTransfer.effectAllowed = 'move'; // wrap in try catch to address IE's error when first param is 'text/plain'

        try {
          // setData is required for draggable to work in FireFox
          // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
          event.dataTransfer.setData('text/plain', '');
        } catch (e) {
          console.error(e);
        }

        this.dragInfo.draggingNode = treeNode;
        this.$emit('node-drag-start', treeNode.node, event);
      },
      dragOver: function dragOver(event) {
        event.stopPropagation();
        var dragInfo = this.dragInfo;
        var dropNode = findNearestComponent(event.target, 'TreeNode');
        var oldDropNode = dragInfo.dropNode;

        if (oldDropNode && oldDropNode !== dropNode) {
          removeClass(oldDropNode.$el, 'is-drop-inner');
        }

        var draggingNode = dragInfo.draggingNode;
        if (!draggingNode || !dropNode) return;
        var dropPrev = true;
        var dropInner = true;
        var dropNext = true;
        var userAllowDropInner = true;

        if (typeof this.allowDrop === 'function') {
          dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev');
          userAllowDropInner = dropInner = this.allowDrop(draggingNode.node, dropNode.node, 'inner');
          dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next');
        }

        event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';

        if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
          if (oldDropNode) {
            this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
          }

          this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
        }

        if (dropPrev || dropInner || dropNext) {
          dragInfo.dropNode = dropNode;
        }

        if (dropNode.node.nextSibling === draggingNode.node) {
          dropNext = false;
        }

        if (dropNode.node.previousSibling === draggingNode.node) {
          dropPrev = false;
        }

        if (dropNode.node.contains(draggingNode.node, false)) {
          dropInner = false;
        }

        if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
          dropPrev = false;
          dropInner = false;
          dropNext = false;
        }

        var targetPosition = dropNode.$el.getBoundingClientRect();
        var treePosition = this.$el.getBoundingClientRect();
        var dropType;
        var prevPercent = dropPrev ? dropInner ? 0.25 : dropNext ? 0.45 : 1 : -1;
        var nextPercent = dropNext ? dropInner ? 0.75 : dropPrev ? 0.55 : 0 : 1;
        var indicatorTop = -9999;
        var distance = event.clientY - targetPosition.top;

        if (distance < targetPosition.height * prevPercent) {
          dropType = 'before';
        } else if (distance > targetPosition.height * nextPercent) {
          dropType = 'after';
        } else if (dropInner) {
          dropType = 'inner';
        } else {
          dropType = 'none';
        }

        var iconPosition = dropNode.$el.querySelector('.icon').getBoundingClientRect();
        var dropIndicator = this.$refs.dropIndicator;

        if (dropType === 'before') {
          indicatorTop = iconPosition.top - treePosition.top;
        } else if (dropType === 'after') {
          indicatorTop = iconPosition.bottom - treePosition.top;
        }

        dropIndicator.style.top = indicatorTop + 'px';
        dropIndicator.style.left = iconPosition.right - treePosition.left + 'px';

        if (dropType === 'inner') {
          addClass(dropNode.$el, 'is-drop-inner');
        } else {
          removeClass(dropNode.$el, 'is-drop-inner');
        }

        dragInfo.showDropIndicator = dropType === 'before' || dropType === 'after';
        dragInfo.allowDrop = dragInfo.showDropIndicator || userAllowDropInner;
        dragInfo.dropType = dropType;
        this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
      },
      dragEnd: function dragEnd(event) {
        event.stopPropagation();
        var dragInfo = this.dragInfo;
        var draggingNode = dragInfo.draggingNode,
            dropType = dragInfo.dropType,
            dropNode = dragInfo.dropNode;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

        if (draggingNode && dropNode) {
          var draggingNodeCopy = draggingNode.node;

          if (dropType !== 'none') {
            draggingNode.node.remove();
          }

          if (dropType === 'before') {
            dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
          } else if (dropType === 'after') {
            dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
          } else if (dropType === 'inner') {
            dropNode.node.insertChild(draggingNodeCopy);
          }

          removeClass(dropNode.$el, 'is-drop-inner');
          this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
          this.$emit('on-drop', {
            parentNode: dropNode,
            targetNode: draggingNode.node,
            callback: function callback() {} // 兼容之前api

          });

          if (dropType !== 'none') {
            this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
          }
        }

        if (draggingNode && !dropNode) {
          this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
          this.$emit('on-drop', {
            // 兼容之前api
            parentNode: dropNode,
            targetNode: draggingNode.node,
            callback: function callback() {}
          });
        }

        dragInfo.showDropIndicator = false;
        dragInfo.draggingNode = null;
        dragInfo.dropNode = null;
        dragInfo.allowDrop = true;
        this.initData();
      },
      renderVirtualTree: function renderVirtualTree(treeNodes) {
        var h = this.$createElement;
        return h(VirtualTreeList, {
          "attrs": {
            "tree": this,
            "treeNodes": treeNodes
          },
          "props": _objectSpread2({}, this.$attrs)
        });
      },
      renderNormalTree: function renderNormalTree(children) {
        var _this11 = this;

        var h = this.$createElement;
        return children && children.map(function (childNode) {
          return childNode.data.visible && h(TreeNode, {
            "attrs": {
              "tree": _this11,
              "node": childNode
            }
          });
        });
      }
    },
    render: function render() {
      var h = arguments[0];
      var children = this.root.children;
      var localeNotFoundText = this.localeNotFoundText,
          isNoData = this.isNoData,
          flatTreeNodes = this.flatTreeNodes,
          virtual = this.virtual,
          renderNormalTree = this.renderNormalTree,
          renderVirtualTree = this.renderVirtualTree;
      var treeNodes = this.virtual ? flatTreeNodes : children;
      var _this$dragInfo$showDr = this.dragInfo.showDropIndicator,
          showDropIndicator = _this$dragInfo$showDr === void 0 ? false : _this$dragInfo$showDr;
      return h("div", {
        "class": prefixClass
      }, [virtual ? renderVirtualTree(treeNodes) : renderNormalTree(treeNodes), h("div", {
        "style": {
          display: isNoData ? 'block' : 'none'
        }
      }, [h("ul", {
        "class": "".concat(prefixClass, "-not-found")
      }, [h("li", [localeNotFoundText])])]), h("div", {
        "ref": "dropIndicator",
        "class": "drop-indicator",
        "style": {
          display: showDropIndicator ? 'block' : 'none'
        }
      })]);
    }
  };

  Tree.install = function (Vue) {
    Vue.component(Tree.name, Tree);
  };

  return Tree;

})));
