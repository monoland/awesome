<template>
    <v-dialog :value="form.model && form.state === 'delete'" max-width="332px" persistent>
        <v-card flat class="mt-4 mx-auto with-border">
            <v-sheet style="margin-top: -16px;"
                class="v-sheet--offset mx-auto" 
                color="deep-orange"
                max-width="calc(100% - 32px)"
            >
                <div class="d-block white--text px-4 py-2">
                    <div class="title font-weight-regular">{{ `Hapus ${page.title}` }}</div>
                    <div class="overline">{{ `konfirmasi hapus data ${page.title}.` }}</div>
                </div>
            </v-sheet>

            <v-card-text class="relative pa-4">
                <div class="d-block text-justify">
                    Menghapus data ini, akan turut menghapus semua yang terhubung dengan data ini. Anda tidak dapat membatalkan ini.
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey darken-1" :disabled="form.loader" text @click.stop="dialogClose">batal</v-btn>
                <v-btn 
                    :color="$root.theme" 
                    :loading="form.loader" 
                    :disabled="form.loader" 
                    :text="!form.loader" 
                    @click="dialogPost"
                >hapus data</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-delete',

    computed: {
        ...mapState(['form', 'page']),
    },

    methods: {
        ...mapActions(['dialogClose', 'setFormModel', 'dialogPost'])
    }
}
</script>