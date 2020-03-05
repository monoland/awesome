<template>
    <v-dialog
        :value="formModel"
        transition="dialog-bottom-transition" 
        fullscreen 
        hide-overlay
    >
        <v-card tile :class="{ 'pb-0': device.mobile, 'pb-9': device.desktop }">
            <v-toolbar 
                flat
                :class="{ 'with-shadow': device.mobile }"
                :color="theme" 
                dark
                :extended="device.desktop" 
            >
                <v-btn icon @click.stop="formClose(bindProps)">
                    <v-icon>arrow_back</v-icon>
                </v-btn>

                <v-toolbar-title v-if="device.mobile">Form {{ form.linkTitle }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon v-if="device.mobile" @click.stop="formPost">
                    <v-icon>check</v-icon>
                </v-btn>
            </v-toolbar>

            <v-responsive 
                v-if="device.mobile"
                class="overflow-y-auto"
                height="calc(100vh - 56px)"
            >
                <v-card-text class="pb-6">
                    <slot></slot>
                </v-card-text>
            </v-responsive>

            <v-card
                v-else
                class="mx-auto"
                :max-width="maxWidth"
                style="margin-top: -64px;"
            >
                <v-toolbar flat>
                    <v-toolbar-title class="grey--text text-capitalize">{{ form.linkTitle }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-divider></v-divider>

                <slot name="header"></slot>
                
                <v-card-text class="pt-0">
                    <slot></slot>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey darken-1" text @click.stop="formClose(bindProps)">cancel</v-btn>
                    <v-btn :color="theme" text @click.stop="formPost">{{ postTitle }}</v-btn>
                </v-card-actions>
            </v-card>

            <v-overlay :value="table.loader" absolute>
                <v-progress-circular indeterminate size="56"></v-progress-circular>
            </v-overlay>
        </v-card>
    </v-dialog>  
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-custom-form',

    props: {
        maxWidth: {
            type: String,
            default: '700'
        },

        bindProps: {
            type: String,
            default: null
        },
    },

    computed: {
        ...mapState(['device', 'form', 'table', 'theme']),

        postTitle: function() {
            if (this.form.state === `${this.bindProps}State`) {
                return `set ${this.form.linkTitle}`;
            }
        }
    },

    created() {
        this.formKeyAdd(this.bindProps).then(() => {
            this.formModel = this.form[this.bindProps];
        });
    },

    mounted() {
        this.$store.subscribe(mutation => {
            if (mutation.type === 'FORM_MUTATION' && 
                mutation.payload.hasOwnProperty(this.bindProps)
            ) {
                this.formModel = this.form[this.bindProps];
            }
        });
    },

    data:() => ({
        formModel: null
    }),

    methods: {
        ...mapActions(['formClose', 'formKeyAdd', 'formPost']),
    },
};
</script>