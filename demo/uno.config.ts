import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        mc: () => import('@kermanx/iconify-minecraft/icons.json').then(i => i.default),
      },
    }),
    presetAttributify(),
  ],
})
