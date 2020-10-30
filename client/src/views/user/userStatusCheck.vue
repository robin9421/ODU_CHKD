<template>
  <div>
    <template v-for="item in surgeries">
      <v-container mb-5 mt-5>
        <v-sheet class="d-flex" color="grey lighten-3">
          <v-row justify="center">
            <v-col cols="12" md="4">
              <v-container mt-5>
                <v-card class="mx-auto" elevation="6" min-height="447">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        style="font-weight: 500; font-size: 20px"
                        >Surgery Details</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider style="margin-bottom:40px;"></v-divider>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Patient Name:
                        <span style="color: grey">{{
                          item.patient.name
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Doctor Name:
                        <span style="color: grey">{{
                          item.cordinator.name
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Date:
                        <span style="color: grey">{{
                          item.date | formatDate
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Time:
                        <span style="color: grey">{{
                          item.time
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title
                        >Venue:
                        <span style="color: grey">{{
                          item.venue
                        }}</span></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>

                  <v-expansion-panels accordion>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        >Prescriptions</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        {{ item.prescription }}
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header
                        >Instructions</v-expansion-panel-header
                      >
                      <v-expansion-panel-content>
                        {{ item.Instructions }}
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-container>
            </v-col>
            <v-col cols="12" md="7">
              <v-card class="mt-10 mx-auto" elevation="6" max-height="500">
                <v-sheet
                  style="margin-top: -10px"
                  class="v-sheet--offset mx-auto"
                  color="cyan"
                  elevation="12"
                  max-width="calc(100% - 32px)"
                >
                  <v-card-title
                    class="justify-center elevation-2"
                    style="color: white"
                  >
                    {{ item.type }}
                  </v-card-title>
                </v-sheet>
                <v-card-text style="margin-top: -30px">
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-subheader> State Guide </v-subheader>
                        <v-divider></v-divider>

                        <v-list>
                          <v-list-item>
                            <v-list-item-action>
                              <v-icon
                                color="white"
                                style="
                                  background-color: dodgerblue;
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
                                  background-color: mediumseagreen;
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
                          current-color="blue"
                          current-icon="mdi-bullseye"
                          current-divider-color="darkgray"
                          previous-divider-color="mediumseagreen"
                          previous-color="green"
                          previous-icon="mdi-checkbox-marked-circle-outline"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                  <!-- -------------------------------- -->
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
      </v-container>
      <v-divider color="black lighten-3"></v-divider>
    </template>
  </div>
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
      show: false,
      surgeries: [],
      testStates: [
        { name: "Surgery Scheduled", current: "true" },
        { name: "Patient checked In", current: "" },
        { name: "Patient in Surgery", current: "" },
        { name: "Patient Post Surgery", current: "" },
        { name: "Patient Discharged", current: "" },
      ],
    };
  },
  created() {
    var id = localStorage.getItem("id");
    console.log("+++++++++");
    console.log(id);
    console.log("++++++++++");
    axios()
      .get(`/user/getSpecificUser/${id}`)
      .then((response) => {
        console.log("+++++++++");
        console.log(response.data);
        console.log("++++++++++");
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].statusItem != "Patient Discharged") {
            this.surgeries.push(response.data[i]);
          }
        }
        console.log(this.surgeries);
      })
      .catch((err) => {
        this.surgeries = err.data;
      });
  },
};
</script>

<style scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>