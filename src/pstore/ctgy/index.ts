import { defineStore } from 'pinia'
import storage from 'store'
import { initialCtgyState } from './state'
import type { FirstCtgy, SecondCtgy, ThirdCtgy } from './state'
import ctgyAPI from '@/api/CtgyAPI'

function isEmptyObject(obj: object) {
  return JSON.stringify(obj) === '{}'
}

export const useCtgyStore = defineStore('ctgy-store', {
  state: () => ({
    ...initialCtgyState,
    firstCtgy: {} as FirstCtgy,
    secondCtgy: {} as SecondCtgy,
    thirdCtgy: {} as ThirdCtgy,
  }),
  getters: {
    getFirstCtgyList: state => state.firstCtgyList,
    getSecThrdCtgyList: state => state.secondCtgyList,
    getThirdCtgy: (state): ThirdCtgy => {
      return isEmptyObject(state.thirdCtgy) ? storage.get('thirdctgy') : state.thirdCtgy
    },
    getFirstCtgy: (state): FirstCtgy => {
      return isEmptyObject(state.firstCtgy) ? storage.get('firstctgy') : state.firstCtgy
    },
    getSecondCtgy: (state): SecondCtgy => {
      return isEmptyObject(state.secondCtgy) ? storage.get('secondctgy') : state.secondCtgy
    },
  },
  actions: {
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      storage.set('thirdctgy', thirdCtgy)
      this.thirdCtgy = thirdCtgy
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      storage.set('firstctgy', firstCtgy)
      this.firstCtgy = firstCtgy
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      storage.set('secondctgy', secondCtgy)
      this.secondCtgy = secondCtgy
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
