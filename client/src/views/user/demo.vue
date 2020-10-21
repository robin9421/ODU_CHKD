<template>
      <v-data-table
      :headers="headers"
      :items="desserts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">
        
        <v-row justify="center" width="100%">
                <v-col cols="8" md="5">
                  <v-card class="pa-5 ma-5" justify-center>
                    <h2>Other Details</h2>
                    <hr />
                    <p style="margin-top: 20px">
                      <b>Prescription :</b>
                      {{ desserts.name }}
                    </p>
                    <p>
                      <b>Venue :</b>
                      {{ desserts.fat }}
                    </p>
                    <p>
                      <b>Instructions :</b>
                      {{ desserts.carbs }}
                    </p>
                  </v-card>
                </v-col>
              </v-row>
          </td>
      </template>
    </v-data-table>
</template>

<script>
import axios from "../../axios";
  export default {
   data () {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "Patient Name",
          value: "patient.name",
          align: "start",
          sortable: false,
        },
        {
          text: "Doctor Name",
          value: "cordinator.name",
        },
        {
          text: "Surgery Type",
          value: "type",
        },
        {
          text: "Date",
          value: "date",
        },

        {
          text: "Time",
          value: "time",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      desserts: [],
    };
   },
      created() {
    if (localStorage.getItem("role") == "Patient") {
      var id = localStorage.getItem("id");
      axios()
        .get(`/user/getSpecificUser/${id}`)
        .then((response) => {
          this.header.splice(5);
          console.log("+++++++++");
          console.log(response.data);
          console.log("++++++++++");
          this.surgeries = response.data;
        })
        .catch((err) => {
          this.surgeries = err.data;
        });
    } else {
      axios()
        .get("/user/getAllSurgeries")
        .then((response) => {
          console.log(localStorage.getItem("role"));
          this.role = localStorage.getItem("role");
          // if (this.role != "Admin") {
          //     this.header.splice(5);
          // }
          console.log("+++++++++");
          console.log(response.data);
          console.log("++++++++++");
          this.desserts = response.data;
          console.log(this.surgeries);
        })
        .catch((err) => {
          this.surgeries = err.data;
        });
    }
  },
  }
</script>
