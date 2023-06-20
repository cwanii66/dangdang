<script setup lang="ts">
import { ref } from 'vue'
import { CommentService } from '../../../service'
import getImg from '@/utils/imgUtil'

const { commentList } = CommentService

const commentsRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div>
    <div ref="commentsRef" class="comment-list">
      <div
        v-for="comment in commentList"
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
            <img class="star-img" v-for="star, idx in [0, 0, 0, 0, 0]" :key="idx" :src="getImg('redstar.png')">
          </span>
          <span class="line"> | </span>
          <span class="star-score">10分</span>
        </div>
        <div class="comment-item-content">
          <div>{{ comment.content }}</div>
          <!-- 和数据表互动回复 -->
          <div class="reply-action">
            <span class="date"> {{ comment.pubdate.split('T', 1)[0] }} </span>
            <span class="reply-to-comment"><!-- 回复评论 -->
              <span class="reply-info">
                <span class="reply">回复</span>
                <i class="iconfont icon-pinglun reply-icon" />
              </span>
            </span>
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
            display: flex;
            align-items: center;
            .reply-icon {
              font-size: 0.2rem;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
