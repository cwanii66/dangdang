import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

import CtgyActions from '@/store/actions'
import ctgyGetters from '@/store/getters'
import type { FirstCtgy, SecondCtgy } from '@/store/state'

// service class for First to Third category
class FirstToThirdCtgy {
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])
  static secondCtgyList: Ref<SecondCtgy[]> = ref([])

  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    FirstToThirdCtgy.firstCtgyList.value = ctgyGetters.getFirstCtgyList
  }

  static setActiveIndex(index: number) {
    FirstToThirdCtgy.firstCtgyActiveIndex.value = index
  }

  // get second and third category list
  static getSecThrdCtgys() {
    watchEffect(async () => {
      await CtgyActions.findSecThrdCtgyList(this.firstCtgyActiveIndex.value + 1)
      this.secondCtgyList.value = ctgyGetters.getSecThrdCtgyList
    })
  }

  static getAllCtgys() {
    FirstToThirdCtgy.getFirstCtgys()
    FirstToThirdCtgy.getSecThrdCtgys()
  }
}

export default FirstToThirdCtgy
