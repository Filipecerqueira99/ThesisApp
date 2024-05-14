<template>
  <div class="row">
    <div class="columnL">
      <h2>Public content of: {{ this.nameUser }}</h2>

      

      <div>
        <div v-if="this.files.length > 0">
          <p><b>Files</b></p>
          <div class="multipleFile" v-for="file in this.files" :key="file.id">
            <div class="singleFile">
              <img class="fileImg" src="../assets/file.png" alt="File" />
              <div class="fileNameDesc">
                <p>{{ file.nameFile }}</p>
              </div>
            </div>
          </div>
        </div>
        <p v-else><b>No files found...</b></p>
      </div>

      

      <div class="inLineFolders">
        <div v-if="this.folders.length > 0">
          <p><b>Folders:</b></p>
          <div class="multipleFolder" v-for="folder in this.folders" :key="folder.id">
            <div class="singleFolder" v-on:click="this.movePublic(folder.idFolder, nameUser, folder.nameFolder)">
              <img class="folderImg" src="../assets/folder.png" alt="Folder" />
              <p class="folderNameDesc" v-on:click="this.movePublic(folder.idFolder, nameUser, folder.nameFolder)">
                {{ folder.nameFolder }}
              </p>
            </div>
          </div>
        </div>
        <div v-else><b>No folders found...</b><p>Try search in the form on the right first.</p></div>
      </div>
    </div>

    <div class="columnR">
      <div>
        <form>
          <div class="heading">
            <h2>Search</h2>
            <p>Users' Public Content</p>
          </div>
          <input type="text" v-model="nameUser" placeholder="User Name" /><br />
          <input type="text" v-model="nameFolder" placeholder="Folder Parent name (dflt: root)" /><br />
          <button @click.prevent="findPublicPage(this.nameUser, this.nameFolder)">
            find
          </button>
        </form>
        <div :class="this.formSent ? 'success' : 'failure'">
          <p>{{ this.showMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
import PostFolder from "./PostFolder.vue";

/* eslint-disable */
export default {
  components: { PostFolder },
  name: "Main",
  data() {
    return {
      folders: [],
      files: [],
      nameUser: "",
      nameFolder: "",
      showMessage: "",
      formSent: "",
    };
  },
  methods: {
    movePublic(idFolder, nameUser, nameFolder) {
      this.$router.push(`/folders/${idFolder}/${nameUser}/${nameFolder}/public`)
    },
    async findPublicPage(nameUser, nameFolder) {
      if (nameFolder == "") {
        nameFolder = "root";
      }
      const folderData = await api({
        method: "get",
        url: `/folders/public/${nameUser}/${nameFolder}`,
      });
      if (folderData.data != "Something went wrong while getting users' public folder inside of the root or a parent folder.") {
        this.folders = folderData.data;
      }

      const fileData = await api({
        method: "get",
        url: `/files/public/${nameUser}/${nameFolder}`,
      });
      if (fileData.data != "Something went wrong while getting users' public files.") {
        this.files = fileData.data;
      }
    },
  },
};
</script>

<style scoped>
.columnL {
  float: left;
  width: 75%;
}

.columnR {
  float: right;
  width: 25%;
  margin-top: 2%;
}

.heading {
  padding: 0%;
  margin-left: 0%;
  width: 120%;
}

.row {
  display: inline flow-root;
  clear: both;
  width: 75%;
  /* margin-left: 12%; */
}

.multipleFile {
  width: 200px;
  display: inline-flex;
  padding: 5px;
  margin: 2px;
}

.singleFile {
  width: 200px;
  display: inline-flex;
  border: solid 2px #2c3e50;
  border-radius: 8%;
}

.fileImg {
  margin: 5px;
  width: 70px;
  height: 70px;
}

.fileNameDesc {
  margin-top: 18px;
  margin-left: 10px;
}

.multipleFolder {
  width: 150px;
  display: inline-flex;
  padding: 5px;
  margin: 2px;
}

.singleFolder {
  width: 150px;
  display: inline-flex;
  border: solid 2px #2c3e50;
  border-radius: 10%;
}

.singleFolder:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.folderImg {
  margin-left: 5px;
  width: 70px;
  height: 70px;
}

.folderNameDesc {
  margin-top: 20px;
  margin-left: 10px;
}

.folderIdDesc {
  margin-top: 40px;
  margin-left: -35px;
  color: #61616177;
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
</style>
