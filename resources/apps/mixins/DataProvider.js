import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        auth: null,
        http: null,

        setRecord:() => {},
        afterSelected:() => {},
        afterOpenForm:() => {},
        afterPost:() => {},
        beforePost:() => {},
        afterAddnew:() => {},
        beforeAddnew:() => {},
        cancelAddnew:() => { return false; },
        afterUpdate:() => {},
        beforeUpdate:() => {},
        cancelUpdate:() => { return false },
        afterDelete:() => {},
        beforeDelete:() => {},
        cancelDelete:() => { return false },
        overideState:() => {},

        headers: [],
        records: [],
        record: {},
        multiple: true,
        dataurl: null,
        primaryId: 'id',
        setting: { id: null, meta: { avatar: null }},
        page: { state: 'default', icon: null, title: null },
        form: { state: false, mode: 'addnew' },
        search: { state: false, text: null },
        trash: { state: false, selected: [] },
        snackbar: { state: false, text: null, color: null },
        disabled: { add: false, delete: true, edit: true, find: false, link: true, refresh: false },
        table: { message: 'There is no data to display', initial: true, loader: false, page: [10, 25, 50], total: 0, paging: {}, selected: []}
    },

    getters: {
        check: function(state) {
            return state.auth.check;
        },

        theme: function(state) {
            return state.auth.theme;
        },

        menus: function(state) {
            return state.auth.menus;
        },

        user: function(state) {
            return state.auth.user;
        },

        deleted: function(state) {
            return state.trash.selected.length > 0;
        },

        trashCount: function(state) {
            if (state.page.state !== 'pinned') {
                return state.table.selected.length;
            }

            return state.trash.selected.length;
        }
    },

    mutations: {
        setAuth: function(state, payload) {
            state.auth = payload;
        },

        auth: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.auth[key] = payload[key];
            });
        },

        http: function(state, payload) {
            state.http = payload;
        },

        dataurl: function(state, payload) {
            state.dataurl = payload;
        },

        headers: function(state, payload) {
            state.headers = payload;
        },

        multiple: function(state, payload) {
            state.multiple = payload;
        },

        records: function(state, payload) {
            state.records = payload;
        },

        pushRecords: function(state, payload) {
            state.records.push(payload);
        },

        spliceRecords: function(state, index) {
            state.records.splice(index, 1);
        },

        record: function(state, payload) {
            state.record = payload;
        },

        setting: function(state, payload) {
            state.setting = payload;
        },

        setRecord: function(state, payload) {
            state.setRecord = payload;
        },

        form: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.form[key] = payload[key];
            });
        },

        disabled: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.disabled[key] = payload[key];
            });
        },

        page: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.page[key] = payload[key];
            });
        },

        search: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.search[key] = payload[key];
            });
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

        paging: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.table.paging[key] = payload[key];
            });
        },

        trash: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.trash[key] = payload[key];
            });
        },

        pushDeleted: function(state, payload) {
            let idx = state.trash.selected.findIndex(obj => obj.id === payload.id);

            payload.pinned = idx === -1;

            if (idx === -1) {
                state.trash.selected.push(payload);
            } else {
                state.trash.selected.splice(idx, 1);
            }

            if (state.trash.selected.length === 0) {
                state.page.state = 'default';
            }
        },

        reset: function(state) {
            state.setRecord = () => {};
            state.afterSelected = () => {};
            state.afterOpenForm = () => {};
            state.afterPost = () => {};
            state.beforePost = () => {};
            state.afterAddnew = () => {};
            state.beforeAddnew = () => {};
            state.cancelAddnew = () => { return false; };
            state.afterUpdate = () => {};
            state.beforeUpdate = () => {};
            state.cancelUpdate = () => { return false };
            state.afterDelete = () => {};
            state.beforeDelete = () => {};
            state.cancelDelete = () => { return false };
            state.overideState = () => {};

            state.headers = [];
            state.records = [];
            state.record = {};
            state.multiple = true;
            state.dataurl = null;
            state.primaryId = 'id';
            state.setting = { id: null, meta: { avatar: null }};
            state.page = { state: 'default', icon: null, title: null };
            state.form = { state: false, mode: 'addnew' };
            state.search = { state: false, text: null };
            state.delete = { state: false, selected: [] };
            state.snackbar = { state: false, text: null, color: null };
            state.disabled = { add: false, delete: true, edit: true, find: false, link: true, refresh: false };
            state.table = { message: 'There is no data to display', initial: true, loader: false, page: [10, 25, 50], total: 0, paging: {}, selected: [] };
        },
    },

    actions: {
        auth: function({ commit }, payload) {
            commit('auth', payload);
        },

        setHeaders: function({ commit }, payload) {
            commit('headers', payload);
        },

        setPageInfo: function({ commit }, payload) {
            commit('page', payload);
        },

        setPageUrl: function({ commit }, payload) {
            commit('dataurl', payload);
        },

        setRecord: function({ commit }, payload) {
            commit('setRecord', () => {
                commit('record', payload);
            });
        },

        newRecord: function({ state }) {
            state.setRecord();
        },

        resetStore: function({ commit }) {
            commit('reset');
        },

        fetchCombo: async function({ dispatch, state }, payloads) {
            try {
                let url = payloads['url'];
                let callback = payloads['callback'];
                let params = payloads['params'];

                let {data} = await state.http.get( url, { params });

                if (typeof callback === 'function') callback(data);
            } catch (error) {
                dispatch('errors', error);
            }
        },

        openSearch: function({ commit }) {
            commit('search', { state: true });
        },

        closeSearch: function({ commit }) {
            commit('search', { state: false, text: null });
        },

        fetchMenus: async function({ commit, dispatch, state }) {
            try {
                let { data } = await state.http.get('/api/menus');
                dispatch('auth', { menus: data });
            } catch (error) {
                dispatch('errors', error);
            }
        },

        fetchData: async function({ commit, dispatch, state }, payload) {
            commit('table', { loader: true });

            try {
                let url = state.dataurl;
                let params = state.table.paging;

                if (payload) {
                    params = payload;
                }
                
                let { data: { data, meta }} = await state.http.get( url, { params: params });

                commit('records', data);
                commit('table', { total: meta.total, initial: false, selected: [] });
            } catch (error) {
                dispatch('errors', error);
            } finally {
                commit('table', { loader: false });
            }
        },

        refetch: function({commit, dispatch, state}, payload) {
            if (payload.new && (payload.new.length > 0)) {
                commit('paging', { search: payload.new });
                dispatch('fetchData');
            } else {
                if (payload.old && (payload.old.length > 0)) {
                    commit('paging', { search: null });
                    dispatch('fetchData');
                } else {
                    if (state.table.initial) return;

                    dispatch('fetchData', payload.fetch);
                }
            }
        },

        refresh: function({ dispatch }) {
            dispatch('fetchData');
        },

        afterSelected: function({ state }, payload) {
            state.afterSelected(payload);
        },

        afterOpenForm: function({ state }, payload) {
            state.afterOpenForm(payload);
        },

        pressListItem: function({ commit, state }, payload) {
            if (state.page.state === 'pinned') return;

            commit('page', { state: 'pinned' });
            commit('pushDeleted', payload);
        },

        releaseTrash: function({ commit, state }) {
            let trashing = state.trash.selected;
            
            Object.keys(trashing).forEach(key => {
                let idx = state.records.findIndex(obj => obj.id === trashing[key].id );

                if (idx !== -1) {
                    state.records[idx].pinned = false;
                }
            });

            commit('trash', { selected: [] });
            commit('page', { state: 'default' });
        },

        openNewForm: function({ commit, dispatch, state }) {
            dispatch('newRecord');
            commit('form', { state: true, mode: 'addnew' });
            dispatch('afterOpenForm');
        },

        openEditForm: function({ commit, dispatch, state }, payload) {
            if (payload.constructor === Object) {
                if (state.page.state === 'pinned') {
                    commit('pushDeleted', payload);
                    return;
                } else {
                    commit('record', payload);
                }
            }
            
            commit('form', { state: true, mode: 'edit' });
            dispatch('afterOpenForm');
        },

        openDelete: function({ commit }) {
            commit('trash', { state: true });
        },

        closeForm: function({ state, dispatch }) {
            state.form.mode === 'edit' ? dispatch('closeUpdate') : dispatch('closeAddnew');
        },

        closeUpdate: function({ state, commit }) {
            commit('form', { state: false, mode: null });
            commit('table', { selected: [] });
        },

        closeAddnew: function({ commit }) {
            commit('form', { state: false, mode: null });
        },

        closeDelete: function({ commit }) {
            commit('trash', { state: false });
        },

        closeSnackbar: function({ commit }) {
            commit('snackbar', { state: false });
        },

        submitForm: function({ state, dispatch }) {
            state.form.mode === 'edit' ? dispatch('postUpdate') : dispatch('postAddnew');
        },

        afterPost: function({ state }, payload) {
            state.afterPost(payload);
        },

        beforePost: function({ state }, payload) {
            state.beforePost(payload);
        },

        afterUpdate: function({ state }, payload) {
            state.afterUpdate(payload);
        },

        beforeUpdate: function({ state }, payload) {
            state.beforeUpdate(payload);
        },

        cancelUpdate: function({ state }, payload) {
            state.cancelUpdate(payload);
        },

        postUpdate: async function({ commit, dispatch, state }) {
            try {
                dispatch('beforeUpdate');
                dispatch('beforePost');
                
                if (state.cancelUpdate()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let primaryKey = state.record[state.primaryId];

                let { data } = await state.http.put(
                    state.dataurl + '/' + primaryKey, state.record
                );
                
                commit('record', data);
                commit('form', { state: false, mode: null });
                commit('table', { selected: [] });
                dispatch('message', 'proses update berhasil!');
                
                dispatch('afterUpdate');
                dispatch('afterPost');
            } catch (error) {
                dispatch('errors', error);
                commit('form', { state: false, mode: null });
            }
        },

        afterAddnew: function({ state }, payload) {
            state.afterAddnew(payload);
        },

        beforeAddnew: function({ state }, payload) {
            state.beforeAddnew(payload);
        },

        cancelAddnew: function({ state }, payload) {
            state.cancelAddnew(payload);
        },

        postAddnew: async function({ commit, dispatch, state }) {
            try {
                dispatch('beforeAddnew');
                dispatch('beforePost');

                if (state.cancelAddnew()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let { data } = await state.http.post(
                    state.dataurl, state.record
                );

                commit('pushRecords', data);
                commit('form', { state: false, mode: null });
                dispatch('message', 'proses simpan berhasil!');

                dispatch('afterAddnew');
                dispatch('afterPost');
            } catch (error) {
                dispatch('errors', error);
                commit('form', { state: false, mode: null });
            }
        },

        afterDelete: function({ state }, payload) {
            state.afterDelete(payload);
        },

        beforeDelete: function({ state }, payload) {
            state.beforeDelete(payload);
        },

        cancelDelete: function({ state }, payload) {
            state.cancelDelete(payload);
        },

        postDelete: async function({ commit, dispatch, state }) {
            try {
                dispatch('beforeDelete');

                if (state.cancelDelete()) {
                    commit('form', { state: false, mode: null });
                    return;
                }

                let response;
                let selected = state.table.selected;
                let currentRecord = state.record;

                if (state.page.state === 'pinned') {
                    selected = state.trash.selected;
                    currentRecord = state.table.selected[0];
                }

                if (selected.length <= 1) {
                    let index = state.records.findIndex(obj => obj.id === currentRecord.id);
                    let primaryKey = state.record[state.primaryId];

                    response = await state.http.delete(
                        state.dataurl + '/' + primaryKey
                    );

                    if (response) {
                        commit('spliceRecords', index);
                    }
                } else {
                    response = await state.http.post(
                        state.dataurl + '/bulks', selected
                    );

                    if (response) {
                        selected.forEach((record) => {
                            let index = state.records.findIndex(obj => obj.id === record.id);
                            commit('spliceRecords', index);
                        });
                    }
                }
            } catch (error) {
                dispatch('errors', error);
            } finally {
                commit('trash', { state: false });
                dispatch('message', 'proses hapus berhasil!');
                commit('page', { state: 'default' });
            }
        },

        updateProfile: async function({ dispatch, state }) {
            try {
                let { data } = await state.http.put(
                    '/api/profile', state.record
                );
                
                dispatch('auth', { update: data, theme: data.theme });
                dispatch('message', 'update profile berhasil!');
            } catch (error) {
                dispatch('errors', error);
            }
        },

        updatePassword: async function({ dispatch, state }, payload) {
            try {
                await state.http.put(
                    '/api/password', payload
                );
                
                dispatch('message', 'update password berhasil!');
            } catch (error) {
                dispatch('errors', error);
            }
        },

        fetchSetting: async function({ commit, state }) {
            try {
                let { data } = await state.http.get('/api/setting/company');
                commit('setting', data);
            } catch (error) {
                dispatch('errors', error);
            }
        },

        updateSetting: async function({ dispatch, state }) {
            try {
                await state.http.put(
                    '/api/setting/company', state.setting
                );
                
                dispatch('message', 'proses update berhasil!');
            } catch (error) {
                dispatch('errors', error);
            }
        },

        overideState: function({ state }, payload) {
            state.overideState(payload);
        },

        message: function({ commit }, payload) {
            commit('snackbar', {
                color: 'success',
                text: payload,
                state: true
            });
        },

        errors: function({ commit, state }, payload) {
            if (payload.hasOwnProperty('response')) {
                let { message, errors } = payload.response.data;
                let status = payload.response.status;

                if (status === 401) {
                    state.auth.signout();
                } else if (errors) {
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

            if (process.env.NODE_ENV === 'production') window.console.clear();
        }
    }
});

export default store;