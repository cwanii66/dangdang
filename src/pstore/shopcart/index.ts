import { defineStore } from 'pinia'
import storage from 'store'
import shopCartAPI from '@/api/ShopCartAPI'

export interface ShopCartInfo {
  shopcartid?: number
  bookisbn: string | number // I'am not sure why this field returned from server is string type
  bookname: string
  bookpicname: string
  bookprice: number
  userid: number
  purchasenum: number
  checked: boolean
}

export interface ShopCartState {
  shopCartList: ShopCartInfo[]
}

export const useShopCartStore = defineStore('shopcart-store', {
  state: (): ShopCartState => ({
    shopCartList: [],
  }),
  getters: {
    getShopCartList: (state): ShopCartInfo[] => {
      return state.shopCartList.length > 0 ? state.shopCartList : storage.get('shopCartList')
    },
  },
  actions: {
    async findShopCartList(userid: number) {
      const { data } = await shopCartAPI.getShopCartList(userid)
      storage.set('shopCartList', data)
      this.shopCartList = data
    },
  },
})
