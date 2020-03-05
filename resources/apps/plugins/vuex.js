import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import Axios from 'axios';
import Resumable from 'resumablejs';
import AuthProvider from '@apps/providers/AuthProvider';

/**
 * define 4 state for page
 */
window.pageState = {
    DEFAULT: 'defaultState',
    DEFAULT_SELECT: 'defaultSelectState',
    TRASH: 'trashState',
    TRASH_SELECT: 'trashSelectState',
};

const defaultState = {
    /**
     * auth property
     */
    auth: AuthProvider,

    /**
     * the device property holder
     */
    device: {
        mobile: false,
        desktop: false
    },

    form: {
        /**
         * form model for each condition
         */
        addnew: false,
        update: false,
        delete: false,
        restore: false,
        forceDelete: false,
        
        /**
         * form state to determine which process active
         * available state:
         * - null
         * - addnewState
         * - updateState
         * - deleteState
         * - restoreState
         * - forceDeleteState
         */
        state: null,

        /**
         * mapping link title
         */
        linkTitle: null
    },

    /**
     * the axios instance to make http request
     */
    http: null,
    
    /**
     * the webapps info holder
     */
    info: {},

    /**
     * the webapps menus holder
     */
    menus: [],

    /**
     * the page information
     */
    page: {
        /**
         * the page icon
         */
        icon: null,

        /**
         * the page title
         */
        title: null,

        /**
         * the page state base on enum pageState
         */
        state: pageState.DEFAULT,

        /**
         * the webapp domain URL
         */
        domainURL: null,

        /**
         * the page data URL
         */
        dataURL: null,
        
        /**
         * the page combo
         */
        combos: {},

        /**
         * the page parent status
         * if value = false then toolbar will activate back button
         */
        parent: true,
        
        /**
         * the toolbar additional button
         * sample: { icon: 'check', text: 'update', click: method }
         */
        buttons: [],

        /**
         * the toolbar links button
         * sample: { icon: 'check', text: 'update', click: method }
         */
        links: [],

        /**
         * the custom form binding method
         */
        bindMethod: {},
        propMethod: {},

        /**
         * the page fetch mode
         * default | single
         */
        fetchMode: 'default',

        /**
         * the page data filters
         * sample: { text: 'text', icon: 'text', value: { filterOn: 'field', filterBy: 'text' }},
         */
        filters: [],

        /**
         * the page CRUD usable
         */
        useCRUD: true,

        /**
         * the page permission for active user
         */
        permissions: {
            create: false,
            delete: false,
            update: false,
            restore: false,
            forceDelete: false,
        },

        /**
         * the softDeletes property holder
         */
        softDeletes: false,

        /**
         * the page initial property to determine that page was init render
         */
        initial: false,

        /**
         * the page lazyload property to determine the mobile lazyload
         */
        lazyload: false,
    },

    /**
     * the active page record propery
     */
    record: {},

    /**
     * the active page recordBase propery
     * this property used for assign to the record
     */
    recordBase: {},

    /**
     * the active page records holders
     */
    records: [],

    /**
     * the toolbar search propery
     */
    search: {
        state: false,
        findOn: 'name',
        findBy: null
    },

    /**
     * the webapp snackbar property
     */
    snackbar: {
        color: null,
        state: false,
        text: null,
    },

    /**
     * the page table property
     */
    table: {
        /**
         * the table headers property
         * sample: { text: 'text', value: 'text', class: 'text' }
         */
        headers: [],

        /**
         * the table key
         */
        key: 'id',

        /**
         * the table loader property to determine data was fetch from server
         */
        loader: false,
        
        /**
         * the table option propery, this property was auto-create by datatable
         */
        options: {},
        
        /**
         * the table selected property
         */
        selected: [],
        
        /**
         * the table selected index to determine which records in selected
         */
        selectedIndex: null,
        
        /**
         * the table total property
         */
        total: 0,
        
        /**
         * the table current page property
         */
        current_page: 0,
        
        /**
         * the table last page property
         */
        last_page: 0,

        /**
         * the table overwrite state
         */
        overwrite: false,
        
        /**
         * the table params to hold all params that send to server
         */
        params: {},
        
        /**
         * the last_params to hold info last request was made
         * this to avoid the same request make by moui
         */
        last_params: null,
        
        /**
         * the table active filter, the value for this property
         * was get from the page filters
         */
        filter: null,
        
        /**
         * the table transh property to determine softDeletes was used
         */
        trashed: null
    },

    /**
     * the webapp theme property
     */
    theme: null,

    /**
     * the toolbar button property
     */
    toolbar: {
        addnew: false,
        delete: false,
        edit: false,
        forceDelete: false,
        link: false,
        refresh: false,
        restore: false,
        search: false,
    },

    upload: {
        uploadLib: null,
        query: {},
        baseEndpoint: null,
        requestEndpoint: null,
        callback:() => {},
        
        progress: false,
        percent: 0,
        filename: 'untitled',
        size: 0
    },

    /**
     * the active user holder
     */
    user: {}
};

