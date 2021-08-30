<template>
  <div id="app">
     <div id="nav">
      <router-link to="/">home</router-link>
      <span class="line">|</span>
      <router-link to="/fixed-size">fixed size</router-link>
      <span class="line">|</span>
      <router-link to="/dynamic-size">dynamic size</router-link>
      <span class="line">|</span>
      <router-link to="/horizontal">horizontal</router-link>
      <span class="line">|</span>
      <router-link to="/infinite-loading">infinite loading</router-link>
      <span class="line">|</span>
      <router-link to="/keep-state">keep state</router-link>
      <span class="line">|</span>
      <router-link to="/page-mode">page mode</router-link>
      <span class="line">|</span>
      <router-link to="/chat-room">chat room</router-link>
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
@transition-time        : .2s;
@primary-color: #409eff;
@background-color-base: #F1F3F5;
@normal-color: #1F2E4D;
@unimportance-color: #b7beca;
@border-radius-small    : 3px;

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

.icon {
  display: inline-block;
  padding: 2px;
  font-size: 12px;
  // background: #eee;
  cursor: pointer;
  margin-right: 4px;
}

.motion-common() {
    animation-duration: .3s;
    animation-fill-mode: both;
}

.move-motion(@className, @keyframeName) {
    .make-motion(@className, @keyframeName);
    .@{className}-enter-active {
        animation-timing-function: ease-in-out;
    }
    .@{className}-leave-active {
        animation-timing-function: ease-in-out;
    }
}

.make-motion(@className, @keyframeName) {
    .@{className}-enter-active {
        .motion-common();
        animation-play-state: paused;
    }
    .@{className}-leave-active {
        .motion-common();
        animation-play-state: paused;
    }
    .@{className}-enter-active {
        animation-name: ~"@{keyframeName}In";
        animation-play-state: running;
    }
    .@{className}-leave-active {
        animation-name: ~"@{keyframeName}Out";
        animation-play-state: running;
    }
}

.move-motion(transition-drop, shTransitionDrop);

@keyframes shTransitionDropIn {
    0% {
        opacity: 0;
        transform: scaleY(0.8);
    }
    100% {
        opacity: 1;
        transform: scaleY(1);
    }
}

@keyframes shTransitionDropOut {
    0% {
        opacity: 1;
        transform: scaleY(1);
    }
    100% {
        opacity: 0;
        transform: scaleY(0.8);
    }
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

.vue-tree {
  user-select: none;
  position: relative;
  .drop-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: @primary-color;
  }
  .child-node {
    padding-left: 22px;
    line-height: 28px;
    cursor: pointer;
    .node-content {
      width: 100%;
      position: relative;
      display: flex;
      padding-left: 22px;
      .icon {
        position: absolute;
        display: inline-block;
        left: 0px;
        &-expand {
          color: @normal-color;
        }
        &-unexpand {
          color: @unimportance-color;
        }
      }
      .inner-wrap {
        padding-left: 2px;
        display: flex;
        align-items: center;
        border-radius: @border-radius-small;
        border: 1px solid transparent;
      }
      .drop-wrap {
        border-color: @primary-color;
      }
      .drop-inner {
        border-bottom: 1px solid @primary-color;
      }
    }
    .active-li {
      .inner-wrap {
        background: @background-color-base;
      }
    }
    .inset {
      cursor: move;
    }
    .disabled {
      cursor: no-drop;
    }
  }
  .add-node {
    cursor: pointer;
  }
.is-drop-inner > .node-content > .inner-wrap > .node-name {
  background-color: @primary-color;
  color: #fff;
}
}
.vue-checkbox {
  position: relative;
  width: 13px;
  height: 13px;
  &-input {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    background: transparent
  }
  &-indeterminate {
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #0075ff;
    z-index: 4;
    border-radius: 3px;
    &:after {
      position: absolute;
      content: '';
      width: 100%;
      height: 2px;
      background: #fff;;
      top: 50%;
      left: 0;
    }
  }
}

</style>
