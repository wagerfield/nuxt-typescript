import Vue, { CreateElement, VNode } from "vue"

export default Vue.extend({
  render(h: CreateElement): VNode {
    return <h2>This is a .tsx component</h2>
  }
})
