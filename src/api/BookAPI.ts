import request from '@/utils/axiosUtil'

class BookAPI {
  static bookApi: BookAPI = new BookAPI()
  getBookList(thirdCtgyId: number) {
    return request.get(`/bookmodule/findBooksByThirdctgyId/${thirdCtgyId}`, false)
  }
}

export default BookAPI.bookApi
