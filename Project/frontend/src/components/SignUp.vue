<template>
  <form>
    <input type="text" v-model="username" placeholder="Username" /><br />
    <input type="password" v-model="password" placeholder="Password" /><br />
    <button @click.prevent="SignUp(this.username, this.password)">
      Create user
    </button>
  </form>
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage }}</p>
  </div>
</template>

<script>
import api from '../api/api.js'
/* eslint-disable */
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      formSent: false,
      showMessage: "",
    };
  },
  methods: {
    async SignUp(username, password) {
      if (username === "" || password === "") {
        this.formSent = false;
        this.showMessage = "Please fill all the fields";
      } else {
        try {
          console.log(username, password);
          const res = await api({
            method: "post",
            url: `/users/signup`,
            headers: {'Content-Type': 'application/json'},
            data: {
              uname: username,
              password: password,
            },
          }).catch((error) => {
                console.log(error);
            });
            if (typeof res.data === "object") {
              this.formSent = true;
              this.showMessage =
                "Successfully created user " + res.data.uname;
          } else {
            this.formSent = false;
            this.showMessage = res.data;
          }

          this.username = "";
          this.password = "";
        } catch (error) {
          this.showMessage = error.response?.data;
          this.formSent = false;
        }
      }
      setTimeout(() => {
        this.showMessage = "";
      }, 5000);
    },
  },
};
</script>

<style scoped>
.success {
  color: green;
}
.failure {
  color: red;
}
form {
  width: 100%;
  /* font-family: "Montserrat"; */
}
form * {
  width: 70%;
  box-sizing: border-box;
  margin: 5px;
  font-size: 18px;
}
form > div {
  text-align: center;
  padding-bottom: 50px;
}
button {
  padding: 1em;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}
button:hover {
  opacity: 0.7;
}
input {
  border-radius: 10px;
  padding: 20px;
  border: 1px solid black;
  /* font-family: "Montserrat"; */
  font-size: 16px;
}
</style>
