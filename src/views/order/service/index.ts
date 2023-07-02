import { computed, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { countDownConvert } from '@/utils/generalUtil'
import { useShopCartStore } from '@/pstore/shopcart'
import { getRestTime, useOrderStore } from '@/pstore/order'

const shopCartStore = useShopCartStore()
export const orderStore = useOrderStore()
export class OrderService {
  static shopCartStoreRefs = storeToRefs(shopCartStore)
  static orderStoreRefs = storeToRefs(orderStore)

  static startIndex = ref<number>(0)
  static endIndex = computed(() => OrderService.startIndex.value + 4)
  static isShowLeftArrow = computed(() => OrderService.startIndex.value > 0)
  static isShowRightArrow = computed(() => OrderService.endIndex.value < shopCartStore.getCheckedShopCartList.length)

  static orderSumRecord = new Map<number, number>() // record the total price of each order

  static async submitOrder() {
    await orderStore.submitOrder()
    shopCartStore.clearStateCache()
    router.push({ name: 'ordersort' })
  }

  static async findOrderByUserId() {
    await orderStore.findOrderByUserId()
    OrderService.getSubOrders()
  }

  static setCheckedShopCartList() {
    shopCartStore.setCheckedShopCartList()
    OrderService.setSubCheckedShopCartList()
  }

  static setSubCheckedShopCartList() {
    watchEffect(() => {
      shopCartStore.subCheckedShopCartList
      = shopCartStore
          .getCheckedShopCartList
          .slice(
            OrderService.startIndex.value,
            OrderService.endIndex.value,
          )
    })
  }

  static calcCheckedPrice() {
    const checkedBookPrice
      = shopCartStore
        .getCheckedShopCartList
        .reduce((acc, cur) => acc += cur.purchasenum * cur.bookprice, 0)
    return checkedBookPrice.toFixed(2)
  }

  static changeOrderStatus(status: number) {
    orderStore.orderStatus = status
  }

  static getSubOrders() {
    watch(
      () => orderStore.orderStatus,
      () => {
        if (orderStore.orderStatus === 0 || orderStore.orderStatus > 3) {
          orderStore.subOrderInfoList = orderStore.getOrderInfoList
        }
        else {
          orderStore.subOrderInfoList
          = orderStore.getOrderInfoList.filter((orderInfo) => {
              return orderInfo.orderstatus === orderStore.orderStatus
            })
        }
      },
      {
        immediate: true,
      },
    )
  }

  static calcSubmitSum() {
    watchEffect(() => {
      orderStore.getOrderInfoList.forEach((orderInfo) => {
        let totalPrice = 0
        orderInfo.orderDetailList!.forEach((orderDetail) => {
          totalPrice += orderDetail.bookprice * orderDetail.purchasenum
        })
        OrderService.orderSumRecord.set(orderInfo.orderid!, +totalPrice.toFixed(2))
      })
    })
  }

  static loopTiming() {
    watchEffect(() => {
      orderStore.getOrderInfoList.forEach((orderInfo) => {
        if (orderInfo.orderstatus === 1) {
          orderInfo.countDownFn = setInterval(async () => {
            const { restSec, restTime } = getRestTime(orderInfo)
            if (restSec <= 0) { // 1. if the order is expired, then update the order status
              clearInterval(orderInfo.countDownFn)
              await orderStore.updateOrderStatusByOrderId(orderInfo.orderid!)
              orderInfo.orderstatus = -1
              orderInfo.strOrderStatus = '订单已取消'
            }
            else { // 2. if the order is not expired, then update the countDownTime
              orderInfo.countDownTime = countDownConvert(restTime)
            }
          }, 1000)
        }
      })
    })
  }
}
