<template>
    <div class="v-upload" :class="{ 'v-upload__multi': multiple }">
        <label class="v-label" v-if="label">{{ label }}</label>
        <div class="v-upload__files">
            <v-slide-y-transition origin="center center" class="pa-0" mode="out-in" group tag="v-list">
                <template v-for="(upload, index) in uploads">
                    <div class="v-upload__file" :key="index">
                        <div class="v-upload__file--icon">
                            <v-btn class="ma-0" icon :color="$root.theme" dark>
                                <v-icon v-if="!upload.info.uploaded && !upload.info.completed">cloud_queue</v-icon>
                                <v-icon v-else-if="upload.info.uploaded && !upload.info.completed">hourglass_empty</v-icon>
                                <v-icon v-else>delete</v-icon>
                            </v-btn>
                        </div>

                        <div class="v-upload__file--info">
                            <div class="v-upload__file--text">{{ upload.filename }}</div>

                            <v-progress-linear
                                class="ma-0"
                                :color="$root.theme"
                                height="1"
                                :value="upload.info.progress"
                            ></v-progress-linear>

                            <div class="v-upload__file--meta">
                                <div class="v-messages theme--light">
                                    <div class="v-messages__wrapper">
                                        <div class="v-messages__message f-nunito justify-space-between">
                                            <span v-if="!upload.info.uploaded && !upload.info.completed">{{ upload.info.progress }}%</span>
                                            <span v-else-if="upload.info.uploaded && !upload.info.completed">please wait while combine all chunks.</span>
                                            <span v-else>extension: {{ upload.extension }} | mime: {{ upload.mime }}</span>
                                            
                                            <span v-if="!upload.info.uploaded">{{ formatBytes(upload.info.byteof) + '/' + formatBytes(upload.bytes) }}</span>
                                            <span v-else>{{ formatBytes(upload.bytes) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </v-slide-y-transition>
        </div>

        <div class="v-upload__button" :class="{ 'v-upload__button--disabled': processing }" :id="uuid" v-if="dynVisible">
            <div class="v-upload__wrap">
                <div class="v-upload__rect">
                    <v-icon>cloud_queue</v-icon>
                    <span>Upload file</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import qq from 'fine-uploader/lib/core';
import shortid from 'shortid';

export default {
    name: 'v-uploader',

    computed: {
        dynVisible: function() {
            if (this.multiple) {
                return true;
            }

            return this.uploads.length === 0;
        }
    },

    props: {
        acceptFiles: {
            type: String,
            default: 'image/png, image/jpeg, application/pdf, application/zip'
        },

        allowedExtensions: {
            type: Array,
            default:() => (['png', 'jpg', 'jpeg', 'pdf', 'zip']) 
        },

        multiple: {
            type: Boolean,
            default: false
        },

        label: {
            type: String,
            default: null
        },

        value: {
            type: Array,
            default:() => ([]) 
        }
    },

    data:() => ({
        processing: false,
        uuid: shortid.generate(),
        uploads: []
    }),

    created() {
        this.uploads = this.value;
    },

    mounted() {
        this.initFineUploader();
    },

    methods: {
        infoUpload: function(payload) {
            let idx = this.uploads.findIndex(obj => obj.uuid === payload.uuid);

            if (idx !== -1) {
                Object.keys(payload.data).forEach(key => {
                    this.uploads[idx].info[key] = payload.data[key];
                });
            }
        },

        dataUpload: function(payload) {
            let idx = this.uploads.findIndex(obj => obj.uuid === payload.uuid);

            if (idx !== -1) {
                Object.keys(payload.data).forEach(key => {
                    this.uploads[idx][key] = payload.data[key];
                });
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
                    endpoint: '/api/media',
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
                        endpoint: '/api/media?completed=true'
                    }
                },

                validation: {
                    acceptFiles: _this.acceptFiles,
                    allowedExtensions: _this.allowedExtensions
                },

                callbacks: {
                    onUpload: function (id, name) {
                        _this.uploads.push({
                            reff: _this.uuid,
                            uuid: this.getUuid(id),
                            bytes: this.getSize(id),
                            extension: null,
                            filename: name,
                            mime: null,
                            path: null,
                            type: null,
                            saved: false,
                            info: {
                                byteof: 0,
                                completed: false,
                                progress: 0,
                                uploaded: false
                            }
                        });
                    },

                    onUploadChunk: function (id, name, data) {
                        let uplval = (parseInt(data.partIndex) + 1) / parseInt(data.totalParts) * 100;
                        
                        _this.infoUpload({
                            uuid: this.getUuid(id), 
                            data: {
                                byteof: data.endByte,
                                progress: uplval.toFixed(2),
                                uploaded: false
                            }
                        });

                        if (uplval >= 100) {
                            _this.infoUpload({
                                uuid: this.getUuid(id),
                                data: {
                                    progress: 100,
                                    uploaded: true
                                }
                            });
                        }
                    },

                    onComplete: function (id, name, response) {
                        if (!response.success) {
                            _this.$store.dispatch('errors', response.error);
                        } else {
                            let fileData = response.fileinfo;

                            _this.dataUpload({
                                uuid: this.getUuid(id),
                                data: {
                                    extension: fileData.extension,
                                    filename: fileData.filename,
                                    mime: fileData.mime,
                                    path: fileData.path,
                                    type: fileData.type
                                }
                            });

                            _this.infoUpload({
                                uuid: this.getUuid(id),
                                data: {
                                    completed: true
                                }
                            });
                        }
                    },

                    onError: function (id, name, errorReason, xhrOrXdr) {},
                }
            };

            return new qq.FineUploaderBasic(options);
        },

        formatBytes: function(bytes, decimals = 2) {
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes === 0) return '0 Bytes';
            const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
            if (i === 0) return `${bytes} ${sizes[i]})`;
            return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
        },
    },

    watch: {
        uploads: {
            handler: function(newval) {
                if (newval && newval.length > 0) {
                    this.processing = true;

                    if (newval[newval.length - 1].info.completed) {
                        this.processing = false;
                        this.$emit('input', newval);
                    }
                }
            },

            deep: true
        },

        value: function(newval) {
            if (newval && newval.length > 0) {
                this.uploads = newval;
            }
        }
    }
}
</script>
