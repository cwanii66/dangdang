import { defineStore } from 'pinia'
import { useSearchStore } from '../search'
import storage from '@/utils/storageUtil'
import BookAPI from '@/api/BookAPI'

export interface BookInfo {
  ISBN: string
  bookname: string
  author: string
  publishid: number
  publishername: string
  monthsalecount: number
  bookpicname: string
  purchasenum: number
  secondctgyId: number
  thirdctgyId: number
  originalprice: number
  discount: number
  discountprice: number
}

export interface BookState {
  bookList: BookInfo[]
  operate?: Operate
}

export enum Operate {
  INIT = 0,
  THIRDCTGYID = 1,
  AUTOCOMPKEYWORD = 2,
}

const searchStore = useSearchStore()

function toFixed(num: number, digit: number) {
  return Number(num.toFixed(digit))
}

export const useBookStore = defineStore('book-store', {
  state: (): BookState => ({
    bookList: [],
    operate: Operate.INIT,
  }),
  getters: {
    getAutoCompKeyword: (): string => {
      return searchStore.getAutoCompKeyword // books view is driven by related search keyword
    },
    getBookList: (state): BookInfo[] => {
      return state.bookList.length > 0 ? state.bookList : storage.get('bookList')
    },
    getOperate: (state): Operate => {
      return state.operate || storage.get('operate')
    },
  },
  actions: {
    storeOperate(operate: Operate) {
      this.operate = operate
      storage.set('operate', this.operate)
    },
    async findBookList(thirdCtgyId: number, sortField: string, sortType: string) {
      const bookList = await BookAPI.getBookListByThirdCtgyId(thirdCtgyId, sortField, sortType)
      bookList.data = bookList.data.map((book: BookInfo) => {
        book.discountprice = toFixed(book.discountprice, 2)
        return book
      })
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findBookListBySecondCtgyId(secondCtgyId: number) {
      const bookList = await BookAPI.getAllBookList(secondCtgyId)
      this.bookList = bookList.data
    },
  },
})
