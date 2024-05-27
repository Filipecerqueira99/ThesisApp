<template>
  <h2>O que é um tumor benigno?</h2>
  Escolhe a opção correta<br>
  <div class="multipleChoice">
    <button class="buttonAnswer" @click.prevent="Login(this.email, this.password)">Opção A</button><br>
    <button class="buttonAnswer correct" @click.prevent="Login(this.email, this.password)">Opção A</button><br>
    <button class="buttonAnswer" @click.prevent="Login(this.email, this.password)">Opção A</button><br>
    <button class="buttonAnswer wrong" @click.prevent="Login(this.email, this.password)">Opção A</button><br>
    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Ajuda</button><br>
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
/* eslint-disable */
export default {
  name: "MultipleChoice",
  data() {
    return {
    };
  },
  async created() {
    const response = await api({
      method: 'post',
      url: `/users/login`,
      data: {
        "email": email,
        "password": password
      }
    })

    console.log(this.files)

    
  },
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