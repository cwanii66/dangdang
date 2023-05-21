import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import BookService from '.'
import { useShopCartStore } from '@/pstore/shopcart'
import type { BookInfo } from '@/pstore/books'
import type { ShopCartInfo } from '@/pstore/shopcart'

type MessageType = '' | 'success' | 'warning' | 'info' | 'error'

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

  static addBookToShopCart(bookItem: BookInfo) {
    const shopCart: ShopCartInfo = {
      userid: 1,
      bookisbn: bookItem.ISBN,
      bookname: bookItem.bookname,
      bookpicname: bookItem.bookpicname,
      bookprice: bookItem.discountprice,
      purchasenum: 1,
      checked: false,
    }
    shopCartStore.addBookToShopCart(shopCart)
    BookService.updateBookNum(1, shopCart.bookisbn) // initial add
  }

  static getExistShopCartId(bookItem: BookInfo) {
    const shopCartList = shopCartStore.getShopCartList
    for (let i = 0; i < shopCartList.length; i++) {
      if (bookItem.ISBN === shopCartList[i].bookisbn)
        return shopCartList[i].shopcartid
    }
  }

  static async updateShopCart(bookItem: BookInfo, event: Event) {
    const target = event.currentTarget as HTMLElement
    const className = target.className
    let purchasenum = 0
    switch (className) {
      case 'shopcart-operate-plus':
        purchasenum = bookItem.purchasenum + 1
        break
      case 'shopcart-operate-minus':
        purchasenum = bookItem.purchasenum - 1
        break
      default:
        break
    }

    const shopCartId = ShopCartService.getExistShopCartId(bookItem)
    const shopCart: ShopCartInfo = {
      shopcartid: shopCartId,
      userid: 1,
      bookisbn: bookItem.ISBN,
      bookname: bookItem.bookname,
      bookpicname: bookItem.bookpicname,
      bookprice: bookItem.discountprice,
      purchasenum,
      checked: false,
    }

    await shopCartStore.updateShopCart(shopCart)
    BookService.updateBookNum(purchasenum, shopCart.bookisbn)
  }

  static async deleteShopCart(bookItem: BookInfo) {
    ShopCartService.confirm(
      `确定要删除《${bookItem.bookname}》吗？`,
      '删除确认',
      '确定',
      '取消',
      'warning',
    )
      .then(async () => {
        const shopCartId = ShopCartService.getExistShopCartId(bookItem)!
        await shopCartStore.deleteShopCart(shopCartId)
        BookService.updateBookNum(0, bookItem.ISBN)
        ElMessage.success('删除成功')
      })
      .catch((reason) => {
        reason === 'cancel' && ElMessage.info('已取消删除')
      })
  }

  static confirm(
    message: string,
    title: string,
    confirmButtonText: string,
    cancelButtonText: string,
    type: MessageType,
  ) {
    return ElMessageBox.confirm(message, title, {
      confirmButtonText,
      cancelButtonText,
      type,
      distinguishCancelAndClose: true,
      center: true,
    })
  }
}