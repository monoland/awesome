<template>
    <v-dialog :value="formModel" :max-width="maxWidth" origin="center center" persistent>
        <v-card class="mt-4 mx-auto v-card--with-border">
            <v-sheet style="margin-top: -16px;"
                class="v-sheet--offset mx-auto" 
                color="deep-orange"
                max-width="calc(100% - 32px)"
            >
                <div class="d-block white--text px-4 py-2">
                    <div class="title font-weight-regular">{{ `Hapus Record` }}</div>
                    <div class="overline">{{ `konfirmasi hapus data ${page.title}.` }}</div>
                </div>
            </v-sheet>

            <v-card-text class="relative pa-4">
                <div class="d-block text-justify">
                    Menghapus data ini, akan turut menghapus semua yang terhubung dengan data ini. Anda dapat mengembalikan dengan melakukan restore.
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" text @click.stop="formClose">batal</v-btn>
                <v-btn 
                    :color="theme" 
                    @click="formPost"
                    text
                >hapus data</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-data-delete',

    props: {
        maxWidth: {
            type: String,
            default: '332'
        }
    },

    computed: {
        ...mapState(['form', 'page', 'theme']),

        formModel: function() {
            if (this.form.state === 'deleteState') {
                return this.form.delete;
            } else {
                return false;
            }
        },
    },

    methods: {
        ...mapActions(['formClose', 'formPost'])
    }
};
</script>