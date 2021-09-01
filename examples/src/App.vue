<template>
  <div id="app">
     <div id="nav">
      <router-link to="/">base</router-link>
      <span class="line">|</span>
      <router-link to="/check">check</router-link>
      <span class="line">|</span>
      <router-link to="/checkStrictly">checkStrictly</router-link>
      <span class="line">|</span>
      <router-link to="/loadLazy">loadLazy</router-link>
      <span class="line">|</span>
      <router-link to="/custom">custom</router-link>
      <span class="line">|</span>
      <router-link to="/virtualTree">virtualTree</router-link>
    </div>
    <router-view />
  
    <!-- <Tree 
      :tree-data="demeData" 
      expandedAll
      show-checkbox 
      hasHalfelEction
      draggable
      @on-checkbox-change="handleChangeCheckBox" 
      @on-checked-item="handleChangeItem">
    </Tree> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      visible: true,
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
            checked: true,
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
  watch: {
    visible: {
      handler: function(val) {
        if (!val) {
          this.genBaseData()
        } else {
          this.genBaseData()
        }
      }
    }
  },
  created () {
    // this.genBaseData()
    console.log(this.baseData)
  },
  methods: {
    toggleVisible () {
      this.visible = !this.visible
    },
    genBaseData () {
        // 
        // const res = Mock.mock({
        //   'data|10': [
        //     {const start = Math.round(Math.random())
        // const end = start + Math.round(Math.random() * 4)
        //       'id': /[a-z]{2}[A-Z]{2}[0-9]/,
        //       'status|1': ['success', 'fail'],
        //       'tags|1-2': ['success', 'normal', 'warning', 'error'].slice(start, end),
        //       'time': '@date("yyyy-MM-dd")',
        //       'name': "@ctitle(4,6)",
        //     }
        //   ]
        // })
        // this.baseData = res.data
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
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

</style>
<style lang="less">


#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #9b4cca;
  color: #fff;
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 1em;
  white-space: nowrap;
  overflow-x: auto;
  z-index: 2;
  @media (max-width: 640px) {
    padding: 0;
    position: relative;
    background-color: unset;
    color: unset;
    height: unset;
    padding-left: unset;
    align-items: unset;
  }
  a {
    display: inline-block;
    color: #fff;
    @media (max-width: 640px) {
      margin-bottom: 0;
      margin-right: 1em;
      color: #9b4dca;
    }
  }
  .line {
    margin: 0 1em;
    font-size: 14px;
    color: pink;
    @media (max-width: 640px) {
      display: none;
    }
  }
  .router-link-exact-active,
  .router-link-exact-active:hover {
    color: inherit;
    cursor: default;
    text-decoration: underline;
    @media (max-width: 640px) {
      border-bottom: 1px solid;
      border-color: #606c76;
      text-decoration: none;
    }

  }
}

.frame {
  // position: absolute;
  height: 300px;
  background: #eee;

}









.el-tree__drop-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #409eff;
}







</style>
