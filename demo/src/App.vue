<script setup lang="ts">
import { icons } from '@kermanx/iconify-minecraft'
import { useBreakpoints, breakpointsTailwind, useVirtualList, useWindowSize, useClipboard } from '@vueuse/core'
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'

const allEntries = Object.entries(icons.icons).sort((a, b) => a[0].localeCompare(b[0]))
type IconEntry = typeof allEntries[0]
const fuse = new Fuse(allEntries, {
  keys: ['0'],
  includeScore: true,
  includeMatches: true,
  threshold: 0.3,
})

const searching = ref('')
const hideLabel = ref(false)
const kindOnly = ref<'item' | 'block' | null>(null)

const filteredEntries = computed(() => {
  return (searching.value ? fuse.search(searching.value).map((result) => result.item) : allEntries)
    .filter(([iconName]) => {
      if (kindOnly.value === 'item') return iconName.endsWith('-item')
      if (kindOnly.value === 'block') return iconName.endsWith('-block')
      return true
    })
})

const breakpoints = useBreakpoints(breakpointsTailwind)
const windowSize = useWindowSize()
const colNum = computed(() => {
  if (hideLabel.value) return Math.floor((windowSize.width.value - 68) / 48)
  if (breakpoints.xl.value) return 3
  if (breakpoints.lg.value) return 2
  return 1
})

const groupedFilteredEntries = computed(() => {
  const result: IconEntry[][] = []
  for (let i = 0; i < filteredEntries.value.length; i += colNum.value) {
    result.push(filteredEntries.value.slice(i, i + colNum.value))
  }
  return result
})

const { list, containerProps, wrapperProps } = useVirtualList(
  groupedFilteredEntries,
  {
    itemHeight: 48,
    overscan: 10,
  }
)

const { copy } = useClipboard()
</script>

<template>
  <div h-full flex flex-col>
    <h1 mb-3> Iconify Minecraft <span ml-3 p-5 i-mc-painting />  </h1>
    <div flex flex-wrap gap-4 items-center>
      <div ><input type="text" v-model="searching" placeholder="Search icon" p-1 /></div>
      <div flex gap-6>
        <div><input type="checkbox" v-model="hideLabel" mr--1 /> Hide label </div>
        <div><input type="checkbox" :checked="kindOnly === 'item'" @change="ev => (kindOnly = (ev.target as any).checked ? 'item' : null)"
            mr--1 /> Item only </div>
        <div><input type="checkbox" :checked="kindOnly === 'block'" mr--1  @change="ev => (kindOnly = (ev.target as any).checked ? 'block' : null)" /> Block only </div>
      </div>
    </div>
    <div v-bind="containerProps" flex-grow my-3 p-2 border="2 solid #777 rounded-md" class="icons-container">
      <div v-bind="wrapperProps" w-full>
        <div v-for="row in list" grid h-8 py-2 w-full :style="`grid-template-columns: repeat(${colNum}, 1fr);`">
          <div v-for="[iconName, { body }] in row.data" v-memo="iconName" :key="iconName" flex items-center gap-4 w-fit v-tooltip="iconName" @click="copy(iconName)">
            <svg v-html="body" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="32px" height="32px"></svg>
            <div v-if="!hideLabel">{{ iconName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  border: 2px solid #777;
  border-radius: 6px;
}
.icons-container {
  scrollbar-color: #777 transparent;
  width: calc(100vw - 68px);
}
</style>