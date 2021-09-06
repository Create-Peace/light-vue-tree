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