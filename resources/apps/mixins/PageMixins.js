import { mapState, mapActions } from 'vuex';

export const pageMixins = {
    computed: {
        ...mapState(['headers', 'page', 'record', 'records', 'table', 'toolbar']),

        desktop: function() {
            return !this.$vuetify.breakpoint.xsOnly;
        },

        tablet: function() {
            return this.$vuetify.breakpoint.smOnly;
        }
    },

    created() {
        this.initStore();
    },

    mounted() {
        this.recordNew();
        this.recordFetch();
    },

    methods: {
        ...mapActions([
            'afterSelected', 'dataUrl', 'recordFetch', 'initStore', 
            'overideState', 'pageInfo', 'recordNew', 'setRecord', 
            'setAfterSelected', 'setOverideState', 'tableHeaders'
        ])
    },

    watch: {
        'page.state': function(newval) {
            switch (newval) {
                case 'delete':
                    this.$store.commit('disabled', { add: true, delete: false, edit: true, find: true, link: true });
                    break;
                
                case 'select':
                    this.$store.commit('disabled', { add: true, delete: false, edit: false, find: true, link: false });
                    this.overideState();
                    break;
                
                case 'pinned':
                    this.$store.commit('disabled', { add: false, delete: true, edit: true, find: false, link: true });
                    break;
            
                default:
                    this.$store.commit('disabled', { add: false, delete: true, edit: true, find: false, link: true });
                    break;
            }
        },

        'table.paging': {
            handler: function(newval) {
                this.$store.dispatch('recordRefetch', { fetch: newval });
            },

            deep: true
        },

        'table.selected': function(newval) {
            switch (newval.length) {
                case 0:
                    if (this.toolbar.text && this.toolbar.text.length > 0) {
                        this.$store.commit('toolbar', { search: true });
                    }

                    if (this.page.state === 'pinned') {
                        this.$store.commit('toolbar', { delete: false });
                    }

                    this.$store.commit('record', {});
                    this.$store.commit('pageInfo', { state: 'default' });
                    break;
                
                case 1:
                    this.$store.commit('toolbar', { search: false });
                    this.$store.commit('record', newval[0]);
                    if (this.page.state !== 'pinned') this.$store.commit('pageInfo', { state: 'select' });
                    
                    this.afterSelected(this.record);
                    break;
                
                default:
                    this.$store.commit('toolbar', { search: false });
                    if (this.page.state !== 'pinned') this.$store.commit('pageInfo', { state: 'delete' });
                    
                    break;
            }
        },

        'toolbar.text': function(newval, oldval) {
            this.$store.dispatch('recordRefetch', {
                new: newval, 
                old: oldval
            });
        },
    }
};