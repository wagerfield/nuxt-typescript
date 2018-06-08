# Nuxt TypeScript Module

Lightening fast type checking and linting with [TypeScript][typescript] and [TSLint][tslint].

```bash
yarn add nuxt-typescript typescript tslint --dev
```

Add `nuxt-typescript` to Nuxt's config:

```js
// nuxt.config.js
module.exports = {
  modules: ["nuxt-typescript"]
}
```

Configure `tsconfig.json` with the following settings:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "strict": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "experimentalDecorators": true
  }
}
```

Now you can use TypeScript in your Nuxt project:

```ts
// core/utils.ts
export function reverseString(value: string) {
  return value
    .split("")
    .reverse()
    .join("")
}
```

```ts
// store/index.ts
export const state = () => ({
  title: "Nuxt + TypeScript"
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

  @State public title: string

  public input = 'TypeScript'

  head() {
    return {
      title: this.title
    }
  }

  get reversed(): string {
    return reverseString(this.input)
  }
}
</script>
```

**Check out the [working example](example).**

## TSLint

If you want to use [TSLint][tslint] to lint your TypeScript files, simply create a `tslint.json` file at the root of your project:

```json
{
  "defaultSeverity": "warning",
  "extends": ["tslint:latest"]
}
```

It is recommended that you set `defaultSeverity` to "warning" so that linting errors can be distinguished from type errors.

## Options

Options can be passed to `nuxt-typescript` via a `typescript` object in the Nuxt config file:

```js
// nuxt.config.js
module.exports = {
  modules: ["nuxt-typescript"],
  typescript: {
    formatter: "default"
  }
}
```

| Option      | Type      | Default         | Description                                               |
| ----------- | --------- | --------------- | --------------------------------------------------------- |
| `tsconfig`  | `String`  | "tsconfig.json" | Path to TypeScript config file.                           |
| `tslint`    | `String`  | "tslint.json"   | Path to TSLint config file.                               |
| `formatter` | `String`  | "codeframe"     | TSLint formatter to use. Either "default" or "codeframe". |
| `parallel`  | `Boolean` | `true`          | Enable/disable `thread-loader` for production builds.     |

## Credits

Thanks to [Evan You][evanyou] and [Kevin Petit][kevinpetit] for their work on the [Vue CLI TypeScript plugin][vue-cli-typescript] from which a lot of the implementation is based.

Thanks to [John Lindquist][johnlindquist] for creating the [Nuxt TypeScript example][nuxt-typescript-example] that got this project started.

## Author

[Matthew Wagerfield][wagerfield]

## License

[MIT][mit]

[nuxt]: https://nuxtjs.org
[tslint]: https://palantir.github.io/tslint
[typescript]: http://www.typescriptlang.org
[nuxt-typescript-example]: https://github.com/nuxt/nuxt.js/tree/dev/examples/typescript
[vue-cli-typescript]: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript
[evanyou]: https://github.com/yyx990803
[johnlindquist]: https://github.com/johnlindquist
[kevinpetit]: https://github.com/kvpt
[wagerfield]: https://github.com/wagerfield
[mit]: https://opensource.org/licenses/MIT
