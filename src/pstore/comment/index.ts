import { defineStore } from 'pinia'
import { useBookStore } from '../books'
import commentAPI from '@/api/CommentAPI'

export interface Comment {
  commentid: number
  content: string
  commentuser: string // 发表人
  isbn: string
  avatar: string
  likes: number // 点赞数
  evaluatelevel: number // 评价等级
  pubdate: string // 发表时间
  isanonymous: number // 是否匿名
  // One comment could have many replies
  replyList: Reply[]
}
export interface Reply {
  replyid: number
  replycontent: string
  replydate: string
  replier: string
  evalid: number
}

export const enum CommentLevel {
  ALL = 0,
  GOOD = 1,
  MEDIUM = 2,
  BAD = 3,
}

interface CommentState {
  commentList: Comment[]
  headLevelHide: boolean
}

export const useCommentStore = defineStore('comment', {
  state: (): CommentState => ({
    commentList: [],
    headLevelHide: true,
  }),
  getters: {
    getCommentList(state) {
      return state.commentList
    },
    getBookISBN() {
      return useBookStore().getBookISBN
    },
  },
  actions: {
    async findCommentList() {
      const commentsWithReplyList = await commentAPI.findCommentList(this.getBookISBN)
      this.commentList = commentsWithReplyList.data
    },
  },
})
