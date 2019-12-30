<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-scale-transition origin="center center">
                <v-btn :class="offsetClass"  icon v-on="on" v-show="value" @click="$emit('click')">
                    <v-icon>{{ icon }}</v-icon>
                </v-btn>
            </v-scale-transition>
        </template>
        <span>{{ text.toUpperCase() }}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'v-btn-action',

    props: {
        offsetClass: {
            type: String,
            default: null
        },

        icon: {
            type: String,
            default: null
        },

        text: {
            type: String,
            default: null
        },

        absolute: {
            type: Boolean,
            default: false
        },

        offset: {
            type: Boolean,
            default: false
        },

        'offset-52': {
            type: Boolean,
            default: false
        },

        value: Boolean
    }
};
</script>