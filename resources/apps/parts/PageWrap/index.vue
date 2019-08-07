<template>
    <div class="v-page">
        <slot name="toolbar">
            <v-page-header 
                :absolute.sync="absolute"
                :crud.sync="crud"  
                :searchable.sync="searchable"
                :withProgress.sync="withProgress"
            >
                <template #add-button>
                    <slot name="add-button"></slot>
                </template>
            </v-page-header>
        </slot>
        
        <div class="v-page__content">
            <div class="v-page__wrap">
                <slot></slot>

                <v-page-trash></v-page-trash>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-page-wrap',

    props: {
        absolute: {
            type: Boolean,
            default: false
        },

        crud: {
            type: Boolean,
            default: false
        },

        withProgress: {
            type: Boolean,
            default: false
        },

        searchable: {
            type: Boolean,
            default: false
        }
    },
};
</script>
