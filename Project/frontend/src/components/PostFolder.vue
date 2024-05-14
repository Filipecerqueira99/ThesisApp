<template>
  <form>
    <input type="text" v-model="name" placeholder="folder name" />
    <input
      type="text"
      v-model="parent"
      placeholder="Parent folder(ID, optional)"
    />
    <button @click.prevent="CreateFolder(this.name, this.parent)">
      Create folder
    </button>
  </form>
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage }}</p>
  </div>
</template>

<script>
import api from '../api/api.js'
import authHeader from "@/helpers/auth";

/* eslint-disable */
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      parent: "",
      formSent: false,
      showMessage: "",
    };
  },
  emits: ['addFolder'],
  methods: {
    async CreateFolder(name, parent) {
      if (name === "") {
        this.formSent = false;
        this.showMessage = "Please the name field";
      } else {
        let methodType = "post";
        const apiParent = parent == "" ? 0 : parent

        try {
          const res = await api({
            method: methodType,
            url: '/folders',
            data: {
              nameFolder: name,
              parentFolder: apiParent,
            },
            headers: authHeader(),
          });

          if (typeof res.data === "object") {
            this.formSent = true;
            this.showMessage =
              "Successfully created folder: " + res.data.nameFolder;
            const folder = res.data
            if (apiParent == 0) {
              this.$emit('addFolder', folder);
            }
          } else {
            this.formSent = false;
            this.showMessage = res.data;
          }

          this.name = "";
          this.parent = "";
        } catch (error) {
          this.showMessage = error.response.data;
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
  /* font-family: 'Montserrat'; */
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
  width: 90%;
  padding: 1em;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}
button:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}
input {
  width: 90%;
  border-radius: 10px;
  padding: 20px;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 14px;
}
</style>
