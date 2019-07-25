<template>
    <v-card elevation="0" class="v-card--widget mt-4 mx-auto" style="border-radius: 4px;">
        <v-sheet
            class="v-sheet--offset py-3 mx-auto"
            elevation="0"
            :color="$root.theme"
            :max-width="dynCalc"
            :class="dynPX"
        >
            <span class="d-block title font-weight-regular mb-2 white--text">{{ title }}</span>
            <span class="d-block f-nunito caption font-weight-regular text-uppercase white--text">{{ subtitle }}</span>
        </v-sheet>

        <v-card-text :class="dynPX">
            <slot></slot>
        </v-card-text>

        <slot name="actions"></slot>
    </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'v-widget',
    
    computed: {

        ...mapState(['page']),

        dynPX: function() {
            if (this.$vuetify.breakpoint.smOnly) {
                return (this.table ? 'px-3 pb-1' : 'px-3');
            }

            return ( this.table ? 'px-4 pb-1' : 'px-4');
        },

        dynCalc: function() {
            if (this.$vuetify.breakpoint.smOnly) {
                return 'calc(100% - 32px)';
            }

            return 'calc(100% - 48px)';
        },

        title: function() {
            if (this.table) {
                return `Tabel ${this.page.title}`;
            }
            
            return this.page.title;
        },

        subtitle: function() {
            if (this.table) {
                return `daftar seluruh ${this.page.title} yang tersedia`;
            }

            return `form tambah/ubah ${this.page.title}`;
        }
    },

    props: {
        table: {
            type: Boolean,
            default: false
        },

        form: {
            type: Boolean,
            default: false
        }
    }
}
</script>