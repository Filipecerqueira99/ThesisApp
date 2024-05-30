<template>
    <div class="titleContainer">Olá, {{ this.userName }}</div><br>
    <div class="revisionContainer">
        <div class="revisionTextContainer">
            <div class="title">Parabéns por mais uma aula feita!</div>
            <!-- <div class="buttonDiv">
                <button class="buttonBack" @click.prevent="goBack()">Voltar</button>
            </div> -->
        </div>
        <div class="revisionImgContainer">
            <img class="revisionImg" src="../assets/mainimg.png" alt="Boneco" />
        </div>
    </div>

    <h3>Aqui estão os teus resultados:</h3>

    <div class="blockExplanation">

        <div class="result">Conseguiste um total de: <b>{{ this.numberAnswersCorrect }}</b> respostas corretas!</div>

        <div class="answerCorrect" v-if="parseInt(this.numberAnswersCorrect) >= 4">Que resultado Fantástico! Ótimo trabalho!
            🎉</div>
        <div class="answerMid" v-if="parseInt(this.numberAnswersCorrect) == 3">Estás a meio caminho do sucesso! Continua a
            esforçar-te, cada passo é um progresso. 🚀</div>
        <div class="answerWrong" v-if="parseInt(this.numberAnswersCorrect) < 3">O resultado não foi o melhor porém estás
            no caminho certo! Continua a tentar, estás a aprender! 🌟</div>



    </div>
    <button class="buttonBack" @click.prevent="goBack()">Menu Inicial</button>
</template>

<script>
import api from "../api/api.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; 
/* eslint-disable */
export default {
    name: "BeginGame",
    data() {
        return {
            userName: "",
            numberAnswersCorrect: "",
        };
    },
    async created() {
        this.userName = localStorage.getItem('first_name');
        this.numberAnswersCorrect = parseInt(localStorage.getItem('numberAnswersCorrect'));

        var idUser = parseInt(localStorage.getItem('idUser'));
        var points = parseInt(localStorage.getItem('points'));
        points = points + this.numberAnswersCorrect;
        var level = parseInt(localStorage.getItem('level'));

        const response = await api({
            method: 'post',
            url: `users/updateUserPoints/${idUser}`,
            data: {
                "points": points,
                "level": level
            }
        })

        if(points>=100){
            localStorage.setItem('points', 0);
            localStorage.setItem('level', level + 1);
        }else{
            localStorage.setItem('points', points);
        }
        

        toast.info(response.data, {
				autoClose: 3000,
			  });
    },
    methods: {
        goBack() {
            this.$router.push("/main2")
        },

    },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blockExplanation {
    text-align: center;
    padding: 10px;
    border-radius: 22px;
    background-color: #BDECFF;
    border: 0;
    width: 90%;
}

.result {
    margin-top: 5px;
    margin-bottom: 10px;
}

.alignLeft {
    text-align: left;
}

.tutorialsContainer {
    margin-top: 30px;
    margin-bottom: 80px;
}

.titleContainer {
    display: flex;
    margin-top: 10px;
}

.revisionContainer {
    display: flex;
}

.revisionTextContainer {
    text-align: left;
}

.revisionImgContainer {
    margin-left: 0px;
}

.revisionImg {
    height: 125px;
}

.tutorialImg {
    height: 320px;
}

.tituloTutorial {
    margin: 10px;
    font-size: 18px;
    font-weight: 500;
}

.title {
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    margin-bottom: 10px;
    margin-top: 6px;
}

.buttonDiv {
    display: flex;
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
    margin-left: 5px;
}

.buttonBack {
    padding: 8px;
    margin-top: 40px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 14px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 50%;
}

.boxTutorial {
    padding: 3px;
    margin-top: 10px;
    border-radius: 22px;
    background: #BDECFF;
    font-size: 14px;
    border: 0;
    color: black;
    width: 90%;
    margin-left: 5px;
}

.answerCorrect {
    color: #CC9900;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}

.answerMid {
    color: #5fcf77;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}

.answerWrong {
    color: #E84558;
    font-size: 16px;
    font-weight: 600;
    border-radius: 30px;
    margin-bottom: 10px;
}
</style>