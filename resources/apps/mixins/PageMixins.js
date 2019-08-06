import { mapState, mapActions } from 'vuex';

export const pageMixins = {
    computed: {
        ...mapState([])
    },

    methods: {
        ...mapActions(['dataUrl', 'pageInfo', 'setRecord', 'tableHeaders'])
    }
};