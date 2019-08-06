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

        setRecord:() => {},

        dataUrl: null,
        disabled: { add: false, delete: true, edit: true, find: false, link: true, refresh: false },
        documents: [],
        login: { username: null, userpass: null },
        headers: [],
        menus: [],
        page: { state: 'default', icon: null, title: null, subtitle: null },
        records: [],
        record: {},
        toolbar: { search: false, delete: false, text: null },
        snackbar: { state: false, text: null, color: null },
        table: { initial: true, loader: false, page: [10, 25, 50], total: 0, paging: {}, selected: [] }
    },

    mutations: {
        dataUrl: function(state, payload) {
            state.dataUrl = payload;
        },

        disabled: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.disabled[key] = payload[key];
            });
        },

        documents: function(state, payload) {
            state.documents = payload;
        },

        documentPush: function(state, payload) {
            state.documents.push(payload);
        },

        documentSplice: function(state, index) {
            state.documents.splice(index, 1);
        },

        fetchAppMenus: function(state, payload) {
            if (payload) state.auth.menus = payload;
            state.menus = state.auth.menus;
        },

        pageInfo: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.page[key] = payload[key];
            });
        },

        record: function(state, payload) {
            state.record = payload;
        },

        records: function(state, payload) {
            state.records = payload;
        },

        recordPush: function(state, payload) {
            state.records.push(payload);
        },

        recordSplice: function(state, index) {
            state.records.splice(index, 1);
        },

        toolbar: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.toolbar[key] = payload[key];
            });
        },

        setRecord: function(state, payload) {
            state.setRecord = payload;
        },

        snackbar: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.snackbar[key] = payload[key];
            });
        },

        tableHeaders: function(state, payload) {
            state.headers = payload;
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
        dataUrl: function({ commit }, payload) {
            commit('dataUrl', payload);
        },

        deleteClose: function({ commit }) {
            commit('toolbar', { delete: false });
        },

        deleteOpen: function({ commit }) {
            commit('toolbar', { delete: true });
        },

        deleteRecord: function() {},

        editFormOpen: function() {},

        fetchAppMenus: async function({commit, dispatch, state}) {
            try {
                let { data } = await state.http.get('/api/menus');
                commit('fetchAppMenus', data);
            } catch (error) {
                dispatch('errors', error);
            }
        },

        newFormOpen: function() {},

        pageInfo: function({ commit }, payload) {
            commit('pageInfo', payload);
        },

        reloadRecord: function() {},

        searchClose: function({ commit }) {
            commit('toolbar', { search: false, text: null });
        },

        searchOpen: function({ commit }) {
            commit('toolbar', { search: true });
        },

        setRecord: function({ commit }, payload) {
            commit('setRecord', () => {
                commit('record', payload);
            });
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

        tableHeaders: function({ commit }, payload) {
            commit('tableHeaders', payload);
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