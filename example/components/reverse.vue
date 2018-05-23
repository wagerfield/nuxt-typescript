<template>
  <div>
    <input v-model="input"/>
    <pre v-text="reversed"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { reverseString } from "../core/utils"

@Component
export default class extends Vue {
  input = "TypeScript"
  get reversed() {
    return reverseString(this.input)
  }
}
</script>
