<template>
  <div>
    <h1 v-text="title"/>
    <v-tsx-file/>
    <!-- <v-tsx-lang/> -->
    <v-ts-lang/>
    <v-reverse/>
  </div>
</template>

<script lang="ts">
import { State } from "vuex-class"
import { Component, Vue } from "nuxt-property-decorator"
import vReverse from "../components/reverse.vue"
import vTsxFile from "../components/tsx-file"
// import vTsxLang from "../components/tsx-lang.vue"
import vTsLang from "../components/ts-lang.vue"

@Component({
  components: {
    vReverse,
    vTsxFile,
    // vTsxLang,
    vTsLang
  }
})
export default class extends Vue {
  @State title: string
  head() {
    return {
      title: this.title
    }
  }
}
</script>
