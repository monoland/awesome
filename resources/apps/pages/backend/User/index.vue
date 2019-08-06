<template>
    <div class="v-page">
        <v-page-header crud absolute></v-page-header>
        
        <div class="v-page__content">
            <div class="v-page__wrap">
                <v-page-table></v-page-table>
            </div>
        </div>
    </div>
</template>

<script>
import { pageMixins } from '@apps/mixins/PageMixins';

export default {
    name: 'page-user',

    mixins: [pageMixins],

    created() {
        this.tableHeaders([
            { text: 'Name', value: 'name' },
            { text: 'Email', value: 'email' },
            { text: 'Otentikasi', value: 'authorization' },
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