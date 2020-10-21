<template>
  <v-container>
    <v-row align-content-md="center" justify="center" align="center">
      <v-col cols="auto">
        <v-card width="600" class="pa-5 mt-10">
          <v-card-title>
            <span class="font-weight-bold">Add Users</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    type="text"
                    v-model="user.name"
                  ></v-text-field>
                  <v-text-field
                    label="Email"
                    type="Email"
                    :rules="emailRules"
                    v-model="user.email"
                  ></v-text-field>
                  <v-text-field
                    label="Age"
                    type="number"
                    v-model="user.age"
                  ></v-text-field>
                  <v-select
                    v-model="user.role"
                    :items="roles"
                    item-value="abbr"
                    label="Role"
                  ></v-select>
                  <v-row>
                    <v-col cols="auto">
                      <v-btn
                        class="primary mb-3"
                        @click="register"
                        :loading="isLoading"
                        >Submit</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-col>
                  </v-row>
                </v-col>
                <v-snackbar
                  v-model="snackbar"
                  bottom
                  :color="color"
                  :timeout="3000"
                  :vertical="vertical"
                  >{{ message }}</v-snackbar
                >
              </v-row>
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
      user: {
        name: "",
        email: "",
        role: "",
        age: "",
      },
      emailRules: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      valid: false,
      roles: ["Admin", "Patient", "Pre Op Coordinator"],
      vertical: true,
      snackbar: false,
      isLoading: false,
      color: "success",
      message: "Loading",
    };
  },
  methods: {
    async register() {
      this.isLoading = true;
      if (this.user.email && this.user.name && this.age && this.role) {
        this.snackbar = true;
        this.message = "All fields are required";
        this.color = "error";
      } else {
        this.$store
          .dispatch("register", this.user)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            this.isLoading = false;
            this.snackbar = true;
            this.message = "Registered. Please ask user to  Verify Email";
            this.color = "success";
            this.$router.push('/user/profile/details')
          })
          .catch((err) => {
            this.isLoading = false;
            this.snackbar = true;
            this.message = "All fields are required";
            this.color = "error";
          });
      }
    },
  },
};
</script>
