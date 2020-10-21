<template>
<div>
    <v-snackbar timeout="3000" v-model="snackbar">{{ message }}</v-snackbar>
</div>
</template>

<script>
import jwt from "jsonwebtoken";
import axios from "../../axios";

export default {
    data() {
        return {
            token: "",
            message: "",
            snackbar: false,
        };
    },
    created() {
        if (this.$route.params.token == localStorage.getItem("token")) {
            var data = jwt.decode(this.$route.params.token, "secret");
            axios()
                .get(`/auth/verify/${data.email}`)
                .then((response) => {
                    localStorage.removeItem("token");
                    this.snackbar = true;
                    this.message = "Verified. Redirecting in 3 seconds...";
                    setTimeout(() => {
                        this.$router.push("/auth/login");
                    }, 3000);
                })
                .catch((err) => {
                    this.snackbar = true;
                    this.message = "Not verified";
                });
        }
    },
};
</script>
