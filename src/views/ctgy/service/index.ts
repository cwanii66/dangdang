import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'

import { useCtgyStore } from '@/pstore/ctgy'
import type { SecondCtgy, ThirdCtgy } from '@/pstore/ctgy/state'

const ctgyStore = useCtgyStore()

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
    ctgyStore.storeThirdCtgy(thirdCtgy)
    ctgyStore.storeSecondCtgy(secondCtgy)
    router.push({
      name: 'books',
    })
  }

  static back() {
    router.back()
  }
}

export default FirstToThirdCtgy
