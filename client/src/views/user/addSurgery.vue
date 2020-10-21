<template>
  <v-container>
    <v-row align-content-md="center" justify="center" align="center">
      <v-col cols="auto">
        <v-card width="1000" class="pa-5 mt-10">
          <v-card-title>
            <span class="font-weight-bold">Create Surgery</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="add">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      :items="patients"
                      outlined
                      label="Select patient"
                      item-text="name"
                      v-model="patient"
                      item-value="_id"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      :items="venues"
                      outlined
                      label="Select venue"
                      v-model="venue"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      :items="doctors"
                      item-text="name"
                      item-value="_id"
                      outlined
                      label="Select doctor"
                      v-model="doctor"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-autocomplete
                      label="Surgery Type"
                      outlined
                      type="text"
                      :items="types"
                      v-model="type"
                    ></v-autocomplete>
                    <!-- <v-text-field label="Type" type="text" v-model="type"></v-text-field> -->
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
                          label="Select date"
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
                  <!-- <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Date" type="date" v-model="date"></v-text-field>
                  </v-col> -->
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
                          label="Picker in dialog"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker v-if="modal2" v-model="time" full-width>
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

                  <!-- <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Select time" type="time" v-model="time"></v-text-field>
                            </v-col> -->
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      label="Prescription"
                      type="text"
                      background-color="grey lighten-2"
                      v-model="prescription"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-textarea
                      label="Surgery Instructions"
                      type="text"
                      background-color="grey lighten-2"
                      v-model="Instructions"
                    ></v-textarea>
                  </v-col>
                  <v-row
                    align-content-md="center"
                    justify="center"
                    align="center"
                  >
                    <v-col cols="auto">
                      <v-btn
                        class="primary mb-3"
                        large
                        @click="add"
                        :loading="isLoading"
                        >Create Surgery</v-btn
                      >
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
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      type: [],
      date: "",
      time: "",
      modal2: false,
      prescription: "",
      menu: false,
      Instructions: "",
      roles: ["Admin", "Patient", "Pre Op Coordinator"],
      vertical: true,
      snackbar: false,
      isLoading: false,
      color: "success",
      message: "Loading",
      doctors: [],
      doctor: "",
      patient: "",
      types: [
        "Orthopedic surgery",
        "Inguinal hernia",
        "adenotonsillectomy surgery",
      ],
      venues: ["venue1", "venue2", "venue3"],
      venue: "",
    };
  },
  created() {
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
  },
  methods: {
    async add() {
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
          status: 1
        })
        .then((response) => {
          this.snackbar = true;
          this.color = "success";
          this.message = "Surgery created successfully";
        })
        .catch((err) => {
          this.snackbar = true;
          this.color="error";
          this.message = "All Fields are required!";
        });
    },
  },
};
</script>
