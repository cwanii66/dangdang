import type { Module } from 'vuex'
import type { CtgyState, FirstCtgy, SecondCtgy } from './state'
import { initialCtgyState } from './state'
import ctgyAPI from '@/api/CtgyAPI'

export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initialCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state) {
      return state.secondCtgyList
    },
  },
  mutations: {
    storeFirstCtgyList(state, firstCtgyList: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList
    },
    storeSecThrdCtgyList(state, secondCtgyList: SecondCtgy[]) {
      state.secondCtgyList = secondCtgyList
    },
  },
  actions: {
    async findFirstCtgyList({ commit }) {
      const ret = await ctgyAPI.getFirstCtgyList()
      commit('storeFirstCtgyList', ret.data)
      console.log('firstctgy: ', ret.data)
    },
    async findSecThrdCtgyList({ commit }, firstCtgyId: number) {
      const ret = await ctgyAPI.getSecThrdCtgyList(firstCtgyId)
      ret.data = ret.data.map((secondctgy: SecondCtgy) => {
        secondctgy.isSpreadCtgys = false
        secondctgy.subThirdCtgys = secondctgy.thirdctgys.slice(0, 5)
        return secondctgy
      })
      commit('storeSecThrdCtgyList', ret.data)
      console.log('secondctgy: ', ret.data)
    },
  },
}
