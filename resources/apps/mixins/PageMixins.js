import { mapState, mapActions } from 'vuex';

export const pageMixins = {
    computed: {
        ...mapState(['button', 'fineUploader', 'mobile', 'record', 'upload']),
    },

    methods: {
        ...mapActions([
            'dialogPost', 'initPage', 'recordFetchCurrent', 'setHeader', 
            'setPageURL', 'setRecord', 'setUploadOptions', 'setUploadCallback'
        ])
    }
};