import { storeToRefs } from 'pinia'
import { useBookStore } from '@/pstore/books'

const bookStore = useBookStore()
export class HomeService {
  static bookStoreRefs = storeToRefs(bookStore)

  static async findBooksWithPager() {
    await bookStore.findBooksWithPager()
  }

  static init() {
    bookStore.headerHeight = bookStore.headerRef!.offsetHeight
  }

  static async pageScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement || document.body
    if (scrollTop + clientHeight >= scrollHeight)
      await bookStore.findBooksWithPager()
  }

  static headerScroll() {
    const { headerRef, headerOpacity, headerHeight } = HomeService.bookStoreRefs
    const { scrollTop } = document.documentElement || document.body
    const headerScroll = 1 - (scrollTop - 100) / headerHeight.value
    const opacity
      = scrollTop < 100
        ? 1
        : headerScroll
    const isDisplayHeader = opacity > 0

    headerOpacity.value.opacity = opacity
    headerRef.value!.style.display = isDisplayHeader ? 'block' : 'none'
  }
}
