import { computed, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { useShopCartStore } from '@/pstore/shopcart'

const shopCartStore = useShopCartStore()
export class OrderService {
  static shopCartStoreRefs = storeToRefs(shopCartStore)

  static startIndex = ref<number>(0)
  static endIndex = computed(() => OrderService.startIndex.value + 4)
  static isShowLeftArrow = computed(() => OrderService.startIndex.value > 0)
  static isShowRightArrow = computed(() => OrderService.endIndex.value < shopCartStore.getCheckedShopCartList.length)

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
