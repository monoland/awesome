<template>
    <v-card height="100%" color="transparent" flat>
        <v-header crud></v-header>

        <v-card-text :class="{ 'pa-4': !tablet, 'pa-3': tablet }" v-if="desktop">
            <v-page-table>
                <template v-slot:default="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.email }}</td>
                    <td>{{ props.item.authent_name }}</td>
                    <td>{{ props.item.updated_at }}</td>
                </template>
            </v-page-table>
        </v-card-text>

        <v-page-list v-else>
            <template v-slot:default="props">
                <v-list-tile-avatar>
                    <v-icon 
                        :class="{ 'deep-orange': props.item.pinned, 'grey lighten-1': !props.item.pinned }"
                        class="white--text"
                    >
                        {{ props.item.pinned ? 'done' : 'perm_identity' }}
                    </v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ props.item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title class="f-nunito">{{ props.item.email }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </template>
        </v-page-list>

        <v-page-form small>
            <v-flex xs12>
                <v-text-field
                    label="Nama Pengguna"
                    :color="$root.theme"
                    v-model="record.name"
                ></v-text-field>

                <v-text-field
                    label="Email Pengguna"
                    :color="$root.theme"
                    v-model="record.email"
                ></v-text-field>

                <v-select
                    label="Otentikasi"
                    :color="$root.theme"
                    v-model="record.authent_id"
                ></v-select>
            </v-flex>
        </v-page-form>

        <v-page-trash></v-page-trash>
    </v-card>
</template>

<script>
import { pageMixins } from '@apps/mixins/PageMixins';

export default {
    name: 'page-user',

    mixins: [pageMixins],

    created() {
        this.setHeaders([
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Otentikasi', value: 'authorization' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ]);

        this.setPageInfo({
            icon: 'people',
            title: 'Pengguna',
        });

        this.setPageUrl('/api/users');

        this.setRecord({
            id: null,
            name: null,
            email: null,
            authent_id: null
        });
    },

    methods: {
        
    }
}
</script>