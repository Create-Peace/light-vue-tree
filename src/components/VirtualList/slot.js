import Wrapper from './wrapper'
import { SlotProps } from './props'

export default {
  name: 'virtual-list-slot',
  mixins: [Wrapper],
  props: SlotProps,

  render (h) {
    const { tag, uniqueKey } = this

    return h(tag, {
      key: uniqueKey,
      attrs: {
        role: uniqueKey
      }
    }, this.$slots.default)
  }
}
