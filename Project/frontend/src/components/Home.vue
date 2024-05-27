<template>
  
    <div class="main-container">
        <div class="container">
          
          <div class="main-content">
            <router-view />
            <!-- <Navbar /> -->
            <BottomBar/>
          </div>
            
        </div>
    </div>

  </template>
  <script>
  import Navbar from './Navbar.vue'
  import BottomBar from './BottomBar.vue'

  /* eslint-disable */
  export default {
    name: 'Home',
    components: {
      Navbar,
      BottomBar
    },
    methods: {
      isSigned() {
        return localStorage.getItem('user');
      },
      textStyling(path) {
        return this.$route.fullPath === path ? "underline" : "noline"
      },
      showPopup() {
        this.Popup = !this.Popup
      },
      getAvailableRoutes() {
        const getAvailable = []
        const routes = this.$router.options.routes
        if (this.isSigned()) {
          routes.filter(route => route.type === 'private').map(route => getAvailable.push(route))
        } else {
          this.publicRoutes = routes.filter(route => route.type === 'public').map(route => getAvailable.push(route))
        }
        return getAvailable
      }
    },
    data() {
      return {
        Popup: false,
        lockedRoutes: [],
        publicRoutes: [],
      }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
      .underline {
        text-decoration-line: underline;
      }
      .noline {
        text-decoration-line: none;
      }
      .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 10vh;
      }
      .container {
        width: 90%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 2em;
      }
      .container * {
          color: black;
      }
      .links {
        width: 75%;
        height: 10%;
        margin: 20px auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #D3D3D3;
        border-radius: 2em;
      }
      .main-content {
        height: 90%;
        max-height: 700px;
        width: 100%;
      }
      .links * {
        display: flex;
        justify-content: space-evenly;
        width: 90%;
        font-size: 16px;
        /* font-family: 'Montserrat'; */
      }
      .links-mobile {
        display: none;
        font-size: 24px;
      }
      .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
      }
      .overlay-content {
          background-color: white;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          /* font-family: 'Montserrat'; */
          font-size: 24px;
      }
      .overlay-content * {
        padding: 40px;
      }
      .closebutton {
          position: relative;
          right: 30px;
          top: 20px;
          text-align: right;
          cursor: pointer;
      }
    @media screen and (max-width: 600px) {
     .links-desktop {
       display: none;
     }
     .links-mobile {
       display: flex;
     }
    }
  </style>