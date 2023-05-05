import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useCtgyStore } from '@/pstore/ctgy'
import type { SecondCtgy, ThirdCtgy } from '@/pstore/ctgy/state'

export const ctgyStore = useCtgyStore()

// service class for First to Third category
class FirstToThirdCtgy {
  static ctgyStoreRefs = storeToRefs(ctgyStore)
  static firstCtgyActiveIndex: Ref<number> = ref(0)

  static async getFirstCtgys() {
    await ctgyStore.findFirstCtgyList()
    FirstToThirdCtgy.#storeFirstCtgy(0)
  }

  static #storeFirstCtgy(index: number) {
    const firstCtgy = ctgyStore.firstCtgyList.find(firstCtgy => firstCtgy.firstctgyId === index + 1)
    ctgyStore.storeFirstCtgy(firstCtgy!)
  }

  static setActiveIndex(index: number) {
    FirstToThirdCtgy.firstCtgyActiveIndex.value = index
    FirstToThirdCtgy.#storeFirstCtgy(index)
  }

  // get second and third category list
  static getSecThrdCtgys() {
    watchEffect(async () => {
      await ctgyStore.findSecThrdCtgyList(this.firstCtgyActiveIndex.value + 1)
    })
  }

  static getAllCtgys() {
    FirstToThirdCtgy.getFirstCtgys()
    FirstToThirdCtgy.getSecThrdCtgys()
  }

  static navigateToBooks(thirdCtgy: ThirdCtgy, secondCtgy: SecondCtgy) {
    FirstToThirdCtgy.storeCtgysWhenNavigate(thirdCtgy, secondCtgy)
    router.push({
      name: 'books',
    })
  }

  static storeCtgysWhenNavigate(thirdCtgy: ThirdCtgy, secondCtgy: SecondCtgy) {
    ctgyStore.storeThirdCtgy(thirdCtgy)
    ctgyStore.storeSecondCtgy(secondCtgy)
    ctgyStore.storeThirdCtgyList(secondCtgy.thirdctgys)
    ctgyStore.storeSubThirdCtgyList(secondCtgy.subThirdCtgys)
  }

  static back() {
    router.back()
  }

  static openOrCollapseInBook(isSpreadCtgys: boolean) {
    ctgyStore.isSpreadCtgys = isSpreadCtgys
  }

  static setActiveThirdCtgyId(thirdCtgyId: number) {
    ctgyStore.activeThirdCtgyId = thirdCtgyId
  }
}

export default FirstToThirdCtgy
