<template>
    <v-container fluid grid-list-xl text-xs-center>
        <div class="text-xs-center primary--text" >
            <h3>Estudiantes Dashboard</h3>
        </div>
        <br><br>
        <v-layout justify-center fill-height  row xs12 md6>
            <v-flex xs6 sm6 md6 lg4 d-flex>
                <v-select
                :items="items"
                label="Materia"
                outline
                ></v-select>
            </v-flex>
            <v-flex xs6 sm6 md6 lg4 d-flex>
                <v-select
                :items="items"
                label="Paralelo"
                outline
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout justify-center fill-height row>
            <div>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Estudiantes</v-toolbar-title>
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
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-right">{{ props.item.calories }}</td>
                        <td class="text-xs-right">{{ props.item.fat }}</td>
                        <td class="text-xs-right">{{ props.item.carbs }}</td>
                        <td class="text-xs-right">{{ props.item.protein }}</td>
                        <td class="text-xs-right">{{ props.item.iron }}</td>
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
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
                headers: [
                    { text: '#', value: 'name', sortable: false },
                    {
                        text: 'Dessert (100g serving)',
                        align: 'left',
                        sortable: false,
                        value: 'name'
                    },
                    { text: 'Nombres', value: 'calories' },
                    { text: 'Apellidos', value: 'fat' },
                    { text: 'Matricula', value: 'carbs' },
                    { text: 'Carrera', value: 'protein' },
                    { text: 'E-mail', value: 'iron' },
                    { text: 'Actions', value: 'name', sortable: false }
                    ]
            }
        },
        computed: {
            desserts() {
                return this.$store.getters.estudiantes
            }
        }

    }
</script>