<template>
    <v-container fluid grid-list-xl text-xs-center>
        <div class="text-xs-center primary--text" >
            <h3>Materias Dashboard</h3>
        </div>
        <br><br>
        <v-layout justify-center fill-height row>
            <div>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Materias</v-toolbar-title>
                    <v-divider
                        class="mx-2"
                        inset
                        vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
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
                        <td>{{ props.item.cod }}</td>
                        <td class="text-xs-right">{{ props.item.nombre }}</td>
                        <td class="text-xs-right">{{ props.item.n_prof }}</td>
                        <td class="text-xs-right">{{ props.item.n_est }}</td>
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
                    { text: 'Codigo', sortable: false, align: 'left', value: 'cod'},
                    { text: 'Nombre', value: 'nombre' },
                    { text: '# Profesores', value: 'n_prof' },
                    { text: '# Estudiantes', value: 'n_est' },
                    { text: 'Actions', value: 'name', sortable: false }
                    ]
            }
        },
        computed: {
            desserts() {
                return this.$store.getters.materias
            }
        }
    }
</script>