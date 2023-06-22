import { ref } from 'vue'
import type { Reply } from '@/pstore/comment'

export class ReplyService {
  static limit = ref<number>(2)
  static activeCommentIndex = ref<number>(-1) // XXX: please find a better workaround

  static showReplies(replyList: Reply[], limit: number, idx: number) {
    if (ReplyService.activeCommentIndex.value === idx)
      return replyList.slice(0, limit) // for all replies
    return replyList.slice(0, 2)
  }

  static unfoldReplies(replyList: Reply[], idx: number) {
    ReplyService.setActiveCommentIndex(idx)
    ReplyService.limit.value = replyList.length // trigger render
  }

  static setActiveCommentIndex(idx: number) {
    ReplyService.activeCommentIndex.value = idx
  }

  static foldReplies() {
    ReplyService.setActiveCommentIndex(-1)
    ReplyService.limit.value = 2 // trigger render
  }

  static isShowMore(replyList: Reply[], idx: number) {
    if (ReplyService.activeCommentIndex.value === idx)
      return ReplyService.limit.value > 2 && replyList.length > 2
  }

  static isShowLess(replyList: Reply[], idx: number) {
    if (ReplyService.activeCommentIndex.value === -1)
      return ReplyService.limit.value <= 2 && replyList.length > 2
    if (
      ReplyService.activeCommentIndex.value !== -1 // have active comment
      && ReplyService.activeCommentIndex.value !== idx // not current comment
    ) return true
  }
}
