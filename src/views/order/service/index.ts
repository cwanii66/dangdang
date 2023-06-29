import { computed, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
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

  static async submitOrder() {
    await orderStore.submitOrder()
    shopCartStore.clearStateCache()
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
    return shopCartStore
      .getCheckedShopCartList
      .reduce((acc, cur) => acc += cur.purchasenum * cur.bookprice, 0)
  }
}
