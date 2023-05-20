import { defineStore } from 'pinia'
import shopCartAPI from '@/api/ShopCartAPI'
import storage, { OPTIONS } from '@/utils/storageUtil'

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
      const { data: dbShopCart } = await shopCartAPI.addBookToShopCart(shopCart)
      const shopCartList: ShopCartInfo[] = storage.set('shopCartList', dbShopCart, OPTIONS.ADDORAPPEND, 'shopcartid', dbShopCart.shopcartid)
      this.shopCartList = shopCartList
    },
  },
})
