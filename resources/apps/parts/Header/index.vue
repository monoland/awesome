<template>
    <div class="v-page__header" :class="{ 'absolute': absolute, 'mobile': $vuetify.breakpoint.xsOnly }">
        <v-fade-transition>
            <div class="v-page__header--search" key="search" v-show="toolbar.search">
                <v-toolbar class="no-shadow" flat>
                    <v-scale-transition>
                        <input v-show="toolbar.search"
                            v-model="searchText"
                            ref="input"
                            class="headline font-weight-light" 
                            type="text"
                            key="text-search" 
                            placeholder="Search"
                        >
                    </v-scale-transition>

                    <v-scale-transition>
                        <v-btn icon key="close-search" :color="$root.theme" @click="searchClose" v-show="toolbar.search">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-scale-transition>
                </v-toolbar>
            </div>
        </v-fade-transition>
        
        <v-scale-transition>
            <div class="v-page__header--delete" key="deleted" v-show="toolbar.delete">
                <v-btn icon :color="$root.theme" @click="deleteClose">
                    <v-icon>close</v-icon>
                </v-btn>

                <v-toolbar-title>{{ `${table.selected.length} Selected` }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon :color="$root.theme" @click="deleteRecord">
                    <v-icon>delete</v-icon>
                </v-btn>
            </div>
        </v-scale-transition>

        <v-toolbar flat>
            <slot name="navigate">
                <v-btn icon @click="$root.navdrawer = !$root.navdrawer">
                    <v-icon>menu</v-icon>
                </v-btn>

                <v-toolbar-title>{{ page.title }}</v-toolbar-title>

                <v-spacer></v-spacer>

                <template v-if="!$vuetify.breakpoint.xsOnly && crud">
                    <v-scale-transition>
                        <v-btn icon key="newDesktop" :color="$root.theme" @click="newFormOpen" v-show="!disabled.add">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-scale-transition>

                    <slot></slot>

                    <v-scale-transition>
                        <v-btn icon key="edit" :color="$root.theme" @click="editFormOpen" v-show="!disabled.edit">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </v-scale-transition>

                    <v-scale-transition>
                        <v-btn icon key="trash" :color="$root.theme" @click="trashFormOpen" v-show="!disabled.delete">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-scale-transition>

                    <v-scale-transition>
                        <v-btn icon key="reload" :color="$root.theme" @click="reloadRecord" v-show="!disabled.refresh">
                            <v-icon>refresh</v-icon>
                        </v-btn>
                    </v-scale-transition>
                </template>

                <template v-else-if="!$vuetify.breakpoint.xsOnly && !crud">
                    <slot></slot>
                </template>

                <template v-else-if="$vuetify.breakpoint.xsOnly && crud">
                    <v-btn icon key="newMobile" :color="$root.theme" @click="newFormOpen" v-show="!disabled.add">
                        <v-icon>add</v-icon>
                    </v-btn>
                    
                    <slot></slot>
                </template>

                <v-btn icon :color="$root.theme" @click="searchOpen">
                    <v-icon>search</v-icon>
                </v-btn>
            </slot>
        </v-toolbar>
    </div>
</template>

<script>
import { debounce } from 'debounce';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-header',

    props: {
        absolute: {
            type: Boolean,
            default: false
        },

        crud: {
            type: Boolean,
            default: false
        },

        searchable: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        ...mapState(['disabled', 'page', 'table', 'toolbar']),

        dynStyle: function() {
            if (this.fixed) {
                return `width: calc(100% - ${this.$vuetify.application.left}px)`;
            }

            return null;
        }
    },

    data:() => ({
        searchText: null
    }),

    methods: {
        ...mapActions([
            'deleteClose', 'deleteRecord', 'editFormOpen', 'newFormOpen', 
            'reloadRecord', 'searchClose', 'searchOpen', 'trashFormOpen'
        ]),

        bouncing: debounce(function (value) {
            this.$store.commit('toolbar', { text: value });
        }, 1000),
    },

    watch: {
        searchText: function(newVal) {
            this.bouncing(newVal);
        },

        toolbar: {
            handler: function(newVal) {
                if ( newVal.search === true ) {
                    this.$nextTick(() => this.$refs.input.focus());
                }

                this.searchText = newVal.text;
            },

            deep: true 
        }
    }
};
</script>