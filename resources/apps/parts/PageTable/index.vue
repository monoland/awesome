<template>
    <v-card class="transparent" flat>
        <v-card-text>
            <v-page-widget>
                <v-data-table
                    :headers="table.headers"
                    :items="records"
                    :item-key="table.key"
                    :hide-default-footer="records.length <= 0"
                    :show-select="true"
                    :single-select="true"
                    :loading="table.loader"
                    :server-items-length="meta.total"
                    :options.sync="table.options"
                    :footer-props="table.footerProps"
                    v-model="selected"
                >
                    <template #progress>
                        <v-progress-linear :color="$root.theme" height="1" indeterminate></v-progress-linear>
                    </template>

                    <template v-for="column in table.headers" #[`item.${column.value}`]="{ item, index }">
                        <slot :name="`item.${column.value}`" :item="item" :index="index">
                            {{ item[column.value] }}
                        </slot>
                    </template>
                </v-data-table>
            </v-page-widget>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-table',

    computed: {
        ...mapState(['meta', 'page', 'records', 'table']),

        selected: {
            get: function() {
                return this.table.selected;
            },

            set: function(value) {
                this.setSelected(value);
            }
        }
    },

    methods: {
        ...mapActions(['setSelected'])
    }
};
</script>