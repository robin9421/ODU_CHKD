<template>
  <div class="hv-state-stepper">
    <v-stepper class="hidden-sm-and-up pa-0" vertical>
      <template v-for="(state, stateIndex) in states">
        <v-stepper-step
          :color="state.current ? currentColor : previousColor"
          :complete="stateIndex <= currentIndex"
          :complete-icon="state.current ? currentIcon : previousIcon"
          :key="stateIndex"
          step=""
        >
          <span>{{ state.name }}</span>
        </v-stepper-step>
        <v-divider
          :key="`d${stateIndex}`"
          v-if="stateIndex < states.length - 1"
        />
      </template>
    </v-stepper>
    <v-stepper alt-labels class="hidden-xs-only elevation-6">
      <v-stepper-header>
        <template v-for="(state, stateIndex) in states">
          <v-menu :key="stateIndex" bottom offset-y open-on-hover>
            <template #activator="{ on, value }" >
              <v-stepper-step
                @mouseenter.native="on.mouseenter"
                @mouseleave.native="on.mouseleave"
                :class="[value && 'v-stepper__step--hover']"
                :color="state.current ? currentColor : previousColor"
                :complete="stateIndex <= currentIndex"
                :complete-icon="state.current ? currentIcon : previousIcon"
                step=""
                style="font-weight:500;"
              >
                {{ state.name }}
              </v-stepper-step>
            </template>
            <v-card>
              <v-card-title
                v-if="$vuetify.breakpoint.smOnly"
                >{{ state.name }}</v-card-title
              >
            </v-card>
          </v-menu>
          <v-divider
            :key="`d${stateIndex}`"
            v-if="stateIndex < states.length - 1"
          />
        </template>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
export default {
  computed: {
    currentIndex() {
      return this.states.findIndex((state) => state.current);
    },
  },
  name: "HVStateStepper",
  props: {
    currentColor: String,
    currentIcon: String,
    previousColor: String,
    previousIcon: String,
    states: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.hv-state-stepper .v-stepper__header .v-stepper__step {
  flex-basis: 140px !important;
  padding: 20px 0 !important;
}

.hv-state-stepper .v-stepper__header .v-divider {
  margin: 32px -60px 0;
}
</style>