<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-toolbar color="#f8f1f1" dark flat prominent>
            <v-container>
              <v-toolbar-title class="text-center" style="text-align: center">
                <h1 class="font-weight-bold display-2 teal--text" style="color:#16697a;">Create Surgery Type</h1>
              </v-toolbar-title>
            </v-container>

            <!-- <v-text-field
        append-icon="mdi-microphone"
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field> -->

            <template v-slot:extension>
              <v-tabs v-model="tabs" color="#16697a" centered>
                <v-tab style="color:teal;" v-for="item in items" :key="item">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-tabs-items v-model="tabs">
            <v-tab-item>
              <v-card class="mx-auto">
                  <!-- <v-card-title>Add Surgery Type</v-card-title> -->
                <v-card-text>
                  <v-row justify="center">
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="Surgery Type" outlined required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-textarea
                     rows="12"
                      background-color="grey lighten-2"
                      label="Add Description"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn color="teal" style="color:white;" large>Create</v-btn>
                </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-title class="headline"> An awesome title </v-card-title>
                <v-card-text>
                  <p>
                    Duis lobortis massa imperdiet quam. Donec vitae orci sed
                    dolor rutrum auctor. Vestibulum facilisis, purus nec
                    pulvinar iaculis, ligula mi congue nunc, vitae euismod
                    ligula urna in dolor. Praesent congue erat at massa.
                  </p>

                  <p>
                    Aenean posuere, tortor sed cursus feugiat, nunc augue
                    blandit nunc, eu sollicitudin urna dolor sagittis lacus.
                    Pellentesque egestas, neque sit amet convallis pulvinar,
                    justo nulla eleifend augue, ac auctor orci leo non est.
                    Etiam sit amet orci eget eros faucibus tincidunt. Donec
                    sodales sagittis magna.
                  </p>

                  <p class="mb-0">
                    Ut leo. Suspendisse potenti. Duis vel nibh at velit
                    scelerisque suscipit. Fusce pharetra convallis urna.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-title class="headline">
                  An even better title
                </v-card-title>
                <v-card-text>
                  <p>
                    Maecenas ullamcorper, dui et placerat feugiat, eros pede
                    varius nisi, condimentum viverra felis nunc et lorem. Sed
                    hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris
                    at ligula. Proin faucibus arcu quis ante.
                  </p>

                  <p class="mb-0">
                    Etiam vitae tortor. Curabitur ullamcorper ultricies nisi.
                    Sed magna purus, fermentum eu, tincidunt eu, varius ut,
                    felis. Aliquam lobortis. Suspendisse potenti.
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  data() {
    return {
      tabs: null,
      items: ["Procedure", "Prepare", "Visit", "Home Care"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    };
  },
};
</script>

<style scoped>
/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>