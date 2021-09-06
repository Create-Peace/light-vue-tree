import Wrapper from './wrapper'
import { SlotProps } from './props'

export default {
  name: 'virtual-list-slot',
  mixins: [Wrapper],
  props: SlotProps,

  render () {
    const { tag, uniqueKey } = this
    const Wrapper = tag || 'div'


    return <Wrapper key={uniqueKey} role={uniqueKey} >
      {this.$slots.default}
    </Wrapper>
  }
}
