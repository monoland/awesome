import shortid from 'shortid';
import { mapState, mapActions } from 'vuex';

export const baseMixins = {
    computed: {
        ...mapState(['auth', 'http', 'mobile', 'page', 'table', 'upload', 'snackbar']),

        user: function() {
            return this.auth.user;
        },

        menus: function() {
            return this.auth.menus;
        }
    },

    data:() => ({
        searchState: false,
        resetState: false
    }),

    created() {
        if (!this.http) {
            this.initData();
        }

        this.$root.theme = this.auth.user.theme;
    },

    mounted() {
        this.setUploadOptions({
            acceptFiles: this.upload.acceptFiles ? this.upload.acceptFiles : 'image/png, image/jpeg',
            allowedExtensions: this.upload.allowedExtensions ? this.upload.allowedExtensions : ['png', 'jpg', 'jpeg'],
            requestEndpoint: this.upload.requestEndpoint ? this.upload.requestEndpoint : '/api/media',
            uuid: shortid.generate()
        }).then(() => {
            this.setUpload();
        });
    },

    methods: {
        ...mapActions([
            'recordFetch',  'initData', 'removeSelectedRecord', 'signout',
            'snackbarClose', 'setButton', 'setSelectedRecord', 'setUpload', 'setUploadOptions'
        ]),

        homeRouter: function() {
            this.signout().then(() => {
                this.$root.drawer = null;
                this.$router.push({ name: 'login' });
            });
        }
    },

    watch: {
        'page.state': {
            handler: function(state, oldState) {
                if (state === 'newState' && oldState === null) {
                    this.searchState = false;
                    this.resetState = false;
                }

                if (state === 'searchState' && oldState === 'newState') {
                    this.searchState = true;
                    this.resetState = false;
                }

                if (state === 'newState' && oldState === 'searchState') {
                    this.searchState = false;
                    this.resetState = true;

                    this.setButton(state);
                }
            },

            deep: true
        },

        'page.findBy': {
            handler: function(findBy, oldFind) {
                if (this.searchState && findBy !== null) {
                    let searchOptions = {
                        page: 1,
                        itemsPerPage: this.table.options.itemsPerPage,
                        sortBy: this.table.options.sortBy[0],
                        sortDesc: this.table.options.sortDesc[0],
                        groupBy: this.table.options.groupBy[0],
                        groupDesc: this.table.options.groupDesc[0],
                        mustSort: this.table.options.mustSort,
                        multiSort: false,
                        findBy: findBy,
                        findIn: this.page.findIn
                    };

                    this.recordFetch(searchOptions);
                }

                if (this.resetState && oldFind !== '') {
                    let searchOptions = {
                        page: 1,
                        itemsPerPage: this.table.options.itemsPerPage,
                        sortBy: this.table.options.sortBy[0],
                        sortDesc: this.table.options.sortDesc[0],
                        groupBy: this.table.options.groupBy[0],
                        groupDesc: this.table.options.groupDesc[0],
                        mustSort: this.table.options.mustSort,
                        multiSort: false
                    };

                    this.recordFetch(searchOptions).then(() => {
                        this.resetState = false
                    });
                }
            },

            deep: true
        },

        'table.options': {
            handler: function(options) {
                if (!options.sortBy) return;

                let searchOptions = {
                    page: options.page,
                    itemsPerPage: options.itemsPerPage,
                    sortBy: options.sortBy[0],
                    sortDesc: options.sortDesc[0],
                    groupBy: options.groupBy[0],
                    groupDesc: options.groupDesc[0],
                    mustSort: options.mustSort,
                    multiSort: false
                };

                this.recordFetch(searchOptions);
            },

            deep: true
        },

        'table.selected': {
            handler: function(selected) {
                if (selected[0]) {
                    this.setSelectedRecord(selected[0]);
                } else {
                    this.removeSelectedRecord();
                    
                    if (this.page.findBy === null) {
                        this.setButton('newState');
                    } else {
                        this.setButton('searchState');
                    }
                }
            },

            deep: true
        },
    }
};