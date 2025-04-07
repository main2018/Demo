<template>
  <section>
    <p v-if="isPending">
      Loading...
    </p>
    <div v-else>
      contact: {{ contact }}
    </div>
    <p :style="{ opacity: isLoadingQuery ? 1 : 0 }">Loading Query...</p>
    <div class="actions">
      <button @click="refresh">refresh</button>
      <button @click="refetch">refetch</button>
      <button @click="num+=1;updateContact({...contact, firstName: `new name_${num}`})">updateContact</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { patchContact, getContactById } from '@/api/conracts'

const queryCache = useQueryCache()
let num = ref(1)
// const id = route.params.id
const id = 1
const { data: contact, refresh, refetch, isPending, isLoading: isLoadingQuery } = useQuery({
  // unique key for the query in the cache
  key: () => ['contacts', id],
  query: ({ signal }) => getContactById(id, { signal }),
  staleTime: 5_000, // 缓存数据过期时间（毫秒），0表示不缓存
  gcTime: 300_000, // 缓存数据垃圾回收时间（毫秒）默认 5分钟，0表示不垃圾回收
})

const { mutate: updateContact, isLoading } = useMutation({
  mutation: patchContact,
  async onSettled(updatedContact, error, contact) {
    console.log(updatedContact, error, contact, 666666);
    
    // 更新完成后，使缓存中的相关查询失效（触发自动重新获取），已经正在进行的查询请求会被取消
    await queryCache.invalidateQueries({ key: ['contacts', contact.id] })
  },
})
</script>

<style lang="scss" scoped>
.actions {
  button{
    margin: 0 10px;
  }
}
</style>
