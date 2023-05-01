import { defineStore } from 'pinia'

const useBookStore = defineStore('book-store', {
  state: () => ({
    bookList: [],
    bookDetail: {},
    bookListLoading: false,
    bookDetailLoading: false,
  }),
  getters: {

  },
  actions: {
    async findBookList() {

    },
  },
})
