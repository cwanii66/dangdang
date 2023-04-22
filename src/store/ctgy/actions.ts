import store from '@/store'

class CtgyActions {
  static ctgyActions: CtgyActions = new CtgyActions()

  static async findFirstCtgyList() {
    await store.dispatch('ctgyModule/findFirstCtgyList')
  }

  static async findSecThrdCtgyList(firstCtgyId: number) {
    await store.dispatch('ctgyModule/findSecThrdCtgyList', firstCtgyId)
  }
}

export default CtgyActions.ctgyActions
