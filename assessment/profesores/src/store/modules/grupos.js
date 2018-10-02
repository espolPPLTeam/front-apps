import Vue from 'vue'

const state = {}
const getters = {}
const mutations = {}
const actions = {
  postGrupo ({ commit }, payload) {
    console.log(payload)
    return Vue.http.post('/api/ppl/grupos', payload)
      .then((res) => {
        return Promise.resolve(res)
      }, (err) => {
        return Promise.reject(err)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
