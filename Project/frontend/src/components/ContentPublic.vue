<template>
  <h2>Public Content of: {{ this.$route.params.nameFolder }}</h2>
  <div class="divider">

    <div v-if="this.files.length > 0">
      <p><b>Files:</b></p>
      <div>
        <div class="multipleFile" v-for="file in this.files" :key="file.idFile">
          <div class="singleFile">
            <img class="fileImg" src="../assets/file.png" alt="File" />
            <div class="fileNameDesc">
              <p>{{ file.nameFile }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else><b>No files found...</b></p>
  </div>
  <div class="divider">
    <div v-if="this.folders.length > 0">
      <p><b>Folders:</b></p>
      <div>
        <div class="multipleFolder" v-for="folder in this.folders" :key="folder.idFolder">
          <div class="singleFolder"
            v-on:click="this.movePublic(folder.idFolder, this.$route.params.nameUser, folder.nameFolder)">
            <img class="folderImg" src="../assets/folder.png" alt="Folder" />
            <p class="folderNameDesc">
              {{ folder.nameFolder }}
            </p>
            <p class="folderIdDesc">
              {{ folder.idFolder }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p v-else><b>No folders found...</b></p>
  </div>
  <button v-on:click="this.$router.go(-1)">Back button</button>
</template>
  
<script>
import api from '../api/api.js'
import PostFolder from "./PostFolder.vue";
import authHeader from "@/helpers/auth";

/* eslint-disable */
export default {
  components: { PostFolder },
  name: "Main",
  data() {
    return {
      folders: [],
      files: [],
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.findContent()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
  methods: {
    async findContent() {
      const nameUser = this.$route.params.nameUser;
      const nameFolder = this.$route.params.nameFolder;

      const folderData = await api({
        method: "get",
        url: `/folders/public/${nameUser}/${nameFolder}`,
        headers: authHeader(),
      });
      if (folderData.data != "Something went wrong while getting users' public folder inside of the root or a parent folder.") {
        this.folders = folderData.data;
      }

      const fileData = await api({
        method: "get",
        url: `/files/public/${nameUser}/${nameFolder}`,
        headers: authHeader(),
      });
      if (fileData.data != "Something went wrong while getting users' public files.") {
        this.files = fileData.data;
      }
    },
    movePublic(idFolder, nameUser, nameFolder) {
      this.$router.push(`/folders/${idFolder}/${nameUser}/${nameFolder}/public`)
    },
  },
};
</script>
  
<style scoped>
button {
  font-size: 18px;
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

.columnL {
  float: left;
  width: 80%;
}

.columnR {
  float: right;
  width: 20%;
}

/* Clear floats after the columns */
.row {
  display: inline flow-root;
  clear: both;
  width: 75%;
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

.folderNameDesc {
  margin-top: 20px;
  margin-left: 10px;
}

.folderIdDesc {
  margin-top: 40px;
  margin-left: -35px;
  color: #61616177
}

.folderImg {
  margin-left: 5px;
  width: 70px;
  height: 70px;
}

.fileImg {
  margin: 5px;
  width: 70px;
  height: 70px;
}

.divider {
  margin-bottom: 50px;

  /*  border-bottom: solid 2px red;*/
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

.fileNameDesc {
  margin-top: 18px;
  margin-left: 10px;
  margin-right: 15px;
}

.downloadImg {
  width: 30px;
  height: 25px;
  margin-top: 30px;
  border-radius: 10px;
}

.downloadImg:hover {
  width: 30px;
  height: 25px;
  color: white;
  background-color: #2c3e50;
  cursor: pointer;

}
</style>
  