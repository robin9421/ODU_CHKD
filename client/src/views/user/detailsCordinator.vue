<template>
<v-container>
    <v-row justify="center">
        <v-col cols="8" md="8">
            <v-data-table :headers="header" :items="user" item-key="name" class="elevation-1" :search="search">
                <template v-slot:top>
                    <v-container>
              <v-row>
                <v-col cols="11" sm="5" md="4">
                  <v-toolbar flat>
                    <v-toolbar-title style="font-size:23px;">All User Details</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                  </v-toolbar>
                </v-col>
                <v-col cols="11" sm="5" md="4">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="11" sm="5" md="4">
                  <v-autocomplete
                    v-model="search"
                    :items="types"
                    append-icon="mdi-filter"
                    chips
                    small-chips
                    outlined
                    label="User Types"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "../../axios";

export default {
    data() {
        return {
            user: [],
            search: "",
            types: ['Admin', 'Pre Op Coordinator', 'Patient'],
            header: [{
                    text: "Name",
                    value: "name",
                },
                {
                    text: "Email",
                    value: "email",
                },
                {
                    text: "Role",
                    value: "role",
                },
            ],
        };
    },
    created() {
        axios()
            .get("/user/getAllUser")
            .then((response) => {
                this.user = response.data;
            })
            .catch((err) => {
                this.user = err.data;
            });
    },
};
</script>
