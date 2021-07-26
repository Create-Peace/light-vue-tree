<template>
  <div id="app">
    <Tree />
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
export default {
  name: 'App',
  components: {
    Tree
  },
  methods: {
    handleClick (data) {
      console.log(data)
    },
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
