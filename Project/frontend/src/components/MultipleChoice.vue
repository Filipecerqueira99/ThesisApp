<template>
  <h2>{{ this.questionDescription }}</h2>
  Escolhe a opção correta<br>
  <div class="multipleChoice">
    <button class="buttonAnswer" @click.prevent="action(1)">{{ this.lineA }}</button><br>
    <button class="buttonAnswer correct" @click.prevent="action(2)">{{ this.lineB }}</button><br>
    <button class="buttonAnswer" @click.prevent="action(3)">{{ this.lineC }}</button><br>
    <button class="buttonAnswer" @click.prevent="action(4)">{{ this.lineD }}</button><br>
    <button class="buttonHelp" @click.prevent="help()">Ajuda</button><br>
  </div>

  <div class="explanation">
    <button class="buttonAnswer correctAnswer">Opção Correta</button><br>
    <h4>Explicação</h4>
    <div class="blockExplanation">
      Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação
      detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.
    </div>
  </div>

  <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Seguinte</button><br>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "MultipleChoice",
  data() {
    return {
      data: null,
      questionDescription: "",
      lineA: "",
      lineB: "",
      lineC: "",
      lineD: "",
      correctLine: 0,
      explanation: 0,
      tip: 0,
    };
  },
  async created() {
    console.log("sdfsdfds")
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
    this.tip = this.data.tip;

  },
  methods: {
    action(number) {
      console.log(number)
      if(number == this.correctLine){
        alert("correto!")
      }
    },
    help() {
      console.log("sdfsdf")
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
  display: none;
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
  width: 30%;
}
</style>