import { mapActions, mapState } from 'vuex';

export const baseMixins = {
    computed: 
    {
        ...mapState([
            'device', 'info', 'page', 'search', 
            'snackbar', 'table', 'theme', 'upload'
        ]),
    },

    methods: 
    {
        ...mapActions([
            'getRecords', 'setPage', 
            'selectedRecord', 'selectedRecordUnset',
            'initUploadLibrary', 'setTableParams', 'setToolbar', 
            'snackbarClose', 'tableSelectedSet', 'tableSelectedRemove',
        ]),
    },

    mounted() {
        this.initUploadLibrary({
            baseEndpoint: 'https://awesome.dev/api/document'
        });
    },

    watch: 
    {
        'page.state': function(state) {
            this.setToolbar(state);
        },

        'search.findBy': function(findBy) {
            this.setTableParams(Object.assign({}, {
                page: this.table.options.page,
                itemsPerPage: this.table.options.itemsPerPage,
                sortBy: this.table.options.sortBy[0],
                sortDesc: this.table.options.sortDesc[0],
                filterOn: this.table.filter ? this.table.filter.filterOn : null, 
                filterBy: this.table.filter ? this.table.filter.filterBy : null,
                findOn: findBy ? this.search.findOn : null,
                findBy: findBy ? findBy : null,
                trashed: this.table.trashed
            }));
        },
        
        'table.options': {
            handler: function(options) {
                if (!options.sortBy) return;

                this.setTableParams(Object.assign({}, {
                    page: options.page,
                    itemsPerPage: options.itemsPerPage,
                    sortBy: options.sortBy[0],
                    sortDesc: options.sortDesc[0],
                    filterOn: this.table.filter ? this.table.filter.filterOn : null, 
                    filterBy: this.table.filter ? this.table.filter.filterBy : null,
                    findOn: this.search.findBy ? this.search.findOn : null,
                    findBy: this.search.findBy ? this.search.findBy : null,
                    trashed: this.table.trashed
                }));
            },

            deep: true
        },

        'table.filter': {
            handler: function(filter) {
                if (!this.table.options.sortBy) return;

                this.setTableParams({ 
                    page: this.table.options.page,
                    itemsPerPage: this.table.options.itemsPerPage,
                    sortBy: this.table.options.sortBy[0],
                    sortDesc: this.table.options.sortDesc[0],
                    filterOn: filter ? filter.filterOn : null, 
                    filterBy: filter ? filter.filterBy : null,
                    findOn: this.search.findBy ? this.search.findOn : null,
                    findBy: this.search.findBy ? this.search.findBy : null,
                    trashed: this.table.trashed
                });
            },

            deep: true
        },

        'table.selected': function(selected) {
            if (selected && 
                typeof selected === 'object' && 
                selected.constructor === Array && 
                selected.length
            ) {
                this.selectedRecord();
            } else {
                this.selectedRecordUnset();
            }
        },

        'table.trashed': function(trashed) {
            this.setTableParams({ 
                page: this.table.options.page,
                itemsPerPage: this.table.options.itemsPerPage,
                sortBy: this.table.options.sortBy[0],
                sortDesc: this.table.options.sortDesc[0],
                filterOn: this.table.filter ? this.table.filter.filterOn : null, 
                filterBy: this.table.filter ? this.table.filter.filterBy : null,
                findOn: this.search.findBy ? this.search.findOn : null,
                findBy: this.search.findBy ? this.search.findBy : null,
                trashed: trashed
            });
        },

        'table.params': {
            handler: function(params) {
                Object.keys(params).forEach(key => {
                    if (params[key] === null || typeof params[key] === 'undefined') {
                        delete params[key];
                    }
                });
                
                this.getRecords(params);
            },

            deep: true
        }
    }
};