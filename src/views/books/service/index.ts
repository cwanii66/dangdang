import { storeToRefs } from 'pinia'
import { ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import ShopCartService, { shopCartStore } from './shopcart'
import { Operate, useBookStore } from '@/pstore/books'
import type { BookInfo } from '@/pstore/books'
import FstToThrdCtgy from '@/views/ctgy/service'
import { useCtgyStore } from '@/pstore/ctgy'
import type { ThirdCtgy } from '@/pstore/ctgy/state'

type SortType = 'desc' | 'asc'
type SortFieldType = keyof BookInfo

const { ctgyStoreRefs } = FstToThrdCtgy
const ctgyStore = useCtgyStore()
export const bookStore = useBookStore()

class BookService {
  static bookStoreRefs = storeToRefs(bookStore)
  static activeThirdCtgyId: Ref<number> = ref(ctgyStoreRefs.getThirdCtgy.value.thirdctgyId)
  static sortField: Ref<string> = ref('originalprice')
  static sortType: Ref<SortType> = ref('desc')
  static isDesc: Ref<boolean> = ref(true) // depends on sort type
  static isAutoCompSearch: Ref<boolean> = ref(false)
  static isPublishersOpen: Ref<boolean> = ref(false)
  static isAuthorsOpen: Ref<boolean> = ref(false)

  static getOperate() {
    BookService.isAutoCompSearch.value = bookStore.getOperate === Operate.AUTOCOMPKEYWORD
  }

  static searchBooks() {
    const operate = bookStore.getOperate
    if (operate === Operate.THIRDCTGYID) {
      BookService.fetchBookList()
    }
    else if (operate === Operate.AUTOCOMPKEYWORD) {
      BookService.setActiveThirdCtgyId(-1)
      BookService.findBookListByAutoCompKeyword()
    }
  }

  static async fetchBookList() {
    watchEffect(async () => {
      if (BookService.activeThirdCtgyId.value < 0)
        await bookStore.findBookListBySecondCtgyId(ctgyStoreRefs.getThirdCtgy.value.secctgyid)
      else
        await bookStore.findBookList(BookService.activeThirdCtgyId.value, BookService.sortField.value, BookService.sortType.value)
      await BookService.shopCartAndUdBkNum()
    })
  }

  static async shopCartAndUdBkNum() {
    const shopCartList = shopCartStore.getShopCartList
    if (!shopCartList || shopCartList.length === 0)
      await ShopCartService.findShopCartList()

    await BookService.udBkNumWithSCLstNum()
  }

  static async findBookListByAutoCompKeyword() {
    watch( // TODO: thirdCtgyId changing should trigger conditional search from server
      BookService.activeThirdCtgyId,
      async () => {
        const autoCompKeyword = bookStore.getAutoCompKeyword
        if (!autoCompKeyword)
          return
        await bookStore.findBookListByAutoCompKeyword(autoCompKeyword)
        await BookService.shopCartAndUdBkNum()
      },
      { immediate: true },
    )
  }

  static async findPublishersByAutoCompKeyword() {
    if (bookStore.getOperate === Operate.AUTOCOMPKEYWORD)
      await bookStore.findPublishersByAutoCompKeyword(bookStore.getAutoCompKeyword)
  }

  static async findBooksByPublisherIds(selectedPublisherIds: number[]) {
    await bookStore.findBooksByPublisherIds(selectedPublisherIds)
  }

  static initForBookSortComp() {
    BookService.getOperate()
    BookService.findPublishersByAutoCompKeyword()
  }

  static setActiveThirdCtgyId(thirdCtgy: -1 | ThirdCtgy) { // TODO: refactor the trash code
    if (typeof thirdCtgy === 'number') {
      BookService.activeThirdCtgyId.value = -1
      ctgyStore.storeThirdCtgy({ // TODO: decouple shared state
        thirdctgyId: -1,
        thirdname: '全部',
        secctgyid: ctgyStore.getSecondCtgy.secondctgyId,
      })
    }
    else {
      ctgyStore.storeThirdCtgy(thirdCtgy)
      BookService.activeThirdCtgyId.value = thirdCtgy.thirdctgyId
    }
  }

  static sortBook(sortField: SortFieldType) {
    BookService.sortField.value = sortField
    BookService.toggleSortType()
  }

  static toggleSortType() {
    BookService.sortType.value = BookService.sortType.value === 'desc' ? 'asc' : 'desc'
    if (BookService.sortField.value !== 'originalprice')
      return
    BookService.isDesc.value = BookService.sortType.value === 'desc'
  }

  static updateBookNum(bookNum: number, bookisbn?: string) {
    const bookList = bookStore.getBookList
    for (let i = 0; i < bookList.length; i++) {
      if (bookisbn && bookList[i].ISBN === bookisbn) {
        bookList[i].purchasenum = bookNum
        break
      }
      else if (!bookisbn) {
        bookList[i].purchasenum = bookNum // initialize purchasenum not added to shopcart
      }
    }
  }

  static async udBkNumWithSCLstNum() {
    const bookList = bookStore.getBookList
    BookService.updateBookNum(0)
    ShopCartService.udBkNumWithSCLstNum(bookList)
  }
}

export default BookService
