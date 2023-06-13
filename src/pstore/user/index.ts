import { defineStore } from 'pinia'
import userAPI from '@/api/UserAPI'
import storage from '@/utils/storageUtil'

export interface UserInfo {
  userid: number
  username: string
  password: string
  address?: string
  valid: number
  age?: number
  birth?: string
  token?: string
}

interface UserState {
  userInfo: UserInfo
}

function isEmptyObject(obj: object) {
  return Object.keys(obj).length === 0
}

const initialUserInfo: UserState = { userInfo: {} as UserInfo }
export const useUserStore = defineStore('user', {
  state: () => initialUserInfo,
  getters: {
    getLoginUser(state): UserInfo {
      return isEmptyObject(state.userInfo) ? storage.get('loginUser') : state.userInfo
    },
  },
  actions: {
    async login(username: string, password: string) {
      const loginUser = { username, password } as UserInfo
      const userInfo = await userAPI.login(loginUser)
      this.userInfo = userInfo.data
      storage.set('token', userInfo.data.token)
      storage.set('loginUser', this.userInfo)
    },
  },
})
