<template>
    <v-list two-line>
        <template v-for="(record, index) in records">
            <v-list-item :key="index" @click="recordClick(record)">
                <v-list-item-avatar>
                    <v-icon 
                        class="absolute white white--text" 
                        style="z-index: 0; box-shadow: 0px 2px 4px rgba(126, 142, 177, 0.12);"
                    >
                        {{ page.icon }}
                    </v-icon>

                    <v-scale-transition mode="out-in" origin="center center">
                        <v-icon style="z-index: 1;"
                            :key="table.selected && table.selected[0] && table.selected[0].id === record.id ? 'icon-active' : 'icon-default'"
                            :class="table.selected && table.selected[0] && table.selected[0].id === record.id ? 'deep-orange' : 'grey lighten-1'"
                            dark
                        >
                            {{ table.selected && table.selected[0] && table.selected[0].id === record.id ? 'done' : page.icon  }}
                        </v-icon>
                    </v-scale-transition>
                </v-list-item-avatar>

                <v-list-item-content>
                    <slot :item="record" :index="index"></slot>
                </v-list-item-content>
            </v-list-item>

            <v-divider inset :key="`div-${index}`"></v-divider>
        </template>

        <v-list-item v-if="table.loader === false && meta.current_page && meta.current_page < meta.last_page">
            <div class="d-flex align-center justify-center" style="width: 100%;">
                <div class="overline" v-intersect="onIntersect">loading more data...</div>
            </div>
        </v-list-item>

        <v-list-item v-if="table.loader">
            <div class="d-flex align-center justify-center" style="width: 100%;">
                <v-progress-circular
                    :width="1"
                    color="grey"
                    indeterminate
                ></v-progress-circular>
            </div>
        </v-list-item>
    </v-list>  
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-mobile-table',

    computed: {
        ...mapState(['meta', 'page', 'records', 'table'])
    },

    methods: {
        ...mapActions(['getNextData', 'recordClick']),

        onIntersect: function(entries, observer) {
            if (entries[0].isIntersecting) {
                this.getNextData();
            }
        }
    }
};
</script>