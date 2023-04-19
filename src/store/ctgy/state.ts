export interface FirstCtgy {
  firstctgyId: number
  firstctgyname: string
}

export interface SecondCtgy {
  seccctgyId: number
  seccctgyname: string
  thirdctgy: ThirdCtgy[]
}

export interface ThirdCtgy {
  thirdctgyId: number
  thirdctgyname: string
}

export interface CtgyState {
  firstCtgyList: FirstCtgy[]
  secondCtgyList: SecondCtgy[]
}

export const initialCtgyState: CtgyState = {
  firstCtgyList: [],
  secondCtgyList: [],
}
