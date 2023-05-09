import { defineStore } from 'pinia'
import storage from 'store'
import BookAPI from '@/api/BookAPI'

export interface BookInfo {
  ISBN: string
  bookname: string
  author: string
  publishid: number
  publishername: string
  monthsalecount: number
  bookpicname: string
  secondctgyId: number
  thirdctgyId: number
  originalprice: number
  discount: number
  discountprice: string | number // BUG: I'am not sure why this field returned from server is string type
}

export interface BookState {
  bookList: BookInfo[]
}

function toFixed(num: number | string, digit: number): string {
  return Number(num).toFixed(digit)
}

export const useBookStore = defineStore('book-store', {
  state: (): BookState => ({
    bookList: [],
  }),
  getters: {
    getBookListByThirdCtgyId: (state): BookInfo[] => {
      return state.bookList.length > 0 ? state.bookList : storage.get('bookList')
    },
  },
  actions: {
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
