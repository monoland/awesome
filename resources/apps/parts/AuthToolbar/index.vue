<template>
    <v-app-bar class="with-shadow" :color="theme" dark flat app>
        <v-app-bar-nav-icon @click="$root.drawer = !$root.drawer" v-if="page.parent"></v-app-bar-nav-icon>

        <v-btn icon @click="$router.go(-1)" v-else>
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-toolbar-title>{{ page.title }}</v-toolbar-title>

        <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            :color="theme"
            absolute
            top
        ></v-progress-linear>

        <v-fade-transition>
            <div class="position-absolute fit-content" v-show="search.state">
                <v-toolbar :color="theme" dark flat>
                    <v-text-field
                        ref="search"
                        label="Search"
                        rounded
                        filled
                        dense
                        single-line
                        hide-details
                        class="title font-weight-light mr-2"
                        v-model="searchText"
                    ></v-text-field>
                    
                    <v-btn icon @click="searchClose">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
            </div>
        </v-fade-transition>

        <v-spacer></v-spacer>

        <div class="v-toolbar-actions" :class="theme" v-if="page.useCRUD">
            <div class="v-toolbar-actions__relative" 
                :style=" page.state === 'defaultState' || page.state === 'trashState' ? `padding-left: 8px` : ``"
            >
                <v-btn-toolbar 
                    icon="add" 
                    text="addnew" 
                    v-model="toolbar.addnew"
                    @click="formAddnewOpen"
                />

                <v-btn-toolbar 
                    v-for="(button, index) in page.buttons" 
                    v-model="toolbar.addnew"
                    :key="index"
                    :icon="button.icon"
                    :text="button.text"
                    @click="button.click"
                />
                
                <v-btn-toolbar 
                    icon="refresh" 
                    text="refresh" 
                    v-model="toolbar.refresh"
                    @click="recordsRefresh"
                />
                
                <v-btn-toolbar 
                    icon="search" 
                    text="search" 
                    v-model="toolbar.search"
                    @click="searchOpen"
                />
            </div>

            <div class="v-toolbar-actions__absolute" :class="theme">
                <v-btn-toolbar 
                    v-for="(link, index) in page.links" 
                    v-model="toolbar.link"
                    :key="index"
                    :icon="link.icon"
                    :text="link.text"
                    @click="formLinkOpen(link)"
                />

                <v-btn-toolbar 
                    icon="edit" 
                    text="edit" 
                    v-model="toolbar.edit"
                    @click="formUpdateOpen"
                />
                
                <v-btn-toolbar 
                    icon="delete" 
                    text="delete" 
                    v-model="toolbar.delete"
                    @click="formDeleteOpen"
                />

                <v-btn-toolbar 
                    icon="restore_from_trash" 
                    text="restore" 
                    v-model="toolbar.restore"
                    @click="formRestoreOpen"
                />
                
                <v-btn-toolbar 
                    icon="delete_forever" 
                    text="force-delete" 
                    v-model="toolbar.forceDelete"
                    @click="formForceDeleteOpen"
                />
            </div>
        </div>
        
        <div class="v-toolbar-actions" v-else>
            <div class="v-toolbar-actions__relative">
                <v-btn-toolbar 
                    v-for="(button, index) in page.buttons" 
                    v-model="toolbar.addnew"
                    :key="index"
                    :icon="button.icon"
                    :text="button.text"
                    @click="button.click"
                />
            </div>
        </div>
    </v-app-bar>
</template>

<script>
import { debounce } from 'debounce';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'v-auth-toolbar',

    computed: {
        ...mapState(['page', 'search', 'table', 'theme', 'toolbar']),

        loading: function() {
            return this.table.loader;
        }
    },

    data:() => ({
        searchText: null,
    }),

    methods: {
        ...mapActions([
            'formAddnewOpen', 'formLinkOpen', 'formUpdateOpen', 'formDeleteOpen', 
            'formRestoreOpen', 'formForceDeleteOpen', 'recordsRefresh', 
            'setSeachFindBy', 'searchFormClose', 'searchFormOpen'
        ]),

        searchClose: function() {
            this.searchFormClose().then(() => {
                this.searchText = null;
            });
        },

        searchOpen: function() {
            this.searchFormOpen().then(() => {
                this.$refs.search.focus();
            });
        },

        searchBouncing: debounce(function (value) {
            this.setSeachFindBy(value);
        }, 1000)
    },

    watch: {
        searchText: function(value) {
            this.searchBouncing(value);
        }
    }
};
</script>

<style lang="sass">
    @import '@sass/toolbar.sass'
</style>