import { ref } from 'vue'
import { CommentService } from '.'
import type { Reply } from '@/pstore/comment'
import { useCommentStore } from '@/pstore/comment'
import { useUserStore } from '@/pstore/user'
import { getFormattedDate } from '@/utils/generalUtil'

const userStore = useUserStore()
const commentStore = useCommentStore()
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

  static composeReply(replyContent: string, commentid: number) {
    const userinfo = userStore.getLoginUser
    const replyDate = getFormattedDate('-')
    const reply = {
      replycontent: replyContent,
      strReplyDate: replyDate,
      replier: userinfo.username,
      evalid: commentid,
    }
    return reply
  }

  static hideReplyPanel(event: Event) {
    const replyBtn = event.currentTarget as HTMLElement
    const replyPanel = replyBtn.parentElement!.parentElement as HTMLElement
    replyPanel.style.display = 'none'
  }

  static async addReply(event: Event, replyContent: string, commentid: number) {
    const reply = ReplyService.composeReply(replyContent, commentid)
    ReplyService.hideReplyPanel(event)
    CommentService.setReplyShowIndex(-1)
    await commentStore.addReply(reply)
  }
}
