import axios from 'axios'
import type { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
import config from '../config'

const SERVER_ERROR = 'address error: request server / network connect failed'

interface AxiosRequestConfig_ extends AxiosRequestConfig {
  isMock?: boolean
}

type Method = 'get' | 'post' | 'delete' | 'patch' | 'put'
type ReqFn = (url: string, isMock: boolean, data?: any) => AxiosPromise<any>
interface ReqExec {
  get: ReqFn
  post: ReqFn
  delete: ReqFn
  patch: ReqFn
  put: ReqFn
}
const methods: Method[] = ['get', 'delete', 'patch', 'post', 'put']

class AxiosUtil {
  static axiosUtil: AxiosUtil = new AxiosUtil()
  axiosInstance!: AxiosInstance
  request!: ReqExec

  constructor() {
    this.request = {
      get: () => Promise.reject(SERVER_ERROR),
      post: () => Promise.reject(SERVER_ERROR),
      delete: () => Promise.reject(SERVER_ERROR),
      patch: () => Promise.reject(SERVER_ERROR),
      put: () => Promise.reject(SERVER_ERROR),
    }
    this.createAxiosInstance()
    this.beforeRequestIntercept()
    this.beforeResponseIntercept()
    this.reqPrepare()
  }

  createAxiosInstance() {
    this.axiosInstance = axios.create({ timeout: 15000 })
  }

  beforeRequestIntercept() {
    this.axiosInstance.interceptors.request.use(
      (req) => {
        return req
      },
    )
  }

  beforeResponseIntercept() {
    this.axiosInstance.interceptors.response.use(
      (res) => {
        const { data, msg, code } = res.data
        if (code === 200)
          return data
        else if (code === 500)
          return ElMessage.error(`error: ${msg}`)
        else
          return ElMessage.error('error: unknown')
      },
      err => ElMessage.error(`network error: ${err}`),
    )
  }

  sendRequest(options: AxiosRequestConfig_) {
    if (config.env === 'production') {
      this.axiosInstance.defaults.baseURL = config.baseApi
    }
    else if (config.env === 'development') {
      const isMock: boolean = options.isMock || config.isMock
      this.axiosInstance.defaults.baseURL = isMock ? config.mockBaseApi : config.baseApi
    }

    return this.axiosInstance(options)
  }

  // TS: finish type of req method auto prompt
  reqPrepare() {
    methods.forEach((m) => {
      this.request[m] = (url, isMock, data) => {
        return this.sendRequest({
          url,
          data,
          isMock,
        })
      }
    })
  }
}

export default AxiosUtil.axiosUtil.request
