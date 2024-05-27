<template>
  <h2>Na área de tumores:</h2>
  Ordena do mais importante para o menos

  <div class="orderChoice">
    <div class="container">
      <div class="top">Mais importante</div>
      <div class="line"></div>
      <div class="buttons">
        <button class="buttonAnswerOrdered" @click.prevent="changeOrder(but1Label)">{{ but1Label }}</button>
        <button class="buttonAnswerOrdered" @click.prevent="changeOrder(but2Label)">{{ but2Label }}</button>
        <button class="buttonAnswerOrdered" @click.prevent="changeOrder(but3Label)">{{ but3Label }}</button>
        <button class="buttonAnswerOrdered" @click.prevent="changeOrder(but4Label)">{{ but4Label }}</button>
      </div>
      <div class="bottom">Menos importante</div>

    </div>
    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Ajuda</button><br>
  </div>


  <div class="explanation">
    <div class="container">
      <div class="top">Mais importante</div>
      <div class="line"></div>
      <div class="buttons">
        <button class="buttonAnswerOrdered finalOrder">R1</button>
        <button class="buttonAnswerOrdered finalOrder">R2</button>
        <button class="buttonAnswerOrdered finalOrder">R3</button>
        <button class="buttonAnswerOrdered finalOrder">R4</button>
      </div>
      <div class="bottom">Menos importante</div>
    </div>
    <div>
      Explicação
      <div class="blockExplanation">
        Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.Explicação
        detalhada da reposta.Explicação detalhada da reposta.Explicação detalhada da reposta.
      </div>
    </div>
    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Seguinte</button><br>
  </div>




</template>

<script>
/* eslint-disable */
export default {
  name: "DragMultipleChoice",
  data() {
    return {
      but1Label: "mais importante",
      but2Label: "medio importante",
      but3Label: "medio menos importante",
      but4Label: "menos importante",
      lastSelected: null,
    }
  },
  methods: {
    changeOrder(option) {
      if (this.lastSelected == null) {
        this.lastSelected = option;
      } else {
        if (this.lastSelected !== option) {
          //primeiro selecionado -> this.lastSelected
          //ultimo selecionado -> option

          /*
          console.log("O que estamos a mudar:")
          console.log("this.lastSelected: " + this.lastSelected)
          console.log("option: " + option)
          */

          if (option == this.but1Label) {
            this.but1Label = this.lastSelected
            if (this.lastSelected == this.but2Label) {
              this.but2Label = option
            } else if (this.lastSelected == this.but3Label) {
              this.but3Label = option
            } else if (this.lastSelected == this.but4Label) {
              this.but4Label = option
            }
          } else if (option == this.but2Label) {
            this.but2Label = this.lastSelected
            if (this.lastSelected == this.but1Label) {
              this.but1Label = option
            } else if (this.lastSelected == this.but3Label) {
              this.but3Label = option
            } else if (this.lastSelected == this.but4Label) {
              this.but4Label = option
            }
          } else if (option == this.but3Label) {
            console.log("ENTROU")
            this.but3Label = this.lastSelected
            console.log("this.but3Label: " + this.but3Label)
            if (this.lastSelected == this.but1Label) {
              this.but1Label = option
            } else if (this.lastSelected == this.but2Label) {
              this.but2Label = option
            } else if (this.lastSelected == this.but4Label) {
              this.but4Label = option
            }
          } else if (option == this.but4Label) {
            this.but4Label = this.lastSelected
            if (this.lastSelected == this.but1Label) {
              this.but1Label = option
            } else if (this.lastSelected == this.but2Label) {
              this.but2Label = option
            } else if (this.lastSelected == this.but3Label) {
              this.but3Label = option
            }
          }

          /* if(this.lastSelected == this.but1Label){
            this.but1Label = option
          }else if(this.lastSelected == this.but2Label){
            this.but2Label = option
          }else if(this.lastSelected == this.but3Label){
            this.but3Label = option
          }else if(this.lastSelected == this.but4Label){
            this.but4Label = option
          } */

          this.lastSelected = null;
          /*
          console.log("Depois das mudanças:")
          console.log(this.but1Label)
          console.log(this.but2Label)
          console.log(this.but3Label)
          console.log(this.but4Label)
          */

        }
      }
    },
  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explanation {
  display: block;
}

.orderChoice {
  display: none;
}

.left {
  float: left;
}

.right {
  float: right;
}

.content {
  cursor: pointer;
}

.container {
  position: relative;
  margin-top: 30px;
  width: 100%;
  height: 400px;
}

.line {
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 5%;
  width: 4px;
  background-color: #08394B;
  border-radius: 20px;
}

.top {
  position: absolute;
  top: 0px;
  font-size: 10px;
}

.bottom {
  position: absolute;
  bottom: 0px;
  font-size: 10px;
}

.buttons {
  position: absolute;
  top: 3%;
  left: 10%;
  width: 80%;
}

.buttons button {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
}

.buttonAnswer {
  margin-top: 30px;
  padding: 10px;
  border-radius: 22px;
  background-color: #BDECFF;
  border: 0;
  color: black;
  cursor: pointer;
  width: 130px;
  height: 80px;
}

.buttonAnswerOrdered {
  margin-top: 10px;
  padding: 10px;
  border-radius: 22px;
  background-color: #BDECFF;
  border: 0;
  color: black;
  cursor: pointer;
  width: 170px;
  height: 80px;
}

.finalOrder {
  background-color: #095D7E;
  color: white;
}

.conentExplaination {
  margin-top: 10px;
  border-radius: 22px;
  padding: 10px;
  font-size: 12px;
  background-color: #2B87CA;
  border: 0;
  color: white;
  width: 100%;

}

.correct {
  background-color: #2B87CA;
  color: white;
}

.wrong {
  background-color: #E84558;
  color: white;
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
  margin-top: 10px;
  padding: 10px;
  border-radius: 22px;
  background-color: #095D7E;
  border: 0;
  color: white;
  cursor: pointer;
  width: 30%;
}
</style>