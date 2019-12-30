<template>
    <v-dialog fullscreen persistent hide-overlay :value="form.model && (form.state === 'add' || form.state === 'edit')" transition="dialog-bottom-transition">
        <v-card class="no-border" flat style="border-radius: 0px;">
            <v-toolbar flat
                :class="{ 'with-shadow': mobile }"
                :color="mobile ? 'white' : $root.theme" 
                :dark="!mobile" 
                :extended="!mobile"
            >
                <v-btn icon :disabled="form.loader" @click.stop="dialogClose">
                    <v-icon>{{ mobile ? 'close' : 'arrow_back' }}</v-icon>
                </v-btn>

                <template v-if="mobile">
                    <v-spacer></v-spacer>
                    
                    <v-toolbar-title>{{ `Form ${page.title}` }}</v-toolbar-title>
                    
                    <v-spacer></v-spacer>

                    <v-btn icon :disabled="form.loader" @click="dialogPost">
                        <v-icon>check</v-icon>
                    </v-btn>
                </template>

                <template v-else>
                    <v-spacer></v-spacer>
                </template>
            </v-toolbar>

            <div class="d-block v-page--mobile relative" style="padding-top: 1px;" v-if="mobile">
                <v-overlay absolute :value="form.loader" :opacity="0.2">
                    <v-progress-circular indeterminate :size="64" :width="2"></v-progress-circular>
                </v-overlay>
                <slot></slot>
            </div>

            <template v-else>
                <v-card class="mx-auto no-border" :max-width="form.maxWidth" style="margin-top: -65px;">
                    <v-toolbar flat>
                        <v-toolbar-title>{{ `Form ${page.title}` }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-divider></v-divider>

                    <v-card-text class="relative pa-0">
                        <v-overlay absolute :value="form.loader" :opacity="0.2">
                            <v-progress-circular indeterminate :size="64" :width="2"></v-progress-circular>
                        </v-overlay>
                        <slot></slot>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey darken-1" :disabled="form.loader" text @click.stop="dialogClose">batal</v-btn>
                        <v-btn :color="$root.theme" :disabled="form.loader" text @click="dialogPost">{{ form.state === 'add' ? 'tambah data' : 'update data' }}</v-btn>
                    </v-card-actions>
                </v-card>
                <div class="d-block pa-4"></div>
            </template>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-dialog',

    computed: {
        ...mapState(['form', 'mobile', 'page']),
    },

    methods: {
        ...mapActions(['dialogClose', 'setFormModel', 'dialogPost'])
    }
};
</script>