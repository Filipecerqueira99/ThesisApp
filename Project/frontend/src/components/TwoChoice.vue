<template>
	<h2>É verdade que a quimioterapia é usada recorrentemente na luta contra o cancro?</h2>
	<div v-if="this.userGotItRight == true" class="answerCorrect">Correto! Ótimo trabalho! 🎉</div>
	<div v-if="this.userGotItRight == false" class="answerWrong">Mesmo que não tenhas acertado desta vez, estás no
		caminho certo! Continua a tentar, estás a aprender! 🌟</div>

	<div class="multipleChoice" v-if="!this.showExplanation">
		Escolhe a opção correta<br>
		<button class="buttonAnswer correct" :style="{ border: isSelected == true ? '3px solid black' : '' }"
			@click.prevent="changeTrueOrFalse(true)">Verdadeiro</button><br>
		<button class="buttonAnswer wrong" :style="{ border: isSelected == false ? '3px solid black' : '' }"
			@click.prevent="changeTrueOrFalse(false)">Falso</button><br>

		<button class="buttonHelp" @click.prevent="finishGame()">Selecionar</button><br>
		<button class="buttonHelp" @click.prevent="help()">{{ this.showHideHelp }}</button><br><br>
		<div class="blockExplanation" v-if="this.showTip">
			{{ this.tip }}
		</div>
	</div>

	<div class="explanation" v-if="this.showExplanation">
		<button v-if="this.correctAnswer" class="buttonAnswer correctAnswerGreen">Verdadeiro</button><br>
		<button v-if="!this.correctAnswer" class="buttonAnswer correctAnswerRed">Falso</button><br>

		<div class="tittleExplanation">Explicação</div>
		<div class="blockExplanation">
			{{ this.explanation }}
		</div>
		<button class="buttonHelp" @click.prevent="nextGame()">Seguinte</button><br>

	</div>

	Progresso
	<div class="outsideBorder">
		<div class="insideBar" :style="{ width: this.progress }"></div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	name: "TwoChoice",
	data() {
		return {
			isSelected: null,
			showHideHelp: "Ajuda",
			showExplanation: false,
			tip: "",
			explanation: "",
			showTip: false,
			answer: null,
			correctAnswer: null,
			userGotItRight: null,
			progress: "0%",

		};
	},
	async created() {
		var data = JSON.parse(localStorage.getItem('questions'));
		console.log(data)
		var numberQuestion = JSON.parse(localStorage.getItem('numberQuestion'));
		if(numberQuestion > "5"){
			this.$router.push("/main2");
		}
		console.log(data[numberQuestion - 1]);
		var question = data[numberQuestion - 1];
		this.tip = question.tip;
		this.explanation = question.explanation;
		if (question.correctAnswer == 1) {
			this.correctAnswer = true;
		} else {
			this.correctAnswer = false;
		}

		var progressDone = parseInt(numberQuestion) * 100 / 5;
		this.progress = progressDone + "%"

	},
	methods: {
		finishGame() {
			console.log(this.answer)
			console.log(this.correctAnswer)
			if (this.answer == this.correctAnswer) {
				this.showExplanation = true;
				this.userGotItRight = true;
				localStorage.setItem('numberAnswersCorrect', (parseInt(localStorage.getItem('numberAnswersCorrect')) + 1));
			} else {
				this.showExplanation = true;
				this.userGotItRight = false;
			}
		},
		help() {
			console.log(this.showTip)
			if (this.showTip) {
				this.showTip = false;
				this.showHideHelp = "Ajuda";
			} else {
				this.showTip = true;
				this.showHideHelp = "Fechar Ajuda"
			}
		},
		changeTrueOrFalse(trueOrFalse) {
			this.answer = trueOrFalse;
			this.isSelected = trueOrFalse;
		},
		nextGame() {
			console.log("NextGame")
			localStorage.setItem('numberQuestion', (parseInt(localStorage.getItem('numberQuestion')) + 1));
			var data = JSON.parse(localStorage.getItem('questions'));
			var numberQuestion = JSON.parse(localStorage.getItem('numberQuestion'));
			var question = data[numberQuestion - 1];
			if(question != undefined){
				this.gameModeChooser(question.type_id)
			}else{
				this.$router.push("/endGame")
			}
		},
		gameModeChooser(nextGameMode) {
			if (nextGameMode == 1) {
				this.$router.push("/multipleChoice");
			} else if (nextGameMode == 2) {
				this.$router.push("/twoChoice");
				location.reload();
			} else if (nextGameMode == 3) {
				this.$router.push("/dragMultipleChoice");
			} else if (nextGameMode == 4) {
				this.$router.push("/orderOptions");
			}
		}
	},
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
	font-size: 20px;
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

.correctAnswerGreen {
	background-color: #BDFFD7;
	color: black;
	margin-top: 0px;
}

.correctAnswerRed {
	background-color: #ffbdbd;
	color: black;
	margin-top: 0px;
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

.tittleExplanation {
	margin-top: 20px;
	margin-bottom: 10px;
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

.answerCorrect {
	color: #5fcf77;
	font-size: 18px;
	font-weight: 600;
	border: 3px solid #7dc78d;
	border-radius: 30px;
	margin-bottom: 10px;
}

.answerWrong {
	color: #E84558;
	font-size: 18px;
	font-weight: 600;
	border: 3px solid #FFB0B0;
	border-radius: 30px;
	margin-bottom: 10px;
}

.outsideBorder {
	margin-top: 10px;
	background: #BDECFF;
	border: 2px solid #053346;
	border-radius: 20px;
}

.insideBar {
	height: 24px;
	width: 20%;
	background: #095D7E;
	border-radius: 20px;
}
</style>