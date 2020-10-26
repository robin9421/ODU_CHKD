<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" md="12">
        <v-data-table
          show-expand
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          :headers="header"
          :items="surgeries"
          item-key="_id"
          class="elevation-5"
          :search="search"
        >
          <!-- <template slot="header" class="v-data-table-header">
            <tr>
              <th>
                <v-btn><v-icon>mdi-pencil</v-icon></v-btn>
              </th>
            </tr>
          </template> -->

          <template v-slot:top>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-toolbar flat>
                    <v-toolbar-title style="font-size: 23px"
                      >Surgery Details</v-toolbar-title
                    >
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-switch
                      v-model="singleExpand"
                      label="Single expand"
                      class="mt-2"
                    ></v-switch>
                  </v-toolbar>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
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

            <!-- ----------------------dialog for edit surgery----------- -->
            <v-dialog v-model="dialogEdit" persistent max-width="1000px">
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Surgery</span>
                </v-card-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-card-text>
                  <v-form @submit.prevent="onSubmit">
                    <v-row>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          outlined
                          label="Patient Name*"
                          :items="patients"
                          item-text="name"
                          v-model="patient"
                          item-value="_id"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          outlined
                          label="Select Doctor*"
                          :items="doctors"
                          item-text="name"
                          item-value="_id"
                          v-model="doctor"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          outlined
                          label="Select Venue*"
                          :items="venues"
                          v-model="venue"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-autocomplete
                          outlined
                          label="Surgery types*"
                          :items="items"
                          v-model="type"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="date"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              label="Select date*"
                              outlined
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            :min="new Date().toISOString().substr(0, 10)"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="11" sm="5" md="4">
                        <v-dialog
                          ref="dialog"
                          v-model="modal2"
                          :return-value.sync="time"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="time"
                              label="Select Time*"
                              outlined
                              prepend-icon="mdi-clock-time-four-outline"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="modal2"
                            v-model="time"
                            full-width
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal2 = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(time)"
                            >
                              OK
                            </v-btn>
                          </v-time-picker>
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-textarea
                          label="Prescription*"
                          type="text"
                          background-color="grey lighten-2"
                          v-model="prescription"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-textarea
                          label="Surgery Instructions*"
                          type="text"
                          background-color="grey lighten-2"
                          v-model="Instructions"
                        ></v-textarea>
                      </v-col>
                      <v-snackbar
                        v-model="snackbar"
                        top
                        right
                        :color="color"
                        :timeout="3000"
                        :vertical="vertical"
                        >{{ message }}</v-snackbar
                      >
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue" @click="cancelEdit"> Close </v-btn>
                  <v-btn color="blue" :loading="isLoading" @click="confirmEdit">
                    Edit
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- ----------------------------------------------------------- -->

            <!-- --------------dialog for add surgery----------- -->
            <v-dialog v-model="dialogAddSurgery" persistent max-width="1000px">
              <v-card>
                <v-card-title>
                  <span class="headline">Create Surgery</span>
                </v-card-title>
                <v-card-text>
                  <v-form @submit.prevent="createSurgery">
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            :items="patients"
                            outlined
                            label="Select patient*"
                            item-text="name"
                            v-model="patient"
                            item-value="_id"
                            required
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            outlined
                            label="Enter patient ID*"
                            item-text="name"
                            required
                          ></v-text-field>
                        </v-col>
                        
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            :items="venues"
                            outlined
                            label="Select venue*"
                            v-model="venue"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            :items="doctors"
                            item-text="name"
                            item-value="_id"
                            outlined
                            label="Select doctor*"
                            v-model="doctor"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete
                            label="Surgery Type*"
                            outlined
                            type="text"
                            :items="items"
                            v-model="type"
                          ></v-autocomplete>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            ref="menu"
                            v-model="menu5"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="date"
                                label="Select date*"
                                outlined
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="date"
                              :min="new Date().toISOString().substr(0, 10)"
                              no-title
                              scrollable
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu5 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="11" sm="5" md="4">
                          <v-dialog
                            ref="dialog"
                            v-model="modal2"
                            :return-value.sync="time"
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="time"
                                label="Select Time*"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="modal2"
                              v-model="time"
                              full-width
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal2 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(time)"
                              >
                                OK
                              </v-btn>
                            </v-time-picker>
                          </v-dialog>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-textarea
                            label="Prescription*"
                            type="text"
                            background-color="grey lighten-2"
                            v-model="prescription"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                          <v-textarea
                            label="Surgery Instructions*"
                            type="text"
                            background-color="grey lighten-2"
                            v-model="Instructions"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                      <v-snackbar
                        v-model="snackbar"
                        bottom
                        center
                        :color="color"
                        :timeout="3000"
                        :vertical="vertical"
                        >{{ message }}</v-snackbar
                      >
                    </v-container>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="dialogAddSurgery = false">
                    Close
                  </v-btn>
                  <v-btn
                    color="primary"
                    :loading="isLoading"
                    @click="createSurgery"
                  >
                    Create
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- ------------------------------------ -->
          </template>

          <template v-slot:item.date="{ item }">
            {{ item.date | formatDate }}
          </template>
          <template v-slot:item.actions="{ item }"
            ><!-- v-if="role == 'Admin'" -->
            <v-icon
              class="mr-2"
              @click="confirmDialogEdit(item)"
              color="primary"
              >mdi-pencil</v-icon
            >
            <v-icon color="error" @click="deleteItem(item)" class="mr-2"
              >mdi-delete</v-icon
            >
          </template>

          <template v-slot:item.currentStatus="{ item }">
            {{ item.statusItem }}
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
          <!------------------------------------------------>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <v-row justify="center" width="100%">
                <v-col cols="4" md="5">
                  <v-card class="pa-5 ma-5" justify-center elevation="6">
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
                <v-col cols="12" md="7">
                  <v-card class="mt-10">
                    <v-sheet
                      class="v-sheet--offset mx-auto"
                      color="cyan"
                      elevation="6"
                      max-width="calc(100% - 32px)"
                    >
                      <v-card-title
                        class="justify-center elevation-2"
                        style="color: white"
                      >
                        Surgery state of {{ item.patient.name }}
                      </v-card-title>
                    </v-sheet>
                    <v-card-text style="margin-top: -30px">
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-subheader :inset="inset">
                              State Guide
                            </v-subheader>
                            <v-divider></v-divider>

                            <v-list>
                              <v-list-item>
                                <v-list-item-action>
                                  <v-icon
                                    color="white"
                                    style="
                                      background-color: mediumseagreen;
                                      padding: 2px;
                                      border-radius: 20px;
                                    "
                                    >mdi-bullseye</v-icon
                                  >
                                </v-list-item-action>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    Current State
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-action>
                                  <v-icon
                                    color="white"
                                    style="
                                      background-color: dodgerblue;
                                      padding: 2px;
                                      border-radius: 20px;
                                    "
                                    >mdi-checkbox-marked-circle-outline</v-icon
                                  >
                                </v-list-item-action>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    Completed State
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-action>
                                  <v-icon
                                    color="darkgray"
                                    style="
                                      background-color: darkgray;
                                      padding: 14px;
                                      border-radius: 20px;
                                    "
                                  ></v-icon>
                                </v-list-item-action>

                                <v-list-item-content>
                                  <v-list-item-title>
                                    Upcoming State
                                  </v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" md="12">
                            <HVStateStepper
                              :states="item.status"
                              current-color="green"
                              current-icon="mdi-bullseye"
                              previous-color="blue"
                              previous-icon="mdi-checkbox-marked-circle-outline"
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                      <!-- -------------------------------- -->
                    </v-card-text>
                  </v-card>
                </v-col>
                <!-- -------------------steppers----------------------->
              </v-row>
            </td></template
          >
        </v-data-table>
      </v-col>
    </v-row>
    <div v-if="role == 'Admin' || role == 'Pre Op Cordinator'">
      <v-fab-transition>
        <v-btn fab fixed large dark bottom right class="primary" @click="add">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
  </v-container>
