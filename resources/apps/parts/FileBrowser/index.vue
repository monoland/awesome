<template>
    <v-dialog persistent width="800" v-model="document.state">
        <template v-slot:activator="{ on }">
            <div class="v-file">
                <div class="v-file__wrap">
                    <v-slide-x-transition mode="in-out">
                        <v-fileitem class="v-file__bttn" clickable v-on="on" v-if="document.files.length === 0">
                            Klik untuk buka file browser
                        </v-fileitem>
                    </v-slide-x-transition>

                    <v-slide-x-reverse-transition group tag="div" class="v-file__list" mode="in-out" v-show="document.files.length">
                        <template v-for="(file, index) in document.files">
                            <v-fileitem class="v-file__item" closeable :key="index" @click="documentRemove(file)">
                                <div class="d-flex justify-space-between">
                                    <div class="text-truncate">{{ file.name }}</div>
                                    <v-chip small label :color="$root.theme" dark>
                                        <div class="text-truncate">{{ `Size: ${$root.formatBytes(file.byte)}` }}</div>
                                    </v-chip>
                                </div>
                            </v-fileitem>
                        </template>
                    </v-slide-x-reverse-transition>
                </div>
            </div>
        </template>
        
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
                            <v-document-upload :callback="callback" class="v-btn">
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
                            :items="document.records"
                            :single-select="!multiple"
                            :loading="document.loader"
                            :options.sync="document.options"
                            :server-items-length="document.total"
                            :footer-props="document.footerProps"
                            item-key="id"
                            fixed-header
                            show-select
                            height="288px"
                        >
                            <template #:progress>
                                <v-progress-linear :color="color" height="1" indeterminate></v-progress-linear>
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

    props: {
        multiple: {
            type: Boolean,
            default: false
        },

        value: null
    },

    computed: {
        ...mapState(['document', 'upload'])
    },

    data:() => ({
        dialog: false,
        
        headers: [
            { text: 'Name', value: 'name' },
            { text: 'Ekstensi', value: 'extn' },
            { text: 'Mime', value: 'mime' },
            { text: 'Ukuran', value: 'byte' }
        ],

        loader: false,
        params: {},
        searchText: null,
        selected: [],
        tab: 'upload',
    }),

    created() {
        if (this.value) this.$store.commit('document', { files: this.value });
    },

    mounted() {
        if (this.document.records.length === 0) this.documentFetch({ params: this.document.params });
    },

    methods: {
        ...mapActions(['documentClose', 'documentFetch', 'documentRemove', 'documentSelect']),

        callback: function(record) {
            this.$store.commit('documentPush', record);
            this.tab = 'files';
        },

        close: function() {
            this.$store.dispatch('documentClose');
            this.tab = 'upload';
        },

        bouncing: debounce(function (value) {
            this.$store.commit('documentParams', { search: value });
            this.documentFetch({ params: this.document.params });
        }, 1000),

        onSelect: function() {
            this.$store.dispatch('documentSelect');
            this.$nextTick(() => {
                this.$emit('input', this.document.files);
                this.tab = 'upload';
            });
        },
    },

    watch: {
        searchText: function(newVal) {
            this.bouncing(newVal);
        },

        'document.options': {
            handler: function(newVal) {
                if (this.document.initial) {
                    this.$store.commit('document', { initial: false });
                    return;
                }

                this.$store.commit('documentParams', {
                    itemsPerPage: newVal.itemsPerPage, 
                    page: newVal.page, 
                    sortBy: newVal.sortBy[0], 
                    sortDesc: newVal.sortDesc[0]
                });
            },

            deep: true
        },

        'document.params': {
            handler: function(newVal) {
                if (this.document.initial) return;

                this.documentFetch({ params: newVal });
            },

            deep: true
        },

        value: function(newVal) {
            if (newVal) this.$store.commit('document', { files: newVal });
        }
    }
};
</script>
