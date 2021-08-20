
export const VirtualProps = {
  rowKey: {
    type: [String, Function],
    required: true
  },
  dataSources: {
    type: Array,
    required: true
  },
  dataComponent: {
    type: [Object, Function]
  },

  keeps: {
    type: Number,
    default: 30
  },
  extraProps: {
    type: Object
  },
  estimateSize: {
    type: Number,
    default: 50
  },

  direction: {
    type: String,
    default: 'vertical' // vertical || horizontal
  },
  start: {
    type: Number,
    default: 0
  },
  offset: {
    type: Number,
    default: 0
  },
  topThreshold: {
    type: Number,
    default: 0
  },
  bottomThreshold: {
    type: Number,
    default: 0
  },
  pageMode: {
    type: Boolean,
    default: false
  },
  rootTag: {
    type: String,
    default: 'div'
  },
  wrapTag: {
    type: String,
    default: 'div'
  },
  wrapClass: {
    type: String,
    default: ''
  },
  wrapStyle: {
    type: Object
  },
  itemTag: {
    type: String,
    default: 'div'
  },
  itemClass: {
    type: String,
    default: ''
  },
  itemClassAdd: {
    type: Function
  },
  itemStyle: {
    type: Object
  },
  headerTag: {
    type: String,
    default: 'div'
  },
  headerClass: {
    type: String,
    default: ''
  },
  headerStyle: {
    type: Object
  },
  footerTag: {
    type: String,
    default: 'div'
  },
  footerClass: {
    type: String,
    default: ''
  },
  footerStyle: {
    type: Object
  },
  itemScopedSlots: {
    type: Object
  },
  transitionName: {
    type: String
  }
}

export const ItemProps = {
  index: {
    type: Number
  },
  event: {
    type: String
  },
  tag: {
    type: String
  },
  horizontal: {
    type: Boolean
  },
  source: {
    type: Object
  },
  component: {
    type: [Object, Function]
  },
  uniqueKey: {
    type: [String, Number]
  },
  extraProps: {
    type: Object
  },
  scopedSlots: {
    type: Object
  }
}

export const SlotProps = {
  event: {
    type: String
  },
  uniqueKey: {
    type: String
  },
  tag: {
    type: String
  },
  horizontal: {
    type: Boolean
  }
}
