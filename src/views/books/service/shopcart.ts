import { storeToRefs } from 'pinia'
import { computed, ref, shallowReactive } from 'vue'
import BookService from '.'
import CompUtil from '@/utils/CompUtil'
import { useShopCartStore } from '@/pstore/shopcart'
import type { BookInfo } from '@/pstore/books'
import type { ShopCartInfo } from '@/pstore/shopcart'
import router from '@/router'
import storage from '@/utils/storageUtil'

interface Ball {
  isHidden: boolean
  addBtnTarget?: EventTarget | null
}

export const shopCartStore = useShopCartStore()

function twoDecimalPlaces(num: number) {
  let str = num.toString()
  const decimalIndex = str.indexOf('.')
  if (decimalIndex === -1) {
    str += '.00'
  }
  else {
    const decimalPlaces = str.length - decimalIndex - 1
    if (decimalPlaces === 1)
      str += '0'

    else if (decimalPlaces > 2)
      str = num.toFixed(2)
  }
  return str as any as number
}

export default class ShopCartService {
  static shopCartStoreRefs = storeToRefs(shopCartStore)
  static ball = shallowReactive<Ball>({ isHidden: true })
  static isSelectAll = ref<boolean>(false)

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

  private static calcTotalPrice() {
    return computed(() => {
      let _totalPrice = 0
      const shopCartList = shopCartStore.getShopCartList
      if (shopCartList && shopCartList.length > 0) {
        shopCartList.forEach((shopCartItem) => {
          if (shopCartItem.checked)
            _totalPrice += shopCartItem.bookprice * shopCartItem.purchasenum
        })
      }
      return twoDecimalPlaces(_totalPrice)
    })
  }

  private static calcTotalNum() {
    return computed(() => {
      let _totalNum = 0
      const shopCartList = shopCartStore.getShopCartList
      if (shopCartList && shopCartList.length > 0) {
        shopCartList.forEach((shopCartItem) => {
          if (shopCartItem.checked)
            _totalNum += shopCartItem.purchasenum
        })
      }
      return _totalNum
    })
  }

  static refreshShopCartInfo() {
    const totalBookNum = this.calcTotalNum()
    const totalBookPrice = this.calcTotalPrice()
    return [totalBookNum, totalBookPrice] as const
  }

  static async addBookToShopCartWithCheck(bookItem: BookInfo) {
    const isLogin = !!storage.get('token')
    if (isLogin) {
      await ShopCartService.addBookToShopCart(bookItem)
    }
    else {
      CompUtil.confirm(
        '您还未登录，是否立即登录？',
        '登录确认',
        '确定',
        '取消',
        'warning',
      )
        .then(() => {
          router.push('/login')
        })
        .catch((reason) => {
          reason === 'cancel' && CompUtil.message({
            message: '尚未登录',
            type: 'info',
            duration: 1000,
          })
        })
    }
    return isLogin
  }

  static async addBookToShopCart(bookItem: BookInfo) {
    const shopCart: ShopCartInfo = {
      userid: 1,
      bookisbn: bookItem.ISBN,
      bookname: bookItem.bookname,
      bookpicname: bookItem.bookpicname,
      bookprice: bookItem.discountprice,
      purchasenum: 1,
      checked: false,
    }
    await shopCartStore.addBookToShopCart(shopCart)
    BookService.updateBookNum(1, shopCart.bookisbn) // initial add
  }

  static getExistShopCartId(bookItem: BookInfo) {
    const shopCartList = shopCartStore.getShopCartList
    for (let i = 0; i < shopCartList.length; i++) {
      if (bookItem.ISBN === shopCartList[i].bookisbn)
        return shopCartList[i].shopcartid
    }
  }

  static async updateFromShopCart(bookItem: BookInfo, event: Event) {
    const target = event.currentTarget as HTMLElement
    const className = target.className
    let purchasenum = 0
    switch (className) {
      case 'shopcart-operate-plus':
        purchasenum = bookItem.purchasenum + 1
        ShopCartService.moveBall(target)
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

  static async updateInShopCart(shopCart: ShopCartInfo, event: Event) {
    const target = event.currentTarget as HTMLElement
    const className = target.className
    switch (className) {
      case 'shopcart-operate-plus':
        shopCart.purchasenum += 1
        break
      case 'shopcart-operate-minus':
        shopCart.purchasenum -= 1
        break
      default:
        break
    }

    await shopCartStore.updateShopCart(shopCart)
  }

  static async deleteFromShopCart(bookItem: BookInfo) {
    CompUtil.confirm(
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
        CompUtil.message.success('删除成功')
      })
      .catch((reason) => {
        reason === 'cancel' && CompUtil.message.info('已取消删除')
      })
  }

  static async deleteInShopCart(shopCart: ShopCartInfo) {
    CompUtil.confirm(
      `确定要删除《${shopCart.bookname}》吗？`,
      '删除确认',
      '确定',
      '取消',
      'warning',
    )
      .then(async () => {
        await shopCartStore.deleteShopCart(shopCart.shopcartid!)
        CompUtil.message.success('删除成功')
      })
      .catch((reason) => {
        reason === 'cancel' && CompUtil.message.info('已取消删除')
      })
  }

  static toShopCarts() {
    router.push({ name: 'shopcarts' })
  }

  static back() {
    router.back()
  }

  private static moveBall(eventTarget: EventTarget) {
    ShopCartService.ball.isHidden = false
    ShopCartService.ball.addBtnTarget = eventTarget
  }

  static onBeforeEnter(el: Element) {
    const addBtnTarget = ShopCartService.ball.addBtnTarget as HTMLElement
    const addBtnRect = addBtnTarget.getBoundingClientRect()
    const ballPos = {
      x: addBtnRect.left - 12,
      y: -(window.innerHeight - addBtnRect.top - 45),
    }
    const ball = el as HTMLElement
    ball.style.transform = `translate3d(0, ${ballPos.y}px, 0)`
    const inner = ball.querySelector('.inner') as HTMLElement
    inner.style.transform = `translate3d(${ballPos.x}px, 0, 0)`
  }

  static onEnter(el: Element, done: () => void) {
    // force repaint
    // void document.body.offsetHeight
    requestAnimationFrame(() => {
      const ball = el as HTMLElement
      ball.style.transform = 'translate3d(0, 0, 0)'
      const inner = ball.querySelector('.inner') as HTMLElement
      inner.style.transform = 'translate3d(0, 0, 0)'
      done()
    })
  }

  static onAfterEnter() {
    ShopCartService.ball.isHidden = true
    ShopCartService.ball.addBtnTarget = null
  }

  static selectAll() {
    const shopCartList = shopCartStore.getShopCartList.map((shopCartItem) => {
      shopCartItem.checked = ShopCartService.isSelectAll.value
      return shopCartItem
    })
    shopCartStore.storeShopCartList(shopCartList) // update checked shopcart
  }

  static checkEvery() {
    const shopCartList = shopCartStore.getShopCartList
    const isEveryChecked = shopCartList.every(shopCartItem => shopCartItem.checked)
    shopCartStore.storeShopCartList(shopCartList)
    ShopCartService.isSelectAll.value = isEveryChecked
  }
}
