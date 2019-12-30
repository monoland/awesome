<template>
    <v-app-bar class="with-shadow" absolute flat>
        <v-btn icon @click="onToggleClick" v-if="mobile">
            <v-scale-transition mode="out-in" origin="center center">
                <v-icon :key="page.state === 'selectedState' ? 'icon-selected' : 'icon-default'">
                    {{ page.state === 'selectedState' ? 'close' : 'menu' }}
                </v-icon>
            </v-scale-transition>
        </v-btn>

        <v-app-bar-nav-icon @click="toggleDrawer" v-else></v-app-bar-nav-icon>
        
        <v-toolbar-title>{{ page.title }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <div class="v-toolbar-action absolute" v-if="dataWithCrud">
            <slot name="add-button" v-if="allowAdd">
                <v-btn-action
                    icon="add" 
                    text="Tambah Data" 
                    v-model="button.add"
                    @click="addFormOpen"
                ></v-btn-action>
            </slot>

            <v-btn-action v-if="allowRefresh"
                icon="refresh" 
                text="Refresh Data" 
                v-model="button.refresh" 
                @click="recordRefresh"
            ></v-btn-action>

            <v-btn-action v-if="allowSearch"
                icon="search" 
                text="Cari Data" 
                v-model="button.search" 
                @click="searchFormOpen"
            ></v-btn-action>
        </div>
        
        <div class="v-toolbar-action relative" v-if="dataWithCrud">
            <slot name="link-button"></slot>

            <v-btn-action v-if="allowEdit"
                icon="edit" 
                text="Ubah Data" 
                v-model="button.edit" 
                @click="editFormOpen"
            ></v-btn-action>

            <v-btn-action v-if="allowDelete"
                icon="delete" 
                text="Hapus Data" 
                v-model="button.delete" 
                @click="deleteFormOpen"
            ></v-btn-action>
        </div>

        <v-fade-transition>
            <div v-if="dataWithCrud"
                class="white absolute fill-all v-toolbar__content" 
                :class="{ 'd-flex': page.state === 'searchState' }" 
                v-show="page.state === 'searchState'"
            >
                <v-text-field 
                    label="Search" 
                    class="headline font-weight-light"
                    v-model="searchText"
                    single-line 
                    hide-details
                ></v-text-field>
                
                <v-btn-action icon="close" text="Close Search" :value="true" @click="searchFormClose"></v-btn-action>
            </div>
        </v-fade-transition>

        <div class="v-toolbar-action relative" v-if="dataUpdateOnly">
            <v-btn-action
                icon="check" 
                text="Update Data" 
                :value="true"
                @click="$emit('update')"
            ></v-btn-action>
        </div>
    </v-app-bar>
</template>

<script>
import { debounce } from 'debounce';
import { mapState, mapActions } from 'vuex';

export default {
    name: 'v-page-toolbar',

    props: {
        noCrud: {
            type: Boolean,
            default: false
        },

        withCrud: {
            type: Boolean,
            default: true
        },

        allowAdd: {
            type: Boolean,
            default: true
        },

        allowEdit: {
            type: Boolean,
            default: true
        },

        allowDelete: {
            type: Boolean,
            default: true
        },

        allowRefresh: {
            type: Boolean,
            default: true
        },

        allowSearch: {
            type: Boolean,
            default: true
        },

        updateOnly: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        ...mapState(['button', 'mobile', 'page'])
    },

    data:() => ({
        searchText: null,
        dataNoCrud: false,
        dataWithCrud: true,
        dataUpdateOnly: false,
    }),

    methods: {
        ...mapActions([
            'addFormOpen', 'deleteFormOpen', 'dialogPost', 'editFormOpen', 'recordRefresh',
            'removeSelected', 'searchFormOpen', 'searchFormClose', 'searchData', 'setFormState'
        ]),

        toggleDrawer: function() {
            this.$root.drawer = !this.$root.drawer;
        },

        onToggleClick: function() {
            if (this.page.state === 'selectedState') { 
                this.removeSelected();
            } else {
                this.$root.drawer = !this.$root.drawer;
            }
        },

        bouncing: debounce(function (value) {
            this.searchData({ findBy: value });
        }, 1000),
    },

    watch: {
        searchText: function(findBy) {
            this.bouncing(findBy);
        },

        'page.findBy': function(findBy) {
            if (!findBy) this.searchText = null;
        },

        updateOnly: {
            handler: function(newValue) {
                this.dataUpdateOnly = newValue;

                if (newValue === true) { 
                    this.dataWithCrud = false;
                    this.setFormState('update');
                }
            },

            immediate: true
        },

        noCrud: {
            handler: function(newValue) {
                this.dataNoCrud = newValue;

                if (newValue === true) this.dataWithCrud = false;
            },

            immediate: true
        } 
    }
}
</script>