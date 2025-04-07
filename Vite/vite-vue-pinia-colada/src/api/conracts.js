/*
 * @Author: wangpan pan.wang@ushow.media
 * @Date: 2025-03-29 13:38:03
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-29 17:11:55
 * @FilePath: /code-demo/Vite/vite-vue-pinia-colada/src/api/conracts.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { mande } from 'mande'

export const contacts = mande('http://localhost:7777/contacts', {})

export async function getAllContacts(options) {
  // await new Promise(resolve => setTimeout(resolve, 2000))
  return contacts.get('/', options)
}
export async function getContactById(id, options) {
  return contacts.get(id, options)
  
}
export function createContact(contact, options) {
  return contacts.post(
    '/',
    {
      photoURL: `https://i.pravatar.cc/150?u=${contact.firstName}${contact.lastName}`,
      ...contact,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    options,
  )
}
export async function updateContact(
  contact,
  options,
) {
  return contacts.patch(`/${contact.id}`, contact, options)
}

export async function patchContact(contact) {
  return contacts.patch(`/${contact.id}`, contact)
}
export function searchContacts(
  searchText,
  {
    page,
    perPage,
    ...filterInfo
  },
  options,
) {
  const query = filterInfo
  if (searchText) query.q = searchText
  if (page) query._page = page
  if (perPage) query._limit = perPage

  return contacts.get('/', { query, responseAs: 'response', ...options }).then(async (res) => ({
    total: Number(res.headers.get('x-total-count')) || 0,
    results: await res.json(),
  }))
}