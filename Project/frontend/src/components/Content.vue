<template>
  <!-- <h2>Content</h2> -->
  <div class="divider">
    <p>
      <b class="folderTitle"> 📂 {{ this.baseFolder.nameFolder }}</b>
    </p>
    <form>
      <input type="text" v-model="userId" placeholder="User id to share" />
      <select
        name="isEditOrView"
        class="isEditOrViewSelect"
        v-model="isEditOrView"
      >
        <option value="View">View</option>
        <option value="Edit">Edit</option>
      </select>
      <button
        class="buttonShare"
        @click.prevent="
          ShareFolder(this.baseFolder.idFolder, this.userId, isEditOrView)
        "
      >
        Share Folder
      </button>
      <input type="text" v-model="newNameFolder" placeholder="New name for folder" />
      <button
        class="buttonShare"
        @click.prevent="renameFolder(this.baseFolder, this.newNameFolder)">
        Rename Folder
      </button>
      <button class="buttonShare" v-if="this.baseFolder.stateFolder == 'Private'" @click.prevent="this.ChangeFolderPublicity(this.baseFolder, 'Public')">
        Make public 📥
      </button>
      <button class="buttonShare" v-if="this.baseFolder.stateFolder == 'Public'" @click.prevent="this.ChangeFolderPublicity(this.baseFolder, 'Private')">
        Make private 📥
      </button>
      <div :class="this.formSent ? 'success' : 'failure'">
        <p>{{ this.showMessage }}</p>
      </div>
    </form>
    <div v-if="this.folders.length > 0">
      <p><b>Folders:</b></p>
      <!--  <div v-for="folder in this.folders" :key="folder.idFolder">{{ folder }}</div> -->
      <div class="inLineFolders">
        <div
          class="multipleFolder"
          v-for="folder in this.folders"
          :key="folder.idFolder"
        >
          <div class="singleFolder" v-on:click="this.move(folder.idFolder)">
            <img class="folderImg" src="../assets/folder.png" alt="Folder" />
            <!-- <p>sdfds</p>
          <button>{{ folder.folderName }}</button> -->
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
  <div class="divider">
    <div v-if="this.files.length > 0">
      <p><b>Files:</b></p>
      <div class="inLineFolders">
        <div class="multipleFile" v-for="file in this.files" :key="file.idFile">
          <div class="singleFile" v-on:click="this.selectFile(file)">
            <img class="fileImg" src="../assets/file.png" alt="File" />
            <!-- <img
              class="downloadImg"
              src="../assets/download.png"
              alt="Folder"
              v-on:click="this.downloadFile(file)"
            /> -->
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
        <p>{{ this.showMessageShare }}</p>
      </div>
    </div>
    <p v-else><b>No files found...</b></p>
  </div>
  <button class="buttonGoBack" v-on:click="this.$router.go(-1)">
    Back button
  </button>
</template>

<script>
import api from "../api/api.js";
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
      baseFolder: [],
      formSent: false,
      showMessage: "",
      showMessageShare: "",
      userId: "",
      isEditOrView: "",
      currentSelectedFile: "",
      userShareId:"",
      documentText: "",
      newNameFolder: "",
      newNameFile: ""
    };
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.findContent();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    async findContent() {
      const folderId = this.$route.params.folderId;
      const folderData = await api({
        method: "get",
        url: `/folders/${folderId}/children`,
        headers: authHeader(),
      });
      this.folders = folderData.data;

      const fileData = await api({
        method: "get",
        url: `/files/${folderId}/children`,
        headers: authHeader(),
      });
      this.files = fileData.data;

      const baseFolderData = await api({
        method: "get",
        url: `/folders/${folderId}`,
        headers: authHeader(),
      });
      this.baseFolder = baseFolderData.data;
    },
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

    async ShareFolder(folderId, userId, permissionLevel) {
      if (folderId === "" || userId == "") {
        this.formSent = false;
        this.showMessage = "Please fill the field!";
      } else {
        try {
          const res = await api({
            method: "get",
            url: `/folders/${userId}/${folderId}/${permissionLevel}/permissions`,
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

    async selectFile(file) {
      this.currentSelectedFile = file;
    },

    async cleanSelectedFile() {
      this.currentSelectedFile = "";
    },

    async ShareFile(fileId, userShareId, permissionLevel) {
      if (fileId == "" || userShareId == "" || userShareId == undefined || permissionLevel == "" || permissionLevel == undefined) {
        this.formSent = false;
        this.showMessageShare = "Please fill the field!";
      } else {
        try {
          const res = await api({
            method: "get",
            url: `/files/${localStorage.getItem(
              "idUser"
            )}/${userShareId}/${fileId}/${permissionLevel}/permissions`,
            headers: authHeader(),
          });
          console.log(res.data);
          if (typeof res.data === "object") {
            this.formSent = true;
            this.showMessageShare =
              "Successfully shared a folder with: " + res.data.userName;
          } else {
            this.formSent = false;
            this.showMessageShare = res.data;
          }

          this.name = "";
          this.parent = "";
        } catch (error) {
          this.showMessageShare = error.response.data;
          this.formSent = false;
        }
      }
      setTimeout(() => {
        this.showMessageShare = "";
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
    async ChangeFolderPublicity(folder, newState) {
      console.log(folder)
      try {
        const res = await api({
          method: "put",
          url: `/folders/${folder.idFolder}/state`,
          headers: authHeader(),
          data: {
            state: newState
          }
        });
        if (typeof res.data === "object") {
          this.formSent = true;
          this.showMessage = "Successfully made folder " + newState
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
    async renameFolder(folder, name) {
      try {
        const res = await api({
          method: "put",
          url: `/folders/${folder.idFolder}/name`,
          headers: authHeader(),
          data: {
            name: name
          }
        });
        if (typeof res.data === "object") {
          this.formSent = true;
          this.showMessage = "Successfully renamed folder " + name
          this.baseFolder.nameFolder = name
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
.buttonGoBack {
  width: 10%;
  padding: 1em;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}
.buttonGoBack:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

input {
  width: 7%;
  border-radius: 10px;
  padding: 0.7em;
  margin-right: 5px;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 12px;
}

.buttonShare {
  font-size: 12px;
  padding: 0.7em;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}
.buttonShare:hover {
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
.singleFile:hover {
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
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

.titleImg {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}

.downloadImg:hover {
  width: 30px;
  height: 25px;
  color: white;
  background-color: #2c3e50;
  cursor: pointer;
}

.folderTitle {
  font-size: 1.5em;
}

.isEditOrViewSelect {
  width: 7%;
  border-radius: 10px;
  padding: 0.7em;
  margin-right: 5px;
  border: 1px solid black;
  /* font-family: 'Montserrat'; */
  font-size: 12px;
  background-color: white;
}

.fileProperties {
  margin: auto;
  margin-top: 15px;
  text-align: center;
  width: 40%;
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

.buttonDownload {
  font-size: 12px;
  padding: 0.7em;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #fdca3b;
  border: 0;
  color: black;
  cursor: pointer;
}
.buttonDownload:hover {
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

.closeDiv {
  vertical-align: top;
  margin-left: 20px;
  cursor: pointer;
  font-size: 15px;
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

</style>
