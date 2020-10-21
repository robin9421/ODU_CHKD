<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" align-content="center" md="12" lg="4" sm="10" xs="10">
        <v-card class="pa-10">
          <h3>Change Password here</h3>
          <v-text-field
            v-model="oldPass"
            label="Old password"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="newPass"
            label="New Password"
            autocomplete="current-password"
            :value="newPass"
            type="password"
            :rules="[rules.password]"
            @input="(_) => (newPass = _)"
          ></v-text-field>
          <v-text-field
            :rules="[passwordConfirmationRule]"
            v-model="confirmPass"
            label="Confirm Password"
            :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="() => (value = !value)"
            :type="value ? 'password' : 'text'"
            @input="(_) => (confirmPass = _)"
          ></v-text-field>
          <v-btn :loading="isLoading" class="primary" @click="onSubmit"
            >Submit</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar timeout="3000" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      oldPass: "",
      newPass: "",
      confirmPass: "",
      isLoading: false,
      snackbar: false,
      message: "",
      valid: false,
      value: false,
      value1: false,
      rules: {
        required: (value) => !!value || "Required.",
        password: (value) => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
          return (
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("changePassword", {
          oldPass: this.oldPass,
          newPass: this.newPass,
          confirmPass: this.confirmPass,
        })
        .then((response) => {
          this.snackbar = true;
          this.message = "Changed Password";
          this.color = "success";
        })
        .catch((err) => {
          console.log(err);
          this.snackbar = true;
          this.message = err.response.data.error;
          this.color = "error";
        });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.newPass === this.confirmPass) || 'Password must match'
    }
    }   
};
</script>
