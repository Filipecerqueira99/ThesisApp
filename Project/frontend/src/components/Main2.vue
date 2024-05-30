<template>
    <div class="container">
        <div class="header">
            <div class="header-item">
                <h3>Dias</h3>
                <div class="value">{{ this.streak }}</div>
            </div>
            <div class="header-item">
                <h3>Nível</h3>
                <div class="mid">{{ this.level }}</div>
            </div>
            <div class="header-item">
                <h3>Pontos</h3>
                <div class="value">{{ this.points }}</div>
            </div>
        </div>
    </div>
    <div class="revisionContainer">
        <div class="revisionTextContainer">
            <div class="title">Revisão Do Dia</div>
            <button class="buttonNext" @click.prevent="dailyGame()">Começar</button>
        </div>
        <div class="revisionImgContainer">
            <img class="revisionImg" src="../assets/mainimg.png" alt="Dor" />
        </div>
    </div>




    <div class="outsideBox">
        <div class="title">Temáticas</div>
        <div class="threelineBox">
            <button class="buttonNav" @click.prevent="tematicGame(1)">Dor<br>
                <img class="iconImg" src="../assets/symptoms/Dor.png" alt="Dor" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(2)">Dispneia
                <img class="iconImg" src="../assets/symptoms/Dispneia.png" alt="Dispneia" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(3)">Insónia
                <img class="iconImg" src="../assets/symptoms/Insonia.png" alt="Insonia" />
            </button>
        </div>
        <div class="threelineBox">
            <button class="buttonNav" @click.prevent="tematicGame(4)">Fadiga
                <img class="iconImg" src="../assets/symptoms/Fadiga.png" alt="Fadiga" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(5)">Ansiedade
                <img class="iconImg" src="../assets/symptoms/Ansiedade.png" alt="Ansiedade" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(6)">Anorexia
                <img class="iconImg" src="../assets/symptoms/Anorexia.png" alt="Anorexia" />
            </button>
        </div>
        <div class="threelineBox">
            <button class="buttonNav" @click.prevent="tematicGame(7)">Diarreia
                <img class="iconImg" src="../assets/symptoms/Diarreia.png" alt="Diarreia" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(8)">Obstipação
                <img class="iconImg" src="../assets/symptoms/Obstipação.png" alt="Obstipação" />
            </button>
            <button class="buttonNav" @click.prevent="tematicGame(9)">Vómitos
                <img class="iconImg" src="../assets/symptoms/Vómitos.png" alt="Vómitos" />
            </button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Main2",
    data() {
        return {
            points: 0,
            streak: 0,
            level: 0,
        };
    },
    async created() {
        this.points = JSON.parse(localStorage.getItem("points"));
        this.streak = JSON.parse(localStorage.getItem("streak"));
        this.level = JSON.parse(localStorage.getItem("level"));
        localStorage.setItem('tematicGame', 0);
        localStorage.setItem('playGame', false);
    },
    methods: {
        dailyGame() {
            this.$router.push("/beginGame")
        },
        tematicGame(category_id) {
            localStorage.setItem('tematicGame', category_id);
            this.$router.push("/beginGame")
        },
    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.outsideBox {}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

.revisionContainer {
    display: flex;
}

.revisionTextContainer {
    text-align: left;
}

.revisionImgContainer {
    margin-left: 70px;
}

.header {
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    color: white;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 40px;
    width: 92%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    margin-right: 15px;
}

.title {
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
}

.header-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    display: table-cell;
}

.header-item h3 {
    font-weight: normal;
    margin-bottom: 5px;
}

.header-item .value {
    background-color: #08394B;
    width: 90px;
    border: none;
    border-radius: 20px;
    font-size: 22px;
    font-weight: bold;
}

.mid {
    background-color: #08394B;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 50px;
    font-size: 40px;
    font-weight: bold;
    margin-top: 10px;
    display: table-cell;
    vertical-align: middle;
}


.iconImg {
    /* width: 105px; */
    height: 75px;
}

.revisionImg {
    height: 125px;
}

.threelineBox {
    margin-bottom: 10px;
}

.buttonNav {
    margin: 5px;
    width: 30%;
    height: 110px;
    background-color: #2C85A7;
    border: none;
    border-radius: 20px;
    box-shadow: #cfcfcf75 2px 2px;
    color: white;
    cursor: pointer;
}

.buttonNext {
    padding: 8px;
    margin-top: 10px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 80%;
}
</style>