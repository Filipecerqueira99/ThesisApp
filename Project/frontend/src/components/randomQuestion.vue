<template>

  <h2>{{ this.questionDescription }}</h2>
  <div v-if="!this.hasPlayed">Escolhe a opção correta<br></div>
  <div class="multipleChoice" v-if="!this.hasPlayed">
    <button class="buttonAnswer" @click.prevent="action(1)">{{ this.lineA }}</button><br>
    <button class="buttonAnswer correct" @click.prevent="action(2)">{{ this.lineB }}</button><br>
    <button class="buttonAnswer" @click.prevent="action(3)">{{ this.lineC }}</button><br>
    <button class="buttonAnswer" @click.prevent="action(4)">{{ this.lineD }}</button><br>
    <button class="buttonHelp" @click.prevent="help()">{{ this.showHideHelp }}</button><br><br>
    <div class="blockExplanation" v-if="this.tip">
      {{ this.tip }}
    </div>
  </div>

  <div class="explanation" v-if="this.hasPlayed">
    <button class="buttonAnswer correctAnswer">{{ this.correctLineText }}</button><br>
    <h4>Explicação</h4>
    <div class="blockExplanation">
      {{ this.explanation }}
    </div>
    <button class="buttonHelp" @click.prevent="nextQuestion(true)">Seguinte</button>
  </div>

  <!-- <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Seguinte</button><br> -->
</template>

<script>
import api from "../api/api.js";
/* import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; */

export default {
  name: "MultipleChoice",
  data() {
    return {
      showHideHelp: "Ajuda",
      data: null,
      questionDescription: "",
      lineA: "",
      lineB: "",
      lineC: "",
      lineD: "",
      correctLine: 0,
      correctLineText: "",
      explanation: "",
      tip: "",
      hasPlayed: false,
    };
  },
  async created() {
    /* console.log("sdfsdfds") */
    localStorage.setItem('playGame', true);
    const response = await api({
      method: 'get',
      url: `/questions/randomMultipleOption`,
      data: {}
    })

    console.log(response.data)
    this.data = response.data
    this.lineA = this.data.answer1;
    this.lineB = this.data.answer2;
    this.lineC = this.data.answer3;
    this.lineD = this.data.answer4;
    this.correctLine = this.data.correctAnswer;
    this.questionDescription = this.data.description;
    this.explanation = this.data.explanation;


  },
  methods: {
    action(number) {
      console.log(number)
      if (number == this.correctLine) {
        /* toast.success('Correto!', {
          autoClose: 2000,
        }); */
        //alert("correto!")
        this.hasPlayed = true;
        if(number == 1){
          this.correctLineText = this.lineA;
        }else if(number == 2){
          this.correctLineText = this.lineB;
        }else if(number == 3){
          this.correctLineText = this.lineC;
        }else if(number == 4){
          this.correctLineText = this.lineD;
        }
      }
    },
    help() {
      if (this.tip) {
        this.tip = ""
        this.showHideHelp = "Ajuda"
      } else {
        this.tip = this.data.tip;
        this.showHideHelp = "Fechar Ajuda"
      }
    },
    nextQuestion(correctWrong) {
      if(correctWrong){
        var value = localStorage.getItem('numberAnswersCorrect');
        value++;
        console.log(value)
        localStorage.setItem('numberAnswersCorrect', value);
      }
    },
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.multipleChoice {
  display: block;
}

.explanation {
  display: block;
}

.buttonAnswer {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #BDECFF;
  border: 0;
  color: black;
  cursor: pointer;
  width: 90%;
  height: 60px;
}

.correct {
  background-color: #2B87CA;
  color: black;
}

.wrong {
  background-color: #E84558;
  color: black;
}

.correctAnswer {
  background-color: #2B87CA;
  color: white;
}

.blockExplanation {
  text-align: left;
  font-size: 12px;
  padding: 10px;
  border-radius: 22px;
  background-color: #BDECFF;
  border: 0;
  color: #222222;
  width: 90%;
}


.buttonHelp {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #095D7E;
  border: 0;
  color: white;
  cursor: pointer;
  width: 35%;
}
</style>