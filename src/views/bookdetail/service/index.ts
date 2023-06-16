import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useBookStore } from '@/pstore/books'
import router from '@/router'

const bookStore = useBookStore()
export default class BookDetailService {
  static bookStoreRefs = storeToRefs(bookStore)
  static headerStyle = ref<Partial<CSSStyleDeclaration>>({})
  static imgRef = ref<HTMLDivElement | null>(null)

  static init() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    BookDetailService.headerStyle.value.opacity = '0'
    const from = router.currentRoute.value.meta.from
    if (from !== 'comments')
      BookDetailService.findBooksByISBN()
  }

  static findBooksByISBN() {
    bookStore.findBooksByISBN()
  }

  static bookDetailScroll() {
    const scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop
    const imgHeight = BookDetailService.imgRef.value?.offsetHeight
    const headerStyle = BookDetailService.headerStyle.value
    if (scrollTop > 90) {
      headerStyle.opacity = (scrollTop / imgHeight!) > 1 ? '1' : (scrollTop / imgHeight!).toString()
      headerStyle.pointerEvents = 'auto'
    }
    else {
      headerStyle.opacity = '0'
      headerStyle.pointerEvents = 'none'
    }
  }
}
