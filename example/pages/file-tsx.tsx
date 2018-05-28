import Vue, { CreateElement, VNode } from "vue"

export default Vue.extend({
  render(h: CreateElement): VNode {
    return <h1>Page component .tsx extension</h1>
  }
})
