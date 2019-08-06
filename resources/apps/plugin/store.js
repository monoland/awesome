import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from './router';
import Auth from '@apps/mixins/AuthProvider';
import { baseURL } from '@apps/.env.js';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: Auth,
        http: Axios.create({
            baseURL: baseURL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }),

        disabled: { add: false, delete: true, edit: true, find: false, link: true, refresh: false },
        login: { username: null, userpass: null },
        menus: [],
        page: { state: 'default', icon: null, title: null, subtitle: null },
        toolbar: { search: false, delete: false, text: null },
        snackbar: { state: false, text: null, color: null },
        table: { initial: true, loader: false, page: [10, 25, 50], total: 0, paging: {}, selected: [] }
    },

    mutations: {
        disabled: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.disabled[key] = payload[key];
            });
        },

        fetchAppMenus: function(state, payload) {
            if (payload) state.auth.menus = payload;
            state.menus = state.auth.menus;
        },

        toolbar: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.toolbar[key] = payload[key];
            });
        },

        snackbar: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.snackbar[key] = payload[key];
            });
        },

        token: function(state, payload) {
            state.auth.token = payload;
            state.http.defaults.headers.common['Authorization'] = state.auth.token;
        },

        user: function(state, payload) {
            state.auth.user = payload;
        },
    },

    actions: {
        fetchAppMenus: async function({commit, dispatch, state}) {
            try {
                let { data } = await state.http.get('/api/menus');
                commit('fetchAppMenus', data);
            } catch (error) {
                dispatch('errors', error);
            }
        },

        deleteClose: function({ commit }) {
            commit('toolbar', { delete: false });
        },

        deleteOpen: function({ commit }) {
            commit('toolbar', { delete: true });
        },

        deleteRecord: function() {},

        editFormOpen: function() {},

        newFormOpen: function() {},

        reloadRecord: function() {},

        searchClose: function({ commit }) {
            commit('toolbar', { search: false, text: null });
        },

        searchOpen: function({ commit }) {
            commit('toolbar', { search: true });
        },

        signin: async function({ commit, dispatch, state }) {
            try {
                let token = await state.http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: state.auth.siteKey,
                    client_secret: state.auth.secretKey,
                    username: state.login.username,
                    password: state.login.userpass,
                    scope: '*'
                });
                
                commit('token', token.data);

                let user = await state.http.get('/api/user');
                commit('user', user.data );

                router.push({ name: 'home' });
            } catch (error) {
                dispatch('errors', error);
            }
        },

        signout: function({state}) {
            state.auth.signout();
            router.push({ name: 'login' });
        },

        snackbarClose: function({ commit }) {
            commit('snackbar', { state: false });
        },

        trashFormOpen: function() {},

        errors: function({ commit, state }, payload) {
            if (payload.hasOwnProperty('response')) {
                
                let { message, error, hint } = payload.response.data;
                let status = payload.response.status;

                if (status === 401) {
                    state.auth.signout();
                } else if (error && hint) {
                    commit('snackbar', {
                        color: 'error',
                        text: hint,
                        state: true
                    });
                }  else if (error && !hint) {
                    commit('snackbar', {
                        color: 'error',
                        text: message,
                        state: true
                    });
                } else {
                    commit('snackbar', {
                        color: 'error',
                        text: 'there is an error while data process on server.',
                        state: true
                    });
                }
            } else if (payload.hasOwnProperty('message')) {
                commit('snackbar', {
                    color: 'error',
                    text: payload.message,
                    state: true
                });
            } else {
                commit('snackbar', {
                    color: 'error',
                    text: payload,
                    state: true
                });
            }

            window.console.clear();
        }
    }
});