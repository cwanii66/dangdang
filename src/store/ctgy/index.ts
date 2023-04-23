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
      commit('storeFirstCtgyList', ret)
      console.log({ ret })
    },
    async findSecThrdCtgyList({ commit }, firstCtgyId: number) {
      const ret = await ctgyAPI.getSecThrdCtgyList(firstCtgyId)
      commit('storeSecThrdCtgyList', ret)
      console.log({ ret })
    },
  },
}
