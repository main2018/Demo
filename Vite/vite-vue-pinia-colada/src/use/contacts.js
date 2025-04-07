/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-29 17:53:12
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-29 18:12:17
 * @FilePath: /code-demo/Vite/vite-vue-pinia-colada/src/use/todos.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 组件之间重用相同的查询demo
import { defineQuery, useQuery } from '@pinia/colada'
import { ref } from 'vue'
import { getAllContacts, searchContacts } from '@/api/conracts'

// 常规的可组合项, 不使用 defineQuery
// 1. ref searchText不会在组件之间共享。每个组件实例都会为自己创建一个新的 ref
// 2. searchText如果查询在不同的组件之间重复使用，则每个组件中实例化的引用与查询的键中使用的引用之间将不同步(例如每个组件的isLoading都是独立的)。
// 由于查询是全局的，因此它只实例化一次，并且只使用第一个。因此，如果我们使用这种方法，只有对第一个实例化查询的组件searchText的更改才会生效。
export const useContactSearchNormal = () => {
  const searchText = ref('')
  const query = useQuery({
    key: () => ['contacts-search', { searchText: searchText.value }],
    query: async ({ signal }) => searchContacts(searchText.value, {}, { signal }),
  })
  return { ...query, searchText }
}

// 通过defineQuery组合项将useContactSearch视为全局共享的可组合项，仅实例化一次。
// 这可确保searchText引用在使用此查询的所有组件之间共享，从而反映跨组件的普遍更改
export const useContactSearch = defineQuery(() => {
  const searchText = ref('')
  const query = useQuery({
    key: () => ['contacts-search', { searchText: searchText.value }],
    query: async ({ signal }) => searchContacts(searchText.value, {}, { signal }),
  })
  return { ...query, searchText }
})
