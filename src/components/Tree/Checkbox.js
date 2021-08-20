

const prefixCls = 'vue-checkbox'

export default {
  name: 'Checkbox',
  props: {
    value: [Boolean],
    indeterminate: [Boolean],
    disabled: [Boolean]
  },
  methods: {
    handleClick () {
      this.$emit('change', this.value)
    }
  },
  render () {
    const { value, disabled, indeterminate, handleClick } = this
    return (
      <div class={prefixCls} onClick={handleClick}>
        { indeterminate && <div class={`${prefixCls}-indeterminate`}></div> }
        <input class={`${prefixCls}-input`} checked={value} disabled={disabled} type="checkbox" />
      </div>
    )
  }
}
