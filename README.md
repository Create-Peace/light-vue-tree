## Tree component based on Vue implementation

## Simple usage
```bash
 npm install VueTree
```


## Advantages
* Simple and very easy to use.

* Big data list with high render performance and efficient.


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


## Contributions

Welcome to improve this component with any issue, pull request or code review.
