import router from '@/router'
import {prefix} from '@/settings'
import {removeSessionStorage, removeCookiesStorage} from '@/utils/storage'

const type = {
  SET_USER: 'SET_USER',
  QUIT_LOGIN: 'QUIT_LOGIN'
};

const state = {
  user: {}
};

const getters = {
  user: state => state.user
};

const mutations = {
  [type.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {}
  },
  [type.QUIT_LOGIN]() {
    router.push({name: 'login'}).then(() => {
      removeSessionStorage(`${prefix}-LAYOUT`);
      removeCookiesStorage(`${prefix}-TOKEN`);
      location.reload()
    })
  }
};

const actions = {
  setUser: ({commit}, user) => {
    commit(type.SET_USER, user)
  },
  quitLogin: ({commit}) => {
    commit(type.QUIT_LOGIN)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
