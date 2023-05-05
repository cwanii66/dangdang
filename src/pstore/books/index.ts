import { defineStore } from 'pinia'
import BookAPI from '@/api/BookAPI'

interface BookInfo {
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
}

export interface BookState {
  bookList: BookInfo[]
}

export const useBookStore = defineStore('book-store', {
  state: (): BookState => ({
    bookList: [],
  }),
  getters: {
    getBookListByThirdCtgyId: (state) => {
      return state.bookList
    },
  },
  actions: {
    async findBookList(thirdCtgyId: number) {
      const ret = await BookAPI.getBookListByThirdCtgyId(thirdCtgyId)
      this.bookList = ret.data
    },
    async findBookListBySecondCtgyId(secondCtgyId: number) {
      const ret = await BookAPI.getAllBookList(secondCtgyId)
      this.bookList = ret.data
    },
  },
})
