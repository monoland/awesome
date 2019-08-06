<template>
    <div class="v-page">
        <v-page-header crud absolute></v-page-header>
        
        <div class="v-page__content">
            <div class="v-page__wrap">
                <v-widget table v-if="desktop">
                    <v-data-table
                        v-model="table.selected"
                        :headers="headers"
                        :items="records"
                        :single-select="single"
                        :loading="table.loader"
                        item-key="id"
                        show-select
                    ></v-data-table>
                </v-widget>

                <v-mobile-table icon="perm_identity" v-else>
                    <template v-slot:default="props">
                        <v-list-item-content>
                            <v-list-item-title>{{ props.item.name }}</v-list-item-title>
                            <v-list-item-subtitle class="f-nunito">{{ props.item.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </v-mobile-table>
            </div>
        </div>
    </div>
</template>

<script>
import { pageMixins } from '@apps/mixins/PageMixins';

export default {
    name: 'page-user',

    mixins: [pageMixins],

    data:() => ({
        single: false
    }),

    created() {
        this.tableHeaders([
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Otentikasi', value: 'authent_name' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ]);

        this.pageInfo({
            icon: 'people',
            title: 'Pengguna',
        });

        this.dataUrl(`/api/users`);

        this.setRecord({
            id: null,
            name: null,
            email: null,
            authent_id: null
        });
    }
};
</script>