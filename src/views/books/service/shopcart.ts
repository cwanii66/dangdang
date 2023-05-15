import { storeToRefs } from 'pinia'
import { useShopCartStore } from '@/pstore/shopcart'
import type { BookInfo } from '@/pstore/books'

const shopCartStore = useShopCartStore()

export default class ShopCartService {
  static shopCartStoreRefs = storeToRefs(shopCartStore)

  static async findShopCartList() {
    await shopCartStore.findShopCartList(1)
  }

  static udBkNumWithSCLstNum(books: BookInfo[]) {
    const shopCartList = shopCartStore.getShopCartList
    shopCartList.forEach((shopCartItem) => {
      books.forEach((b) => {
        (b.ISBN === shopCartItem.bookisbn)
          && (b.purchasenum = shopCartItem.purchasenum)
      })
    })
  }
}
