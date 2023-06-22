<script setup lang="ts">
import { ref } from 'vue'
import { CommentService, ReplyService } from '../../../service'

import getImg from '@/utils/imgUtil'

const { commentList, reply, cancelReply, replyShowIndex } = CommentService
const { showReplies, limit, unfoldReplies, foldReplies, isShowMore, isShowLess } = ReplyService

const commentsRef = ref<HTMLElement | null>(null)
const replyOverlayRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div>
    <div ref="commentsRef" class="comment-list">
      <div
        v-for="comment, idx in commentList"
        :key="comment.commentid"
        class="comment-item"
      >
        <div class="comment-item-user">
          <span class="img-wrapper">
            <img class="user-img" :src="getImg(comment.avatar)">
          </span>
          <span v-if="comment.isanonymous">匿名用户</span>
          <span v-else>{{ comment.commentuser }}</span>
          <span class="thumbs-up"><i class="iconfont icon-zans zans-icon" /></span>
        </div>
        <div class="comment-item-star">
          <span class="icon">
            <img v-for="star, idx in [0, 0, 0, 0, 0]" :key="idx" class="star-img" :src="getImg('redstar.png')">
          </span>
          <span class="line"> | </span>
          <span class="star-score">10分</span>
        </div>
        <div class="comment-item-content">
          <div>{{ comment.content }}</div>
          <!-- 和数据表互动回复 -->
          <div class="reply-action">
            <span class="date"> {{ comment.pubdate.split('T', 1)[0] }} </span>
            <div class="reply-to-comment">
              <!-- 回复评论 -->
              <span class="reply-info">
                <span v-show="replyShowIndex === -1" class="reply" @click="reply(idx, $event)">
                  回复<i class="iconfont icon-pinglun reply-icon" />
                </span>
                <span v-show="replyShowIndex === idx" class="reply-cancel" @click="cancelReply">取消回复</span>
              </span>
              <div class="reply-panel">
                <div ref="replyOverlayRef" class="overlay-before" />
                <div class="publish-area">
                  <textarea class="reply-content" :placeholder="`回复 ${comment.commentuser}`" />
                  <span class="reply-post">发表</span>
                </div>
                <div class="overlay-after" />
              </div>
            </div>
          </div>
          <div class="reply-list">
            <div
              v-for="reply in showReplies(comment.replyList, limit, idx)"
              :key="reply.replyid"
              class="reply"
            >
              <span class="replier">{{ reply.replier }}: </span>
              <span class="reply-content">{{ reply.replycontent }}</span>
            </div>
            <div class="all-reply">
              <span v-show="!comment.replyList.length"> 暂无回复 </span>
              <span v-show="isShowLess(comment.replyList, idx)" @click="unfoldReplies(comment.replyList, idx)">
                展开<i class="iconfont icon-xiangxiajiantou" />
              </span>
              <span v-show="isShowMore(comment.replyList, idx)" @click="foldReplies()">
                收起<i class="iconfont icon-xiangshangjiantou" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!commentList.length" class="comment-list">
      <div class="nocomment">
        暂无评价
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-list::after {
  display: block;
  content: '';
  height: 2rem;
}
.comment-list {
  width: 4.6rem;
  display: grid;
  gap: 0.5rem;
  .comment-item {
    width: 100%;
    display: grid;
    gap: 0.2rem;
    &-user {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      .img-wrapper {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        overflow: hidden;
        .user-img {
          width: 100%;
          height: 100%;
        }
      }
      .thumbs-up {
        margin-left: auto;
        .zans-icon {
          font-size: 0.21rem;
        }
      }
    }
    &-star {
      display: flex;
      align-items: center;
      gap: 0.12rem;
      font-size: 0.12rem;
      color: darkgray;
      .icon {
        display: flex;
        align-items: center;
        .star-img {
          width: 0.3rem;
          height: 0.3rem;
        }
      }
    }
    &-content {
      font-size: 0.18rem;
      line-height: 0.3rem;
      text-shadow: 0 0 0.01rem gray;
      .reply-action {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.1rem;
        .date {
          color: darkgray;
          text-shadow: none;
        }
        .reply-to-comment {
          .reply-info {
            .reply {
              display: flex;
              align-items: center;
              gap: 0.1rem;
            }
            .reply-icon {
              font-size: 0.21rem;
            }
          }
          .reply-panel {
            display: none;
            position: absolute;
            width: 4.61rem;
            height: 2rem;
            top: 0.4rem;
            left: 0;
            z-index: 99;
            background-color: #fff;
            .publish-area {
              display: flex;
              flex-direction: column;
              gap: 0.1rem;
              width: 100%;
              height: 100%;
              .reply-content {
                flex: 1;
                padding: 0.1rem;
                font-size: 0.18rem;
                border: 0.01rem solid #ccc;
                border-radius: 0.1rem;
                resize: none;
                background-color: #f8f8f8;
                font-family: system-ui;
              }
              .reply-post {
                flex-basis: 0.3rem;
                height: 0.3rem;
                width: 1rem;
                margin-left: auto;
                border-radius: 0.15rem;
                background-color: #f5f5f5;
                text-align: center;
                font-size: 0.14rem;
                color: #666;
              }
            }
            .overlay-before {
              position: absolute;
              top: -5.4rem;
              left: 0;
              width: 4.6rem;
              height: 5rem;
              background-color: #fff;
              opacity: 0.5;
              z-index: 999;
            }
            .overlay-after {
              position: absolute;
              top: 2rem;
              left: 0rem;
              width: 4.6rem;
              height: 5rem;
              background-color: #fff;
              opacity: 0.5;
              z-index: 999;
            }
          }
        }
      }
      .reply-list {
        margin-top: 0.18rem;
        line-height: 0.5rem;
        width: 4.6rem;
        font-size: 0.2rem;
        background-color: #f6f6f6;
        border-radius: 0.1rem;
        .reply {
          .replier {
            color: #526198;
          }
          &-content {
            font-family: serif;
          }
        }
      }
    }
  }
  .nocomment {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.18rem;
    color: darkgray;
  }
}
</style>
