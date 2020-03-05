<template>
    <v-card>
        <v-system-bar :color="theme">
            <div class="overline px-2 white--text">{{ subtitle }}</div>
        </v-system-bar>

        <v-card-text class="py-2" :class="[ `${theme} lighten-2` ]">
            <div class="d-flex justify-center display-4 font-weight-normal white--text">
                {{ textValue }}
            </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="d-flex py-1 align-center" :class="[ `${theme} lighten-3` ]">
            <div class="body-2 text-uppercase font-weight-bold white--text">
                {{ title }}
            </div>
            <v-spacer></v-spacer>
            <div class="title white--text">{{ textPercent }}</div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'v-data-widget',

    props: {
        subtitle: {
            type: String,
            default: 'widget'
        },

        theme: {
            type: String,
            default: 'white'
        },

        title: {
            type: String,
            default: 'widget'
        },

        textValue: {
            type: String,
            default: '0'
        },

        textPercent: {
            type: String,
            default: '0%'
        }
    }
};
</script>