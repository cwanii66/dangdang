import { defineStore } from 'pinia'
import type { UserInfo } from '../user'
import type { ShopCartInfo } from '../shopcart'
import orderAPI from '@/api/OrderAPI'
import { getFormattedDate } from '@/utils/generalUtil'
import storage, { OPTION } from '@/utils/storageUtil'

export interface OrderInfo {
  orderid?: number
  ordertime: string
  customerid: number
  orderstatus: number
  orderDetailList?: OrderDetail[]
}

export interface OrderDetail {
  orderdetailid?: number
  orderid?: number
  bookname: string
  bookpicname: string
  bookprice: number
  purchasenum: number
  shopcartid?: number
}

export interface OrderStoreState {
  orderInfo: OrderInfo
}

function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0
}

export const useOrderStore = defineStore('order-store', {
  state: (): OrderStoreState => ({
    orderInfo: {} as OrderInfo,
  }),
  getters: {
    getOrderInfo(state) {
      return isEmptyObj(state.orderInfo) ? storage.get('orderInfo') : state.orderInfo
    },
  },
  actions: {
    async submitOrder() {
      const customerid = storage.get<UserInfo>('loginUser').userid
      // 1. create a reasonable orderInfo
      const order: OrderInfo = {
        ordertime: getFormattedDate('-'),
        orderstatus: 1, // the status of new added order is generally 1
        customerid,
      }
      // 2. create a reasonable orderDetailList
      const checkedShopCartList = storage.get<ShopCartInfo[]>('checkedShopCartList', OPTION.ARRAY)
      const orderDetailList = checkedShopCartList.map((item) => {
        const { bookname, bookpicname, bookprice, purchasenum, shopcartid } = item
        return {
          bookname,
          bookpicname,
          bookprice,
          purchasenum,
          shopcartid,
        }
      })
      // 3. merge orderInfo and orderDetail
      order.orderDetailList = orderDetailList
      // 4. call orderAPI.submitOrder
      const responseOrderData = await orderAPI.submitOrder(order)
      // 5. preserve the response data to store and client storage
      this.orderInfo = responseOrderData.data
      storage.set('orderInfo', this.orderInfo)
    },
  },
})
