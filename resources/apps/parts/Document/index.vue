<template>
    <v-dialog persistent v-model="dialog">
        <template v-slot:activator="{ on }">
            <div class="v-file">
                <label class="caption">{{ label }}</label>

                <div class="v-file__wrap">
                    <v-slide-x-transition mode="in-out">
                        <div class="v-file__bttn" :class="`${$root.theme}--text`" v-on="on" v-if="files.length === 0">
                            <div class="v-file__text font-weight-regular text-uppercase">
                                <small>click to open document</small>
                            </div>
                        </div>
                    </v-slide-x-transition>
                    
                    <v-slide-y-transition group tag="div" class="v-file__list" mode="in-out">
                        <template v-for="(file, index) in files" v-if="files.length">
                            <div class="v-file__item" :key="index">
                                <div class="v-file__data">
                                    <div class="v-file__text subheading">{{ file.name }}</div>
                                    <div class="v-file__icon">
                                        <v-icon small :color="$root.theme" @click="removeFile(file)">close</v-icon>
                                    </div>
                                </div>

                                <div class="v-file__meta caption">{{ `Size: ${formatBytes(file.byte)} | Mime: ${file.mime}` }}</div>
                            </div>
                        </template>
                    </v-slide-y-transition>
                </div>
            </div>
        </template>

        <v-layout align-center justify-center>
            <v-flex md7>
                <v-card class="v-card--document">
                    <v-fade-transition origin="center center">
                        <div class="v-card--overlay" v-show="showOverlay" @click.self="closeOverlay">
                            <v-scale-transition origin="center center">
                                <v-scale-transition origin="center center">
                                    <v-sheet v-if="showEdit"
                                        class="elevation-3 px-3 pt-1 pb-2" 
                                        color="white" 
                                        width="320"
                                    >
                                        <v-text-field
                                            ref="fileName"
                                            v-model="fileName"
                                            label="File name"
                                            hide-details
                                        >
                                            <template v-slot:append>
                                                <v-icon color="green" @click="updateDocument">done</v-icon>
                                            </template>
                                        </v-text-field>
                                    </v-sheet>

                                    <v-card v-if="showDelete"
                                        elevation="0" 
                                        class="v-card--widget mt-4 mx-auto" style="border-radius: 4px;" width="320"
                                    >
                                        <v-sheet
                                            class="v-sheet--offset py-3 px-3 mx-auto"
                                            elevation="0"
                                            color="deep-orange"
                                            max-width="calc(100% - 32px)"
                                        >
                                            <span class="d-block title font-weight-regular mb-2 white--text">{{ `Hapus dokumen?` }}</span>
                                            <span class="d-block f-nunito caption font-weight-regular text-uppercase white--text">konfirmasi penghapusan.</span>
                                        </v-sheet>

                                        <v-card-text class="px-3" style="text-align: justify;">
                                            <span class="subheading font-weight-light">
                                                Menghapus dokumen ini juga akan menghapus semua data yang terhubung dengan ini. Anda tidak dapat membatalkan ini.
                                            </span>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn :color="$root.theme" flat @click="deleteDocument">delete</v-btn>
                                            <v-btn :color="$root.theme" flat @click="closeOverlay">cancel</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-scale-transition>
                            </v-scale-transition>
                        </div>
                    </v-fade-transition>

                    <v-toolbar flat card tabs>
                        <v-toolbar-title>Document</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-icon small style="margin: -12px -4px 0 0" @click="closeDialog">close</v-icon>

                        <template v-slot:extension>
                            <v-tabs color="transparent" :slider-color="$root.theme" v-model="tabs">
                                <v-tab ref="upload" @click="media = true">Upload</v-tab>
                                <v-tab @click="media = false">Albums</v-tab>
                            </v-tabs>

                            <div class="v-toolbar__actions">
                                <v-slide-x-reverse-transition mode="in-out">
                                    <v-toolbar-items v-show="crudmode">
                                        <v-slide-x-reverse-transition mode="in-out">
                                            <v-btn icon @click="openEdit" v-if="!hideEdit">
                                                <v-icon color="grey darken-1">edit</v-icon>
                                            </v-btn>
                                        </v-slide-x-reverse-transition>

                                        <v-btn icon @click="openDelete">
                                            <v-icon color="grey darken-1">delete</v-icon>
                                        </v-btn>
                                    </v-toolbar-items>
                                </v-slide-x-reverse-transition>

                                <v-slide-x-reverse-transition mode="out-in">
                                    <v-toolbar-items v-show="!media && !crudmode">
                                        <v-text-field
                                            v-model="search"
                                            :color="$root.theme"
                                            label="Search"
                                            style="margin: -6px 12px 0 0;"
                                            single-line
                                            append-icon="search"
                                        ></v-text-field>
                                    </v-toolbar-items>
                                </v-slide-x-reverse-transition>
                            </div>
                        </template>
                    </v-toolbar>

                    <v-card-text class="pa-0">
                        <v-slide-x-transition mode="in-out">
                            <div class="v-card__content py-3 px-4 mt-1" v-show="media">
                                <div class="v-card__uploader">
                                    <v-slide-x-transition mode="in-out">
                                        <div v-show="!progress"
                                            :id="uuid"
                                            :class="$root.theme"
                                            class="v-card__uploader--button text-uppercase font-weight-medium" 
                                        >
                                            <small>choose a file to upload</small>
                                        </div>
                                    </v-slide-x-transition>

                                    <v-slide-x-reverse-transition mode="in-out">
                                        <div class="v-card__uploader--progress" v-show="progress">
                                            <v-progress-linear :indeterminate="combined" :color="$root.theme" v-model="uplvalue"></v-progress-linear>
                                        </div>
                                    </v-slide-x-reverse-transition>
                                </div>
                            </div>
                        </v-slide-x-transition>

                        <v-slide-x-reverse-transition mode="in-out">
                            <div class="v-card__content pa-0 mt-1" v-show="!media">
                                <v-data-table
                                    v-model="selected"
                                    :headers="headers"
                                    :items="documents"
                                    :total-items="totalDocuments"
                                    :loading="loading"
                                    select-all
                                    hide-actions
                                >
                                    <template v-slot:items="props">
                                        <tr :active="props.selected" @click="props.selected = !props.selected">
                                            <td>
                                                <v-checkbox 
                                                    :input-value="props.selected"
                                                    primary
                                                    hide-details
                                                ></v-checkbox>
                                            </td>
                                            <td>{{ props.item.name }}</td>
                                            <td>{{ formatBytes(props.item.byte) }}</td>
                                            <td>{{ props.item.extn }}</td>
                                            <td>{{ props.item.updated_at }}</td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </div>
                        </v-slide-x-reverse-transition>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-btn flat :color="$root.theme" @click="emitDocument" :disabled="disabledSelect">select</v-btn>
                        <v-btn flat color="grey" @click="closeDialog">cancel</v-btn>

                        <v-spacer></v-spacer>

                        <v-btn v-if="media === false && loadMore"
                            :color="$root.theme"
                            outline small 
                            @click="fetchDocument"
                        >
                            <small>load more</small>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-dialog>    
