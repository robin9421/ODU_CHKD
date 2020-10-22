<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="12">
        <v-data-table
          show-expand
          :headers="header"
          :items="surgeries"
          item-key="_id"
          class="elevation-1"
          :search="search"
        >
          <template v-slot:top>
            <v-container>
              <v-row>
                <v-col cols="11" sm="5" md="4">
                  <v-toolbar flat>
                    <v-toolbar-title style="font-size: 23px"
                      >Surgery Details</v-toolbar-title
                    >
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
                    :items="items"
                    append-icon="mdi-filter"
                    chips
                    small-chips
                    outlined
                    label="Surgery types"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
           

            <!-- ----------------dialog for delete item----------------- -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure want to delete?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="cancelDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="confirmDelete"
                    >Confirm</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- ------------------------------------------------------ -->

            <!-- ----------------dialog for change status--------------- -->
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Update the Status here</v-card-title
                >
                <v-card-text>
                  <v-col cols="12" sm="6" md="12">
                    <v-autocomplete
                      label="Change Status"
                      :items="changeStatusItems"
                      v-model="statusItem"
                    ></v-autocomplete>
                  </v-col>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeStatus"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="updateStatusCode"
                    >Update</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!------------------------------------------>
          </template>
          
          <template v-slot:item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
          <template v-slot:item.actions="{ item }"
            ><!-- v-if="role == 'Admin'" -->
            <router-link
              class="text-decoration-none"
              :to="'/user/profile/surgeryDetails/edit/' + item._id"
            >
              <v-icon class="mr-2" color="primary">mdi-pencil</v-icon>
            </router-link>
            <v-icon color="error" @click="deleteItem(item)" class="mr-2"
              >mdi-delete</v-icon
            >
          </template>

          <!-- -------------------status----------------------- -->
          <template v-slot:item.status="{ item }">
            <v-btn
              small
              elevation="2"
              class="primary"
              @click="changeStatus(item)"
              >Change</v-btn
            >
          </template>
          <!-- <template v-slot:header="{ item }">
            <v-icon class="mr-2" color="primary" small>mdi-pencil</v-icon>
          </template> -->
          <!-- ------------------------------------------ -->

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-row justify="center" width="100%">
                <v-col cols="4" md="4">
                  <v-card class="pa-5 ma-5" justify-center>
                    <h2>Other Details</h2>
                    <hr />
                    <p style="margin-top: 20px">
                      <b>Prescription :</b>
                      {{ item.prescription }}
                    </p>
                    <p>
                      <b>Venue :</b>
                      {{ item.venue }}
                    </p>
                    <p>
                      <b>Instructions :</b>
                      {{ item.Instructions }}
                    </p>
                  </v-card>
                </v-col>

                <!-- -----------------steppers--------------------- -->
                <v-col cols="12" md="8">
                  <template>
                    <v-card>
                      <v-row align="center">
                        <v-col cols="12" md="12" style="text-align:center;">
                          <v-card-title>
                            Surgery state of {{ item.patient.name }}
                          </v-card-title>
                        </v-col>
                        <v-col cols="12" md="12">
                          <v-card-text>
                            <v-stepper v-model="item.status" class="ma-5">
                              <v-stepper-header>
                                <v-stepper-step
                                  :complete="item.status > 1"
                                  step="1"
                                >
                                  Surgery scheduled
                                </v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step
                                  :complete="item.status > 2"
                                  step="2"
                                >
                                  Patient Checked In
                                </v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step
                                  :complete="item.status > 3"
                                  step="3"
                                >
                                  Patient in Surgery
                                </v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step
                                  step="4"
                                  :complete="item.status > 4"
                                >
                                  Patient Post Surgery
                                </v-stepper-step>

                                <v-divider></v-divider>

                                <v-stepper-step
                                  step="5"
                                  :complete="item.status >= 5"
                                >
                                  Patient Discharged
                                </v-stepper-step>
                              </v-stepper-header>

                              <!-- <v-stepper-items>
                        <v-stepper-content step="1">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          ></v-card>

                          <v-btn color="primary" @click="e1 = 2">
                            Continue
                          </v-btn>

                          <v-btn text> Cancel </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="2">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          ></v-card>

                          <v-btn color="primary" @click="e1 = 3">
                            Continue
                          </v-btn>

                          <v-btn text> Cancel </v-btn>
                        </v-stepper-content>

                        <v-stepper-content step="3">
                          <v-card
                            class="mb-12"
                            color="grey lighten-1"
                            height="200px"
                          ></v-card>

                          <v-btn color="primary" @click="e1 = 1">
                            Continue
                          </v-btn>

                          <v-btn text> Cancel </v-btn>
                        </v-stepper-content>
                      </v-stepper-items> -->
                            </v-stepper>
                          </v-card-text>
                        </v-col>
                      </v-row>
                    </v-card>
                  </template>
                </v-col>
                <!-- -------------------steppers----------------------->
              </v-row>
            </td></template
          >
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
      surgeries: [],
      changeStatusItems: [
        "Patient checked In",
        "Patient in Surgery",
        "Patient Post Surgery",
        "Patient Discharged",
      ],
      dialog: false,
      itemToBeDeleted: {},
      itemWithStatusToBeUpdated: {},
      statusItem: "",
      e1: 0,
      dialogDelete: false,
      role: "",
      singleExpand: false,
      items: [
        "Orthopedic surgery",
        "Inguinal hernia",
        "adenotonsillectomy surgery",
      ],
      search: "",
      header: [
        
        {
          text: "Patient Name",
          value: "patient.name",
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
        ,
        {
          text: "Status",
          value: "status",
        },
        {
          text: "",
          value: "data-table-expand",
        },
      ],
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
          this.surgeries = response.data;
          console.log("++++++++++");
          console.log(this.surgeries);
          console.log("$$$$$$$$$$$$$");
        })
        .catch((err) => {
          this.surgeries = err.data;
        });
    }
  },
  methods: {
    closeStatus() {
      this.dialog = false;
    },
    changeStatus(item) {
      this.dialog = true;
      this.itemWithStatusToBeUpdated = item;
    },
    updateStatusCode() {
      console.log("______________");
      console.log(this.statusItem);
      console.log("______________");
      if (this.statusItem == "Patient checked In") {
        this.e1 = 2;
      } else if (this.statusItem == "Patient in Surgery") {
        this.e1 = 3;
      } else if (this.statusItem == "Patient Post Surgery") {
        this.e1 = 4;
      } else if (this.statusItem == "Patient Discharged") {
        this.e1 = 5;
      }
      console.log("_+++++++++");
      console.log(this.e1);
      console.log("_++++++++++++");
      axios()
        .post(`/user/getSurgery/${this.itemWithStatusToBeUpdated._id}`, {
          status: this.e1,
        })
        .then((response) => {
          axios()
            .get("/user/getAllSurgeries")
            .then((response) => {
              this.surgeries = response.data;
            })
            .catch((err) => {
              this.surgeries = err.data;
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog = false;
    },
    deleteItem(item) {
      console.log("+++++++++++++");
      console.log(item);
      console.log("+++++++++++++");
      this.itemToBeDeleted = item;
      this.dialogDelete = true;
    },
    confirmDelete() {
      console.log("+++++++++++++");
      console.log(this.itemToBeDeleted);
      console.log("+++++++++++++");
      this.surgeries.splice(this.itemToBeDeleted, 1);
      axios()
        .get(`/user/deleteSurgery/${this.itemToBeDeleted._id}`)
        .then((response) => {
          var index = this.surgeries.indexOf(item);
          this.surgeries.splice(index, 1);
          this.snackbar = true;
          this.message = "Deleted";
          this.color = "success";
        })
        .catch((err) => {
          this.snackbar = true;
          this.message = "Cannot Delete";
          this.color = "error";
        });
      this.dialogDelete = false;
    },
    cancelDelete() {
      this.dialogDelete = false;
    },
  },
};
</script>