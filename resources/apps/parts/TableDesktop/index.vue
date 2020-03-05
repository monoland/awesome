<template>
    <div class="d-block" style="position: relative;" v-if="device.desktop">
        <v-data-table
            fixed-header
            :height="calcHeight"
            :headers="table.headers"
            :disable-pagination="disableControl"
            :items="records"
            :item-key="table.key"
            :show-select="true"
            :single-select="true"
            :server-items-length="table.total"
            :options.sync="table.options"
            :footer-props="{ 
                'disable-items-per-page': disableControl, 
                'items-per-page-options': [10, 25, 50] 
            }"
            :disable-sort="disableControl"
            v-model="selected"
            style="background-color: transparent;"
            @click:row="rowClick"
        >
            <template #progress>
                <v-progress-linear :color="theme" height="1" indeterminate></v-progress-linear>
            </template>

            <template v-for="column in table.headers" #[`item.${column.value}`]="{ item, index }">
                <slot :name="`item.${column.value}`" :item="item" :index="index">
                    <span v-html="item[column.value]" :key="index" />
                </slot>
            </template>
        </v-data-table>

        <v-overlay :opacity="0" :value="table.loader" absolute>
            <v-progress-circular indeterminate size="56"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-table-desktop',

    props: {
        height: {
            type: String,
            default: ''
        }
    },

    computed: {
        ...mapState(['device', 'page', 'records', 'table', 'theme']),

        selected: {
            get: function() {
                return this.table.selected;
            },

            set: function(newValue) {
                this.setTableSelected(newValue);
            }
        },

        calcHeight: function() {
            if (this.page.softDeletes || this.page.filters.length) {
                return `calc(100vh - (128px + 49px))`;
            } else {
                return `calc(100vh - (64px + 49px))`;
            }
        },

        disableControl: function() {
            if (this.records && this.records.length > 0) {
                return false;
            }

            return true;
        }
    },

    methods: {
        ...mapActions(['setTableSelected']),

        rowClick: function(item, {select, isSelected}) {
            select(!isSelected);
        }
    }
};
</script>

<style lang="sass">
    @import '@sass/datatable'
</style>