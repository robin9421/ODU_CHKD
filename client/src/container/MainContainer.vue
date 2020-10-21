<template>
  <v-app>
    <v-app-bar class="orange" dark app>
      <v-app-bar-nav-icon large @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 100%">
        <span class="font-weight-bold">CHKD</span>
        <span class="font-weight-light">App</span>
      </v-toolbar-title>
      <v-container v-if="isAuth" style="text-align: right !important">
        <v-container v-if="user == 'Admin'">
          <v-btn text class="mr-5" to="/user/profile/addUser"
            >Add User<span style="margin-left: 5px" left>
              <v-icon>mdi-account-plus</v-icon>
            </span></v-btn
          >
          <v-btn text class="mr-5" to="/user/profile/details"
            >Details
            <span style="margin-left: 5px" left>
              <v-icon>mdi-account-details</v-icon>
            </span></v-btn
          >
          <v-btn text class="mr-5" to="/user/profile/addSurgery"
            >Add Surgery
            <span style="margin-left: 5px" left>
              <v-icon>mdi-clipboard-plus</v-icon>
            </span></v-btn
          >
          <v-btn text class="mr-5" to="/user/profile/surgeryDetails"
            >Surgery Details
            <span style="margin-left: 5px" left>
              <v-icon>mdi-account-details</v-icon>
            </span></v-btn
          >
          <v-btn
            style="text-align: right !important"
            v-if="isAuth"
            text
            @click="logout"
          >
            Sign Out
            <span right>
              <v-icon>mdi-exit-to-app</v-icon>
            </span>
          </v-btn>
        </v-container>
        <v-container v-else-if="user == 'Patient'">
          <v-row justify="center">
            <v-col>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    dark
                    left
                    color="white"
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-account-circle
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item link to="/user/profile/change" v-if="isAuth">
                    <v-list-item-title>Edit Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    to="/user/profile/surgeryDetails"
                    v-if="isAuth"
                  >
                    <v-list-item-title>Surgery Details</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="logout" v-if="isAuth">
                    <v-list-item-title>
                      Sign out<span
                        ><v-icon>mdi-exit-to-app</v-icon>
                      </span></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>

        <!-- Pre Op cordinator menu--------------- -->
        <v-container v-else>
          <v-row justify="center">
            <v-col>
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    dark
                    left
                    color="white"
                    large
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-account-circle
                  </v-icon>
                </template>
                <v-list>
                  <v-list-item link to="/user/profile/change" v-if="isAuth">
                    <v-list-item-title>Edit Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    link
                    to="/user/profile/surgeryDetails"
                    v-if="isAuth"
                  >
                    <v-list-item-title>Surgery Details</v-list-item-title>
                  </v-list-item>
                  <v-list-item link to="/user/profile/addSurgery" v-if="isAuth">
                    <v-list-item-title>Create Surgery</v-list-item-title>
                  </v-list-item>
                  <v-list-item link @click="logout" v-if="isAuth">
                    <v-list-item-title>
                      Sign out<span
                        ><v-icon>mdi-exit-to-app</v-icon>
                      </span></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
      <!-- <v-conatiner v-else>
        <v-btn
          style="text-align: right !important"
          left
          v-if="!isAuth"
          text
          to="/auth/login"
        >
          Sign In
          <span right>
            <v-icon>mdi-login</v-icon>
          </span>
        </v-btn>
      </v-conatiner> -->
    </v-app-bar>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list>
        <v-list-item>
          <v-card elevation="0" class="white">
            <v-img src="../assets/logo.png"></v-img>
            <p class="text-center pt-3">
              <span class="font-weight-bold text-1">CHKD App</span>
              <br />
            </p>
          </v-card>
        </v-list-item>
        <v-spacer class="pb-3"></v-spacer>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    isAuth() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.role;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/auth/login");
    },
  },
};
</script>
