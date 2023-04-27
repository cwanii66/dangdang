import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { useCtgyStore } from '@/pstore/ctgy'

const ctgyStore = useCtgyStore()

// service class for First to Third category
class FirstToThirdCtgy {
  static ctgyStoreRefs = storeToRefs(ctgyStore)
  static firstCtgyActiveIndex: Ref<number> = ref(0)

  static async getFirstCtgys() {
    await ctgyStore.findFirstCtgyList()
  }

  static setActiveIndex(index: number) {
    FirstToThirdCtgy.firstCtgyActiveIndex.value = index
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
}

export default FirstToThirdCtgy
