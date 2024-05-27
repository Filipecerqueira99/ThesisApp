<template>
   <h2>É verdade que a quimioterapia é usada recorrentemente na luta contra o cancro?</h2>
   Escolhe a opção correta<br>
   <div class="multipleChoice">
    <button class="buttonAnswer correct" @click.prevent="Login(this.email, this.password)">Verdadeiro</button><br>
    <button class="buttonAnswer wrong" @click.prevent="Login(this.email, this.password)">Falso</button><br>


    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Ajuda</button><br>
   </div>

   <div class="explanation">
    <button class="buttonAnswer correctAnswer">Verdadeiro</button><br>
    Explicação
    <div class="blockExplanation">
      Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.
    </div>
    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Seguinte</button><br>

   </div>

</template>

<script>
/* eslint-disable */
export default {
    name: "TwoChoice",
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.multipleChoice{
    display: none;
}

.explanation{
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
    height: 80px;
  }

  .correct {
    background-color: #2B87CA;
    color: white;
  }

  .wrong {
    background-color: #E84558;
    color: white;
  }

  .correctAnswer{
    background-color: #2B87CA;
    color: white;
  }

  .blockExplanation{
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