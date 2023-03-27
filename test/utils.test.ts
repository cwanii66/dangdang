import { describe, expect, it } from 'vitest'
import getImg, { ImgUtil } from '../src/utils/imgHandler'

describe('utils', () => {
  it('ImgUtil', () => {
    expect(ImgUtil.loadAllImg())
      .toMatchInlineSnapshot('undefined')
    expect(getImg('1'))
      .toMatchInlineSnapshot('"/assets/img/books/lunbo/1.png"')
  })
})
