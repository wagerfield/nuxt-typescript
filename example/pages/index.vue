<template>
  <div>
    <h1 v-text="title"/>
    <v-ts-file/>
    <v-tsx-file/>
    <v-ts-lang/>
    <v-tsx-lang/>
    <ul>
      <li><nuxt-link to="/file-ts">File with .ts extension</nuxt-link></li>
      <li><nuxt-link to="/file-tsx">File with .tsx extension</nuxt-link></li>
      <li><nuxt-link to="/lang-ts">Page with lang="ts"</nuxt-link></li>
      <li><nuxt-link to="/lang-tsx">Page with lang="tsx"</nuxt-link></li>
    </ul>
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
