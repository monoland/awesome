<template>
    <div class="d-block">
        <template v-if="!hideDatas">
            <v-data-filter></v-data-filter>
            <v-data-delete></v-data-delete>
            <v-data-restore></v-data-restore>
            <v-data-force></v-data-force>
        </template>
        
        <slot></slot>
        
        <v-responsive v-if="!hideDatas"
            :class="{ 'overflow-y-auto': overflow }"
            :height="calcHeight"
            style="z-index: 0;"
        >
            <slot name="records">
                <template v-if="!hideRecords">
                    <v-table-desktop></v-table-desktop>
                    <v-table-mobile></v-table-mobile>
                </template>
            </slot>
        </v-responsive>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-page-wrap',

    props: {
        hideDatas: {
            type: Boolean,
            default: false
        },
        
        hideRecords: {
            type: Boolean,
            default: false
        },

        overflow: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...mapState(['device', 'page']),

        calcHeight: function() {
            if (this.page.softDeletes || this.page.filters.length) {
                if (this.device.mobile) {
                    return `calc(100vh - 112px)`;
                } else {
                    return `calc(100vh - 128px)`;
                }
            } else {
                if (this.device.mobile) {
                    return `calc(100vh - 56px)`;
                } else {
                    return `calc(100vh - 64px)`;
                }
            }            
        }
    }
};
</script>