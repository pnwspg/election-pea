<template>
  <v-container>
    <!-- Logo PEA -->
    <div align="center" class="login-logo">
      <!-- <img width="180" src="@/assets/login_header.png" /> -->
      <br>
      <img width="350" src="@/assets/election.png" />

      <!-- smcbuilding -->
      <!-- <h2 style="color: #5b4863">System Management Center</h2> -->
    </div>

    <v-row class="justify-center">
      <v-card style="width:400px">
        <h1 class="login-title">SMC & ADDC</h1>

        <!-- <v-img src="@/assets/login_header.jpg" height="20px"/> -->
        <v-card-text>
 
          <v-form @submit.prevent="submit">
            <!-- username -->
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
              :rules="usernameRules"
            ></v-text-field>

            <!-- password -->
            <v-text-field
              name="password"
              label="Password"
              id="password"
              :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
              v-model="account.password"
              :rules="passwordRules"
            ></v-text-field>

            <span>
              <!-- {{ account }} -->
            </span>
            <v-row class="justify-space-between px-3 pt-5">
              <!-- <v-btn text @click.prevent="clear"> cancel</v-btn> -->
              <v-btn
                class="secondary"
                @click.prevent="$router.push('/register')"
              >
                register
              </v-btn>
              <v-btn type="submit" color="primary"> Login </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api"
export default {
  data() {
    return {
      isShowPassword: false,
      account: {
        username: "",
        password: "",
      },
      usernameRules: [(v1) => !!v1 || "Username is required"],
      passwordRules: [(v1) => !!v1 || "Password is required"],
    };
  },
  mounted() {
    if(api.isLoggedIn()){
      this.$router.push("/outage")
    }
  },
  methods: {
    submit() {
      this.$router.push("/outage");
      this.$store.dispatch({
        type: "doLogin",
        username: this.account.username,
        password: this.account.password,
      });
    },
  },
};
</script>

<style>
.login-title {
  padding: 16px;
  text-align: center;
  color: #5b4863;
}
.login-logo {
  margin-top: 20px;
  /* margin-bottom: 20px; */
}
</style>
