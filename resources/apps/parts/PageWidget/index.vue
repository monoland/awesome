<template>
    <v-card flat class="mt-4 mx-auto with-border">
        <v-sheet style="margin-top: -16px;"
            class="v-sheet--offset mx-auto" 
            :color="$root.theme" 
            max-width="calc(100% - 32px)"
        >
            <div class="d-block white--text px-4 py-2">
                <div class="title font-weight-regular">{{ `Tabel ${page.title}` }}</div>
                <div class="overline">{{ `daftar seluruh ${page.title} yang tersedia` }}</div>
            </div>
        </v-sheet>

        <v-card-text class="py-0">
            <slot></slot>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-widget',

    computed: {
        ...mapState(['page'])
    }
}
</script>