import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

import type { FirstCtgy, SecondCtgy } from '@/pstore/state'
import { useCtgyStore } from '@/pstore/ctgy'

const ctgyStore = useCtgyStore()

// service class for First to Third category
class FirstToThirdCtgy {
  static ctgyStore = ctgyStore
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])

  static async getFirstCtgys() {
    await ctgyStore.findFirstCtgyList()
    FirstToThirdCtgy.firstCtgyList.value = ctgyStore.getFirstCtgyList
  }

  static setActiveIndex(index: number) {
    FirstToThirdCtgy.firstCtgyActiveIndex.value = index
  }

  // get second and third category list
  static getSecThrdCtgys() {
    watchEffect(async () => {
      await ctgyStore.findSecThrdCtgyList(this.firstCtgyActiveIndex.value + 1)
      this.secondCtgyList.value = ctgyStore.getSecThrdCtgyList
    })
  }

  static getAllCtgys() {
    FirstToThirdCtgy.getFirstCtgys()
    FirstToThirdCtgy.getSecThrdCtgys()
  }
}

export default FirstToThirdCtgy
