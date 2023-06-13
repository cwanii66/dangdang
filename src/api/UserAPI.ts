import request from '@/utils/axiosUtil'
import type { UserInfo } from '@/pstore/user'

class UserAPI {
  static userAPI: UserAPI = new UserAPI()

  login(userinfo: UserInfo) {
    return request.post('/usermodule/login', false, userinfo)
  }
}

export default UserAPI.userAPI
