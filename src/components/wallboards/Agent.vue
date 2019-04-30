<template>
    <v-container grid-list-md>
        <v-layout>

            <v-flex xs6>

                <v-data-iterator
                        :items="agentName"
                        :pagination.sync="pagination"
                        row
                        wrap
                        :hide-actions="hideActions"
                        :no-data-text="noDataText"
                        :disable-initial-sort="disableInitialSort"
                >
                    <template v-slot:item="props">
                        <template v-if="props.item.campaign_id === '9996'">
                            <v-flex>
                                <v-card>
                                    <v-card-title :class="setColour(props.item.agentStatus, props.item.dead_epoch, props.item.lead_id, props.item.comments, props.item.campaign_id, props.item.agentTime, props.item.agentTime2)"><h4>{{ props.item.full_name }} ({{ props.item.agentStatus }})</h4></v-card-title>
                                    <v-divider></v-divider>
                                    <v-list dense>
                                        <v-list-tile>
                                            <v-list-tile-content class="align-center">{{ props.item.agentTime }}</v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </template>
                    </template>
                </v-data-iterator>

            </v-flex>



            <v-flex xs12>

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
                <template v-if="props.item.campaign_id != 9996">
                    <tr>
                <td>{{ props.item.full_name }}</td>
                <td
                        :class="setColour(props.item.agentStatus, props.item.dead_epoch, props.item.lead_id, props.item.comments, props.item.campaign_id, props.item.agentTime, props.item.agentTime2)"
                        >
                   {{ checkStatus(props.item.agentStatus, props.item.dead_epoch, props.item.lead_id, props.item.comments, props.item.campaign_id)}}
                </td>
                <td>{{ setCorrectTime(props.item.agentTime, props.item.agentTime2, props.item.agentStatus) }}</td>
                    </tr>
                </template>
            </template>
        </v-data-table>
<!--:style="{backgroundColor: (props.item.agentStatus === 'PAUSED' ? 'red' : 'transparent' ) }"-->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import axios from 'axios';

    export default {
        data: () => ({
            headers:  [
                { text: 'Agent', value: 'Agent' },
                { text: 'Status', value: 'Status' },
                { text: 'Time', value: 'agentTime' }
            ],
            pagination: {
                rowsPerPage: -1,
                //sortBy: 'agentTime',
                //descending: true,
            },
            agentName: [],
            hideActions: true,
            noDataText: 'Retrieving data',
            disableInitialSort: true
        }),
        created() {
                setInterval(() => {
                    axios.get('/realtimeReport.php?EXECUTE=1')
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

                },4000 )
        },
        methods: {
            checkStatus: function (agentStatus, dead_epoch, lead_id, comments, campaign_id)  {

                if(campaign_id === '9996') {

                    switch (agentStatus) {
                        case 'INCALL':
                            if (dead_epoch != null) {
                                agentStatus = 'DEAD'
                            } else {
                                agentStatus = 'CLOSERINCALL';
                            }

                            break;
                        default:
                            agentStatus = 'CLOSERREADY';
                    }

                } else {

                    switch (agentStatus) {
                        case 'READY':
                            agentStatus = 'WAITING';
                            break;
                        case 'INCALL':
                            if (dead_epoch != null) {
                                agentStatus = 'DEAD'
                            }
                            break;
                        case 'PAUSED':
                            if (lead_id > 0 && comments.length === 0) {
                                agentStatus = 'DISPO'
                            }
                            break;
                    }

                }

                return agentStatus;

            },
            setColour: function(agentStatus, dead_epoch, lead_id, comments, campaign_id, agentTime, agentTime2) {

                if (campaign_id === '9996') {

                    switch (agentStatus) {
                        case 'INCALL':
                            if (dead_epoch != null) {
                                agentStatus = 'DEAD'
                            } else {
                                agentStatus = 'CLOSERINCALL';
                            }

                            break;
                        default:
                            agentStatus = 'CLOSERREADY';
                    }

                } else {

                    switch (agentStatus) {
                        case 'READY':
                            agentStatus = 'WAITING';
                            break;
                        case 'INCALL':
                            if (agentTime < '00:00:98') {
                                agentStatus = 'INCALL';
                            } else if (agentTime >= '00:00:99' && agentTime < '00:02:99') {
                            agentStatus = 'INCALLMED';
                        } else if (agentTime >= '00:02:99') {
                            agentStatus = 'INCALLLONG';
                        }
                            if (dead_epoch != null) {
                                agentStatus = 'DEAD'
                            }
                            break;
                        case 'PAUSED':
                            if (agentTime2 < '00:00:98') {
                                agentStatus = 'PAUSED';
                            } else if (agentTime2 >= '00:00:99' && agentTime2 < '00:02:99') {
                                agentStatus = 'PAUSEDMED';
                            } else if (agentTime2 >= '00:02:99') {
                                agentStatus = 'PAUSEDLONG';
                            }
                            if (lead_id > 0 && comments.length === 0) {
                                agentStatus = 'DISPO'
                            }
                            break;
                    }

                }

                return agentStatus;
            },
            setCorrectTime: function (agentTime, agentTime2, agentStatus) {

                let time;

                if(agentStatus === 'INCALL' || agentStatus === 'MANUAL') {
                     time = agentTime
                } else {
                     time = agentTime2
                }

                return time;
            }
        }
    }
</script>

<style scoped>
    .PAUSED {
        background-color: #F0E68C;
    }
    .PAUSEDMED {
        background-color: #FEFF00;
    }
    .PAUSEDLONG {
        background-color: #808000;
    }
    .INCALL {
        background-color: #D8BFD8;
    }
    .INCALLMED {
        background-color: #ED82EE;
    }
    .INCALLLONG {
        background-color: #800080;
    }
    .QUEUE {
        background-color: cyan;
    }
    .WAITING {
        background-color: lightblue;
    }
    .DEAD {
        background-color: grey;
    }
    .DISPO {
        background-color: #fff0a8;
    }
    .CLOSERREADY {
        background-color: green;
    }
    .CLOSERINCALL {
        background-color: red;
    }
    table.v-table tbody tr td {
        font-weight: bold;
    }
</style>