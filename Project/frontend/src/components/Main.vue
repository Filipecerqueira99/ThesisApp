<template>
  <div class="row">
    <div class="columnL">
      <h2>
        Directory of <b>{{ this.userName }}</b>
      </h2>
      <p>All of your root files:</p>
      <!-- <div v-for="file in this.files" :key="file.id">{{ file }}</div> -->

      <div class="inLineFolders">
        <div class="multipleFile" v-for="file in this.files" :key="file.idFile">
          <div class="singleFile" v-on:click="this.selectFile(file)">
            <img class="fileImg" src="../assets/file.png" alt="File" />
            <div class="fileNameDesc">
              <p>{{ file.nameFile }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentSelectedFile != ''" class="fileProperties">
        <div>
          <a class="filePropertiesLabel"><b>{{ this.currentSelectedFile.nameFile }}</b></a>
          <p></p>
          <input class="inputShare" type="text" v-model="userShareId" placeholder="User id to share" />
          <select name="isEditOrView" class="isEditOrViewSelect" v-model="isEditOrView">
            <option value="View">View</option>
            <option value="Edit">Edit</option>
          </select>
          <button class="buttonShare" @click.prevent="ShareFile(
            this.currentSelectedFile.idFile,
            this.userShareId,
            isEditOrView
          )
            ">
            Share 📬
          </button>
          <input class="inputShare" type="text" v-model="newNameFile" placeholder="New name" />
          <button
            class="buttonShare"
            @click.prevent="renameFile(this.currentSelectedFile, this.newNameFile)">
            Rename File
          </button>
          <button class="buttonDownload" @click.prevent="this.downloadFile(this.currentSelectedFile)">
            Download 📥
          </button>
          <button class="buttonShare" v-if="this.currentSelectedFile.stateFile == 'Private'" @click.prevent="this.ChangeFilePublicity(this.currentSelectedFile, 'Public')">
            Make public 📥
          </button>
          <button class="buttonShare" v-if="this.currentSelectedFile.stateFile == 'Public'" @click.prevent="this.ChangeFilePublicity(this.currentSelectedFile, 'Private')">
            Make private 📥
          </button>
          <button class="buttonDelete" @click.prevent="this.deleteFile(this.currentSelectedFile.idFile)">
            Delete 🗑️
          </button>
          <a class="closeDiv" v-on:click="this.cleanSelectedFile()">❌</a>
        </div>
      </div>
      <div :class="this.formSent ? 'success' : 'failure'">
        <p>{{ this.showMessage }}</p>
      </div>
      <p>All of your root folders:</p>
      <div class="inLineFolders">
        <div class="multipleFolder" v-for="folder in this.folders" :key="folder.idFolder">
          <div class="singleFolder" v-on:click="this.move(folder.idFolder)">
            <img class="folderImg" src="../assets/folder.png" alt="Folder" />
            <!-- <p>sdfds</p>
          <button>{{ folder.folderName }}</button> -->
            <p class="folderNameDesc" v-on:click="this.move(folder.idFolder)">
              {{ folder.nameFolder }}
            </p>
            <p class="folderIdDesc" v-on:click="this.move(folder.idFolder)">
              {{ folder.idFolder }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="columnR">
      <h2>New Folder</h2>
      <PostFolder @addFolder="addFolder"/>
      <PostFile @addFile="addFile"/>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";
import authHeader from "@/helpers/auth";
import PostFolder from "./PostFolder.vue";
import PostFile from "./PostFile.vue";

/* eslint-disable */
export default {
  components: { PostFolder, PostFile },
  name: "Main",
  data() {
    return {
      folders: [],
      files: [],
      userName: "",
      userId: "",
      formSent: false,
      currentSelectedFile: "",
      showMessage: "",
      userShareId: "",
      isEditOrView: "",
      documentText: "",
      newNameFile: ""
    };
  },
  async created() {
    const folderData = await api({
      method: "get",
      url: `/folders/0/children`,
      headers: authHeader(),
    });
    this.folders = folderData.data;

    const fileData = await api({
      method: "get",
      url: `/files/0/children`,
      headers: authHeader(),
    });
    this.files = fileData.data;
    console.log(this.files)

    this.userName = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    move(folderId) {
      this.$router.push(`/folders/${folderId}`);
    },
    async downloadFile(file_frontend) {
      const file = await api({
        method: "get",
        url: `/files/${file_frontend.idFile}/download`,
        headers: authHeader(),
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([file.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_frontend.nameFile);
      document.body.appendChild(link);
      link.click();
    },

    async selectFile(file) {
      this.currentSelectedFile = file;
    },

    async cleanSelectedFile() {
      this.currentSelectedFile = "";
    },
    addFile(file) {
      this.files.push(file)
    },
    addFolder(folder) {
      this.folders.push(folder)
    },

    async ShareFile(fileId, userShareId, permissionLevel) {
      if (
        fileId == "" ||
        userShareId == "" ||
        userShareId == undefined ||
        permissionLevel == "" ||
        permissionLevel == undefined
      ) {
        this.formSent = false;
        this.showMessage = "Please fill the field!";
      } else {
        try {
          const res = await api({
            method: "get",
            url: `/files/${userShareId}/${fileId}/${permissionLevel}/permissions`,
            headers: authHeader(),
          });
          console.log(res.data);
          if (typeof res.data === "object") {
            this.formSent = true;
            this.showMessage =
              "Successfully shared a folder with: " + res.data.userName;
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
      }, 7000);
    },
    async deleteFile(fileId) {
      if (fileId == "" || fileId == undefined) {
        this.formSent = false;
        this.showMessage = "Please fill the field!";
      } else {
        try {
          const res = await api({
            method: "delete",
            url: `/files/${fileId}`,
            headers: authHeader(),
          });
          console.log(typeof res.data);
          if (typeof res.data === "number") {
            this.formSent = true;
            this.showMessage = "Successfully deleted file with id " + res.data
            this.cleanSelectedFile()
            this.files = this.files.filter(file => file.idFile !== fileId)

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
      }, 7000);
    },
    async ChangeFilePublicity(file, newState) {
      try {
        const res = await api({
          method: "put",
          url: `/files/${file.idFile}/state`,
          headers: authHeader(),
          data: {
            state: newState
          }
        });
        if (typeof res.data === "object") {
          this.formSent = true;
          this.showMessage = "Successfully made file " + newState
          this.cleanSelectedFile()
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
    },
    async renameFile(file, name) {
      try {
        const res = await api({
          method: "put",
          url: `/files/${file.idFile}/name`,
          headers: authHeader(),
          data: {
            name: name
          }
        });
        console.log(res.data)
        if (typeof res.data === "object") {
          this.formSent = true;
          this.showMessage = "Successfully renamed file " + name
          let newFiles = []
          for (var i=0 ; i < this.files.length ; i++) {
            console.log(i)
            if (this.files[i].idFile == file.idFile) {
              let editedFile = this.files[i]
              this.files[i].nameFile = name + "." + this.files[i].nameFile.split(".").slice(-1)
              newFiles.push(editedFile)
            } else newFiles.push(this.files[i])
          }
          this.files = newFiles
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

.columnL {
  float: left;
  width: 75%;
}

.columnR {
  float: right;
  width: 25%;
}

/* Clear floats after the columns */
.row {
  display: inline flow-root;
  clear: both;
  width: 75%;
}

.inLineFolders {
  /* background-color: red; */
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
  color: #61616177;
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

.singleFile:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.fileNameDesc {
  margin-top: 18px;
  margin-left: 10px;
}

.downloadImg {
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin-left: 5px;
  vertical-align: middle;
}

.downloadImg:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.shareImg {
  width: 25px;
  height: 25px;
  border-radius: 10px;
  margin-left: 5px;
  vertical-align: middle;
}

.shareImg:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.underTitle {
  /* font-size: 16px; */
  color: #2c3e5065;
}

.fileProperties {
  margin: auto;
  margin-top: 15px;
  text-align: center;
  width: 70%;
  border-radius: 10px;
  padding: 10px;
  border: 1px solid black;
  font-size: 12px;
  background-color: white;
}

.filePropertiesLabel {
  vertical-align: center;
  font-size: 18px;
}

.fileTextLabel {
  font-size: 16px;
}

.buttonShare {
  font-size: 12px;
  padding: 0.7em;
  margin-left: 2px;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}

.buttonDownload {
  font-size: 12px;
  padding: 0.7em;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
  margin-top: 10px;
}

.buttonDownload:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.buttonDelete {
  font-size: 12px;
  padding: 0.7em;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #fda23b;
  border: 0;
  color: black;
  cursor: pointer;
}

.buttonDelete:hover {
  color: white;
  background-color: #ff0000;
  cursor: pointer;
}

.buttonShare:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.inputShare {
  width: 18%;
  border-radius: 10px;
  padding: 0.7em;
  margin-left: 5px;
  margin-right: 2px;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 12px;
}

.documentText {
  width: 60%;
  border-radius: 10px;
  padding: 0.7em;
  margin-left: 5px;
  margin-right: 2px;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 12px;
  border-radius: 10px;
}

.isEditOrViewSelect {
  width: 12%;
  border-radius: 10px;
  padding: 0.7em;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 12px;
  background-color: white;
}

.closeDiv {
  vertical-align: top;
  margin-left: 10px;
  cursor: pointer;
  font-size: 15px;
}
</style>
