<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-scale-transition origin="center center">
                <v-btn icon :color="color" :disabled="table.loader" v-on="on" v-show="value" @click="$emit('click')">
                    <v-icon>{{ icon }}</v-icon>
                </v-btn>
            </v-scale-transition>
        </template>
        <span>{{ text.toUpperCase() }}</span>
    </v-tooltip>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-btn-toolbar',

    props: {
        icon: {
            type: String,
            default: null
        },

        color: {
            type: String,
            default: null
        },

        text: {
            type: String,
            default: null
        },

        value: Boolean
    },

    computed: {
        ...mapState(['table'])
    }
};
</script>