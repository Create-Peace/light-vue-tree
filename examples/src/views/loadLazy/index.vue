<template>
   <div class="test-tree">
      <VueTree
        ref="lazyTree"
        lazy
        immediatelyLoad
        :load="loadMore"
       >
       <template #loading="{loading}">
         <div v-if="loading" id="circle"></div>
       </template>
       </VueTree>
    </div>
</template>
<script>
import Mock from '../../utils/mock'
export default {
  name: 'LazyLoad',
  methods: {
    loadMore(node, resolve) {
      const level = node.level? node.level + 1 : 1
      setTimeout(() => {
        if (level < 3) {
          const { data } = Mock.mock({
            'data|1-3': [{
              'id': /[a-z]{2}[A-Z]{2}[0-9]/,
              'name': "@ctitle(4,6)",
              level: level
            }]
          })
          resolve(data)
        } else {
          resolve([])
        }
      }, 1200)
    }
  }
}

</script>
<style>
#circle{
    display: inline-block;
    margin: 20px auto;
    width: 10px;
    height: 10px;
    border: 2px white solid;
    border-left-color: #ff5500;
    border-right-color:#0c80fe;
    border-radius: 100%;
    animation: loading1 1s infinite linear;
}
@keyframes loading1{
    from{transform: rotate(0deg)}to{transform: rotate(360deg)}
}
</style>