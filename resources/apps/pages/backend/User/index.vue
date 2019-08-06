<template>
    <div class="v-page">
        <v-page-header crud absolute></v-page-header>
        
        <div class="v-page__content">
            <div class="v-page__wrap">
                <v-desktop-table v-if="desktop"
                    :single="single"
                ></v-desktop-table>

                <v-mobile-table icon="perm_identity" v-else>
                    <template v-slot:default="props">
                        <v-list-item-content>
                            <v-list-item-title>{{ props.item.name }}</v-list-item-title>
                            <v-list-item-subtitle class="f-nunito">{{ props.item.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </v-mobile-table>

                <v-page-form small>
                    <v-flex xs12>
                        <v-text-field
                            label="Nama Pengguna"
                            :color="$root.theme"
                            v-model="record.name"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                            label="Email Pengguna"
                            :color="$root.theme"
                            v-model="record.email"
                        ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-select
                            label="Otentikasi"
                            :color="$root.theme"
                            v-model="record.authent_id"
                        ></v-select>
                    </v-flex>
                </v-page-form>
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