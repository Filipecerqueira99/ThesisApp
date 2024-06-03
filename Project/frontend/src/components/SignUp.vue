<template>
  <form>
    <div class="alginCenter">
      <p class="title">PocketOnco</p>
      <p class="title">Registo</p>
    </div>
    Email<br>
    <input type="text" v-model="email" placeholder="" /><br />
    Senha<br>
    <input type="password" v-model="password" placeholder="" /><br />
    Repetir Senha<br>
    <input type="password" v-model="password2" placeholder="" /><br />
    Primeiro Nome<br>
    <input type="text" v-model="firstname" placeholder="" /><br />
    Segiundo Nome<br>
    <input type="text" v-model="lastname" placeholder="" /><br />
    Idade<br>
    <input type="text" v-model="age" placeholder="" /><br />

    <button class="buttonRegister"
      @click.prevent="SignUp(this.email, this.password, this.password2, this.firstname, this.lastname, this.age)">
      Criar Utilizador
    </button>
  </form>
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage }}</p>
  </div>
  <button class="buttonLogin"
      @click.prevent="login()">
      Login
    </button>
</template>

<script>
import api from "../api/api.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

/* eslint-disable */
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      firstname: "",
      lastname: "",
      age: "",
      formSent: false,
      showMessage: "",
    };
  },
  methods: {
    async SignUp(email, password, password2, firstname, lastname, age) {
      console.log(email, password, password2, firstname, lastname, age)
      if (email === "" || password === "" || password2 === "" || firstname === "" || lastname === "" || age === "") {
        this.formSent = false;
        toast.warn("Porfavor preencha todos os campos.", {
          autoClose: 3000,
        });
      } else {
        if (password != password2) {
          this.formSent = false;
          toast.warn("Senha não corresponde.", {
            autoClose: 3000,
          });
          return;
        }
        try {
          const res = await api({
            method: "post",
            url: `/users/signup`,
            data: {
              "email": email,
              "password": password,
              "first_name": firstname,
              "last_name": lastname,
              "age": age,
            },
          }).catch((error) => {
            console.log(error);
          });
          if (typeof res.data === "object") {
            this.formSent = true;
            toast.success("Utilizador criado com sucesso!", {
              autoClose: 3000,
            });
          } else {
            this.formSent = false;
            //this.showMessage = res.data;
            toast.warn(res.data, {
              autoClose: 3000,
            });
          }

          this.email = "";
          this.password = "";
          this.password2 = "";
          this.firstname = "";
          this.lastname = "";
          this.age = "";
        } catch (error) {
          this.showMessage = error.response?.data;
          this.formSent = false;
        }
      }
      setTimeout(() => {
        this.showMessage = "";
      }, 5000);
    },
    login(){
      this.$router.push("/login")
    }
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
  width: 94%;
  box-sizing: border-box;
  margin: 5px;
  font-size: 18px;
}

form>div {
  text-align: center;
  padding-bottom: 30px;
}

input {
  border-radius: 30px;
  padding: 10px;
  border: 1px solid #bdecff;
  font-size: 16px;
  background-color: #BDECFF;
  color: #000000;
  width: 70%;
}

.title {
  font-size: 28px;
  text-align: center;
}

.loginImg {
  width: 80px;
  height: 110px;
  margin-bottom: 20px;
}

.buttonRegister {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #2C85A7;
  border: 0;
  color: white;
  cursor: pointer;
  width: 50%;
}

.buttonRegister:hover {
  color: #bdecff;
}

.buttonLogin {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #a9e7ff;
  border: 0;
  color: white;
  cursor: pointer;
  width: 50%;
  font-size: 18px;
}

.alginCenter {
  text-align: center;
}
</style>
