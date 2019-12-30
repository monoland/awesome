<template>
    <div class="v-page">
        <slot name="header"></slot>
        
        <div class="v-page--wrap" :class="{ 'white': mobile }">
            <div class="v-page__content">
                <slot></slot>
            </div>
        </div>

        <slot name="footer"></slot>

        <v-page-delete></v-page-delete>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-page-wrap',

    computed: {
        ...mapState(['mobile']),
    },
};
</script>