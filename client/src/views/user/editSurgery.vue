<template>
<v-container>
    <v-row align-content-md="center" justify="center" align="center">
        <v-col cols="auto">
            <v-card width="600" class="pa-5 mt-10">
                <v-card-title>
                    <span class="font-weight-bold">Edit Surgery</span>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent="onSubmit">
                        <v-row>
                            <v-col cols="12">
                                <v-autocomplete outlined :items="patients" item-text="name" v-model="patient" item-value="_id"></v-autocomplete>
                                <v-autocomplete outlined :items="venues" v-model="venue"></v-autocomplete>
                                <v-autocomplete outlined :items="doctors" item-text="name" item-value="_id" v-model="doctor"></v-autocomplete>
                                <v-autocomplete outlined label="Surgery types" :items="types" v-model="type"></v-autocomplete>
                                <v-text-field label="Date" type="date" v-model="date"></v-text-field>
                                <v-text-field label="Time" type="time" v-model="time"></v-text-field>
                                <v-text-field label="Prescription" type="text" v-model="prescription"></v-text-field>
                                <v-row>
                                    <v-col cols="auto">
                                        <v-btn class="primary mb-3" @click="onSubmit" :loading="isLoading">Submit</v-btn>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-snackbar v-model="snackbar" top right :color="color" :timeout="3000" :vertical="vertical">{{ message }}</v-snackbar>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "../../axios";
export default {
    data() {
        return {
            type: "",
            date: "",
            time: "",
            types: ['Orthopedic surgery', 'Inguinal hernia', 'adenotonsillectomy surgery'],
            prescription: "",
            roles: ["Admin", "Patient", "Pre Op Coordinator"],
            vertical: true,
            snackbar: false,
            isLoading: false,
            color: "success",
            message: "Loading",
            patients: [],
            doctors: [],
            doctor: "",
            venues: ["venu1", "venue2", "venue3"],
            patient: "",
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
        axios()
            .get(`/user/getSurgery/${this.$route.params.id}`)
            .then((response) => {
                this.prescription = response.data.prescription;
                this.type = response.data.type;
                this.patient = response.data.patient;
                this.doctor = response.data.cordinator;
                this.venue = response.data.venue;
                this.date = response.data.date;
                this.time = response.data.time;
            })
            .catch();
    },
    methods: {
        async onSubmit() {
            console.log(this.date, this.patient);
            axios()
                .post(`/user/getSurgery/${this.$route.params.id}`, {
                    cordinator: this.doctor,
                    patient: this.patient,
                    type: this.type,
                    date: this.date,
                    time: this.time,
                    prescription: this.prescription,
                    venue: this.venue,
                })
                .then((response) => {
                    this.snackbar = true;
                    this.message = "Edited Successfully";
                })
                .catch((err) => {
                    this.snackbar = true;
                    this.message = "Failed";
                });
        },
    },
};
</script>
