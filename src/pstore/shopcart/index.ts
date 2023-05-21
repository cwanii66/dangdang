import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import shopCartAPI from '@/api/ShopCartAPI'
import storage, { OPTION } from '@/utils/storageUtil'

export interface ShopCartInfo {
  shopcartid?: number
  bookisbn: string
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

function storeShopCart(response: AxiosResponse<ShopCartInfo>) {
  const dbShopCart = response.data
  const shopCartList: ShopCartInfo[] = storage.set('shopCartList', dbShopCart, OPTION.ADDORAPPEND, 'shopcartid', dbShopCart.shopcartid)
  return shopCartList
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
    async addBookToShopCart(shopCart: ShopCartInfo) {
      const res = await shopCartAPI.addBookToShopCart(shopCart)
      this.shopCartList = storeShopCart(res)
    },
    async updateShopCart(shopCart: ShopCartInfo) {
      const res = await shopCartAPI.updateShopCart(shopCart)
      this.shopCartList = storeShopCart(res)
    },
    async deleteShopCart(shopCartId: number) {
      const res = await shopCartAPI.deleteShopCart(shopCartId)
      if (res.data > 0) {
        this.shopCartList = storage.remove('shopCartList', OPTION.ADDORAPPEND, 'shopcartid', shopCartId)
      }
      else if (res.data === 0) {
        // eslint-disable-next-line no-console
        console.log('deleteShopCart: no shopcartid found')
      }
    },
  },
})