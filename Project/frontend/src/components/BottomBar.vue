<template>
    <div v-if="isSigned()" class="outsideBox">
        <button class="buttonNav" :style="{ border: selectedPage == '/main2' ? '3px solid white' : '0px' }"
            @click="action('/main2')">
            <img class="iconImg" src="../assets/icons/home.png" alt="Home" />
        </button>
        <button class="buttonNav" :style="{ border: selectedPage == '/userStatus' ? '3px solid white' : '0px' }"
            @click="action('/userStatus')">
            <img class="iconImg award" src="../assets/icons/award.png" alt="Home" />
        </button>
        <!-- <button class="buttonNav" @click.prevent="action("main")">
                <img class="iconImg" src="../assets/icons/ticket-detailed.png" alt="Home" />
            </button> -->
        <button class="buttonNav" :style="{ border: selectedPage == '/scoreboard' ? '3px solid white' : '0px' }"
            @click="action('/scoreboard')">
            <img class="iconImg" src="../assets/icons/scoreboard.png" alt="Home" />
        </button>
        <button class="buttonNav" :style="{ border: selectedPage == '/userProfile' ? '3px solid white' : '0px' }"
            @click="action('/userProfile')">
            <img class="iconImg" src="../assets/icons/user.png" alt="Home" />
        </button>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "BottomBar",
    data() {
        return {
            selectedPage: "/main2",
        }
    },
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
            if (localStorage.getItem('idUser')) {
                if (localStorage.getItem('playGame') == "true") {
                    return false;
                } else {
                    return true;
                }
            }
        },
        action(value) {
            this.selectedPage = value;
            console.log(this.selectedPage)
            this.$router.push(value)
        }
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outsideBox {
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
    z-index: 5;

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
    border-radius: 20px;
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