import { mapState, mapActions } from 'vuex';

export const pageMixins = {
    computed: {
        ...mapState([
            'auth', 'table', 'page', 'record', 'multiple', 'trash', 'form', 'search'
        ]),

        trashed: function() {
            return 'false';
        },

        desktop: function() {
            return !this.$vuetify.breakpoint.xsOnly;
        },

        tablet: function() {
            return this.$vuetify.breakpoint.smOnly;
        }
    },

    created() {
        this.$store.commit('http', this.$http);
        this.resetStore();

        if (!this.$root.theme) this.$root.theme = this.auth.theme;
    },

    mounted() {
        this.newRecord();
        this.fetchData();
    },

    methods: {
        ...mapActions([
            'resetStore', 'setHeaders', 'setPageInfo',
            'setPageUrl', 'setRecord', 'newRecord', 'fetchData',
            'afterSelected', 'overideState',
        ])
    },

    watch: {
        'auth.theme': function(newval) {
            this.$root.theme = newval;
        },

        'table.selected': function(newval) {
            switch (newval.length) {
                case 0:
                    if (this.search.text && this.search.text.length > 0) {
                        this.$store.commit('search', { state: true });
                    }

                    this.$store.commit('record', {});
                    this.$store.commit('page', { state: 'default' });
                    break;
                
                case 1:
                    this.$store.commit('search', { state: false });
                    this.$store.commit('record', newval[0]);
                    this.$store.commit('page', { state: 'select' });
                    
                    this.afterSelected(this.record);
                    break;
                
                default:
                    if (!this.multiple) {
                        this.$store.commit('table', { selected: []});
                        this.$store.commit('record', {});
                        this.$store.commit('page', { state: 'default' });
                    } else {
                        this.$store.commit('search', { state: false });
                        this.$store.commit('page', { state: 'delete' });
                    }
                    
                    break;
            }
        },

        'page.state': function(newval) {
            switch (newval) {
                case 'delete':
                    this.$store.commit('disabled', { add: true, delete: false, edit: true, find: true, link: true });
                    break;
                
                case 'select':
                    this.$store.commit('disabled', { add: true, delete: false, edit: false, find: true, link: false });
                    this.overideState();
                    break;
            
                default:
                    this.$store.commit('disabled', { add: false, delete: true, edit: true, find: false, link: true });
                    break;
            }
        },

        'table.paging': {
            handler: function(newval) {
                this.$store.dispatch('refetch', { fetch: newval });
            },

            deep: true
        },

        'search.text': function(newval, oldval) {
            this.$store.dispatch('refetch', {
                new: newval, 
                old: oldval
            });
        },
    }
};