/**
 * restore information from storage
 */
if (defaultState.auth.check) {
    defaultState.info = defaultState.auth.info;
    defaultState.menus = defaultState.auth.menus;
    defaultState.theme = defaultState.auth.theme;
    defaultState.user = defaultState.auth.user;
}

export default new Vuex.Store({
    state: Object.assign({}, defaultState),
    
    mutations: 
    {
        DEVICE_MUTATION: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.device[key] = payload[key];
            });
        },

        FORM_MUTATION: function(state, payload) 
        {
            Object.keys(state.form).forEach(key => {
                if (key !== 'state' || key !== 'linkTitle') {
                    state.form[key] = false;
                }
            });
            
            Object.keys(payload).forEach(key => {
                state.form[key] = payload[key];
            });
        },

        FORM_KEY_MUTATION: function(state, payload)
        {
            if (!state.form.hasOwnProperty(payload)) {
                state.form[payload] = false;
            }
        },
        
        HTTP_MUTATION: function(state, payload) 
        {
            if (!state.http) {
                if (!state.page.domainURL) return;

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

                state.http = Axios.create({
                    baseURL: state.page.domainURL,
                    headers
                });
            } else {
                if (!payload || !Object.keys(payload).length) return;

                Object.keys(payload).forEach(key => {
                    switch (key) {
                        case 'domain':
                            state.auth.domainURL = payload[key];
                            state.http.defaults.baseURL = payload[key];
                            break;
                    
                        case 'token':
                            state.auth.token = payload[key];
                            state.http.defaults.headers.common['Authorization'] = payload[key].token_type + ' ' + payload[key].access_token;
                            break;
                    }
                });
            }
        },
        
        INFO_MUTATION: function(state, payload) 
        {
            state.info = payload;
        },

        LOADER_MUTATION: function(state, payload)
        {
            state.table.loader = payload;
        },

        MENU_MUTATION: function(state, payload) 
        {
            state.menus = payload;

            state.auth.menus = payload;
        },
        
        PAGE_MUTATION: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                if (key === 'title') {
                    state.page.state = pageState.DEFAULT;
                }

                state.page[key] = payload[key];
            });
        },

        PAGE_SETUPS_MUTATION: function(state, payload)
        {
            if (payload.hasOwnProperty('record')) {
                state.recordBase = Object.assign({}, payload.record) ;
                state.record = Object.assign({}, state.recordBase);
                
                delete payload.record;
            }

            if (payload.hasOwnProperty('headers')) {
                state.table.headers = payload.headers;
                delete payload.headers;
            }

            if (payload.hasOwnProperty('findOn')) {
                state.search.findOn = payload.findOn;

                delete payload.findOn;
            }
            
            Object.keys(payload).forEach(key => {
                state.page[key] = payload[key];
            });
        },

        PARAMS_MUTATION: function(state, payload)
        {
            Object.keys(payload).forEach(key => {
                state.table.params[key] = payload[key];
            });
        },

        RECORD_MUTATION: function(state, payload) 
        {
            state.record = Object.assign({}, payload);
        },

        RECORD_BASE_MUTATION: function(state, payload)
        {
            state.recordBase = payload;
        },

        RECORDS_MUTATION: function(state, payload)
        {
            if (state.device.mobile && !state.table.overwrite) {
                if (payload && payload.length) {
                    payload.forEach(record => {
                        state.records.push(record);
                    });
    
                    state.page.lazyload = true;
                } else {
                    state.records = [];    
                }
            } else {
                state.records = payload;
                state.table.overwrite = false;
            }
        },

        RECORDS_PUSH_MUTATION: function(state, payload)
        {
            state.records.push(payload);

            state.table.total = state.records.length;
            state.table.last_page = Math.floor(state.records.length / state.table.options.itemsPerPage) + 1;
        },

        RECORDS_SPLICE_MUTATION: function(state)
        {
            state.records.splice(state.table.selectedIndex, 1);
        },

        RECORDS_UPDATE_MUTATION: function(state, payload)
        {
            let { index, record } = payload;

            Object.keys(record).forEach(key => {
                state.records[index][key] = record[key];
            });
        },

        RESET_MUTATION: function(state, payloads) 
        {
            let cloneState = Object.assign({}, defaultState);

            if (!payloads) {
                /**
                 * logout
                 */
                Object.keys(cloneState).forEach(key => {
                    if (!cloneState[key]) return;

                    if (cloneState[key].constructor === Object) {
                        state[key] = Object.assign({}, cloneState[key]);
                    } else if(cloneState[key].constructor === Array) {
                        state[key] = Object.assign([], cloneState[key]);
                    } else {
                        state[key] = cloneState[key];
                    }
                });
            } else {
                /**
                 * set page
                 */
                Object.entries(payloads).forEach(([idx, val]) => {
                    if (cloneState[val].constructor === Object) {
                        state[val] = Object.assign({}, cloneState[val]);
                    } else if(cloneState[val].constructor === Array) {
                        state[val] = Object.assign([], cloneState[val]);
                    }
                });
            }
        },

        SEARCH_MUTATION: function(state, payload)
        {
            Object.keys(payload).forEach(key => {
                state.search[key] = payload[key];
            });
        },
        
        SNACKBAR_MUTATION: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.snackbar[key] = payload[key];
            });
        },

        TABLE_MUTATION: function(state, payload) 
        {
            Object.keys(payload).forEach(key => {
                state.table[key] = payload[key];
            });
        },

        TABLE_PARAMS_MUTATION: function(state, payload)
        {
            state.table.params.page = payload;
        },

        TABLE_SELECT_MUTATION: function(state, payload)
        {
            state.table.selected = payload;

            if (state.table.selected.length) {
                state.table.selectedIndex = state.records.findIndex(record => record[state.table.key] === payload[0][state.table.key]);

                if (state.search.state) {
                    state.search.state = false;
                }
            } else {
                state.table.selectedIndex = null;

                if (state.table.params.hasOwnProperty('findBy') && state.table.params.findBy) {
                    state.search.state = true;
                }
            }
        },

        THEME_MUTATION: function(state, payload) 
        {
            state.theme = payload;

            state.auth.theme = payload;
        },
        
        TOOLBAR_MUTATION: function(state, payload) 
        {
            switch (payload) {
                case window.pageState.DEFAULT:
                    state.toolbar.addnew = state.page.permissions.create ? true : false;
                    state.toolbar.refresh = true;
                    state.toolbar.search = true;

                    state.toolbar.delete = false;
                    state.toolbar.edit = false;
                    state.toolbar.forceDelete = false;
                    state.toolbar.link = false;
                    state.toolbar.restore = false;
                    break;
            
                case window.pageState.DEFAULT_SELECT:
                    state.toolbar.delete = state.page.permissions.delete ? true : false;
                    state.toolbar.edit = state.page.permissions.update ? true : false;
                    state.toolbar.link = true;

                    state.toolbar.addnew = false;
                    state.toolbar.forceDelete = false;
                    state.toolbar.refresh = false;
                    state.toolbar.restore = false;
                    state.toolbar.search = false;
                    break;

                case window.pageState.DEFAULT_SEARCH:
                    break;

                case window.pageState.TRASH:
                    state.toolbar.refresh = true;
                    state.toolbar.search = true;

                    state.toolbar.addnew = false;
                    state.toolbar.delete = false;
                    state.toolbar.edit = false;
                    state.toolbar.forceDelete = false;
                    state.toolbar.link = false;
                    state.toolbar.restore = false;
                    break;
                
                case window.pageState.TRASH_SELECT:
                    state.toolbar.forceDelete = state.page.permissions.forceDelete ? true : false;
                    state.toolbar.restore = state.page.permissions.restore ? true : false;

                    state.toolbar.addnew = false;
                    state.toolbar.delete = false;
                    state.toolbar.edit = false;
                    state.toolbar.link = false;
                    state.toolbar.refresh = false;
                    state.toolbar.search = false;
                    break;
                
                case window.pageState.TRASH_SEARCH:
                    break;
            }
        },

        TOOLBAR_BUTTON_MUTATION: function(state, payload) {
            Object.keys(payload).forEach(key => {
                state.toolbar[key] = payload[key];
            });
        },

        UPLOAD_MUTATION: function(state, payload)
        {
            if (!payload) return;

            Object.keys(payload).forEach(key => {
                state.upload[key] = payload[key];
            });
        },

        USER_MUTATION: function(state, payload) 
        {
            state.user = payload;

            state.auth.user = payload;
            state.auth.info = state.info;
        }
    },
    
    actions: {
        assignFileBrowse: function({ commit, state }, payload)
        {
            let fileBrowse = document.getElementById('upload-button').getElementsByTagName('input');

            if (fileBrowse && fileBrowse.length) {
                
                if (payload.hasOwnProperty('fileType')) {
                    fileBrowse[0].setAttribute('accept', payload.fileType);

                    delete payload.fileType;
                } else {
                    fileBrowse[0].removeAttribute('accept');
                }

                commit('UPLOAD_MUTATION', payload);

                fileBrowse[0].click();
            }
        },

        deviceResize: function({ commit, state }) 
        {
            let isMobile = window.innerWidth < 600;
            let xpayload = { mobile: isMobile, desktop: !isMobile };

            if (JSON.stringify(xpayload) !== JSON.stringify(state.device)) {
                if (!isMobile && state.device.mobile && state.page.lazyload) {
                    commit('TABLE_PARAMS_MUTATION', 1 );
                }
                
                commit('DEVICE_MUTATION', xpayload);
            }
        },

        formAddnewOpen: function({ commit })
        {
            commit('FORM_MUTATION', { state: 'addnewState', addnew: true });
        },

        formClose: function({ commit, state }, payload)
        {
            if (payload) {
                commit('FORM_MUTATION', { state: null, [payload]: false });
            } else {
                commit('FORM_MUTATION', { state: null });
            }

            commit('TABLE_MUTATION', { selected: [], selectedIndex: null });
            commit('RECORD_MUTATION', state.recordBase);
            
            if (state.page.state === window.pageState.DEFAULT_SELECT) {
                commit('PAGE_MUTATION', { state: window.pageState.DEFAULT });
            } else if (state.page.state === window.pageState.TRASH_SELECT) {
                commit('PAGE_MUTATION', { state: window.pageState.TRASH });
            }
        },

        formDeleteOpen: function({ commit })
        {
            commit('FORM_MUTATION', { state: 'deleteState', delete: true });
        },

        formLinkOpen: function({ commit, state }, payload)
        {
            if (payload.hasOwnProperty('props')) {
                commit('FORM_MUTATION', { 
                    state: `${payload.props}State`, 
                    [payload.props]: true, 
                    linkTitle: payload.text 
                });
            } else if (
                payload.hasOwnProperty('method') && 
                state.page.bindMethod.hasOwnProperty(payload.method) &&
                typeof state.page.bindMethod[payload.method] === 'function'
            ) {
                state.page.bindMethod[payload.method]();
            }
        },

        formUpdateOpen: function({ commit })
        {
            commit('FORM_MUTATION', { state: 'updateState', update: true });
        },

        formForceDeleteOpen: function({ commit })
        {
            commit('FORM_MUTATION', { state: 'forceDeleteState', forceDelete: true });
        },

        formKeyAdd: function({ commit }, payload)
        {
            commit('FORM_KEY_MUTATION', payload);
        },

        formPost: function({ dispatch, state }) 
        {
            switch (state.form.state) {
                case 'addnewState':
                    dispatch('recordAddnew');
                    break;
                
                case 'deleteState':
                    dispatch('recordDelete');
                    break;
                
                case 'updateState':
                    dispatch('recordUpdate');
                    break;
                
                case 'restoreState':
                    dispatch('recordRestore');
                    break;

                case 'forceDeleteState':
                    dispatch('recordForceDelete');
                    break;
            
                default:
                    if (state.page.propMethod.hasOwnProperty(state.form.state) && 
                        typeof state.page.propMethod[state.form.state] === 'function'
                    ) {
                        state.page.propMethod[state.form.state]();
                    }
                    break;
            }
        },

        formRestoreOpen: function({ commit })
        {
            commit('FORM_MUTATION', { state: 'restoreState', restore: true });
        },

        getAppsInfo: async function({ commit, dispatch, state }, payload) 
        {
            try {
                let { data: info } = await state.http.get(payload.url);

                commit('INFO_MUTATION', info);

                return true;
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            }
        },

        getRecords: async function({ commit, dispatch, state }, payload) 
        {
            try {
                commit('LOADER_MUTATION', true);

                if (!state.table.last_params) {
                    commit('TABLE_MUTATION', { last_params: Object.assign({}, payload, { url: state.page.dataURL }) });
                } else {
                    if (JSON.stringify(state.table.last_params) === JSON.stringify(Object.assign({}, payload, { url: state.page.dataURL }))) {
                        return;
                    } else {
                        commit('TABLE_MUTATION', { last_params: Object.assign({}, payload, { url: state.page.dataURL }) });
                    }
                }
                
                let { 
                    data: { data: records, meta, setups } 
                } = await state.http.get(state.page.dataURL, {
                    params: payload
                });

                if (setups && Object.keys(setups).length && state.page.initial) {
                    commit('PAGE_SETUPS_MUTATION', setups);
                    commit('TOOLBAR_MUTATION', window.pageState.DEFAULT);
                }
                
                if (meta && Object.keys(meta).length) {
                    commit('TABLE_MUTATION', {
                        total: meta.total,
                        current_page: meta.current_page,
                        last_page: meta.last_page,
                    });
                }

                commit('RECORDS_MUTATION', records);

                if (state.page.fetchMode === 'single') {
                    if (records && records.length > 0) {
                        commit('RECORD_MUTATION', records[0]);
                    }
                    
                    commit('PAGE_MUTATION', { useCRUD: false });
                }
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        getRecordsNext: function({ commit, state })
        {
            if (state.table.current_page && (state.table.current_page < state.table.last_page)) {
                commit('TABLE_PARAMS_MUTATION', state.table.current_page + 1 );
            }
        },

        getUserInfo: async function({ commit, dispatch, state }, payload) 
        {
            try {
                if (!payload.hasOwnProperty('overwrite') && Object.keys(state.auth.info).length) return;
                if (payload.overwrite === false) return;

                let { data: user } = await state.http.get(payload.url);

                commit('USER_MUTATION', user);
                commit('THEME_MUTATION', user.theme);
                
                return true;
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            }
        },

        getUserMenu: async function({ commit, dispatch, state }, payload) 
        {
            try {
                if (!payload.hasOwnProperty('overwrite') && Object.keys(state.auth.menus).length) return;
                if (payload.overwrite === false) return;

                let { data: menus } = await state.http.get(payload.url);

                commit('MENU_MUTATION', menus);

                return menus;
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            }
        },

        initUploadLibrary: function({ commit, state }, payload)
        {
            commit('UPLOAD_MUTATION', { 
                uploadLib : null,
                baseEndpoint: payload.baseEndpoint,
                requestEndpoint: payload.baseEndpoint,
            });

            let uploadLib = new Resumable({
                chunkNumberParameterName: 'chunkNumb',
                totalChunksParameterName: 'chunkMaxs',
                chunkSizeParameterName: 'chunkSize',
                totalSizeParameterName: 'totalSize',
                identifierParameterName: 'uuid',
                currentChunkSizeParameterName: 'currentSize',
                fileNameParameterName: 'fileName',
                relativePathParameterName: 'relativePath',
                typeParameterName: 'mimeType',
                chunkSize: 250000,
                forceChunkSize: true,
                testChunks: false,
                simultaneousUploads: 1,

                target: function() { return state.upload.requestEndpoint },
                query: function() { return state.upload.query },
                headers: {
                    Authorization: state.auth.token
                }
            });

            let bytesToSize = function(bytes) {
                let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                if (bytes == 0) return 'n/a';
                let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
                if (i == 0) return bytes + ' ' + sizes[i];
                return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
            };

            uploadLib.assignBrowse(document.getElementById('upload-button'));

            uploadLib.on('fileAdded', function(file) {
                commit('UPLOAD_MUTATION', {
                    filename: file.fileName,
                    size: bytesToSize(file.size)
                });
                
                uploadLib.upload();
            });

            uploadLib.on('fileProgress', function(file) {
                commit('UPLOAD_MUTATION', { 
                    percent: Math.floor(file.progress() * 100)
                });
            });

            uploadLib.on('fileSuccess', function(file, message) {
                state.upload.callback(JSON.parse(message));
            });

            uploadLib.on('uploadStart', function() {
                commit('UPLOAD_MUTATION', { 
                    progress: true 
                });
            });

            uploadLib.on('complete', function() {
                commit('UPLOAD_MUTATION', { 
                    progress: false,
                    percent: 100
                });
            });

            commit('UPLOAD_MUTATION', { 
                uploadLib : uploadLib
            });
        },

        message: function({ commit }, payload)
        {
            commit('SNACKBAR_MUTATION', {
                color: 'success',
                text: payload,
                state: true
            });
        },

        pageInitialUnset: function({ commit })
        {
            commit('PAGE_SETUPS_MUTATION', { initial: false });
        },

        recordAddnew: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: record } = await state.http.post(state.page.dataURL, state.record);
                
                commit('RECORDS_PUSH_MUTATION', record);

                dispatch('formClose');

                dispatch('message', 'Proses penyimpanan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordDelete: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                await state.http.delete(`${state.page.dataURL}/${state.record[state.table.key]}`);

                commit('RECORDS_SPLICE_MUTATION');

                dispatch('formClose');

                dispatch('message', 'Proses penghapusan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordForceDelete: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                await state.http.delete(`${state.page.dataURL}/${state.record[state.table.key]}/delete`);

                commit('RECORDS_SPLICE_MUTATION');

                dispatch('formClose');

                dispatch('message', 'Proses penghapusan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordMoveDown: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: { data: records } } = await state.http.post(`${state.page.dataURL}/${state.record[state.table.key]}/movedown`, state.table.params);

                commit('TABLE_MUTATION', { overwrite: true, selected: [], selectedIndex: null });
                commit('RECORDS_MUTATION', records);

            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordMoveUp: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: { data: records } } = await state.http.post(`${state.page.dataURL}/${state.record[state.table.key]}/moveup`, state.table.params);

                commit('TABLE_MUTATION', { overwrite: true, selected: [], selectedIndex: null });
                commit('RECORDS_MUTATION', records);

            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordPatch: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: record } = await state.http.put(`${state.page.dataURL}/${state.record[state.table.key]}`, state.record);

                commit('RECORD_MUTATION', record );

                dispatch('message', 'Proses perubahan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordPost: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: record } = await state.http.post(state.page.dataURL, state.record);
                
                commit('RECORD_MUTATION', record);

                if (record.hasOwnProperty('avatar')) {
                    commit('USER_MUTATION', record);
                    commit('THEME_MUTATION', record.theme);
                }

                dispatch('message', 'Proses perubahan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordRestore: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                await state.http.post(`${state.page.dataURL}/${state.record[state.table.key]}/restore`);

                commit('RECORDS_SPLICE_MUTATION');

                dispatch('formClose');

                dispatch('message', 'Proses pengembalian data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordUpdate: async function({ commit, dispatch, state })
        {
            try {
                commit('LOADER_MUTATION', true);

                let { data: record } = await state.http.put(`${state.page.dataURL}/${state.record[state.table.key]}`, state.record);

                commit('RECORDS_UPDATE_MUTATION', { index: state.table.selectedIndex, record });

                dispatch('formClose');

                dispatch('message', 'Proses perubahan data berhasil.');
            } catch (error) {
                dispatch('catchError', error).then(() => {
                    return false;
                });   
            } finally {
                commit('LOADER_MUTATION', false);
            }
        },

        recordsRefresh: function({ dispatch, state }) {
            dispatch('getRecords', state.table.params);
        },

        resetPage: function({ commit }, payload)
        {
            commit('RESET_MUTATION', payload);
        },

        searchFormClose: function({ commit, state }) 
        {
            commit('SEARCH_MUTATION', { state: false });
        },

        searchFormOpen: function({ commit, state })
        {
            commit('SEARCH_MUTATION', { state: true });
        },

        selectedRecord: function({ commit, state })
        {
            commit('RECORD_MUTATION', state.table.selected[0]);
        },

        selectedRecordUnset: function({ commit, state })
        {
            commit('RECORD_MUTATION', state.recordBase);
        },

        setPage: function({ commit, dispatch, state }, payload) 
        {
            if (payload.hasOwnProperty('domainURL')) {
                commit('PAGE_MUTATION', payload);

                commit('HTTP_MUTATION', { domain: payload.domainURL });
            } else {
                dispatch('resetPage', ['page', 'record', 'records', 'search', 'toolbar']);
            
                if (payload.hasOwnProperty('headers')) {
                    commit('TABLE_MUTATION', { headers: payload.headers });
                    
                    delete payload.headers;
                }

                if (payload.hasOwnProperty('record')) {
                    commit('RECORD_BASE_MUTATION', payload.record);
                    commit('RECORD_MUTATION', payload.record);
                    
                    delete payload.record;
                }

                if (payload.hasOwnProperty('findOn')) {
                    commit('SEARCH_MUTATION', { findOn: payload.findOn });

                    delete payload.findOn;
                }

                commit('PAGE_MUTATION', Object.assign({}, payload, { initial: true }));

                if (payload.hasOwnProperty('dataURL') && state.device.mobile) {
                    commit('TABLE_MUTATION', { options: {
                        page: 1,
                        itemsPerPage: 10,
                        sortBy: [],
                        sortDesc: [],
                        filterOn: null,
                        filterBy: null,
                        findOn: null,
                        findBy: null
                    }})
                } else if (payload.hasOwnProperty('dataURL') && state.device.desktop) {
                    dispatch('resetPage', ['table']);
                }
            }
    
            return true;
        },

        setRouteRegister: function({ state })
        {
            let routes = [];
            const pages = require.context('@apps/pages', true, /index\.vue$/);

            pages.keys().forEach(page => {
                const pageComponent = pages(page).default;
            
                if (!pageComponent.hasOwnProperty('route')) return;
            
                let { path, name, auth, apps, root } = pageComponent.route;
            
                if (typeof root === 'boolean' && root === true) {
                    routes.push({ path, meta: { auth }, apps: apps, component: pageComponent, children: [] });
                } else {
                    routes.push({ path, name, component: pageComponent });
                }    
            });

            pages.keys().forEach(page => {
                const pageComponent = pages(page).default;
        
                if (pageComponent.hasOwnProperty('route')) return;
        
                let menu = state.auth.menus.find(menu => menu.slug === pageComponent.name);
                
                if (!menu) return;
                
                let { slug, path, apps } = menu;
        
                let route = routes.find(obj => obj.apps === apps);
        
                if (!route) return;
        
                route.children.push({ path: path, name: slug, component: pageComponent });
            });

            return routes;
        },

        setSeachFindBy: function({ commit }, payload)
        {
            commit('SEARCH_MUTATION', { findBy: payload });
        },

        setTableFilter: function({ commit }, payload)
        {
            if (payload && payload.hasOwnProperty('trashed')) {
                commit('TABLE_MUTATION', { trashed: payload.trashed, selected: [] });
                commit('PAGE_MUTATION', { state: payload.trashed ? window.pageState.TRASH : window.pageState.DEFAULT });
            } else {
                commit('TABLE_MUTATION', { filter: payload });
            }
        },

        setTableParams: function({ commit }, payload) 
        {
            commit('TABLE_MUTATION', { params: payload });
        },

        setTableSelected: function({ commit, state }, payload)
        {
            commit('TABLE_SELECT_MUTATION', payload);

            if (payload && typeof payload === 'object' && payload.constructor === Array && payload.length) {
                if (state.page.state === window.pageState.DEFAULT) {
                    commit('PAGE_MUTATION', { state: window.pageState.DEFAULT_SELECT });
                } else if (state.page.state === window.pageState.TRASH) {
                    commit('PAGE_MUTATION', { state: window.pageState.TRASH_SELECT });
                }
            } else {
                if (state.page.state === window.pageState.DEFAULT_SELECT) {
                    commit('PAGE_MUTATION', { state: window.pageState.DEFAULT });
                } else if (state.page.state === window.pageState.TRASH_SELECT) {
                    commit('PAGE_MUTATION', { state: window.pageState.TRASH });
                }
            }    
        },

        setTableSelectedIndex: function({ commit, dispatch, state }, payload)
        {
            if (typeof payload !== 'undefined') {
                commit('TABLE_MUTATION', { selectedIndex: parseInt(payload) });
                dispatch('setTableSelected', [state.records[payload]]);
            } else {
                commit('TABLE_MUTATION', { selectedIndex: null });
                dispatch('setTableSelected', []);
            }
        },

        setToolbar: function({ commit }, payload) {
            commit('TOOLBAR_MUTATION', payload);
        },

        signIn: async function({ commit, dispatch, state}, payload) 
        {
            try {
                if (!payload.username || !payload.userpass) {
                    commit('SNACKBAR_MUTATION', {
                        color: 'warning',
                        text: 'username or password can not be empty',
                        state: true
                    });
                    
                    return false;
                }

                let { data: token } = await state.http.post('/oauth/token', {
                    grant_type: 'password',
                    client_id: state.auth.siteKey,
                    client_secret: state.auth.secretKey,
                    username: payload.username,
                    password: payload.userpass
                });

                commit('HTTP_MUTATION', { token: token });

                return true;
            } catch (error) {
                state.auth.clear();

                dispatch('catchError', error).then(() => {
                    return false;
                });
            }
        },

        signOut: function({ commit, state }) 
        {
            commit('RESET_MUTATION');
            commit('USER_MUTATION', {});
            commit('THEME_MUTATION', null);

            return state.auth.stores;
        },

        snackbarClose: function({ commit })
        {
            commit('SNACKBAR_MUTATION', { state: false });
        },

        catchError: function({ commit, dispatch }, payload) 
        {
            if (process.env.NODE_ENV === 'production') {
                window.console.clear();
            }

            if (payload.hasOwnProperty('response') && payload.response) {
                let { data: { message }, status } = payload.response;

                if (status === 404) {
                    commit('SNACKBAR_MUTATION', {
                        color: 'error',
                        text: 'URL was not found on server',
                        state: true
                    });
                } else {
                    if (status === 401 || status === 403) {
                        dispatch('signout');
                    }
    
                    commit('SNACKBAR_MUTATION', {
                        color: 'error',
                        text: message,
                        state: true
                    });
                }
            } else {
                if (process.env.NODE_ENV !== 'production') {
                    console.log(payload);    
                }
            }
        }
    }
});