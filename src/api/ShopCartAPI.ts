import request from '../utils/axiosUtil'
import type { ShopCartInfo } from '../pstore/shopcart'

class ShopCartAPI {
  static shopCartAPI: ShopCartAPI = new ShopCartAPI()

  getShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUsrShopCartList/${userid}`, false)
  }

  addBookToShopCart(shopCart: ShopCartInfo) {
    return request.post('/shopcartmodule/addBookToShopCart', false, shopCart)
  }
}

export default ShopCartAPI.shopCartAPI
