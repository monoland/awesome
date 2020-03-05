<template>
    <v-list two-line v-if="device.mobile" flat>
        <v-list-item-group 
            :active-class="`${theme} lighten-5`"
            v-model="selected"
        >
            <template v-for="(record, index) in records">
                <v-list-item :key="index" :value="index">
                    <v-list-item-avatar>
                        <v-icon 
                            :class="selected === index ? `deep-orange lighten-1 white--text` : `${theme} lighten-3 white--text`"
                        >
                            {{ selected === index ? `check_circle` : record.hasOwnProperty('icon') ? record.icon : page.icon }}
                        </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <slot :item="record" :index="index">
                            <v-list-item-title>{{ record.mobile_title }}</v-list-item-title>
                            <v-list-item-subtitle>{{ record.mobile_subtitle }}</v-list-item-subtitle>
                        </slot>
                    </v-list-item-content>
                </v-list-item>

                <v-divider inset :key="`div-${index}`"></v-divider>
            </template>

            <template v-if="records.length <= 0">
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="text-center grey--text">There is no data to display</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-else>
                <v-list-item v-if="table.current_page && table.current_page < table.last_page">
                    <div class="d-flex align-center justify-center" style="width: 100%;">
                        <v-progress-circular
                            :width="2"
                            :color="theme"
                            indeterminate
                            v-intersect="onIntersect"
                        ></v-progress-circular>
                    </div>
                </v-list-item>
            </template>
        </v-list-item-group>
    </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-table-mobile',

    computed: {
        ...mapState(['device', 'page', 'records', 'table', 'theme']),

        selected: {
            get: function() {
                return this.table.selectedIndex;
            },

            set: function(selected) {
                this.setTableSelectedIndex(selected);
            }
        }
    },

    data:() => ({
        sample: null
    }),

    methods: {
        ...mapActions(['getRecordsNext', 'recordClick', 'setTableSelectedIndex']),

        onIntersect: function(entries, observer) {
            if (entries[0].isIntersecting) {
                this.getRecordsNext();
            }
        }
    }
};
</script>

<style lang="sass">
    @import '@sass/list'
</style>