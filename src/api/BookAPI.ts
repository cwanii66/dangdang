import request from '@/utils/axiosUtil'

class BookAPI {
  static bookApi: BookAPI = new BookAPI()
  getBookListByThirdCtgyId(thirdCtgyId: number, sortField: string, sortType: string) {
    return request.get(`/bookmodule/findBooksByThirdctgyId/${thirdCtgyId}/${sortField}/${sortType}`, false)
  }

  getAllBookList(secondCtgyId: number) {
    return request.get(`/bookmodule/findAllBooksBySecondCtgyId/${secondCtgyId}`, false)
  }
}

export default BookAPI.bookApi
