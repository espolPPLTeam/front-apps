<template>
    <v-container fluid grid-list-xl text-xs-center>
        <div class="text-xs-center primary--text" >
            <h3>Paralelos Dashboard</h3>
        </div>
        <br><br>
        <v-layout justify-center fill-height row>
            <div>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Paralelos</v-toolbar-title>
                    <v-divider
                        class="mx-2"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-toolbar>
                <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :search="search"
                    :loading="false"
                    class="elevation-1"
                    >

                    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <td class="justify-center layout px-0">
                            <v-icon
                                small
                                class="mr-2"
                                @click="userProfile(props.item.id)"
                            >
                                account_circle
                            </v-icon>
                        </td>
                        <td>{{ props.item.paral }}</td>
                        <td>{{ props.item.materia }}</td>
                        <td class="text-xs-right">{{ props.item.anio }}</td>
                        <td class="text-xs-right">{{ props.item.termino }}</td>
                        <td class="text-xs-right">{{ props.item.n_prof }}</td>
                        <td class="text-xs-right">{{ props.item.n_est }}</td>
                        <td class="text-xs-right">{{ props.item.n_grup }}</td>
                        <td class="justify-center layout px-0">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                            >
                                edit
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(props.item)"
                            >
                                delete
                            </v-icon>
                        </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning" outline>
                        Su búsqueda de  "{{ search }}" no encontró resultados.
                    </v-alert>

                </v-data-table>
            </div>
        </v-layout>
    </v-container>   
</template>

<script>
    export default {
        data() {
            return {
                search: '',
                headers: [
                    { text: '#', value: 'id_', sortable: false },
                    { text: 'Paralelo', align: 'left', value: 'paral'},
                    { text: 'Materia', align: 'left', value: 'materia' },
                    { text: 'Año', value: 'anio' },
                    { text: 'Termino', value: 'termino' },
                    { text: '# Profesores', value: 'n_prof' },
                    { text: '# Estudiantes', value: 'n_est' },
                    { text: '# Grupos', value: 'n_grup' },
                    { text: 'Actions', value: 'name', sortable: false }
                    ]
            }
        },
        computed: {
            desserts() {
                return this.$store.getters.paralelos
            }
        }

    }
</script>