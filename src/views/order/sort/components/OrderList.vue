<script setup lang="ts">
import { OrderService } from '../../service'
import getImg from '@/utils/imgUtil'

const { findOrderByUserId, loopTiming, calcSubmitSum, orderSumRecord } = OrderService
findOrderByUserId()
calcSubmitSum()
loopTiming()

const { subOrderInfoList } = OrderService.orderStoreRefs
</script>

<template>
  <div class="order">
    <div
      v-for="orderInfo in subOrderInfoList"
      :key="orderInfo.orderid"
      class="order-list"
    >
      <div class="order-status">
        <img class="img" :src="getImg('dangdang.png')">
        <span>当当自营</span>
        <span>{{ orderInfo.strOrderStatus }}</span>
        <span><i class="iconfont icon-shanchu del" /></span>
      </div>
      <div v-if="orderInfo.orderstatus === 1" class="order-submit-info">
        <div>订单提交成功</div>
        <div>{{ orderInfo.ordertime }}</div>
      </div>
      <div
        v-for="orderDetail in orderInfo.orderDetailList"
        :key="orderDetail.orderdetailid"
        class="order-detail-list"
      >
        <div class="book-pic">
          <img class="img" :src="getImg(orderDetail.bookpicname)">
        </div>
        <div class="book-name-num">
          <span class="book-name">{{ orderDetail.bookname }}</span>
          <span class="book-num">×{{ orderDetail.purchasenum }}</span>
        </div>
        <div class="book-numandprice">
          <span>共{{ orderDetail.purchasenum }}件商品</span>
          <span>需付款：</span>
          <span>&yen;{{ (orderDetail.bookprice * orderDetail.purchasenum).toFixed(2) }}</span>
        </div>
      </div>
      <div class="order-total-price">
        合计： &yen; {{ orderSumRecord.get(orderInfo.orderid!) }}
      </div>
      <div v-if="orderInfo.orderstatus === 1" class="other">
        <div class="cut-down">
          <i class="iconfont icon-daojishi clock" />
          <span>支付结束：</span>
          <span class="countdowntime">{{ orderInfo.countDownTime }}</span>
        </div>
        <div class="pay-or-cancelord">
          <span class="cancel-order">取消订单</span>
          <span class="immidate-pay">立即支付</span>
        </div>
      </div>
    </div>
    <div v-show="!subOrderInfoList.length" class="empty-order">
      <div class="noorder-descr">
        <i class="iconfont icon-zanwudingdan empty-order-icon" />
        <span>您暂无订单</span>
      </div>
      <div class="noorder-pic">
        <img class="img" :src="getImg('noorder.png')">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order {
  position: absolute;
  top: 1.4rem;
  width: 5.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  .order-list {
    width: 100%;
    .order-status {
      display: flex;
      align-items: center;
      height: 0.6rem;
      .img {
        width: 0.3rem;
        height: 0.3rem;
        object-fit: contain;
      }
      span:nth-child(2) {
        margin-left: 0.12rem;
        font-size: 0.12rem;
        font-weight: 500;
        color: #333;
        margin-right: auto;
      }
      span:nth-child(3) {
        font-size: 0.12rem;
        font-weight: 500;
        color: #989898;
        margin-right: 0.12rem;
      }
      span:last-child {
        .del {
          font-size: 0.24rem;
        }
      }
    }
    .order-submit-info {
      line-height: 0.32rem;
      font-size: 0.16rem;
    }
    .order-detail-list {
      display: grid;
      height: 2.38rem;
      width: 100%;
      padding: 0.1rem 0;
      grid-template-columns: [c1]1fr [c2]1fr [c3]1fr [c4]1fr [c5]1fr [c6]1fr [c7]1fr [c8];
      grid-template-rows: [r1]1fr [r2]1fr [r3]1fr [r4];
      .book-pic {
        grid-row: 1 / 3;
        grid-column: 1 / 3;
        .img {
          width: 85%;
          height: 85%;
          object-fit: contain;
        }
      }
      .book-name-num {
        grid-row: 1 / 3;
        grid-column: 3 / 8;
        display: grid;
        grid-template-rows: 1fr 1fr;
        .book-name {
          font-size: 0.2rem;
        }
        .book-num {
          align-self: flex-end;
          font-size: 0.2rem;
        }
      }
      .book-numandprice {
        grid-row: 3 / 4;
        grid-column: 1 / 8;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        span:nth-child(2) {
          color: #989898;
          margin-left: 0.2rem;
        }
        span:last-child {
          color: #ff0000;
          font-size: 0.23rem;
          font-weight: 500;
        }
      }
    }
    .order-total-price {
      line-height: 0.24rem;
      font-size: 0.2rem;
      color: black;
    }
    .other {
      width: 100%;
      height: 0.65rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cut-down {
          display: flex;
          align-items: center;
          .clock {
            font-size: 0.24rem;
            margin-right: 0.08rem;
          }
          .countdowntime {
            font-size: 0.12rem;
            color: #ff0000;
          }
      }
      .pay-or-cancelord {
          display: flex;
          align-items: center;
          gap: 0.1rem;
          .cancel-order {
            flex: 1;
            padding: 0.12rem 0.2rem;
            font-size: 0.12rem;
            background-color: #f5f5f5;
            border-radius: 0.3rem;
            color: #989898;
          }
          .immidate-pay {
            flex: 1;
            padding: 0.12rem 0.2rem;
            font-size: 0.12rem;
            background-color: #ff5e5e;
            border-radius: 0.3rem;
            color: #fff;
          }
      }
    }
  }
  .empty-order {
    width: 100%;
    height: 36vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .noorder-descr {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.1rem;
      span:nth-child(2) {
        font-size: 0.3rem;
        color: #989898;
      }
      .empty-order-icon {
        font-size: 0.36rem;
        color: #989898;
      }
    }
    .noorder-pic {
      display: flex;
      justify-content: center;
      margin-top: 0.2rem;
      .img {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
      }
    }
  }
}

.order::after {
  content: '';
  display: block;
  height: 1rem;
  width: 5.1rem;
}
</style>
