<template>
    <v-widget table>
        <v-data-table v-model="table.selected"
            :headers="headers"
            :items="records"
            :pagination.sync="table.paging"
            :total-items="table.total"
            :rows-per-page-items="table.page"
            :loading="table.loader"
            select-all
        >
            <v-progress-linear slot="progress" color="teal" height="1" indeterminate></v-progress-linear>

            <template v-slot:items="props">
                <tr :active="props.selected" @click="props.selected = !props.selected">
                    <td>
                        <v-checkbox
                            :input-value="props.selected"
                            primary hide-details
                        ></v-checkbox>
                    </td>
                    
                    <slot :item="props.item" :index="props.index"></slot>
                </tr>
            </template>

            <template slot="no-data">
                <div class="v-datatable__message">
                    <v-icon>sms_failed</v-icon>
                    <div class="v-datatable__text">{{ table.message }}</div>
                </div>
            </template>
        </v-data-table>
    </v-widget>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'v-page-table',

    computed: {
        ...mapState([
            'table', 'headers', 'records', 'multiple'
        ]),
    }
}
</script>
