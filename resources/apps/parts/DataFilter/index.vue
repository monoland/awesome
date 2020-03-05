<template>
    <v-toolbar v-if="filterShow"
        :color="`${theme} lighten-5`"
        class="with-shadow"
        style="position: relative; z-index: 1;"
        flat
    >
        <v-toolbar-title class="overline">Data Filter</v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-btn-toggle 
            v-model="dataFilter"
            :color="theme"
            dense 
            light
            mandatory
        >
            <v-tooltip bottom v-for="(filter, index) in page.filters" :key="index">
                <template v-slot:activator="{ on }">
                    <v-btn 
                        :value.sync="filter.value"
                        :disabled="table.loader"
                        v-on="on"
                    >
                        <v-icon 
                            :color="theme" 
                            class="ma-0" 
                            right
                        >
                            {{ filter.icon }}
                        </v-icon>
                    </v-btn>
                </template>

                <span class="text-uppercase">{{ filter.text }}</span>
            </v-tooltip>
        </v-btn-toggle>

        <v-btn-toggle v-if="page.softDeletes"
            class="ml-2"
            v-model="trashed"
            :color="theme"
            dense light
        >
            
            <v-btn :value="true" :disabled="table.selected.length > 0 || table.loader">
                <span class="hidden-sm-and-down font-weight-bold caption">trashed</span>
                
                <v-icon
                    :color="theme" 
                    :class="{ 'ma-0': device.mobile }" 
                    right
                >
                    delete_outline
                </v-icon>
            </v-btn>
        </v-btn-toggle>
    </v-toolbar>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-data-filter',

    computed: {
        ...mapState(['device', 'page', 'records', 'table', 'theme']),

        dataFilter: {
            get: function() {
                return this.table.filter;
            },

            set: function(newValue) {
                if (this.page.initial) {
                    this.pageInitialUnset();
                    return;
                }

                this.setTableFilter(newValue);
            }
        },

        filterShow: function() {
            if (this.page.softDeletes || this.page.filters.length) {
                return true;
            }

            return false;
        },

        trashed: {
            get: function() {
                return this.table.trashed;
            },

            set: function(newValue) {
                this.setTableFilter({ trashed: newValue });
            }
        }
    },

    methods: {
        ...mapActions(['pageInitialUnset', 'setTableFilter'])
    }
};
</script>