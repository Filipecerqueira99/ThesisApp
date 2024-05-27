<template>
    <div v-if="isSigned()">
        <div class="outsideBox">
            <button class="buttonNav selected" @click.prevent="action('main')">
                <img class="iconImg" src="../assets/icons/home.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="action('results')">
                <img class="iconImg award" src="../assets/icons/award.png" alt="Home" />
            </button>
            <!-- <button class="buttonNav" @click.prevent="action("main")">
                <img class="iconImg" src="../assets/icons/ticket-detailed.png" alt="Home" />
            </button> -->
            <button class="buttonNav" @click.prevent="action('scores')">
                <img class="iconImg" src="../assets/icons/scoreboard.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="action('settings')">
                <img class="iconImg" src="../assets/icons/user.png" alt="Home" />
            </button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "BottomBar",
    methods: {
        LogOut() {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('idUser');
            this.$router.push("/login")
            this.Popup = false
        },
        isSigned() {
            //console.log(localStorage.getItem('idUser'))
            return localStorage.getItem('idUser')
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
            console.log(routes)
            if (this.isSigned()) {
                routes.filter(route => route.showRoute.includes('private')).map(route => getAvailable.push(route))
            } else {
                routes.filter(route => route.showRoute.includes('public')).map(route => getAvailable.push(route))
            }
            return getAvailable
        },
        action(value){
        console.log(value)
    }
    },
    data() {
        return {
            Popup: false,
            lockedRoutes: [],
            publicRoutes: []
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outsideBox {
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    border-radius: 30px;
    text-align: left;
}


.buttonNav {
    background-color: #2c84a700;
    border: 0;
    cursor: pointer;
    margin-left: 38px;
    margin-top: 2px;
    margin-bottom: 2px;
}

.iconImg {
    width: 35px;
    height: 35px;
}

.award {
    width: 30px;
}

.selected {
    background-color: rgba(255, 255, 255, 0.267);
    border-radius: 30px;
    border: solid 3px rgb(255, 255, 255);
    padding-top: 2px;
    padding-left: 4px;
}
</style>