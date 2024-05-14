<template>
  <h2>Upload File</h2>
  <form>
    <input type="file" id="file" v-on:change="onFileChange" name="file">
    <input type="text" v-model="parent" placeholder="Parent folder (ID, optional)" />
    <button @click.prevent="uploadFile(this.parent)">
      Upload File
    </button>
  </form>
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage }}</p>
  </div>

  <h2>Create File</h2>
  <form>
    <input id="newFileName" placeholder="File name" v-model="newFileName" name="newFileName" />
    <textarea rows="3" class="textareaFileValue" id="newFile" placeholder="Content" v-model="newFileContent"
      name="newFile" />
    <input type="text" v-model="parent2" placeholder="Parent folder (ID, optional)" />
    <button @click.prevent="createFile(this.newFileName, this.newFileContent, this.parent2)">
      Create File
    </button>
  </form>
  <div :class="this.formSent ? 'success' : 'failure'">
    <p>{{ this.showMessage2 }}</p>
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
      parent: "",
      formSent: false,
      showMessage: "",
      file: null,
      showMessage2: "",
      newFileName: "",
      newFileContent: "",
      parent2: "",
    };
  },
  emits: ['addFile'],
  methods: {
    async uploadFile(parent) {
      if (this.file === null) {
        this.formSent = false;
        this.showMessage = "Please add file"
      } else {
        const apiParent = parent == "" ? 0 : parent
        try {
          const res = await api({
            method: "post",
            url: '/files',
            data: {
              nameFile: this.file.name,
              idFolder: apiParent
            },
            headers: authHeader(),
          });
          
          const id = await this.sendFileToDisk(this.file, res.data.idFile)

          if (typeof res.data === "object" && typeof id === "number" ) {
            this.formSent = true;
            this.showMessage =
              "Successfully created file: " + res.data.nameFile;
            if (apiParent == 0) {
              this.$emit('addFile', res.data);
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
        this.showMessage = ""
      }, 5000)
    },
    async createFile(fileName, fileContent, fileParent) {
      console.log("sdasdsa")
      if (fileName == "" || fileContent == "" || fileName == null || fileContent == null || fileParent == null) {
        this.formSent = false;
        this.showMessage2 = "Please fill all the fields"
      } else {
        try {
          console.log("im trying")
          const res = await api({
            method: "post",
            url: '/files/create',
            data: {
              nameFile: fileName,
              idFolder: fileParent,
              contentFile: fileContent,
            },
            headers: authHeader(),
          });
          if (typeof res.data === "object") {
            this.formSent = true;
            this.showMessage2 =
              "Successfully created file: " + res.data.nameFile;
            if (fileParent == 0) {
              this.$emit('addFile', res.data);
            }
          } else {
            this.formSent = false;
            this.showMessage2 = res.data;
          }

          this.newFileName = "";
          this.newFileContent = "";
          this.parent2 = "";
        } catch (error) {
          this.showMessage2 = error.response.data;
          this.formSent = false;
        }
      }
      setTimeout(() => {
        this.showMessage2 = ""
      }, 5000)
    },
    onFileChange(event) {
      this.file = event.target.files[0]
    },
    async sendFileToDisk(file, idFile) {
      const formData = new FormData();
      // Update the formData object
      formData.append('title', file.filename);
      formData.append('file', file);
      // Details of the uploaded file
      let response = await api({
        method: "post",
        url: `/files/${idFile}/upload`,
        headers: authHeader(),
        data: formData
      })
      const data = response.data
      return data
    }
  }
}
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

form>div {
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

.textareaFileValue{
    width: 90%;
    border-radius: 10px;
    padding: 20px;
    border: 1px solid black;
    /* font-family: 'Montserrat'; */
    font-size: 14px;
  }
</style>
