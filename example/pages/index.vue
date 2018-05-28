<template>
  <div>
    <h1 v-text="title"/>
    <v-ts-file/>
    <v-tsx-file/>
    <v-ts-lang/>
    <v-tsx-lang/>
    <v-reverse/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { State } from "vuex-class"
import vReverse from "../components/reverse.vue"
import vTsFile from "../components/ts-file"
import vTsLang from "../components/ts-lang.vue"
import vTsxFile from "../components/tsx-file"
import vTsxLang from "../components/tsx-lang.vue"

@Component({
  components: {
    vReverse,
    vTsFile,
    vTsLang,
    vTsxFile,
    vTsxLang
  }
})
export default class extends Vue {
  @State public title!: string

  public head() {
    return {
      title: this.title
    }
  }
}
</script>
