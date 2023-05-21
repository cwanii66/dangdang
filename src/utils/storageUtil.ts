import storage from 'store'

type ElOfArr<T extends unknown[]> = T extends (infer U)[] ? U : never

export function getValArrOfObj<T extends any[], K extends keyof ElOfArr<T>>(arr: T, key: K) {
  return arr.map((item: ElOfArr<T>) => item[key])
}

export enum OPTION {
  ACCUMULATE = 0,
  ADDORAPPEND = 1,
  NONE = -1,
}

function isPlainObject(val: unknown): val is object {
  return Object.prototype.toString.call(val) === '[object Object]'
}
class Storage {
  static storage: Storage = new Storage()

  set(key: string, value: string): any
  set(key: string, value: object): any
  set(key: string, value: any[]): any
  set(key: string, value: any[], option: OPTION): any
  set(key: string, value: object, option: OPTION, propKey: string, propValue: any): any
  set(key: string, value: any, option: OPTION = OPTION.NONE, propKey = '', propValue?: any) {
    const arr: any[] = storage.get(key, [])
    if (isPlainObject(value) && option === OPTION.ADDORAPPEND) {
      const keyValsOfObj = getValArrOfObj(arr, propKey)
      const index = keyValsOfObj.indexOf(propValue) // the index of propValue in keyArrOfObj is the same as the index of value in arr
      if (propKey && propValue) {
        if (!keyValsOfObj.includes(propValue))
          arr.push(value)
        else
          index !== -1 && arr.splice(index, 1, value)
        storage.set(key, arr)
        return arr
      }
    }
    else if (Array.isArray(value) && option === OPTION.ACCUMULATE) {
      arr.push(...value)
      return arr
    }
    storage.set(key, value)
    return value
  }

  remove(key: string): any
  remove(key: string, option: OPTION, propKey: string, propValue: any): any
  remove(key: string, option: OPTION = OPTION.NONE, propKey = '', propValue?: any) {
    if (option === OPTION.ADDORAPPEND) { // remove one and reset
      const arr: any[] = storage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propKey)
      const index = keyValsOfObj.indexOf(propValue)
      if (propKey && propValue) {
        index !== -1 && arr.splice(index, 1)
        storage.set(key, arr)
        return arr
      }
    }
    else {
      storage.remove(key) // remove all
    }
  }

  get(key: string): any
  get(key: string, option: OPTION): any
  get(key: string, option: OPTION = OPTION.NONE): any {
    if (option === OPTION.ACCUMULATE || option === OPTION.ADDORAPPEND)
      return storage.get(key, [])
    else return storage.get(key)
  }
}

export default Storage.storage
