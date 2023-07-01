import { computed, ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useShopCartStore } from '@/pstore/shopcart'
import { useOrderStore } from '@/pstore/order'

const shopCartStore = useShopCartStore()
export const orderStore = useOrderStore()
export class OrderService {
  static shopCartStoreRefs = storeToRefs(shopCartStore)
  static orderStoreRefs = storeToRefs(orderStore)

  static startIndex = ref<number>(0)
  static endIndex = computed(() => OrderService.startIndex.value + 4)
  static isShowLeftArrow = computed(() => OrderService.startIndex.value > 0)
  static isShowRightArrow = computed(() => OrderService.endIndex.value < shopCartStore.getCheckedShopCartList.length)

  static orderSumRecord = new Map<number, number>()

  static async submitOrder() {
    await orderStore.submitOrder()
    shopCartStore.clearStateCache()
    router.push({ name: 'ordersort' })
  }

  static async findOrderByUserId() {
    await orderStore.findOrderByUserId()
    OrderService.getSubOrders()
  }

  static calcSubmitSum() {
    orderStore.getOrderInfoList.forEach((orderInfo) => {
      let totalPrice = 0
      orderInfo.orderDetailList!.forEach((orderDetail) => {
        totalPrice += orderDetail.bookprice * orderDetail.purchasenum
      })
      OrderService.orderSumRecord.set(orderInfo.orderid!, +totalPrice.toFixed(2))
    })
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
}
