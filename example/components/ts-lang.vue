<script lang="ts">
import Vue, { CreateElement, VNode } from "vue"

export default Vue.extend({
  render(h: CreateElement): VNode {
    return h("h2", 'This is a .vue component with lang="ts"')
  }
})
</script>
