<template>
  <h2>Na área de tumores:</h2>
  Seleciona a alínea da esquerda que corresponde a alínea correta da direita!
  <div ref="circleContainer" class="multipleChoice circle-container">
    <div class="left">
      <div class="content">
        <button class="buttonAnswer" @click.prevent="drawLineStart('1')">Esquerda</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineStart('2')">Esquerda</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineStart('3')">Esquerda</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineStart('4')">Esquerda</button><br>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <button class="buttonAnswer" @click.prevent="drawLineFinish('1')">Direita</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineFinish('2')">Direita</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineFinish('3')">Direita</button><br>
        <button class="buttonAnswer" @click.prevent="drawLineFinish('4')">Direita</button><br>
      </div>
    </div>
    <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Ajuda</button><br>

  </div>



  <div class="explanation">
    <div>
      <div class="left">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Esquerda</button>
      </div>
      <div class="right">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Direita</button>
      </div>
      <button class="conentExplaination">Explicação</button>
    </div>
    <div>
      <div class="left">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Esquerda</button>
      </div>
      <div class="right">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Direita</button>
      </div>
      <button class="conentExplaination">Explicação</button>
    </div>
    <div>
      <div class="left">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Esquerda</button>
      </div>
      <div class="right">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Direita</button>
      </div>
      <button class="conentExplaination">Explicação</button>
    </div>
    <div>
      <div class="left">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Esquerda</button>
      </div>
      <div class="right">
        <button class="buttonAnswerOrdered" @click.prevent="drawLineStart('1')">Direita</button>
      </div>
      <button class="conentExplaination">Explicação</button>
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
      isDrawing: false,
      startX: 0,
      startY: 0,
      finishX: 0,
      finishY: 0,
      ctx: null,
      optionLeft: 0,
    }
  },
  methods: {
    drawLineStart(option) {
      this.optionLeft = option;
    },
    /*  drawLine(e) {
       console.log("sdfsdfdsfsdf")
       console.log(event.clientX);
       console.log(event.clientY);
 
       const container = this.$refs.circleContainer;
       const circle = document.createElement('div');
       circle.className = 'circle';
 
 
       this.startX = event.clientX - 15; // Subtract half the circle's diameter to center it
       this.startY = event.clientY - 15; // Subtract half the circle's diameter to center it
     }, */

    drawLineFinish(optionRight) {
      console.log("gfhgfhf")

      const container = this.$refs.circleContainer;
      const circle = document.createElement('div');
      circle.className = 'circle';


      this.finishX = event.clientX - 15; // Subtract half the circle's diameter to center it
      this.finishY = event.clientY - 15; // Subtract half the circle's diameter to center it

      circle.style.position = "absolute";
      circle.style.border = "dashed #095D7E";
      //circle.style.backgroundColor = "red";

      //4 opções da esquerda e 4 opções da direita
      //LINHA 1
      if (this.optionLeft == "1" && optionRight == "1") {
        circle.style.left = "155px";
        circle.style.top = "220px";
        circle.style.width = "87px";
      }
      if (this.optionLeft == "1" && optionRight == "2") {
        circle.style.left = "130px";
        circle.style.top = "278px";
        circle.style.width = "140px";
        circle.style.rotate = "52deg";
      }
      if (this.optionLeft == "1" && optionRight == "3") {
        circle.style.left = "83px";
        circle.style.top = "332px";
        circle.style.width = "233px";
        circle.style.rotate = "68deg";
      }
      if (this.optionLeft == "1" && optionRight == "4") {
        circle.style.left = "30px";
        circle.style.top = "387px";
        circle.style.width = "338px";
        circle.style.rotate = "75deg";
      }
      //LINHA 2
      if (this.optionLeft == "2" && optionRight == "1") {
        circle.style.left = "133px";
        circle.style.top = "275px";
        circle.style.width = "134px";
        circle.style.rotate = "-50deg";
      }
      if (this.optionLeft == "2" && optionRight == "2") {
        circle.style.left = "155px";
        circle.style.top = "330px";
        circle.style.width = "88px";
      }
      if (this.optionLeft == "2" && optionRight == "3") {
        circle.style.left = "130px";
        circle.style.top = "385px";
        circle.style.width = "140px";
        circle.style.rotate = "52deg";
      }
      if (this.optionLeft == "2" && optionRight == "4") {
        circle.style.left = "83px";
        circle.style.top = "442px";
        circle.style.width = "233px";
        circle.style.rotate = "68deg";
      }
      //LINHA 3
      if (this.optionLeft == "3" && optionRight == "1") {
        circle.style.left = "83px";
        circle.style.top = "330px";
        circle.style.width = "233px";
        circle.style.rotate = "-68deg";
      }
      if (this.optionLeft == "3" && optionRight == "2") {
        circle.style.left = "133px";
        circle.style.top = "390px";
        circle.style.width = "134px";
        circle.style.rotate = "-50deg";
      }
      if (this.optionLeft == "3" && optionRight == "3") {
        circle.style.left = "155px";
        circle.style.top = "440px";
        circle.style.width = "88px";
      }
      if (this.optionLeft == "3" && optionRight == "4") {
        circle.style.left = "130px";
        circle.style.top = "500px";
        circle.style.width = "140px";
        circle.style.rotate = "52deg";
      }
      //LINHA 4
      if (this.optionLeft == "4" && optionRight == "1") {
        circle.style.left = "30px";
        circle.style.top = "387px";
        circle.style.width = "338px";
        circle.style.rotate = "-75deg";
      }
      if (this.optionLeft == "4" && optionRight == "2") {
        circle.style.left = "83px";
        circle.style.top = "445px";
        circle.style.width = "233px";
        circle.style.rotate = "-68deg";
      }
      if (this.optionLeft == "4" && optionRight == "3") {
        circle.style.left = "130px";
        circle.style.top = "500px";
        circle.style.width = "140px";
        circle.style.rotate = "-52deg";
      }
      if (this.optionLeft == "4" && optionRight == "4") {
        circle.style.left = "155px";
        circle.style.top = "555px";
        circle.style.width = "88px";
      }



      container.appendChild(circle);
    }

  }
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explanation {
  display: none;
}

.multipleChoice {
  display: block;
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
  cursor: pointer;
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