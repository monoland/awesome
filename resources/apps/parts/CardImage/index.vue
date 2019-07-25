<template>
    <div class="v-card__image" :class="`${$root.theme} lighten-5`">
        <div class="v-card__image--icon" :id="uuid" v-if="uploader">
            <v-progress-circular :size="80" color="blue lighten-2" :value="uplvalue">
                <v-avatar size="72px" color="transparent--grey">
                    <v-icon class="white--text">{{ icon }}</v-icon>
                </v-avatar>
            </v-progress-circular>
        </div>

        <div class="v-card__image--wrap" v-if="photourl">
            <img :src="photourl" alt="photo">
        </div>
    </div>
</template>

<script>
import shortid from 'shortid';
import qq from 'fine-uploader/lib/core';

export default {
    name: 'v-card-image',

    props: {
        icon: {
            type: String,
            default: 'photo_camera'
        },

        uploader: {
            type: Boolean,
            default: true
        },

        value: null
    },

    data:() => ({
        uploaded: false,
        uplvalue: 0,
        photourl: null,
        uuid: shortid.generate(),
    }),

    created() {
        if (this.value) {
            this.photourl = this.value;
        }
    },

    mounted() {
        if (this.uploader) this.initUpload();
    },

    methods: {
        initUpload: function() {
            let _this = this;

            new qq.FineUploaderBasic({
                button: document.getElementById(_this.uuid),

                request: {
                    customHeaders: { 'Authorization': _this.$auth.token },
                    endpoint: '/api/media',
                    filenameParam: 'fileName',
                    inputName: 'fileUpload',
                    uuidName: 'uuid',
                    totalFileSizeName: 'totalFileSize'
                },

                chunking: {
                    enabled: true,
                    mandatory: true,
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
                    acceptFiles: 'image/png, image/jpeg',
                    allowedExtensions: ['png', 'jpg', 'jpeg']
                },

                callbacks: {
                    onUploadChunk: function(id, name, data) {
                        _this.uploaded = false;
                        _this.uplvalue = (parseInt(data.partIndex) + 1) / parseInt(data.totalParts) * 100;
                        
                        if (_this.uplvalue >= 100) {
                            _this.uploaded = true;
                        }
                    },

                    onComplete: function(id, name, response) {
                        if (!response.success) {
                            _this.$error = response.error;
                        } else {
                            _this.photourl = response.fileinfo.url.original;
                            _this.$emit('input', response.fileinfo.url.original);
                        }
                    }
                }
            });
        }
    },

    watch: {
        value: function(newval) {
            this.photourl = newval;
        }
    },
};
</script>
