import storage from 'store'

type ElOfArr<T extends unknown[]> = T extends (infer U)[] ? U : never

export function getValArrOfObj<T extends any[], K extends keyof ElOfArr<T>>(arr: T, key: K) {
  return arr.map((item: ElOfArr<T>) => item[key])
}

export enum OPTIONS {
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
  set(key: string, value: any[], options: OPTIONS): any
  set(key: string, value: object, options: OPTIONS, propKey: string, propValue: any): any
  set(key: string, value: any, options: OPTIONS = OPTIONS.NONE, propKey = '', propValue?: any) {
    const arr: any[] = storage.get(key, [])
    if (isPlainObject(value) && options === OPTIONS.ADDORAPPEND) {
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
    else if (Array.isArray(value) && options === OPTIONS.ACCUMULATE) {
      arr.push(...value)
      return arr
    }
    storage.set(key, value)
    return value
  }

  get(key: string): any
  get(key: string, options: OPTIONS): any
  get(key: string, options: OPTIONS = OPTIONS.NONE): any {
    if (options === OPTIONS.ACCUMULATE || options === OPTIONS.ADDORAPPEND)
      return storage.get(key, [])
    else return storage.get(key)
  }
}

export default Storage.storage
