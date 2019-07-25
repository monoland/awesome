<template>
    <div class="v-header">
        <v-scale-transition>
            <div class="v-search" v-show="search.state">
                <v-toolbar card class="v-toolbar--search" absolute flat color="white">
                    <input 
                        @input="bouncing" 
                        ref="input"
                        class="headline font-weight-light" 
                        type="text" 
                        placeholder="Search"
                    >

                    <v-spacer></v-spacer>
                    <v-btn :color="$root.theme" flat icon @click="closeSearch">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </div>
        </v-scale-transition>

        <v-scale-transition>
            <div class="v-delete" v-show="deleted">
                <v-toolbar card class="v-toolbar--delete" absolute flat color="white">
                    <v-btn :color="$root.theme" flat icon @click="releaseTrash">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <div class="title">{{ trash.selected.length }}</div>
                    <v-spacer></v-spacer>
                    <v-btn :color="$root.theme" flat class="ma-1" icon @click="openDelete">
                        <v-icon>delete</v-icon>
                    </v-btn>
                </v-toolbar>
            </div>
        </v-scale-transition>

        <v-toolbar :absolute="absolute" :fixed="fixed" card class="v-toolbar--application" flat :color="color">
            <slot name="navigate">
                <v-toolbar-side-icon @click="$root.navdrawer = !$root.navdrawer"></v-toolbar-side-icon>
            </slot>

            <v-spacer></v-spacer>
            <span class="d-block title" :class="{'no--search': !searchable}">{{ page.title }}</span>
            <v-spacer></v-spacer>
            
            <template v-if="!$vuetify.breakpoint.xsOnly && crud">
                <v-btn :color="$root.theme" flat class="ma-1" icon @click="openNewForm" v-show="!disabled.add">
                    <v-icon>add</v-icon>
                </v-btn>

                <slot></slot>

                <v-btn :color="$root.theme" flat class="ma-1" icon @click="openEditForm" v-show="!disabled.edit">
                    <v-icon>edit</v-icon>
                </v-btn>

                <v-btn :color="$root.theme" flat class="ma-1" icon @click="openDelete" v-show="!disabled.delete">
                    <v-icon>delete</v-icon>
                </v-btn>

                <v-btn :color="$root.theme" flat class="ma-1" icon @click="refresh" v-show="!disabled.refresh">
                    <v-icon>refresh</v-icon>
                </v-btn>
            </template>

            <template v-else-if="!$vuetify.breakpoint.xsOnly && !crud">
                <slot></slot>
            </template>

            <template v-else-if="$vuetify.breakpoint.xsOnly && crud">
                <v-btn :color="$root.theme" flat class="ma-1" icon @click="openNewForm" v-show="!disabled.add">
                    <v-icon>add</v-icon>
                </v-btn>
                
                <slot></slot>
            </template>

            <slot v-else></slot>

            <v-btn :color="$root.theme" flat icon @click="openSearch" v-if="searchable">
                <v-icon>search</v-icon>
            </v-btn>

        </v-toolbar>
    </div>
</template>

<script>
import { debounce } from 'debounce';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'v-header',

    props: {
        absolute: {
            type: Boolean,
            default: false
        },

        fixed: {
            type: Boolean,
            default: false
        },

        crud: {
            type: Boolean,
            default: false
        },

        color: {
            type: String,
            default: 'white'
        },

        searchable: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        ...mapState(['disabled', 'page', 'search', 'trash']),
        ...mapGetters(['deleted'])
    },

    methods: {
        ...mapActions([
            'closeSearch', 'openNewForm', 
            'openEditForm', 'openDelete', 'refresh',
            'releaseTrash'
        ]),

        bouncing: debounce(function(e) {
            this.$store.commit('search', { text: e.target.value });
        }, 1000),

        openSearch: function() {
            this.$store.dispatch('openSearch');
            
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        }
    }
}
</script>