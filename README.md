# @kermanx/iconify-minecraft

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Minecraft icons for [Iconify](https://iconify.design/).

> [!warning]
>
> The Minecraft icons are belong to Mojang Studios. If there is any infringement, please contact us for removal.

## Usage

`uno.config.ts`:

```ts
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      collections: {
        mc: () => import('@kermanx/iconify-minecraft/icons.json').then(i => i.default),
      },
    }),
    // ...
  ],
})
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [_Kerman](https://github.com/KermanX)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kermanx/iconify-minecraft?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@kermanx/iconify-minecraft
[npm-downloads-src]: https://img.shields.io/npm/dm/@kermanx/iconify-minecraft?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@kermanx/iconify-minecraft
[license-src]: https://img.shields.io/github/license/KermanX/iconify-minecraft.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/KermanX/iconify-minecraft/blob/main/LICENSE
