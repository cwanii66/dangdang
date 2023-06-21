<script setup lang="ts">
import { CommentService } from '../../../service'
import { CommentLevel } from '@/pstore/comment'

const { commentLevel, getCommentLevels } = CommentService
const { headLevelHide } = CommentService.commentStoreRefs
</script>

<template>
  <div v-show="headLevelHide" class="comment-level">
    <div class="comment-level-wrapper">
      <div class="more">
        <span class="all comment" @click="getCommentLevels(CommentLevel.ALL)">全部</span>
        <span class="newest comment">最新</span>
        <span class="image-video comment">图/视频</span>
      </div>
      <div class="ratings">
        <span class="good-comments comment" @click="getCommentLevels(CommentLevel.GOOD)">好评<strong>({{ commentLevel.good }})</strong></span>
        <span class="medium-comments comment" @click="getCommentLevels(CommentLevel.MEDIUM)">中评<strong>({{ commentLevel.medium }})</strong></span>
        <span class="negative-comments comment" @click="getCommentLevels(CommentLevel.BAD)">差评<strong>({{ commentLevel.bad }})</strong></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-level {
  margin-top: 0.4rem;
  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .more,
  .ratings {
    display: flex;
    gap: 0.2rem;
    line-height: 0.35rem;
    .comment {
      background-color: #fef2f6;
      padding: 0.1rem 0.2rem;
      border-radius: 0.2rem;
      font-size: 0.2rem;
    }
  }
}
</style>