</template>

<script>
import { mapState, mapActions } from 'vuex';
import qq from 'fine-uploader/lib/core';
import { debounce } from 'debounce';
import shortid from 'shortid';

export default {
    name: 'v-document',

    props: {
        acceptFiles: {
            type: String,
            default: 'image/png, image/jpeg, application/pdf, application/zip'
        },

        allowedExtensions: {
            type: Array,
            default:() => (['png', 'jpg', 'jpeg', 'pdf', 'zip']) 
        },

        label: {
            type: String,
            default: null
        },

        value: null
    },

    computed: {
        ...mapState(['documents']),
        
        fileName: {
            get: function() {
                return this.selected.length > 0 ? this.selected[0].name : null
            },

            set: function(newVal) {
                this.selected[0].name = newVal
            }
        },

        disabledSelect: function() {
            return this.selected.length <= 0;
        }
    },

    data:() => ({
        dialog: false,
        media: true,
        uplvalue: 0,
        progress: false,
        combined: false,
        metas: {},
        uuid: shortid.generate(),
        
        headers: [
            { text: 'Nama', value: 'name' },
            { text: 'Size', value: 'byte' },
            { text: 'Extn', value: 'extn' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ],
        
        selected: [],
        
        params: {
            descending: false,
            page: 1,
            rowsPerPage: 50,
            sortBy: "name",
            totalItems: 0
        },

        totalDocuments: 0,
        loading: false,
        loadMore: null,
        crudmode: false,
        hideEdit: false,
        showEdit: false,
        showOverlay: false,
        showDelete: false,
        search: null,
        tabs: 0,
        files: [],

        pathUrl: '/api/document'
    }),

    created() {
        if (this.documents.length === 0) {
            this.fetchDocument();
        }

        if (this.value && this.value.constructor === Object) {
            this.files.push(this.value);
        }

        if (this.value && this.value.constructor === Array) {
            this.files = this.value;
        }
    },

    mounted() {
        this.initFineUploader();
    },

    methods: {
        bouncing: debounce((_this, val) => {
            _this.fetchDocument({
                search: val
            });
        }, 1000),

        removeFile: function(file) {
            let idx = this.selected.findIndex(obj => obj.id === file.id);

            if (idx !== -1) {
                this.selected.splice(idx, 1);
            }
        },

        closeDialog: function() {
            this.dialog = false;
            this.tabs = 0;
            this.media = true;
        },

        closeOverlay: function() {
            this.showEdit = false;
            this.showDelete = false;
            this.showOverlay = false;
            this.selected = [];
        },

        closeEdit: function() {
            this.showEdit = false;
            this.selected = [];
        },

        openEdit: function() {
            this.showOverlay = true;
            this.showEdit = true;
            this.showDelete = false;
            this.$nextTick(() => {
                this.$refs.fileName.focus();
                this.$refs.fileName.$el.getElementsByTagName('input')[0].select();
            });
        },

        openDelete: function() {
            this.showOverlay = true;
            this.showEdit = false;
            this.showDelete = true;
        },

        emitDocument: function() {
            this.$emit('input', this.selected);
            this.closeDialog();
        },

        updateDocument: async function() {
            try {
                let { data } = await this.$http.put(
                    this.pathUrl + '/' + this.selected[0].id, 
                    this.selected[0]
                );
                
                this.closeOverlay();
            } catch (error) {
                this.$store.dispatch('errors', error);
            }
        },

        deleteDocument: async function() {
            try {
                if (this.selected.length <= 1) {
                    let index = this.documents.findIndex(obj => obj.id === this.selected[0].id);

                    let response = await this.$http.delete(
                        this.pathUrl + '/' + this.selected[0].id, 
                    );

                    if (response) {
                        this.$store.commit('spliceDocuments', index);
                    }
                } else {
                    let response = await this.$http.post(
                        this.pathUrl + '/bulkdelete', selected
                    );

                    if (response) {
                        selected.forEach((record) => {
                            let index = this.documents.findIndex(obj => obj.id === record.id);
                            this.$store.commit('spliceDocuments', index);
                        });
                    }
                }

                this.closeOverlay();
            } catch (error) {
                this.$store.dispatch('errors', error);
            }
        },

        formatBytes: function(bytes, decimals = 2) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Bytes';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
            if (i === 0) return `${bytes} ${sizes[i]})`;
            return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
        },

        fetchDocument: async function(params) {
            try {
                let _params = this.params;
                let _initial = false;

                if (params && params.constructor === Object) {
                    _initial = true;

                    Object.keys(params).forEach(key => {
                        _params[key] = params[key];
                    });
                }
                
                let { data: { data, meta, links }} = await this.$http.get(
                    this.pathUrl, { params: _params }
                );

                if ( this.documents.length === 0) {
                    this.$store.commit('documents', data);
                } else if ( _initial === true ) {
                    this.$store.commit('documents', data);
                } else {
                    data.forEach((record) => {
                        this.$store.commit('pushDocuments', record);
                    });
                }
                
                this.metas = meta;
                this.loadMore = links.next;
                if (this.loadMore && this.loadMore.length > 0) {
                    this.params.page = this.params.page + 1;
                }
            } catch (error) {
                this.$store.dispatch('errors', error);
            }
        },

        initFineUploader: function() {
            let _this = this;

            let options = {
                button: document.getElementById(_this.uuid),

                request: {
                    customHeaders: {
                        Authorization: _this.$auth.token
                    },
                    endpoint: '/api/document',
                    filenameParam: 'fileName',
                    inputName: 'fileUpload',
                    uuidName: 'uuid',
                    totalFileSizeName: 'totalFileSize'
                },

                chunking: {
                    enabled: true,
                    mandatory: true,
                    // partSize: 50000,
                    paramNames: {
                        chunkSize: 'chunkSize',
                        partByteOffset: 'partByteOffset',
                        partIndex: 'partIndex',
                        totalParts: 'totalParts'
                    },
                    success: {
                        endpoint: '/api/document?completed=true'
                    }
                },

                validation: {
                    acceptFiles: _this.acceptFiles,
                    allowedExtensions: _this.allowedExtensions
                },

                callbacks: {
                    onUpload: function (id, name) {
                        _this.progress = true;
                    },

                    onUploadChunk: function (id, name, data) {
                        _this.uplvalue = (parseInt(data.partIndex) + 1) / parseInt(data.totalParts) * 100;
                        
                        if (_this.uplvalue >= 100) {
                            _this.combined = true;
                        }
                    },

                    onComplete: function (id, name, response) {
                        if (!response.success) {
                            _this.$store.dispatch('errors', response.error);
                        } else {
                            _this.$store.commit('pushDocuments', response.record);
                            _this.uplvalue = 0;
                            _this.progress = false;
                            _this.combined = false;
                        }
                    },

                    onError: function (id, name, errorReason, xhrOrXdr) {
                        if (xhrOrXdr && xhrOrXdr.status == 401) {
                            _this.$auth.signout();
                            _this.$router.push({ name: 'login' });
                        } else {
                            _this.uplvalue = 0;
                            _this.progress = false;
                            _this.combined = false;
                        }
                    },
                }
            };

            return new qq.FineUploaderBasic(options);
        },
    },

    watch: {
        search: function(newVal) {
            this.bouncing(this, newVal);
        },

        selected: {
            handler: function(newVal) {
                if (newVal.length <= 0) {
                    this.crudmode = false;
                    return;
                } else {
                    if (newVal.length > 1 ) {
                        this.hideEdit = true;
                    } else {
                        this.hideEdit = false;
                    }
                    this.crudmode = true;
                }
            },

            deep: true
        },

        value: function(newVal) {
            if (newVal && newVal.constructor === Object) {
                this.files.push(newVal);
            } else if (newVal && newVal.constructor === Array) {
                this.files = newVal;
            } else {
                this.files = [];
            }

            this.selected = this.files;
        }
    },
};
</script>