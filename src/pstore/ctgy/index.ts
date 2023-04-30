import { defineStore } from 'pinia'
import storage from 'store'
import { initialCtgyState } from './state'
import type { SecondCtgy, ThirdCtgy } from './state'
import ctgyAPI from '@/api/CtgyAPI'

function isEmptyObject(obj: object) {
  return JSON.stringify(obj) === '{}'
}

export const useCtgyStore = defineStore('ctgy-store', {
  state: () => ({
    ...initialCtgyState,
    thirdCtgy: {} as ThirdCtgy,
  }),
  getters: {
    getFirstCtgyList: state => state.firstCtgyList,
    getSecThrdCtgyList: state => state.secondCtgyList,
    getThirdCtgy: (state) => {
      console.log('getter of thirdCtgy')
      return isEmptyObject(state.thirdCtgy) ? storage.get('thirdctgy') : state.thirdCtgy
    },
  },
  actions: {
    storeCtgy(thirdCtgy: ThirdCtgy) {
      storage.set('thirdctgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    },
    async findFirstCtgyList() {
      const ret = await ctgyAPI.getFirstCtgyList()
      this.firstCtgyList = ret.data
    },
    async findSecThrdCtgyList(firstCtgyId: number) {
      const ret = await ctgyAPI.getSecThrdCtgyList(firstCtgyId)
      ret.data = ret.data.map((secondctgy: SecondCtgy) => {
        secondctgy.isSpreadCtgys = false
        secondctgy.subThirdCtgys = secondctgy.thirdctgys.slice(0, 5)
        return secondctgy
      })
      this.secondCtgyList = ret.data
    },
  },
})
