<template>
  <div>
    <h1 v-text="title"/>
    <input v-model="input"/>
    <pre v-text="reversed"/>
  </div>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { Component, Vue } from 'nuxt-property-decorator'
import { reverseString } from '~/core/utils'

@Component
export default class extends Vue {

  input = 'TypeScript'

  @State title

  head() {
    return {
      title: this.title
    }
  }

  get reversed() {
    return reverseString(this.input)
  }
}
</script>
