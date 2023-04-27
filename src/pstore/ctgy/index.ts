import { defineStore } from 'pinia'
import { initialCtgyState } from './state'
import type { SecondCtgy } from './state'
import ctgyAPI from '@/api/CtgyAPI'

export const useCtgyStore = defineStore('ctgy-store', {
  state: () => initialCtgyState,
  getters: {
    getFirstCtgyList: state => state.firstCtgyList,
    getSecThrdCtgyList: state => state.secondCtgyList,
  },
  actions: {
    async findFirstCtgyList() {
      const ret = await ctgyAPI.getFirstCtgyList()
      this.firstCtgyList = ret.data
      // eslint-disable-next-line no-console
      console.log('firstctgy: ', ret.data)
    },
    async findSecThrdCtgyList(firstCtgyId: number) {
      const ret = await ctgyAPI.getSecThrdCtgyList(firstCtgyId)
      ret.data = ret.data.map((secondctgy: SecondCtgy) => {
        secondctgy.isSpreadCtgys = false
        secondctgy.subThirdCtgys = secondctgy.thirdctgys.slice(0, 5)
        return secondctgy
      })
      this.secondCtgyList = ret.data
      // eslint-disable-next-line no-console
      console.log('secondctgy: ', ret.data)
    },
  },
})
