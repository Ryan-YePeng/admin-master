const type = {
  SET_MENU: 'SET_MENU',
  SET_SMALL: 'SET_SMALL',
  SET_DRAWER: 'SET_DRAWER',
  SET_COLLAPSED: 'SET_COLLAPSED',
  HAS_GENERATE_ROUTER: 'HAS_GENERATE_ROUTER'
};

const state = {
  menu: [],
  isSmall: false,
  isDrawer: false,
  isCollapsed: false,
  hasGenerateRouter: false
};

const getters = {
  menu: state => state.menu,
  isSmall: state => state.isSmall,
  isDrawer: state => state.isDrawer,
  isCollapsed: state => state.isCollapsed,
  hasGenerateRouter: state => state.hasGenerateRouter
};

const mutations = {
  [type.SET_MENU](state, menu) {
    if (menu) state.menu = menu;
    else state.menu = []
  },
  [type.SET_SMALL](state, isSmall) {
    state.isSmall = isSmall
  },
  [type.SET_DRAWER](state, isDrawer) {
    state.isDrawer = isDrawer
  },
  [type.SET_COLLAPSED](state, isCollapsed) {
    state.isCollapsed = isCollapsed
  },
  [type.HAS_GENERATE_ROUTER](state) {
    state.hasGenerateRouter = true
  }
};

const actions = {
  setMenu: ({commit}, menu) => {
    commit(type.SET_MENU, menu)
  },
  setSmall: ({commit}, isSmall) => {
    commit(type.SET_SMALL, isSmall)
  },
  setDrawer: ({commit}, isDrawer) => {
    commit(type.SET_DRAWER, isDrawer)
  },
  setCollapsed: ({commit}, isCollapsed) => {
    commit(type.SET_COLLAPSED, isCollapsed)
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

