# Nuxt TypeScript Module

```bash
yarn add nuxt-typescript --dev
```

Add `nuxt-typescript` to the Nuxt config `modules` array:

```js
// nuxt.config.js
module.exports = {
  modules: ['nuxt-typescript']
}
```

Configure `tsconfig.json` with the following settings:

```json
{
  "compilerOptions": {
    "target": "es2015",
    "module": "es2015",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "allowJs": true,
    "removeComments": true,
    "experimentalDecorators": true
  }
}
```

Now you can use TypeScript in your Nuxt project:

```ts
// core/utils.ts
export function reverseString(value: string) {
  return value
    .split('')
    .reverse()
    .join('')
}
```

```ts
// store/index.ts
export const state = () => ({
  title: 'Nuxt + TypeScript'
})
```

```html
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
```

**Check out the [working example](example).**

## Credits

Implementation taken from the [Nuxt TypeScript example][example] created by [John Lindquist][johnlindquist].

## Authors

* [Matthew Wagerfield][wagerfield]
* [John Lindquist][johnlindquist]

## License

[MIT][mit]

[example]: https://github.com/nuxt/nuxt.js/tree/dev/examples/typescript
[johnlindquist]: https://github.com/johnlindquist
[wagerfield]: https://github.com/wagerfield
[mit]: https://opensource.org/licenses/MIT
