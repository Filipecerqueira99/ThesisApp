<template>
    <div class="titleContainer">Como estão os teus amigos:</div><br>
    <div class="outsideBox">
        <div class="Column">
            <div class="friendName">Amigo1</div>
            <img class="loginImg" src="../assets/loginimg.png" alt="Folder" />
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
                <div>Pontos: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Amigo1</div>
            <img class="loginImg" src="../assets/loginimg.png" alt="Folder" />
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
                <div>Pontos: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Amigo1</div>
            <img class="loginImg" src="../assets/loginimg.png" alt="Folder" />
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
                <div>Pontos: </div>
            </div>
        </div>
    </div>
    <div class="title">Tabela de Pontos</div>
    <div class="subtitle">Semanal</div>
    <div class="scoreboardTable">
        <div class="scoreboard">
            <div class="score-row">
                <div class="position">1</div>
                <div class="name">John Doe</div>
                <div class="points">100pts</div>
            </div>
            <div class="score-row">
                <div class="position">2</div>
                <div class="name">Jane Smith</div>
                <div class="points">90pts</div>
            </div>
            <div class="score-row yourself">
                <div class="position">3</div>
                <div class="name">You</div>
                <div class="points">90pts</div>
            </div>
            <div class="score-row">
                <div class="position">4</div>
                <div class="name">Jane Smith</div>
                <div class="points">90pts</div>
            </div>
            <!-- Add more rows as needed -->
        </div>

    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "Scoreboard",
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scoreboard {
    width: 80%;
    margin: 0 auto;
    border-collapse: collapse;
}

.score-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #fff;
    color: white;
}

.yourself{
    background-color: #14967FA3;
  border-radius: 18px;
}

.position {
    width: 10%;
    text-align: left;
}

.name {
    width: 60%;
    text-align: center;
}

.points {
    width: 30%;
    text-align: right;
}

.scoreboardTable {
    background-color: #14967e75;
    border-radius: 30px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 30px;
}

.title {
    font-size: 20px;
    font-weight: 600;
}

.subtitle {
    font-size: 16px;
    font-weight: 400;
}

.titleContainer {
    display: flex;
    margin-top: 10px;
}

.loginImg {
    width: 50px;
    height: 80px;
    margin-bottom: 0px;
}

.outsideBox {
    background-color: #DEF6FF;
    box-shadow: 0px 8px 5px 5px #abbec6;
    margin-bottom: 30px;
    border-radius: 30px;

    display: table;
    width: 100%;
    /*Optional*/
    table-layout: fixed;
    /*Optional*/
    border-spacing: 10px;
    /*Optional*/
}

.Column {
    display: table-cell;
    background-color: #BDECFF;
    border-radius: 30px;
    box-shadow: 0px 3px 1px 1px #abbec6;
}

.friendName {
    margin-top: 5px;
    font-weight: 600;
}

.outsideLevelPoints {
    background-color: #4897B6;
    color: white;
    border-radius: 20px;
    margin: 5px;
}
</style>