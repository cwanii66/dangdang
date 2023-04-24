export interface FirstCtgy {
  firstctgyId: number
  name: string
}

export interface SecondCtgy {
  firstctgyId: number
  secondctgyId: number
  secondgyname: string
  thirdctgys: ThirdCtgy[]
}

export interface ThirdCtgy {
  thirdctgyId: number
  thirdname: string
  secctgyid: number
}

export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[]
}

export const initialCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: [],
}