</template>
             

<script>
import axios from "../../axios";
import HVStateStepper from "../../components/HVStateStepper";
export default {
  components: {
    HVStateStepper,
  },
  data() {
    return {
      surgeries: [],
      testStates: [
        { name: "Surgery Scheduled", current: "true" },
        { name: "Patient checked In", current: "" },
        { name: "Patient in Surgery", current: "" },
        { name: "Patient Post Surgery", current: "" },
        { name: "Patient Discharged", current: "" },
      ],
      changeStatusItems: [
        "Patient checked In",
        "Patient in Surgery",
        "Patient Post Surgery",
        "Patient Discharged",
      ],
      dialog: false,
      itemToBeDeleted: {},
      itemWithStatusToBeUpdated: {},
      statusItem: "Surgery Scheduled",
      dialogDelete: false,
      dialogEdit: false,
      role: "",
      singleExpand: false,
      items: [
        "Orthopedic surgery",
        "Inguinal hernia",
        "adenotonsillectomy surgery",
      ],
      search: "",
      type: "",
      date: "",
      time: "",
      modal2: false,
      prescription: "",
      menu: false,
      menu5: false,
      Instructions: "",
      roles: ["Admin", "Patient", "Pre Op Coordinator"],
      vertical: true,
      snackbar: false,
      isLoading: false,
      color: "success",
      message: "Loading",
      editedItem: {},
      itemToBeEdit: "",
      doctors: [],
      doctor: "",
      patient: "",
      patients: [],
      dialogAddSurgery: false,
      venues: ["venue1", "venue2", "venue3"],
      venue: "",
      header: [
        {
          text: "Patient Name",
          value: "patient.name",
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
          text: "Current Status",
          value: "statusItem",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
        {
          text: "",
          value: "data-table-expand",
        },
      ],
    };
  },
  created() {
    // Adding user---------------
    this.$store
      .dispatch("getPatients")
      .then((response) => {
        this.patients = response.data;
      })
      .catch((err) => {});
    this.$store
      .dispatch("getDoctors")
      .then((response) => {
        this.doctors = response.data;
      })
      .catch((err) => {});
    // ----------------------

    if (localStorage.getItem("role") == "Patient") {
      var id = localStorage.getItem("id");
      axios()
        .get(`/user/getSpecificUser/${id}`)
        .then((response) => {
          this.header.splice(5);
          console.log("+++++++++");
          console.log(response.data);
          console.log("++++++++++");
          for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].statusItem == "Patient Discharged") {
            this.surgeries.push(response.data[i]);
          }
        }
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
    // -------Add user-------------
    add() {
      this.dialogAddSurgery = true;
    },
    async createSurgery() {
      console.log(this.date, this.patient);
      this.$store
        .dispatch("addSurgery", {
          cordinator: this.doctor,
          patient: this.patient,
          type: this.type,
          date: this.date,
          time: this.time,
          prescription: this.prescription,
          Instructions: this.Instructions,
          venue: this.venue,
          status: this.testStates,
          statusItem: this.statusItem,
        })
        .then((response) => {
          this.doctor = "";
          this.patient = "";
          this.type = "";
          this.date = "";
          this.time = "";
          this.prescription = "";
          this.Instructions = "";
          this.venue = "";
          axios()
            .get("/user/getAllSurgeries")
            .then((response) => {
              this.surgeries = response.data;
            })
            .catch((err) => {
              this.surgeries = err.data;
            });
          this.snackbar = true;
          this.color = "success";
          this.message = "Surgery created successfully";
          this.dialogAddSurgery = false;
        })
        .catch((err) => {
          this.snackbar = true;
          this.color = "error";
          this.message = "All Fields are required!";
        });
    },
    // -----------------------------------
    closeStatus() {
      this.dialog = false;
    },
    changeStatus(item) {
      this.dialog = true;
      this.itemWithStatusToBeUpdated = item;
    },
    updateStatusCode() {
      if (this.statusItem == "Patient checked In") {
        this.testStates = [
          { name: "Surgery Scheduled", current: "" },
          { name: "Patient checked In", current: "true" },
          { name: "Patient in Surgery", current: "" },
          { name: "Patient Post Surgery", current: "" },
          { name: "Patient Discharged", current: "" },
        ];
      } else if (this.statusItem == "Patient in Surgery") {
        this.testStates = [
          { name: "Surgery Scheduled", current: "" },
          { name: "Patient checked In", current: "" },
          { name: "Patient in Surgery", current: "true" },
          { name: "Patient Post Surgery", current: "" },
          { name: "Patient Discharged", current: "" },
        ];
      } else if (this.statusItem == "Patient Post Surgery") {
        this.testStates = [
          { name: "Surgery Scheduled", current: "" },
          { name: "Patient checked In", current: "" },
          { name: "Patient in Surgery", current: "" },
          { name: "Patient Post Surgery", current: "true" },
          { name: "Patient Discharged", current: "" },
        ];
      } else if (this.statusItem == "Patient Discharged") {
        this.testStates = [
          { name: "Surgery Scheduled", current: "" },
          { name: "Patient checked In", current: "" },
          { name: "Patient in Surgery", current: "" },
          { name: "Patient Post Surgery", current: "" },
          { name: "Patient Discharged", current: "true" },
        ];
      }

      console.log("_+++++++++");
      console.log(this.testStates);
      console.log("_++++++++++++");
      axios()
        .post(`/user/getSurgery/${this.itemWithStatusToBeUpdated._id}`, {
          status: this.testStates,
          statusItem: this.statusItem,
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
    cancelEdit() {
      this.doctor = "";
      this.patient = "";
      this.type = "";
      this.date = "";
      this.time = "";
      this.prescription = "";
      this.Instructions = "";
      this.venue = "";
      this.dialogEdit = false;
    },
    confirmDialogEdit(currentItem) {
      this.itemToBeEditId = currentItem._id;
      this.prescription = currentItem.prescription;
      this.type = currentItem.type;
      this.patient = currentItem.patient;
      this.doctor = currentItem.cordinator;
      this.venue = currentItem.venue;
      this.date = currentItem.date;
      this.time = currentItem.time;
      this.Instructions = currentItem.Instructions;
      this.dialogEdit = true;
    },
    async confirmEdit() {
      axios()
        .post(`/user/getSurgery/${this.itemToBeEditId}`, {
          cordinator: this.doctor,
          patient: this.patient,
          type: this.type,
          date: this.date,
          time: this.time,
          prescription: this.prescription,
          Instructions: this.Instructions,
          venue: this.venue,
        })
        .then((response) => {
          this.doctor = "";
          this.patient = "";
          this.type = "";
          this.date = "";
          this.time = "";
          this.prescription = "";
          this.Instructions = "";
          this.venue = "";
          axios()
            .get("/user/getAllSurgeries")
            .then((response) => {
              this.surgeries = response.data;
            })
            .catch((err) => {
              this.surgeries = err.data;
            });
          this.snackbar = true;
          this.message = "Edited Successfully";
          this.dialogEdit = false;
        })
        .catch((err) => {
          this.snackbar = true;
          this.message = "Failed";
        });
    },
  },
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>