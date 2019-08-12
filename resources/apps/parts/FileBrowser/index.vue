<template>
    <v-dialog persistent width="800" v-model="document.state">
        <v-card class="v-filebrowser">
            <v-toolbar :color="$root.theme" dark flat>
                <v-toolbar-title>File Browser</v-toolbar-title>
                
                <v-spacer></v-spacer>
                
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>

                <template v-slot:extension>
                    <v-tabs class="px-4" background-color="transparent" v-model="tab">
                        <v-tabs-slider color="white"></v-tabs-slider>
                        
                        <v-tab href="#upload">unggah</v-tab>
                        <v-tab href="#files">files</v-tab>
                    </v-tabs>

                    <div class="v-filebrowser__search">
                        <v-slide-x-reverse-transition>
                            <v-text-field v-if="tab === 'files'"
                                v-model="searchText"
                                label="Cari File"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-slide-x-reverse-transition>
                    </div>
                </template>
            </v-toolbar>

            <v-card-text class="v-filebrowser__wrap pa-0">
                <v-slide-x-transition mode="in-out">
                    <div class="v-filebrowser__content" v-show="tab === 'upload'">
                        <v-layout class="lightbox" :class="`${$root.theme}--text`" fill-height align-center justify-center>
                            <v-document-upload :callback="callback">
                                <v-btn depressed :color="$root.theme" dark>
                                    unggah file
                                </v-btn>

                                <v-progress-linear
                                    :active="upload.progress"
                                    :indeterminate="upload.combined"
                                    :value="upload.value"
                                    absolute
                                    bottom
                                    color="yellow"
                                ></v-progress-linear>
                            </v-document-upload>
                        </v-layout>
                    </div>
                </v-slide-x-transition>

                <v-slide-x-reverse-transition mode="in-out">
                    <div class="v-filebrowser__content pa-0" v-show="tab === 'files'">
                        <v-data-table
                            v-model="document.selected"
                            :headers="headers"
                            :items="records"
                            :single-select="!document.multiple"
                            :loading="loader"
                            :options.sync="options"
                            :server-items-length="total"
                            :footer-props="footerProps"
                            item-key="id"
                            fixed-header
                            show-select
                            height="288px"
                        >
                            <template #:progress>
                                <v-progress-linear :color="color" height="1" indeterminate></v-progress-linear>
                            </template>

                            <template v-slot:item.byte="{ value }">
                                {{ $root.formatBytes(value) }}
                            </template>
                        </v-data-table>
                    </div>
                </v-slide-x-reverse-transition>
            </v-card-text>

            <div class="v-filebrowser__foot">
                <v-btn 
                    :color="$root.theme" 
                    :disabled="tab === 'upload' || document.selected.length === 0" 
                    :dark="tab === 'files' && document.selected.length !== 0"
                    depressed
                    @click="onSelect"
                >select</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { debounce } from 'debounce';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-file-browser',

    computed: {
        ...mapState(['document', 'http', 'upload'])
    },

    data:() => ({
        footerProps: { 'items-per-page-options': [5, 10, 20] },
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Ekstensi', value: 'extn' },
            { text: 'Mime', value: 'mime' },
            { text: 'Ukuran', value: 'byte', align: 'end' }
        ],
        initial: true,
        loader: false,
        options: { itemsPerPage: 5, page: 1 },
        params: { itemsPerPage: 5, page: 1, sortBy: null, sortDesc: null },
        total: 0,
        records: [],
        searchText: null,
        selected: [],
        tab: 'upload',
    }),

    methods: {
        ...mapActions(['documentClose']),

        bouncing: debounce(function (value) {
            this.params['search'] = value;
        }, 1000),

        callback: function(record) {
            this.document.records.push(record);
            this.tab = 'files';
        },

        close: function() {
            this.documentClose();
            this.tab = 'upload';
        },

        documentFetch: async function() {
            try {
                let { data: { data, meta }} = await this.http.get( 
                    '/api/document', { params: this.params }
                );

                this.records = data;
                this.total = meta.total;
                this.selected = [];
            } catch (error) {
                this.$store.dispatch('errors', error);
            }
        },

        onSelect: function() {
            this.document.callback(Object.assign([], this.document.selected));
            this.documentClose();
            this.$nextTick(() => this.tab = 'upload');
        }
    },

    watch: {
        'document.state': function(newVal) {
            if (newVal && newVal === true && this.records.length === 0) this.documentFetch();
        },

        'options': {
            handler: function(newVal) {
                if (this.initial) return;

                this.params = {
                    itemsPerPage: newVal.itemsPerPage, 
                    page: newVal.page, 
                    sortBy: newVal.sortBy[0], 
                    sortDesc: newVal.sortDesc[0]
                };
            },

            deep: true
        },

        'params': {
            handler: function() {
                this.documentFetch();
            },

            deep: true
        },

        searchText: function(newVal) {
            this.bouncing(newVal);
        },
    }
};
</script>