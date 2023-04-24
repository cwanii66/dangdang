import type { Ref } from 'vue'
import { ref } from 'vue'

import CtgyActions from '@/store/actions'
import ctgyGetters from '@/store/getters'
import type { FirstCtgy } from '@/store/state'

// service class for First to Third category
class FirstToThirdCtgy {
  static firstCtgyActiveIndex: Ref<number> = ref(0)
  static firstCtgyList: Ref<FirstCtgy[]> = ref([])

  static async getFirstCtgys() {
    await CtgyActions.findFirstCtgyList()
    FirstToThirdCtgy.firstCtgyList.value = ctgyGetters.getFirstCtgyList
  }

  static setActiveIndex(index: number) {
    FirstToThirdCtgy.firstCtgyActiveIndex.value = index
  }
}

export default FirstToThirdCtgy
