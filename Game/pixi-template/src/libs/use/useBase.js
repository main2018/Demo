/*
 * @Author: whb
 * @Date: 2022-08-24 11:12:52
 * @LastEditors: wangpan pan.wang@ushow.media
 * @LastEditTime: 2025-03-28 17:57:49
 * @Description: Do not edit
 */
import { getCurrentInstance, computed, toRefs } from "vue";
export default function () {
  const internalInstance = getCurrentInstance();
  const ctx = internalInstance.appContext.config.globalProperties;
  
  return {
    ctx,
  };
}
