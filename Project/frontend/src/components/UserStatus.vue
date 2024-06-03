<template>
    <div class="titleContainer">Os teus resultados:</div>
    <div class="left">Nível 3</div>
    <div class="outsideBox">
        <div class="insideBox">
            <div class="boxText">44%</div>
        </div>
    </div>
    <div class="right">Para o nível 4</div>
    <div class="missionDay left">Missões do Dia</div>

    <div class="outsideBoxMission">
        <div class="Column">
            <div class="friendName">Missão 1</div>
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Missão 2</div>
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
            </div>
        </div>
        <div class="Column">
            <div class="friendName">Missão 3</div>
            <div class="outsideLevelPoints">
                <div>Nivel: </div>
            </div>
        </div>
    </div>
    <div>Missões todas concluidas!</div>

    <div class="achievements left">Conquistas</div>
    <div>
        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>

        <div class="left">Conquista 1:</div>
        <div class="outsideBox">
            <div class="insideBox">
                <div class="boxText">44%</div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "UserStatus",
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left {
    text-align: left;
}

.right {
    text-align: right;
}

.titleContainer {
    display: flex;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 600;
}

.outsideBox {
    margin-top: 10px;
    background: #095D7E;
    border-radius: 20px;
}

.insideBox {
    height: 24px;
    width: 70%;
    background: #BDECFF;
    border-radius: 20px;
    margin-right: 10px;
    text-align: right;
}

.boxText {
    margin-right: 10px;
}


.missionDay {
    font-size: 18px;
    font-weight: 600;
}

.achievements {
    font-size: 18px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 5px;
}

.outsideBoxMission {
    margin-bottom: 0px;
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
}</style>