<template>
    <v-container :fluid="isFluid">

        <template v-if="!isSubmitted">
        <v-form
                ref="form"
                v-model="valid"
                lazy-validation
        >

            <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
            ></v-select>

            <v-btn
                    :disabled="!valid"
                    color="success"
                    @click.prevent="validate"
            >
                Validate
            </v-btn>
        </v-form>
        </template>

        <template v-if="isSubmitted">
        <v-data-table
                :headers="headers"
                :items="agentName"
                class="elevation-1"
                :pagination.sync="pagination"
                :hide-actions="hideActions"
                :no-data-text="noDataText"
                :disable-initial-sort="disableInitialSort"
        >
            <template v-slot:items="props">
                    <tr>
                        <td>{{ props.item.saleDate }}</td>
                        <td>{{ props.item.closer }}</td>
                        <td>{{ props.item.clients }}</td>
                        <td>{{ props.item.policies }}</td>
                        <td>{{ props.item.totalCommission }}</td>
                        <td>{{ calAvgCommByPolicies(props.item.totalCommission, props.item.policies) }}</td>
                        <td>0</td>
                    </tr>
            </template>
        </v-data-table>
            </template>

    </v-container>
</template>

<script>

    import axios from 'axios';

    export default {
        data: () => ({
            valid: true,
            isSubmitted: false,
            select: null,
            items: [1],
            apiKey: process.env.VUE_APP_ADL_API,
           isFluid: true,
            headers:  [
                { text: 'Sale Date', value: 'saleDate' },
                { text: 'Closer', value: 'closer' },
                { text: 'Clients', value: 'clients' },
                { text: 'Policies', value: 'policies' },
                { text: 'Total Commission', value: 'totalCommission' },
                { text: 'Avg Commission', value: 'avgCommission' },
                { text: 'Avg PerClient', value: 'avgPerClient' },
            ],
            pagination: {
                rowsPerPage: -1,
            },
            agentName: [],
            hideActions: true,
            noDataText: 'Retrieving data',
            disableInitialSort: true
        }),
        created() {


        },
        methods: {
            fetchData() {


            },
            calAvgCommByPolicies: function (commission, policies) {

                const avgCommission = commission / policies;

                return avgCommission;
            },
            validate () {
                if (this.$refs.form.validate()) {
                    this.isSubmitted = true

                    if(this.isSubmitted) {

                        const vm = this;

                        axios.get('https://renew-life.adl-crm.uk/addon/dialer/JSON/closerCommission.php?EXECUTE=1&apiKey='+vm.apiKey)
                            .then(res => {
                                console.log(res);
                                const data = res.data;
                                const agents = [];
                                for (let key in data) {
                                    const user = data[key];
                                    //user.id = key;
                                    agents.push(user)
                                }
                                //console.log(agents);
                                this.agentName = agents;
                            })
                            .catch(error => console.log(error))

                    }
                }
            }
        }
    }
</script>
