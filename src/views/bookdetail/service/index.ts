import { storeToRefs } from 'pinia'
import type { CSSProperties } from 'vue'
import { ref, shallowReactive } from 'vue'
import router from '@/router'
import { pickValsFromObjArr } from '@/utils/generalUtil'
import { useBookStore } from '@/pstore/books'
import type { Comment } from '@/pstore/comment'
import { CommentLevel, useCommentStore } from '@/pstore/comment'

const bookStore = useBookStore()
export class BookDetailService {
  static bookStoreRefs = storeToRefs(bookStore)
  static headerStyle = shallowReactive<CSSProperties>({})
  static imgRef = ref<HTMLDivElement | null>(null)

  static init() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    BookDetailService.setHeaderOpacity('0')
    BookDetailService.headerStyle.pointerEvents = 'none'
    const from = router.currentRoute.value.meta.from
    if (from !== 'comments')
      BookDetailService.findBooksByISBN()
  }

  static setHeaderOpacity(opacity: string) {
    BookDetailService.headerStyle.opacity = opacity
  }

  static findBooksByISBN() {
    bookStore.findBooksByISBN()
  }

  static bookDetailScroll() {
    const scrollTop = window.scrollY || document.body.scrollTop || document.documentElement.scrollTop
    const imgHeight = BookDetailService.imgRef.value?.offsetHeight
    const headerStyle = BookDetailService.headerStyle
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

const commentStore = useCommentStore()
export class CommentService {
  static commentStoreRefs = storeToRefs(commentStore)
  static commentList = ref<Comment[]>([])
  static commentLevel = shallowReactive({
    good: 0,
    medium: 0,
    bad: 0,
  })

  static replyShowIndex = ref<number>(-1)

  static async findCommentList() {
    await commentStore.findCommentList()
    CommentService.commentList.value = commentStore.getCommentList
    CommentService.countCommentLevel()
  }

  static getCommentLevels(commentLevel: CommentLevel) {
    const originalComments
      = CommentService.commentList.value
      = commentStore.getCommentList
    const comments = originalComments.filter(comment => comment.evaluatelevel === commentLevel)
    if (commentLevel !== CommentLevel.ALL)
      CommentService.commentList.value = comments
  }

  static countCommentLevel() {
    CommentService.resetCommentLevel()
    const commentLevels = pickValsFromObjArr(commentStore.getCommentList, 'evaluatelevel')
    // 1: good 2: medium 3: bad
    commentLevels.forEach((level) => {
      switch (level) {
        case 1:
          CommentService.commentLevel.good += 1
          break
        case 2:
          CommentService.commentLevel.medium += 1
          break
        case 3:
          CommentService.commentLevel.bad += 1
          break
      }
    })
  }

  static resetCommentLevel() {
    CommentService.commentLevel.good = 0
    CommentService.commentLevel.medium = 0
    CommentService.commentLevel.bad = 0
  }

  static setReplyShowIndex(index: number) {
    CommentService.replyShowIndex.value = index
  }

  static reply(idx: number, event: Event) {
    CommentService.toggleReplyPanel(event, 'block')
    CommentService.setReplyShowIndex(idx) // idx means the index of the comment
    CommentService.ctrlHeadAndLevel(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) // reset scroll position
    CommentService.ctrlScroll('hidden')
  }

  static ctrlHeadAndLevel(visible: boolean) {
    commentStore.headLevelHide = visible
  }

  static toggleReplyPanel(event: Event, display: string) {
    const replyTarget = event.currentTarget as HTMLElement
    const replyPanel = replyTarget.parentElement!.nextElementSibling as HTMLElement
    replyPanel.style.display = display
  }

  static cancelReply(event: Event) {
    CommentService.toggleReplyPanel(event, 'none')
    CommentService.setReplyShowIndex(-1) // -1 means no reply panel is shown
    CommentService.ctrlHeadAndLevel(true)
    CommentService.ctrlScroll('auto')
  }

  static ctrlScroll(scrollMode: string) {
    document.documentElement.style.overflow = scrollMode
    document.body.style.overflow = scrollMode
  }
}

export * from './Reply'
