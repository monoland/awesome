import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Axios from 'axios';
import Echo from 'laravel-echo';
import qq from 'fine-uploader/lib/core';
import Auth from '@apps/providers/AuthProvider';
import { baseURL, pusherEcho, pusherKey, pusherHost, pusherPort } from '@apps/.env.js';

let rootModule = {
    state: {
        auth: Auth,
        button: {
            add: false,
            edit: false,
            refresh: false,
            update: false,
            link: false,
            search: false
        },
        echo: null,
        fineUploader: null,
        form: {
            state: null,        // null | add | edit | delete
            model: false,
            maxWidth: 700,
            loader: false
        },
        http: null,
        info: {},
        lazy: false,
        links: {},
        meta: {},
        mobile: false,
        module: false,
        page: {
            dataURL: null,
            title: null,
            icon: null,
            state: null,        // newState | selectState | searchState
            subtitle: null,
            findIn: 'name',
            findBy: null
        },
        record: {},
        recordDefault: {},
        records: [],
        selected: [],
        snackbar: {
            color: null,
            state: false,
            text: null,
        },
        table: {
            headers: [],
            options: {},
            selected: [],
            key: 'id',
            loader: false,
            footerProps: { 'items-per-page-options': [10, 25, 50] },
        },
        upload: {
            acceptFiles: null,
            allowedExtensions: null,
            requestEndpoint: null,
            successEndpoint: '?completed=true',
            mediaName: null,
            fileName: null,
            model: false,
            uuid: null,
            input: null,
            progress: false,
            percent: 0,
            combined: false,
            uploadedBytes: 0, 
            totalBytes: 0,
            callback:() => {}
        }
    },

    mutations: {
        COMMIT_AUTH: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.auth[key] = payload[key];
            });
        },

        COMMIT_AXIOS: function(state, payload) 
        {
            state.http.defaults.headers.common['Authorization'] = payload.token_type + ' ' + payload.access_token;
        },

        COMMIT_BASEURL: function(state, payload) 
        {
            state.http.defaults.baseURL = payload;
            state.auth.baseURL = payload;
        },

        COMMIT_BUTTON_STATE: function(state, payload) 
        {
            state.page.state = payload;
            
            switch (payload) {
                case 'newState':
                    state.button.add = true;
                    state.button.edit = false;
                    state.button.delete = false;
                    state.button.link = false;
                    state.button.refresh = true;
                    state.button.search = true;
                    break;

                case 'selectedState':
                    state.button.add = false;
                    state.button.edit = true;
                    state.button.delete = true;
                    state.button.link = true;
                    state.button.refresh = false;
                    state.button.search = false;
                    break;
            }
        },

        COMMIT_CLEAR: function(state) 
        {
            state.auth.clear();
        },

        COMMIT_FINEUPLOADER: function(state, payload) 
        {
            state.fineUploader = payload;
        },

        COMMIT_FORM: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.form[key] = payload[key];
            });
        },

        COMMIT_HEADER: function(state, payload) 
        {
            state.table.headers = payload;
        },

        COMMIT_INFO: function(state, payload) 
        {
            state.info = payload;
        },

        COMMIT_LAZY: function(state, payload) 
        {
            state.lazy = payload;
        },

        COMMIT_LINKS: function(state, payload) 
        {
            state.links = payload;
        },

        COMMIT_META: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.meta[key] = payload[key];
            });
        },

        COMMIT_MOBILE: function(state, payload) 
        {
            state.mobile = payload;
        },

        COMMIT_MODULE: function(state, payload) 
        {
            state.module = payload;
        },

        COMMIT_OPTIONS: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.table.options[key] = payload[key];
            });
        },

        COMMIT_PAGE: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.page[key] = payload[key];
            });
        },

        COMMIT_RECORD: function(state, payload) 
        {
            state.record = payload;
        },

        COMMIT_RECORD_UPDATE: function(state, payload) 
        {
            let idx = state.records.findIndex(record => record.id === payload.id);

            if (idx !== -1) {
                Object.keys(payload).forEach(key => {
                    state.records[idx][key] = payload[key];
                });
            }
        },

        COMMIT_RECORDS: function(state, payload) 
        {
            if (payload.lazy) {
                payload.records.forEach(record => {
                    state.records.push(record);
                });
            } else {
                state.records = payload.records;
            }
        },

        COMMIT_RECORDS_PUSH: function(state, payload) 
        {
            state.records.push(payload);
        },

        COMMIT_RECORDS_SPLICE: function(state, payload) 
        {
            state.records.splice(payload, 1);
        },

        COMMIT_SIGNOUT: function(state) 
        {
            state.auth.clear();
            state.echo = null;
            state.http = null;
        },

        COMMIT_SNACKBAR: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.snackbar[key] = payload[key];
            });
        },

        COMMIT_TABLE: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.table[key] = payload[key];
            });
        },

        COMMIT_UPLOAD: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.upload[key] = payload[key];
            });
        },

        COMMIT_USER: function(state, payload)
        {
            state.auth.user = payload;
        },

        INITIAL_RECORD: function(state, payload) 
        {
            state.recordDefault = payload;
        },

        INITIAL_ECHO: function(state) 
        {
            if (state.echo === null && pusherEcho === true) {
                let options = {
                    broadcaster: 'pusher',
                    key: pusherKey,
                    wsHost: pusherHost,
                    wsPort: pusherPort,
                    wssPort: pusherPort,
                    disableStats: true,
                    authEndpoint: '/broadcasting/auth'
                }

                if (state.auth && state.auth.token) {
                    options = Object.assign({
                        auth: {
                            headers: {
                                Authorization: state.auth.token
                            },
                        }
                    }, options);
                }

                state.echo = new Echo(options);
            }
        },

        INITIAL_HTTP: function(state) 
        {
            if (state.http === null) {
                let headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                };

                if (state.auth && state.auth.token) {
                    headers = Object.assign({
                        'Authorization': state.auth.token
                    }, headers);
                }

                let currentURL = state.auth.baseURL ? state.auth.baseURL : baseURL;

                state.http = Axios.create({
                    baseURL: currentURL,
                    headers
                });
            } else {
                if (!state.http.defaults.headers.common.hasOwnProperty('Authorization') && state.auth.token !== null) {
                    state.http.defaults.headers.common['Authorization'] = state.auth.token;
                }
            }
        },

        INITIAL_PAGE: function(state) 
        {
            let options = {};
            
            if (state.mobile) {
                options = {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: [],
                    sortDesc: [],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                };
            }

            state.button = {
                add: false,
                edit: false,
                update: false,
                link: false,
                search: false
            };
            state.form = {
                state: null,
                model: false,
                maxWidth: 700,
                loader: false
            };
            state.info = {};
            state.lazy = false;
            state.links = {};
            state.meta = {};
            state.page = {
                dataURL: null,
                title: null,
                icon: null,
                state: 'newState',
                subtitle: null,
                findIn: 'name',
                findBy: null
            };
            state.record = {};
            state.recordDefault = {};
            state.records = [];
            state.table = {
                headers: [],
                options: options,
                selected: [],
                key: 'id',
                loader: false,
                footerProps: { 'items-per-page-options': [10, 25, 50] },
            };

            if (!state.upload.input) {
                state.upload = {
                    acceptFiles: null,
                    allowedExtensions: null,
                    requestEndpoint: null,
                    successEndpoint: '?completed=true',
                    fileName: null,
                    mediaName: null,
                    model: false,
                    uuid: null,
                    input: null,
                    progress: false,
                    percent: 0,
                    combined: false,
                    uploadedBytes: 0, 
                    totalBytes: 0,
                    callback:() => {}
                };
            }
        },

        INITIAL_UPLOAD: function(state) 
        {
            state.upload = {
                acceptFiles: null,
                allowedExtensions: null,
                requestEndpoint: null,
                successEndpoint: '?completed=true',
                fileName: null,
                mediaName: null,
                model: false,
                uuid: null,
                input: null,
                progress: false,
                percent: 0,
                combined: false,
                uploadedBytes: 0, 
                totalBytes: 0,
                callback:() => {}
            };
        }
    },

    actions: {
        addFormOpen: function({ commit }) 
        {
            commit('COMMIT_FORM', { state: 'add', model: true });
        },

        deleteFormOpen: function({ commit }) 
        {
            commit('COMMIT_FORM', { state: 'delete', model: true });
        },
        
        dialogClose: function({ commit, state }) 
        {
            commit('COMMIT_FORM', { state: null, model: false });
            commit('COMMIT_TABLE', { selected: []});
            commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));
        },

        dialogPost: function({ dispatch, state }, payload) 
        {
            if (state.form.state === 'add') dispatch('recordPost');
            if (state.form.state === 'delete') dispatch('recordDelete');
            if (state.form.state === 'edit') dispatch('recordUpdate');
            if (state.form.state === 'update') dispatch('recordPatch', payload);
        },

        editFormOpen: function({ commit }) 
        {
            commit('COMMIT_FORM', { state: 'edit', model: true });
        },

        fetchInfo: async function({ commit, state }) 
        {
            try {
                let { data } = await state.http.get('/info');

                commit('COMMIT_INFO', data);
            } catch (error) {
                dispatch('errorHandle', error);
            }
        },

        getNextData: function({ commit, dispatch, state }) 
        {
            if (state.meta.current_page && state.meta.current_page < state.meta.last_page) {
                commit('COMMIT_LAZY', true);
                
                let searchOptions = {
                    page: state.meta.current_page + 1,
                    itemsPerPage: state.table.options.itemsPerPage,
                    sortBy: state.table.options.sortBy[0],
                    sortDesc: state.table.options.sortDesc[0],
                    groupBy: state.table.options.groupBy[0],
                    groupDesc: state.table.options.groupDesc[0],
                    mustSort: state.table.options.mustSort,
                    multiSort: false
                };

                dispatch('recordFetch', searchOptions);
            }
        },

        initData: function({ commit, dispatch, state }) 
        {
            if (state.auth.logged && !state.auth.check) {
                dispatch('signout');
            }

            commit('INITIAL_ECHO');
            commit('INITIAL_HTTP');
        },

        initPage: function({ commit }, payload) 
        {
            commit('INITIAL_PAGE');
            commit('COMMIT_PAGE', payload);
        },

        message: function({ commit }, payload) 
        {
            commit('COMMIT_SNACKBAR', {
                color: 'success',
                text: payload,
                state: true
            });
        },

        recordFetch: async function({ commit, dispatch, state }, payload) 
        {
            commit('COMMIT_TABLE', { loader: state.auth.user.theme });

            try {
                let { data: { data: records, links, meta } } = await state.http.get(state.page.dataURL, {
                    params: payload
                });

                if (records) commit('COMMIT_RECORDS', { lazy: state.lazy, records });
                if (links) commit('COMMIT_LINKS', links);
                if (meta) commit('COMMIT_META', meta);
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_TABLE', { loader: false });
                commit('COMMIT_LAZY', false );
            }
        },

        recordFetchCurrent: async function({ commit, dispatch, state }, payload)
        {
            commit('COMMIT_FORM', { loader: true });

            try {
                let { data: current } = await state.http.get(state.page.dataURL, { 
                    params: payload 
                });

                commit('COMMIT_RECORD', Object.assign({}, current));
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_FORM', { loader: false });
            }
        },

        recordPost: async function({ commit, dispatch, state }) 
        {
            commit('COMMIT_FORM', { loader: true });

            try {
                let { data: record } = await state.http.post(state.page.dataURL, state.record);

                commit('COMMIT_RECORDS_PUSH', record);

                commit('COMMIT_FORM', { state: null, model: false });
                commit('COMMIT_TABLE', { selected: []});
                commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));

                if (state.records.length <= 1) {
                    dispatch('recordFetch', state.table.options);
                }

                dispatch('message', 'Proses Simpan Data Berhasil.');
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_FORM', { loader: false });
            }
        },

        recordRefresh: function({ dispatch, state }) 
        {
            dispatch('recordFetch', state.table.options);
        },

        recordSync: function({ commit, dispatch, state }, payload) 
        {
            commit('COMMIT_RECORDS_PUSH', payload);

            commit('COMMIT_FORM', { state: null, model: false });
            commit('COMMIT_TABLE', { selected: []});
            commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));

            if (state.records.length <= 1) {
                dispatch('recordFetch', state.table.options);
            }

            dispatch('message', 'Proses Simpan Data Berhasil.');
        },

        recordUpdate: async function({ commit, dispatch, state }) 
        {
            commit('COMMIT_FORM', { loader: true });

            try {
                let { data: record } = await state.http.put(`${state.page.dataURL}/${state.record[state.table.key]}`, state.record);

                commit('COMMIT_RECORD_UPDATE', record);

                commit('COMMIT_FORM', { state: null, model: false });
                commit('COMMIT_TABLE', { selected: []});
                commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));
                
                dispatch('message', 'Proses Ubah Data Berhasil.');
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_FORM', { loader: false });
            }
        },

        recordPatch: async function({ commit, dispatch, state }, payload)
        {
            commit('COMMIT_FORM', { loader: true });

            try {
                let serverURL = state.page.dataURL;
                if (payload && payload.hasOwnProperty('dataURL')) serverURL = serverURL + '/' + payload.dataURL;

                let { data: record } = await state.http.put(serverURL, state.record);

                commit('COMMIT_RECORD_UPDATE', record);
                if (payload && payload.hasOwnProperty('commit')) commit(payload, record);
                
                dispatch('message', 'Proses Update Data Berhasil.');
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_FORM', { loader: false });
            }
        },

        recordDelete: async function({ commit, dispatch, state }) 
        {
            commit('COMMIT_FORM', { loader: true });

            try {
                let idxRecord = state.records.findIndex(record => record.id === state.record.id);

                await state.http.delete(`${state.page.dataURL}/${state.record[state.table.key]}`);

                commit('COMMIT_RECORDS_SPLICE', idxRecord);

                commit('COMMIT_FORM', { state: null, model: false });
                commit('COMMIT_TABLE', { selected: []});
                commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));

                dispatch('message', 'Proses Hapus Data Berhasil.');
            } catch (error) {
                dispatch('errorHandle', error);
            } finally {
                commit('COMMIT_FORM', { loader: false });
            }
        },

        removeSelected: function({ commit }) 
        {
            commit('COMMIT_TABLE', { selected: []});
        },

        recordClick: function({ commit, state }, payload) 
        {
            if (state.page.state === 'newState' || state.page.state === 'searchState') {
                commit('COMMIT_TABLE', { selected: [payload] });
            } else {
                if (payload.id === state.table.selected[0].id) {
                    commit('COMMIT_TABLE', { selected: [] });
                    commit('COMMIT_PAGE', { state: 'newState' });
                } else {
                    commit('COMMIT_TABLE', { selected: [payload] });
                }
            }
        },

        removeSelectedRecord: function({ commit, state }) 
        {
            commit('COMMIT_RECORD', Object.assign({}, state.recordDefault));
        },

        searchData: function({ commit }, payload) 
        {
            commit('COMMIT_PAGE', payload);
        },

        searchFormOpen: function({ commit }) 
        {
            commit('COMMIT_PAGE', { state: 'searchState' });
        },

        searchFormClose: function({ commit }) 
        {
            commit('COMMIT_PAGE', { 
                state: 'newState',
                findBy: null
            });
        },

        setButton: function({ commit }, payload) 
        {
            commit('COMMIT_BUTTON_STATE', payload);
        },

        setFormState: function({ commit }, payload)
        {
            commit('COMMIT_FORM', { state: payload });
        },

        setFormModel: function({ commit }, payload) 
        {
            commit('COMMIT_FORM', { model: payload });
        },

        setHeader: function({ commit }, payload) 
        {
            commit('COMMIT_HEADER', payload);
        },

        setMobileMode: function({ commit }, payload) 
        {
            commit('COMMIT_MOBILE', payload);
        },

        setPageURL: function({ commit }, payload) 
        {
            commit('COMMIT_PAGE', { dataURL: payload });
        },

        setRecord: function({ commit }, payload) 
        {
            commit('INITIAL_RECORD', payload);
            commit('COMMIT_RECORD', Object.assign({}, payload));
        },
        
        setSelected: function({ commit }, payload) 
        {
            commit('COMMIT_TABLE', { selected: payload });
        },

        setSelectedRecord: function({ commit }, payload) 
        {
            commit('COMMIT_RECORD', Object.assign({}, payload));
            commit('COMMIT_BUTTON_STATE', 'selectedState');
        },

        signin: async function({ commit, dispatch, state }, payload) 
        {
            try {
                let { data: token } = await state.http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: state.auth.siteKey,
                    client_secret: state.auth.secretKey,
                    username: payload.username,
                    password: payload.userpass
                });

                commit('COMMIT_AUTH', { token: token });
                commit('COMMIT_AXIOS', token);

                let { data: user } = await state.http.get('/api/user');
                commit('COMMIT_AUTH', { user: user });

                let { data: menus } = await state.http.get('/api/menu');
                commit('COMMIT_AUTH', { menus: menus });
            } catch (error) {
                commit('COMMIT_CLEAR');
                
                dispatch('errorHandle', error);
            }
        },

        signout: function({ commit }) 
        {
            commit('COMMIT_SIGNOUT');
        },

        snackbarClose: function({ commit }) 
        {
            commit('COMMIT_SNACKBAR', { state: false });
        },

        setUpload: function({ commit, dispatch, state }) 
        {
            if (state.upload.progress) return;

            dispatch('setUploadObject').then(() => {
                commit('COMMIT_UPLOAD', { input: document.getElementById(state.upload.uuid).getElementsByTagName('input')[0] });
            });
        },

        setUploadOptions: function({ commit }, payload) 
        {
            commit('COMMIT_UPLOAD', payload);
        },

        setUploadCallback: function({ commit }, payload) 
        {
            commit('COMMIT_UPLOAD', { callback: payload });
        },

        setUploadObject: function({ commit, dispatch, state }) 
        {
            if (state.upload.fineUploader) {
                commit('COMMIT_UPLOAD', { fineUploader: null });
            }

            let requestEndpoint = state.upload.mediaName ? 
                `${state.upload.requestEndpoint}?mediaName=${state.upload.mediaName}` : 
                state.upload.requestEndpoint;
            
            let successEndpoint = state.upload.mediaName ? 
                `${state.upload.requestEndpoint}?mediaName=${state.upload.mediaName + state.upload.successEndpoint}` : 
                `${state.upload.requestEndpoint + state.upload.successEndpoint}`;

            let options = {
                button: document.getElementById(state.upload.uuid),

                request: {
                    customHeaders: {
                        Authorization: state.auth.token
                    },
                    endpoint: requestEndpoint,
                    filenameParam: 'fileName',
                    inputName: 'fileUpload',
                    uuidName: 'uuid',
                    totalFileSizeName: 'totalFileSize'
                },

                chunking: {
                    enabled: true,
                    mandatory: true,
                    partSize: 250000,
                    paramNames: {
                        chunkSize: 'chunkSize',
                        partByteOffset: 'partByteOffset',
                        partIndex: 'partIndex',
                        totalParts: 'totalParts'
                    },
                    success: {
                        endpoint: successEndpoint
                    }
                },

                validation: {
                    acceptFiles: state.upload.acceptFiles,
                    allowedExtensions: state.upload.allowedExtensions
                },

                callbacks: {
                    onUpload: function(id, name) {
                        commit('COMMIT_UPLOAD', { progress: true, model: true, fileName: name });
                    },

                    onUploadChunk: function(id, name, data) {
                        let percent = (parseInt(data.partIndex) + 1) / parseInt(data.totalParts) * 100;

                        commit('COMMIT_UPLOAD', { percent: percent.toFixed(2) });

                        if (percent >= 100) {
                            commit('COMMIT_UPLOAD', { combined: true });
                        }
                    },

                    onComplete: function(id, name, response) {
                        try {
                            commit('COMMIT_UPLOAD', { 
                                progress: false,
                                model: false,
                                fileName: null,
                                percent: 0,
                                combined: false,
                                uploadedBytes: 0,
                                totalBytes: 0
                            });    

                            state.upload.callback(response);
                        } catch (error) {
                            // 
                        }
                    },

                    onTotalProgress: function(uploadedBytes, totalBytes) {
                        let calcUploaded = (uploadedBytes / 1000000).toFixed(1);
                        let calcBytes = (totalBytes / 1000000).toFixed(1);
                        
                        commit('COMMIT_UPLOAD', { 
                            uploadedBytes: calcUploaded, 
                            totalBytes: calcBytes 
                        });
                    },

                    onError: function(id, name, errorReason, xhrOrXdr) {
                        commit('COMMIT_UPLOAD', {
                            progress: false,
                            model: false,
                            fileName: null,
                            percent: 0,
                            combined: false,
                            uploadedBytes: 0,
                            totalBytes: 0
                        });

                        dispatch('errorHandle', xhrOrXdr);
                    }
                }
            };

            commit('COMMIT_FINEUPLOADER', new qq.FineUploaderBasic(options));
        },

        errorHandle: function({ commit, dispatch, state }, payload) 
        {
            if (payload.hasOwnProperty('response')) {
                let { data: { message }, status } = payload.response;

                if (status === 401 || status === 403) {
                    dispatch('signout');
                }

                commit('COMMIT_SNACKBAR', {
                    color: 'error',
                    text: message,
                    state: true
                });
            } else {
                console.log(payload);
            }

            // window.console.clear();
        }
    }
};

export default new Vuex.Store(rootModule);