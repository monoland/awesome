<template>
    <v-card height="100%" color="transparent" flat>
        <v-header crud></v-header>

        <v-card-text :class="{ 'pa-4': !tablet, 'pa-3': tablet }" v-if="desktop">
            <v-page-table>
                <template v-slot:default="props">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.secret }}</td>
                    <td><v-icon>{{ props.item.lockicon }}</v-icon></td>
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
                        {{ props.item.pinned ? 'done' : 'whatshot' }}
                    </v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ props.item.name }}</v-list-tile-title>
                    <v-list-tile-sub-title class="f-nunito">{{ props.item.secret }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </template>
        </v-page-list>

        <v-page-form small>
            <v-flex sm6 xs6>
                <v-text-field
                    label="Id Klien"
                    :color="$root.theme"
                    v-model="record.id"
                    readonly
                ></v-text-field>
            </v-flex>

            <v-flex sm6 xs6>
                <v-select v-if="form.mode === 'edit'"
                    :items="statuses"
                    label="Status"
                    :color="$root.theme"
                    v-model="record.revoked"
                ></v-select>

                <v-select v-else
                    :items="grants"
                    label="Grant"
                    :color="$root.theme"
                    v-model="record.grant"
                ></v-select>
            </v-flex>

            <v-flex sm6 xs12>
                <v-text-field
                    label="Nama Klien"
                    :color="$root.theme"
                    v-model="record.name"
                ></v-text-field>
            </v-flex>

            <v-flex sm6 xs12>
                <v-text-field
                    label="Redirect"
                    :color="$root.theme"
                    v-model="record.redirect"
                ></v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-textarea v-if="form.mode === 'edit'"
                    label="Rahasia"
                    :color="$root.theme"
                    v-model="record.secret"
                ></v-textarea>
            </v-flex>
        </v-page-form>

        <v-page-trash></v-page-trash>
    </v-card>
</template>

<script>
import { pageMixins } from '@apps/mixins/PageMixins';

export default {
    name: 'page-client',

    mixins: [pageMixins],

    data:() => ({
        statuses: [
            { value: false, text: 'active' },
            { value: true, text: 'revoked' }
        ],

        grants: [
            { value: 'password', text: 'Password Grant' },
            { value: 'client', text: 'Client Grant' }
        ],
    }),

    created() {
        this.setHeaders([
            { text: 'Nama', value: 'name' },
            { text: 'Secret', value: 'secret' },
            { text: 'Revoke', value: 'revoked', sortable: false, align: 'center', class: 'icontag' },
            { text: 'Updated', value: 'updated_at', class: 'date-updated' }
        ]);

        this.setPageInfo({
            icon: 'whatshot',
            title: 'Klien',
        });

        this.setPageUrl('/api/client');

        this.setRecord({
            id: null,
            name: null,
            secret: null,
            revoked: false,
            grant: null,
            redirect: null
        });
    },

    methods: {
        
    }
}
</script>