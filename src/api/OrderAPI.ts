import request from '@/utils/axiosUtil'
import type { OrderInfo } from '@/pstore/order'

class OrderAPI {
  static orderAPI: OrderAPI = new OrderAPI()

  submitOrder(orderInfo: OrderInfo) {
    return request.post('/ordermodule/submitorder', false, orderInfo)
  }
}

export default OrderAPI.orderAPI
