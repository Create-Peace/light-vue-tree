<template>
  <div id="app">
    <Tree :tree-data="demeData" 
      expandedAll
      show-checkbox 
      hasHalfelEction
      draggable
      @on-checkbox-change="handleChangeCheckBox" 
      @on-checked-item="handleChangeItem">
      <!-- <template v-slot="{node}">
        <span>{{ node.data.name }}</span>
        <span class="icon">+</span>
        <span class="icon">-</span>
      </template> -->
    </Tree>
    <!-- <List :data="baseData" bordered /> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
     <!-- <Dropdown @on-click="handleClick" trigger="click">
        <DropdownMenu transfer slot="dropdownList">
          <DropdownItem data="上海">上海</DropdownItem>
          <DropdownItem data="北京">北京</DropdownItem>
          <DropdownItem data="西安">西安</DropdownItem>
        </DropdownMenu>
      </Dropdown> -->
  </div>
</template>

<script>
import Tree from './components/Tree'
import Mock from './utils/mock'
export default {
  name: 'App',
  components: {
    Tree
  },
  data () {
    return {
      baseData: [],
      demeData: [
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
            selected: true,
            children: [
              {
                name: "四级 1-1-1-1",
                id: "4",
                children: [],
                disabled: false,
              },
              {
                name: "四级 1-1-1-2",
                id: "5",
                children: [],
                // selected: true,
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
]
    }
  },
  created () {
    this.genBaseData()
  },
  methods: {
    genBaseData () {
        const start = Math.round(Math.random())
        const end = start + Math.round(Math.random() * 4)
        const res = Mock.mock({
          'data|10': [
            {
              'id': /[a-z]{2}[A-Z]{2}[0-9]/,
              'status|1': ['success', 'fail'],
              'tags|1-2': ['success', 'normal', 'warning', 'error'].slice(start, end),
              'time': '@date("yyyy-MM-dd")',
              'name': "@ctitle(4,6)",
            }
          ]
        })
        this.baseData = res.data
      },
    handleClick (data) {
      console.log(data)
    },
    handleChangeCheckBox(val1, val2) {
      console.log(val1, val2)
    },
    handleChangeItem(val) {
      console.log(val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="less">
@transition-time        : .2s;

.icon {
  display: inline-block;
  padding: 2px;
  font-size: 12px;
  background: #eee;
  cursor: pointer;
  margin-right: 4px;
}

.rotate-motion(@className, @deg) {
  .transform {
    transform-origin: center;
    transition: @transition-time;
  }
  .@{className}-enter {
    transform: rotate(@deg);
    .transform;
  }
  .@{className}-leave {
    transform: rotate(0deg);
    .transform;
  }
}
.rotate-motion(rotate90, 90deg);
.rotate-motion(rotate180, 180deg);
.el-tree__drop-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #409eff;
}



.tree {
  position: relative;
  .tree-node {
      padding: 4px 0;
     .tree-node-name {
      display: inline-block;
    }
  }
  .is-drop-inner > .tree-node-content > .tree-node-name {
    background-color: #409eff;
    color: #fff;
  }
}
</style>
