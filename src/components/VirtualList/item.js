/**
 * item and slot component both use similar wrapper
 * we need to know their size change at any time
 */

import { ItemProps } from './props'
import Wrapper from './wrapper'

// wrapping for item
export default {
  name: 'virtual-list-item',
  mixins: [Wrapper],
  props: ItemProps,
  methods: {
    renderItem ({ source }) {
      return (<div>{source.name}</div>)
    }
  },

  render () {
    // scopedSlots = {}, uniqueKey tag,
    const { component, extraProps = {}, index, source, uniqueKey, tag } = this
    const props = {
      ...extraProps,
      source,
      rowKey: uniqueKey,
      index
    }
    const ItemTag = tag
    return (
      <ItemTag key={uniqueKey} role="listitem">
        { component ? component(props) : this.renderItem(props) }
      </ItemTag>
    )
  }
}
