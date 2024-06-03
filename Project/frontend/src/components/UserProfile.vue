<template>
    <h1>Perfil de Utilizador</h1>
    <form>
        Email<br>
        <input type="text" v-model="email" /><br />
        <div v-if="this.editMode">Senha atual<br>
            <input type="password" v-model="currentPassword" /><br />
            Nova Senha<br>
            <input type="password" v-model="newPassword" /><br />
        </div>

        Primeiro Nome<br>
        <input type="text" v-model="firstname" /><br />
        Segiundo Nome<br>
        <input type="text" v-model="lastname" /><br />
        Idade<br>
        <input type="text" v-model="age" /><br />

        <button v-if="!this.editMode" class="buttonRegister" @click.prevent="this.editMode = !this.editMode">
            Editar
        </button>
        <button v-if="this.editMode" class="buttonCancel" @click.prevent="this.editMode = !this.editMode">
            Cancelar
        </button>
        <button v-if="this.editMode" class="buttonConfirm"
            @click.prevent="editProfile(this.email, this.currentPassword, this.newPassword, this.firstname, this.lastname, this.age)">
            Confirmar
        </button>
        <br>
        <button v-if="this.editMode" class="buttonDelete" @click.prevent="this.editMode = !this.editMode">
            Apagar conta
        </button>
    </form>
</template>

<script>
/* eslint-disable */
import { stringifyQuery } from 'vue-router';
import api from '../api/api.js'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
    name: "UserProfile", data() {
        return {
            idUser: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            firstname: "",
            lastname: "",
            age: "",
            editMode: false,
        };
    },
    async created() {
        this.idUser = localStorage.getItem('idUser');
        this.email = localStorage.getItem('email').slice(1).slice(0, -1);
        this.firstname = localStorage.getItem('first_name').slice(1).slice(0, -1);
        this.lastname = localStorage.getItem('last_name').slice(1).slice(0, -1);
        this.age = localStorage.getItem('age');


    },
    methods: {
        async editProfile(email, currentPassword, newPassword, firstname, lastname, age) {
            console.log(email, currentPassword, newPassword, firstname, lastname, age)
            if (email === "" || firstname === "" || lastname === "" || age === "") {
                toast.warn("Porfavor preencha todos os campos.", {
                    autoClose: 3000,
                });
            } else {
                try {
                    const res = await api({
                        method: "post",
                        url: `/users/editprofile`,
                        data: {
                            "idUser": this.idUser,
                            "email": email,
                            "currentPassword": currentPassword,
                            "newPassword": newPassword,
                            "first_name": firstname,
                            "last_name": lastname,
                            "age": age,
                        },
                    }).catch((error) => {
                        console.log(error);
                    });
                    if (typeof res.data === "object") {
                        toast.success("Utilizador atualizado com sucesso!", {
                            autoClose: 3000,
                        });
                        localStorage.setItem('email', email);
                        localStorage.setItem('first_name', firstname);
                        localStorage.setItem('last_name', lastname);
                        localStorage.setItem('age', age);
                    } else {
                        toast.warn(res.data, {
                            autoClose: 3000,
                        });
                    }

                } catch (error) {
                    toast.warn(error.response?.data, {
                        autoClose: 3000,
                    });
                }
            }
            setTimeout(() => {
            }, 5000);
        },
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
    width: 100%;
    margin-bottom: 20px;
    /* font-family: "Montserrat"; */
}

form * {
    width: 94%;
    box-sizing: border-box;
    margin: 5px;
}

form>div {
    text-align: center;
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

.buttonRegister {
    margin-top: 30px;
    padding: 10px;
    border-radius: 22px;
    background-color: #2C85A7;
    border: 0;
    color: white;
    cursor: pointer;
    width: 50%;
    font-size: 18px;
}

.buttonRegister:hover {
    color: #bdecff;
}

.buttonCancel {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #a72c2c;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}

.buttonConfirm {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #2ca782;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}

.buttonDelete {
    margin-top: 30px;
    padding: 5px;
    border-radius: 22px;
    background-color: #501010;
    border: 0;
    color: white;
    cursor: pointer;
    width: 30%;
    font-size: 17px;
}
</style>