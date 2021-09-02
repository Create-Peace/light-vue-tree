<template>
   <div class="test-tree">
      <VueTree
        ref="lazyTree"
        lazy
        immediatelyLoad
        :load="loadMore"
       />
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