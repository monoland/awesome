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

        
        afterAddnew:() => {},
        afterDelete:() => {},
        afterFormOpen:() => {},
        afterSelected:() => {},
        afterUpdate:() => {},
        beforeAddnew:() => {},
        beforeDelete:() => {},
        beforeUpdate:() => {},
        cancelAddnew:() => { return false; },
        cancelDelete:() => { return false; },
        cancelUpdate:() => { return false; },
        overideState:() => {},
        setRecord:() => {},

        dataUrl: null,
        disabled: { add: false, delete: true, edit: true, find: false, link: true, refresh: false },
        documents: [],
        form: { state: false, mode: 'addnew' },
        login: { username: null, userpass: null },
        headers: [],
        menus: [],
        page: { state: 'default', icon: null, title: null, subtitle: null },
        primaryId: 'id',
        records: [],
        record: {},
        toolbar: { search: false, delete: false, text: null },
        trash: { state: false },
        snackbar: { state: false, text: null, color: null },
        table: { initial: true, loader: false, page: [10, 25, 50], total: 0, paging: {}, selected: [] },
        upload: { callback: null, combined: false, progress: false, value: 0 }
    },

    mutations: {
        afterAddnew: function({ state }, payload) {
            state.afterAddnew = payload;
        },

        afterDelete: function({ state }, payload) {
            state.afterDelete = payload;
        },

        afterFormOpen: function({ state }, payload) {
            state.afterFormOpen = payload;
        },

        afterUpdate: function({ state }, payload) {
            state.afterUpdate = payload;
        },

        afterSelected: function({ state }, payload) {
            state.afterSelected = payload;
        },

        beforeAddnew: function({ state }, payload) {
            state.beforeAddnew = payload;
        },

        beforeDelete: function({ state }, payload) {
            state.beforeDelete = payload;
        },

        beforeUpdate: function({ state }, payload) {
            state.beforeUpdate = payload;
        },

        cancelAddnew: function({ state }, payload) {
            state.cancelAddnew = payload;
        },

        cancelDelete: function({ state }, payload) {
            state.cancelDelete = payload;
        },

        cancelUpdate: function({ state }, payload) {
            state.cancelUpdate = payload;
        },

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

        form: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.form[key] = payload[key];
            });
        },

        initStore: function(state) {
            if (!state.http.defaults.headers.common.hasOwnProperty('Authorization')) {
                state.http.defaults.headers.common['Authorization'] = state.auth.token;
            }
        },

        overideState: function({ state }, payload) {
            state.overideState = payload;
        },

        pageInfo: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.page[key] = payload[key];
            });
        },

        paging: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.table.paging[key] = payload[key];
            });
        },

        primaryId: function(state, payload) {
            state.primaryId = payload;
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

        trash: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.trash[key] = payload[key];
            });
        },

        selectedPush: function(state, payload) {
            let idx = state.table.selected.findIndex(obj => obj.id === payload.id);

            payload.pinned = idx === -1;

            if (idx === -1) {
                state.table.selected.push(payload);
            } else {
                state.table.selected.splice(idx, 1);
            }
        },

        setRecord: function(state, payload) {
            state.setRecord = payload;
        },

        snackbar: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.snackbar[key] = payload[key];
            });
        },

        table: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.table[key] = payload[key];
            });
        },

        tableHeaders: function(state, payload) {
            state.headers = payload;
        },

        token: function(state, payload) {
            state.auth.token = payload;
            state.http.defaults.headers.common['Authorization'] = state.auth.token;
        },

        upload: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.upload[key] = payload[key];
            });
        },

        user: function(state, payload) {
            state.auth.user = payload;
        },
    },

    actions: {
        afterSelected: function({ state }, payload) {
            state.afterSelected(payload);
        },

        dataUrl: function({ commit }, payload) {
            commit('dataUrl', payload);
        },

        deleteClose: function({ commit }) {
            commit('toolbar', { delete: false });
        },

        deleteOpen: function({ commit }) {
            commit('toolbar', { delete: true });
        },

        editFormClose: function({ commit }) {
            commit('form', { state: false, mode: null });
            commit('table', { selected: [] });
        },

        editFormOpen: function({ commit, state }, payload) {
            if (payload.constructor === Object) {
                if (state.page.state === 'pinned') {
                    commit('selectedPush', payload);
                    return;
                } else {
                    commit('record', payload);
                }
            }

            commit('form', { state: true, mode: 'edit' });
            
            state.afterFormOpen(payload);
        },

        fetchAppMenus: async function({commit, dispatch, state}) {
            try {
                let { data } = await state.http.get('/api/menus');
                commit('fetchAppMenus', data);
            } catch (error) {
                dispatch('errors', error);
            }
        },

        formClose: function({ state, dispatch }) {
            state.form.mode === 'edit' ? dispatch('editFormClose') : dispatch('newFormClose');
        },

        formSubmit: function({ dispatch, state }) {
            state.form.mode === 'edit' ? dispatch('recordUpdate') : dispatch('recordAddnew')
        },

        initStore: function({ commit, dispatch, state }) {
            if (!state.auth.check) dispatch('signout');

            commit('initStore');
        },

        message: function({ commit }, payload) {
            commit('snackbar', {
                color: 'success',
                text: payload,
                state: true
            });
        },

        newFormClose: function({ commit }) {
            commit('form', { state: false, mode: null });
        },

        newFormOpen: function({ commit, dispatch, state }) {
            dispatch('recordNew');
            commit('form', { state: true, mode: 'addnew' });
            
            state.afterFormOpen();
        },

        overideState: function({ state }, payload) {
            state.overideState(payload);
        },

        pageInfo: function({ commit }, payload) {
            commit('pageInfo', payload);
        },

        recordAddnew: async function({ commit, dispatch, state }) {
            try {
                state.beforeAddnew();
                
                if (state.cancelAddnew()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let { data } = await state.http.post(
                    state.dataUrl, state.record
                );

                commit('recordPush', data);
                commit('form', { state: false, mode: null });
                dispatch('message', 'proses simpan berhasil!');

                state.afterAddnew();
            } catch (error) {
                dispatch('errors', error);
                commit('form', { state: false, mode: null });
            }
        },

        recordDelete: async function({ commit, dispatch, state }) {
            try {
                state.beforeDelete();

                if (state.cancelDelete()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let selected = state.table.selected;
                let currentRecord = state.record;

                if (selected.length <= 1) {
                    let index = state.records.findIndex(obj => obj.id === currentRecord.id);
                    let primaryKey = state.record[state.primaryId];

                    let response = await state.http.delete(
                        state.dataUrl + '/' + primaryKey
                    );

                    if (response) {
                        commit('recordSplice', index);
                    }
                } else {
                    let response = await state.http.post(
                        state.dataUrl + '/bulks', selected
                    );

                    if (response) {
                        selected.forEach((record) => {
                            let index = state.records.findIndex(obj => obj.id === record.id);
                            commit('recordSplice', index);
                        });
                    }
                }

                state.afterDelete();
            } catch (error) {
                dispatch('errors', error);
            } finally {
                commit('trash', { state: false });
                commit('table', { selected: [] });
                dispatch('message', 'proses hapus berhasil!');
            }
        },

        recordFetch: async function({ commit, dispatch, state }, payload) {
            commit('table', { loader: `${state.auth.theme}` });

            try {
                let url = state.dataUrl;
                let params = state.table.paging;

                if (payload) params = payload;
                
                let { data: { data, meta }} = await state.http.get( url, { params: params });

                commit('records', data);
                commit('table', { total: meta.total, initial: false, selected: [] });
            } catch (error) {
                dispatch('errors', error);
            } finally {
                commit('table', { loader: false });
            }
        },

        recordNew: function({ state }) {
            state.setRecord();
        },

        recordPress: function({ commit, state }, payload) {
            if (state.page.state === 'pinned') return;

            commit('pageInfo', { state: 'pinned' });
            commit('toolbar', { delete: true });
            commit('selectedPush', payload);
        },

        recordRefetch: function({commit, dispatch, state}, payload) {
            if (payload.new && (payload.new.length > 0)) {
                commit('paging', { search: payload.new });
                dispatch('recordFetch');
            } else {
                if (payload.old && (payload.old.length > 0)) {
                    commit('paging', { search: null });
                    dispatch('recordFetch');
                } else {
                    if (state.table.initial) return;

                    dispatch('recordFetch', payload.fetch);
                }
            }
        },

        recordReload: function({ dispatch }) {
            dispatch('recordFetch');
        },

        recordUpdate: async function({ commit, dispatch, state }) {
            try {
                state.beforeUpdate();
                
                if (state.cancelUpdate()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let primaryKey = state.record[state.primaryId];

                let { data } = await state.http.put(
                    state.dataUrl + '/' + primaryKey, state.record
                );
                
                commit('record', data);
                commit('form', { state: false, mode: null });
                commit('table', { selected: [] });
                dispatch('message', 'proses update berhasil!');
                
                state.afterUpdate();
            } catch (error) {
                dispatch('errors', error);
                commit('form', { state: false, mode: null });
            }
        },

        searchClose: function({ commit }) {
            commit('toolbar', { search: false, text: null });
        },

        searchOpen: function({ commit }) {
            commit('toolbar', { search: true });
        },

        setAfterAddnew: function({ commit }, payload) {
            commit('afterAddnew', payload);
        },

        setAfterDelete: function({ commit }, payload) {
            commit('afterDelete', payload);
        },

        setAfterFormOpen: function({ commit }, payload) {
            commit('afterFormOpen', payload);
        },

        setAfterSelected: function({ commit }, payload) {
            commit('afterSelected', payload);
        },

        setAfterUpdate: function({ commit }, payload) {
            commit('afterUpdate', payload);
        },

        setBeforeAddnew: function({ commit }, payload) {
            commit('beforeAddnew', payload);
        },

        setBeforeDelete: function({ commit }, payload) {
            commit('beforeDelete', payload);
        },

        setBeforeUpdate: function({ commit }, payload) {
            commit('beforeUpdate', payload);
        },

        setCancelAddnew: function({ commit }, payload) {
            commit('cancelAddnew', payload);
        },

        setCancelDelete: function({ commit }, payload) {
            commit('cancelDelete', payload);
        },

        setCancelUpdate: function({ commit }, payload) {
            commit('cancelUpdate', payload);
        },

        setOverideState: function({ commit }, payload) {
            commit('overideState', payload);
        },

        setPrimaryId: function({ commit }, payload) {
            commit('primaryId', payload);
        },

        setRecord: function({ commit }, payload) {
            commit('setRecord', () => {
                commit('record', payload);
            });
        },

        setUploadCallback: function({ commit }, payload) {
            commit('upload', { callback: payload });
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

        trashFormClose: function({ commit }) {
            commit('trash', { state: false });
            commit('table', { selected: [] });
            commit('toolbar', { delete: false });
        },

        trashFormOpen: function({ commit }) {
            commit('trash', { state: true });
        },

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