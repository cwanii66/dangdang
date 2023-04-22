import store from '@/store'

const ctgyGettersTarget = {
  getFirstCtgyList: [],
  getSecThrdCtgyList: [],
}

const ctgyGettersProxy = new Proxy(ctgyGettersTarget, {
  get(_ctgyTarget, prop) {
    if (prop === 'getFirstCtgyList')
      return store.getters['ctgyModule/getFirstCtgyList']
    else if (prop === 'getSecThrdCtgyList')
      return store.getters['ctgyModule/getSecThrdCtgyList']
    else
      return undefined
  },
})

export default ctgyGettersProxy
