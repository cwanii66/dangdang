<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import BookDetailService from '../service'
import getImg from '@/utils/imgUtil'

const { imgRef, init, bookDetailScroll } = BookDetailService
const { getBookDetail } = BookDetailService.bookStoreRefs

init()

useEventListener('scroll', () => {
  bookDetailScroll()
})
</script>

<template>
  <div class="goods" v-if="getBookDetail">
    <i class="iconfont icon-yuan-shixin-zuojiantou left-arrow" @click="$router.push({ name: 'books' })" />
    <div ref="imgRef" class="pic">
      <img
        :src="getImg(getBookDetail.bookpicname)"
        :alt="getBookDetail.bookpicname"
        class="img"
      >
    </div>
    <div class="goods-detail">
      <div class="price-detail">
        <div class="favorable">
          <span class="discount-price">
            <strong class="symbol">&yen;</strong>
            <strong class="price">{{ getBookDetail.discountprice }}</strong>
          </span>
          <span class="discount-condition"><span class="inner">每满100减50</span></span>
          <i class="iconfont icon-jiangjiatongzhi1 price-reduction" />
        </div>
        <div class="other">
          <span class="original-price">定价&yen;{{ getBookDetail.originalprice }}</span>
          <span class="discount">{{ getBookDetail.discount }}</span>
          <span class="reduction-notice">降价通知</span>
        </div>
      </div>
      <div class="line" />
      <div class="fullminus">
        <div class="fullminus-item">
          <div class="fullminus-item-desc">
            <strong class="symbol">&yen;</strong>
            <span class="integerpart">10</span>
            <span class="sale-price">满99</span>
          </div>
          <div class="fullminus-item-get">
            领
          </div>
          <span class="radius-up" />
          <span class="radius-down" />
          <span class="connect-line-1" />
          <span class="connect-line-2" />
          <span class="connect-line-3" />
        </div>
        <div class="extra-item-1">
          <span class="yen-field">N元场</span>
          <span class="discount">3月49元 & 88元10件</span>
          <span class="claim-coupons">
            领券
            <i class="iconfont icon-xiangyoujiantou" />
          </span>
        </div>
        <div class="extra-item-2">
          <span class="yen-field">满减额</span>
          <span class="discount">每满 &yen; 1000元减 &yen; 50元</span>
          <span class="claim-coupons">
            领券
            <i class="iconfont icon-xiangyoujiantou" />
          </span>
        </div>
      </div>
    </div>
    <div class="book-brief">
      <div class="description">
        <span class="self-support">当当自营</span>
        <span class="book-name">{{ getBookDetail.bookname }}</span>
      </div>
      <div class="book-introduce">
        在打倒了魔王的勇者一行人当中，魔法使芙莉莲是精灵，她和其他三人有不一样的地方。
        生活在“之后”的世界里，她感受到了什么——
        留下来的人们所编织的葬送与祈祷又意味着什么——
        故事从“冒险的结束”开始。
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods {
  position: absolute;
  top: 0.6rem;
  left: 0;
  bottom: -10rem; // test opacity
  overflow-y: scroll;
  .left-arrow {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    font-size: 0.4rem;
    opacity: 0.36;
  }
  .pic {
    display: flex;
    margin-top: 0.2rem;
    width: 5.4rem;
    height: 3.3rem;
    justify-content: center;
    .img {
      height: 90%;
      object-fit: contain;
    }
  }
  &-detail {
    width: 5.4rem;
    height: 2.95rem;
    background-image: linear-gradient(#fe5347 36%, #ffc3bc, #fff);
    border-radius: 0.2rem 0.2rem 0 0;
    box-shadow: 0 -0.01rem 0.01rem 0.01rem gainsboro;
    overflow: hidden;
    .price-detail {
      margin-top: 0.2rem;
      width: 5.1rem;
      padding: 0 0.15rem;
      height: 1.04rem;
      color: #fff;
      .favorable,
      .other {
        line-height: 0.35rem;
        display: flex;
        align-items: center;
        .discount-price {
          flex-basis: 0.94rem;
          text-shadow: 0 0.01rem 0.01rem #000;
          font-size: 0.24rem;
        }
        .discount-condition {
          flex: 1;
          .inner {
            padding: 0.03rem 0.1rem;
            border: 1px solid rgb(183, 183, 183);
            box-shadow: inset 0rem 0.01rem 0.03rem 0.01rem #fff;
            border-radius: 0.03rem;
          }
        }
        .price-reduction {
          flex-basis: 0.7rem;
          font-size: 0.3rem;
          text-shadow: 0 0.01rem 0.01rem #000;
        }
        .original-price {
          flex-basis: 1.2rem;
          text-decoration: line-through;
        }
        .discount {
          flex: 1;
          text-shadow: 0 0.01rem 0.01rem #000;
        }
        .reduction-notice {
          flex-basis: 0.7rem;
        }
      }
    }
    .line {
      height: 0.1rem;
      background-color: #e94230;
      margin: 0 0.06rem;
      border-radius: 0.1rem;
    }
    .fullminus {
      height: 1.5rem;
      position: relative;
      top: -0.05rem;
      background-image: linear-gradient(#ffc3bc 5%, #fff 30%, #fff 30%, #fff 30%);
      margin: 0 0.1rem;
      padding: 0.18rem 0 0 0.18rem;
      &-item {
        position: relative;
        display: flex;
        gap: 0.1rem;
        color: #fff;
        &-desc,
        &-get {
          display: flex;
          height: 0.45rem;
          align-items: center;
          justify-content: center;
          border-radius: 0.1rem;
          background-color: #ff5374;
        }
        &-desc {
          width: 1.1rem;
          box-shadow: -0.01rem 0 0.03rem 0 #000;
          .symbol,
          .integerpart {
            font-size: 0.24rem;
          }
          .sale-price {
            font-size: 0.16rem;
            margin-left: 0.1rem;
          }
        }
        &-get {
          width: 0.5rem;
          box-shadow: 0.01rem 0 0.03rem 0 #000;
          font-size: 0.21rem;
        }

        .radius-up,
        .radius-down {
          width: 0.125rem;
          height: 0.06rem;
          position: absolute;
          border: 0.02rem solid #ff5374;
          left: 1.08rem;
          border-top: none;
          border-bottom-left-radius: 50% 100%;
          border-bottom-right-radius: 50% 100%;
        }
        .radius-up {
          bottom: 0.04rem;
          transform: rotate(180deg);
        }
        .radius-down {
          top: 0.04rem;
        }
        .connect-line-1,
        .connect-line-2,
        .connect-line-3 {
          position: absolute;
          width: 0.11rem;
          height: 0.012rem;
          left: 1.09rem;
          background-color: #ff5374;
        }
        .connect-line-1 {
          top: 0.16rem;
        }
        .connect-line-2 {
          top: 0.22rem;
        }
        .connect-line-3 {
          top: 0.28rem;
        }
      }
      .extra-item-1,
      .extra-item-2 {
        display: flex;
        height: 0.4rem;
        align-items: center;
        gap: 0.24rem;
        .yen-field {
          width: 0.8rem;
          padding: 0.03rem 0.05rem;
          text-align: center;
          font-size: 0.1rem;
          background-color: #f6e8e7;
        }
        .discount {
          flex: 1;
          color: #414141;
          font-weight: 600;
        }
        .claim-coupons {
          width: 0.8rem;
          color: #e24a56;
        }
      }
    }
  }
  .book-brief {
    padding: 0 0.15rem;
    .description {
      display: flex;
      align-items: center;
      gap: 0.2rem;
      height: 0.5rem;
      .self-support {
        width: 0.9rem;
        color: #fff;
        text-align: center;
        background-color: #f34949;
        padding: 0.03rem 0;
        border-radius: 0.06rem;
        box-shadow: 0 0.01rem 0.01rem 0.01rem #9a9a9a;
      }
      .book-name {
        width: 3.5rem;
        font-size: 0.2rem;
        font-weight: 600;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .book-introduce {
      font-size: 0.16rem;
      color: #666;
      line-height: 0.24rem;
    }
  }
}
</style>
