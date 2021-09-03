## Tree component based on Vue implementation

* Support drag, check, multiple check, bigData virtual scroll, lazy load, checkStrictly, add and delete node, etc.

## Simple usage
```bash
 npm install light-vue-tree
```

```js
<template>
    <div class="base">
        <VueTree
        ref="tree1"
        draggable
        :treeData="treeData"
        @on-drop="dropNode"
        @on-selected-change="clickNode"
        />
    </div>
</template>
<script>
import { treeData } from '../../assets/treeData'
export default {
    name: 'Base',
    data () {
        return {
            treeData
        }
    },
    methods: {
        dropNode({ parentNode, targetNode, callback }) {
            console.log("dropNode", parentNode, targetNode);
            callback(targetNode);
        },
        clickNode (node) {
            console.log('clickNode', node)
        }
    }
}
</script>

```


## Advantages
* Simple and very easy to use.

* Big data list with high render performance and efficient.

* Can Customize following components (e.g. checkbox, expand icon, loading)


## Api

### props


Property | Type | Description | Default
--- | --- | ---- | ----
treeData |Array[Object] | <div style="width:200pt">The treeNodes data Array,if set it then you need not to construct children TreeNode.(key should be unique across the whole array)</div> | -
showCheckbox | boolean | Add a Checkbox before the treeNodes | false
draggable    | boolean | Whether to allow dropping on the node | false
checkStrictly | boolean | <div style="width: 200pt">Check treeNode precisely; parent treeNode and children treeNodes are not associated</div> | false
lazy          | boolean | Lazy load node data | false
load          | function |Load data asynchronously | function(node)| -
immediatelyLoad | boolean | First load data when lazy load | false
virtual       | boolean  | Disable virtual scroll when set to false | false
height      |  number    | When virtual scroll must set | -
expandedAll | boolean    | Whether to expand all treeNodes by default | -
keeps       | number     | <div style="width: 200pt">How many items you are expecting the virtual list to keep rendering in the real dom.</div> | 30
searchVal   | String | Search keywords | -


## Events
Property | Type | Description | Params
 -- | -- | -- | --
 on-selected-change |function | <div style="width: 150pt">Callback function for when the user right clicks a treeNode</div> | function(node)
 on-drop | function | Callback function for when the user drag node | function({ parentNode, targetNode, callback })
 on-checked-item    | function | Callback function for when the user check node | function({ node, vNode })
 on-checked-change  | function | Callback function for when checkbox change |function({ node, selectedData })

 Scoped Slot

 name | Description
 -- | --
 loading | customize loading component, params`({loading})`
 check   | customize check component, params`({handleClickCheckBox, selectToggle, node})`
expandIcon | customize expand icon and unexpanded icon, params`({ expanded, toggleFoldCb: toggleFold })`

## Contributions

Welcome to improve this component with any issue, pull request or code review.
## License
[MIT License](https://github.com/Create-Peace/vue-tree/blob/master/LICENSE).
