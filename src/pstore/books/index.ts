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
export type Publihser = Pick<BookInfo, 'publishid' | 'publishername'>

export interface BookState {
  bookList: BookInfo[]
  operate?: Operate
  publishers: Publihser[]
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
    publishers: [],
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
      storage.set('bookList', bookList.data)
    },
    async findBookListByAutoCompKeyword(autoCompKeyword: string) {
      const bookList = await BookAPI.getBooksByAutoCompKeyword(autoCompKeyword)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
    async findPublishersByAutoCompKeyword(autoCompKeyword: string) {
      const publishers = await BookAPI.findPublishersByAutoCompKeyword(autoCompKeyword)
      this.publishers = publishers.data
    },
    async findBooksByPublisherIds(publishIds: number[]) {
      const bookList = await BookAPI.findBooksByPublisherIds(publishIds)
      this.bookList = bookList.data
      storage.set('bookList', bookList.data)
    },
  },
})
