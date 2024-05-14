<template>
    <div>
        <div class="outsideBox">
            <button class="buttonNav selected" @click.prevent="Login(this.username, this.password)">
                <img class="iconImg" src="../assets/icons/home.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="Login(this.username, this.password)">
                <img class="iconImg award" src="../assets/icons/award.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="Login(this.username, this.password)">
                <img class="iconImg" src="../assets/icons/ticket-detailed.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="Login(this.username, this.password)">
                <img class="iconImg" src="../assets/icons/scoreboard.png" alt="Home" />
            </button>
            <button class="buttonNav" @click.prevent="Login(this.username, this.password)">
                <img class="iconImg" src="../assets/icons/user.png" alt="Home" />
            </button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "BottomBar",
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outsideBox {
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    border-radius: 30px;
}


.buttonNav {
    background-color: #2c84a700;
    border: 0;
    cursor: pointer;
    margin-left: 20px;
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
}
</style>