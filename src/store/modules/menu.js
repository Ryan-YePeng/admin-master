const type = {
  SET_MENU: 'SET_MENU',
  HAS_GENERATE_ROUTER: 'HAS_GENERATE_ROUTER'
};

const state = {
  menu: [],
  hasGenerateRouter: false
};

const getters = {
  menu: state => state.menu,
  hasGenerateRouter: state => state.hasGenerateRouter
};

const mutations = {
  [type.SET_MENU](state, menu) {
    if (menu) state.menu = menu;
    else state.menu = []
  },
  [type.HAS_GENERATE_ROUTER](state) {
    state.hasGenerateRouter = true
  }
};

const actions = {
  setMenu: ({commit}, menu) => {
    commit(type.SET_MENU, menu)
  },
  setHasGenerateRouter: ({commit}) => {
    commit(type.HAS_GENERATE_ROUTER)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}

