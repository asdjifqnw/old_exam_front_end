import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const module = {
    state: {
        Token: "",
        userInfo: {
            userId: "",
            insertTime: "",
            userDescription: "",
            userIsAdmin: "",
            userIsSuperAdmin: "",
            userPhoneNumber: "",
            userPosition: "",
            updateTime: "",
            userName: ""
        }
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.Token = token
        },
        removeToken(state) {
            state.Token = ""
        },
        setUserInfo(state, userInfo) {
            let key
            let i = 0
            for (key in state.userInfo) {
                state.userInfo[key] = userInfo[i]
                i++
            }
        },
        Logout(state) {
            state.Token = ""
            for (let key in state.userInfo) {
                state.userInfo[key] = ""
            }
        }
    },
    plugins: [createPersistedState()]
}
const store = new Vuex.Store(module)
export default store