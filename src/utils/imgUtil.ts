import { useStorage } from '@vueuse/core'
import { unref } from 'vue'

export class ImgUtil {
  static #imgList: Record<string, string> = {}

  static storeImgList() {
    const storeImgListFn = () =>
      unref(useStorage(
        'imgList',
        ImgUtil.#imgList ?? {},
        sessionStorage,
        { mergeDefaults: true, deep: true },
      ))

    if (!sessionStorage.getItem('imgList'))
      ImgUtil.#imgList = storeImgListFn()

    if (this.#isEmpty()) {
      this.loadAllImg()
      storeImgListFn()
    }
  }

  static #isEmpty() {
    return !Object.getOwnPropertyNames(ImgUtil.#imgList).length
  }

  static getImg(imgName: string) {
    return ImgUtil.#imgList[imgName]
  }

  static loadAllImg() {
    const imgMap: Record<string, any> = import.meta.glob('../../assets/img/**/*.png', { eager: true })
    let ap = ''
    let imgName = ''
    for (const rp in imgMap) {
      ap = imgMap[rp].default
      imgName = ap.slice(
        ap.lastIndexOf('/') + 1,
        ap.lastIndexOf('.'),
      )
      ImgUtil.#imgList[imgName] = ap
    }
  }
}
export default ImgUtil.getImg
