<script lang="tsx">
import Vue, { CreateElement, VNode } from "vue"

export default Vue.extend({
  render(h: CreateElement): VNode {
    return <h1>Page component with lang="tsx"</h1>
  }
})
</script>
