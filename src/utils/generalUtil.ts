export function isMap(val: unknown): val is Map<any, any> {
  return toTypeString(val) === '[object Map]'
}
export function isSet(val: unknown): val is Set<any> {
  return toTypeString(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return toTypeString(val) === '[object Date]'
}
export function isRegExp(val: unknown): val is RegExp {
  return toTypeString(val) === '[object RegExp]'
}
export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}
export function isSymbol(val: unknown): val is symbol {
  return typeof val === 'symbol'
}
export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const objectToString = Object.prototype.toString
export function toTypeString(value: unknown): string {
  return objectToString.call(value)
}

export function isPlainObject(val: unknown): val is object {
  return toTypeString(val) === '[object Object]'
}

export type EleOfArr<T> = T extends Array<infer U> ? U : never
export function pickValsFromObjArr<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, key: K) {
  return arr.map(({ [key]: val }: E) => val)
}
