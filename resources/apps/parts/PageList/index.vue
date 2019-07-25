<template>
    <v-list two-line subheader class="v-list--table">
        <template v-for="(record, index) in records">
            <v-list-tile avatar 
                v-press="() => pressListItem(record)" 
                @click="openEditForm(record)"
            >
                <slot :item="record" :index="index"></slot>
            </v-list-tile>
            <v-divider inset></v-divider>
        </template>
    </v-list>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-list',

    computed: {
        ...mapState(['records'])
    },

    methods: {
        ...mapActions(['pressListItem', 'openEditForm'])
    },
}
</script>
