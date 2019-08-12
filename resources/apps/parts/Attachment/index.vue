<template>
    <div class="v-file">
        <div class="v-file__wrap">
            <v-slide-x-transition mode="in-out">
                <v-fileitem v-if="files.length === 0"
                    class="v-file__bttn" 
                    clickable 
                    icon="search"
                    @click="openFileBrowser"
                >
                    Klik untuk buka file browser
                </v-fileitem>
            </v-slide-x-transition>

            <v-slide-x-reverse-transition group tag="div" class="v-file__list" mode="in-out" v-show="files.length">
                <template v-for="(file, index) in files">
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

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-attachment',

    props: {
        multiple: {
            type: Boolean,
            default: false
        },

        value: null
    },

    computed: {
        ...mapState(['document']),
    },

    data:() => ({
        files: []
    }),

    created() {
        if (this.value && this.value.constructor === Array) {
            this.files = this.value;
        }
    },

    methods: {
        ...mapActions(['documentOpen']),

        documentRemove: function(file) {
            let idx = this.files.findIndex(obj => obj.id === file.id);

            if (idx !== -1) this.files.splice(idx, 1);
        },
        
        openFileBrowser: function() {
            this.$store.commit('document', {
                multiple: this.multiple,
                selected: this.files,
                callback: (selected) => {
                    this.files = selected;
                }
            });

            this.$nextTick(() => this.documentOpen());
        }
    },

    watch: {
        files: function(newVal) {
            if (newVal && newVal.constructor === Array) this.$emit('input', newVal);
        }
    }
};
</script>