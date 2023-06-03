import request from '@/utils/axiosUtil'

class SearchAPI {
  static searchAPI: SearchAPI = new SearchAPI()

  // get added hkwid(primary key)
  addSearchHistory(historyKeyword: string) {
    return request.post('/searchmodule/addHistoryKeyword', false, { historyKeyword })
  }

  // update search historyList => get affected rows
  updateSearchHistory(historyKeyword: string) {
    return request.put('/searchmodule/updateHistoryKeyword', false, { historyKeyword })
  }

  // get search keyword list
  getSearchKeywords(keyword: string) {
    return request.get(`/searchmodule/searchKeywords/${keyword}`, false)
  }
}

export default SearchAPI.searchAPI
