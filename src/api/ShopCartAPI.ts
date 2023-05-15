import request from '../utils/axiosUtil'

class ShopCartAPI {
  static shopCartAPI: ShopCartAPI = new ShopCartAPI()

  getShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUsrShopCartList/${userid}`, false)
  }
}

export default ShopCartAPI.shopCartAPI
