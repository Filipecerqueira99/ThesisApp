<template>
    <form>
      <p class="title">PocketOnco</p>
      <img class="loginImg" src="../assets/loginimg.png" alt="Folder" /><br>
      Email
      <input type="text" v-model="username" placeholder=""><br>
      Senha
      <input type="password" v-model="password" placeholder=""><br>
      <button class="buttonLogin" @click.prevent="Login(this.username, this.password)">Entrar</button>
    </form>
    <div>
      Ainda não tem conta?
      <button class="buttonRegister" @click.prevent="Login(this.username, this.password)">Registe-se</button>
    </div>
    <div class="mytextdiv">
      <div class="divider"></div>
      <div class="mytexttitle">
        OU
      </div>
      <div class="divider"></div>
    </div>
    <div>
      
      <button class="buttonGoogle" @click.prevent="Login(this.username, this.password)">
        <img class="googleImg" src="../assets/google.png" alt="Folder" />
       Login com Google
      </button>
    </div>
    <div :class="this.formSent ? 'success' : 'failure'">
      <p>{{ this.showMessage }}</p>
    </div>
</template>

<script>
import api from '../api/api.js'
/* eslint-disable */
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      password: "",
      formSent: false,
      showMessage: ""
    }
  },
  methods: {
    async Login(username, password) {
      if (username === "" || password === "") {
        this.formSent = false
        this.showMessage = "Fill all the fields"
      } else {
            try {
            const response = await api({
                method: 'post',
                url: `/users/login`,
                data: {
                    "uname": username, 
                    "password": password
                }
            })
            if (response.data && response.data.accessToken !== " ") {
              localStorage.setItem('user', JSON.stringify(response.data.uname));
              localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken));
              localStorage.setItem('refreshToken', JSON.stringify(response.data.refreshToken));
              localStorage.setItem('idUser', JSON.stringify(response.data.idUser));
              this.$router.push("/main")
              this.showMessage = "login successful"
              this.formSent = true
            } else {
              this.formSent = false
              this.showMessage = response.data.message
            }
          } catch (error) {
          this.showMessage = error.response.data
          this.formSent = false
          }
      }
      setTimeout(() => {
            this.showMessage = ""
        }, 5000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    font-family: Poppins;
  }
  .success {
    color: green;
  }
  .failure {
    color: red;
  }
  form {
    width: 100%;
    /* font-family: 'Montserrat'; */
  }
  form *{
    
    box-sizing: border-box;
    margin: 5px;
    font-size: 18px;
  }
  form > div {
    text-align: center;
    padding-bottom: 50px;
  }
  .buttonLogin {
    margin-top: 30px;
    padding: 10px;
    border-radius: 22px;
    background-color: #2C85A7;
    border: 0;
    color: white;
    cursor: pointer;
    width: 40%;
  }
  .buttonLogin:hover {
    opacity: 0.7;
  }
  
  .buttonRegister{
    background-color: #2c84a700;
    border: 0;
    color: #08394B;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .buttonRegister:hover {
    color: #bdecff;
  }

  .buttonGoogle{
    margin-top: 30px;
    padding: 10px;
    border-radius: 30px;
    border: solid 2px rgb(223, 223, 223);
    background-color: #ffffff;
    color: #08394B;
    cursor: pointer;
    width: 60%;
  }
  .buttonGoogle:hover {
    opacity: 0.7;
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

  .title{
    font-size: 28px;
  }

  .loginImg{
  width: 80px;
  height: 110px;
  margin-bottom: 20px;
  }

  .googleImg{
  width: 30px;
  height: 30px;
  }

  

  .mytextdiv{
  display:flex;
  flex-direction:row;
   align-items: center;
}
.mytexttitle{
  flex-grow:0;
  margin-left: 10px;
  margin-right: 10px;
}

.divider{
  flex-grow:1;
  height: 1px;
  background-color: #9f9f9f;
}


</style>