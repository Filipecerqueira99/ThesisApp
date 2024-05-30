<template>
	<h2>{{ this.questionDescription }}</h2>
	<div v-if="!this.hasPlayed">Ordena do mais importante para o menos<br></div>
	<div v-if="this.userGotItRight == true" class="answerCorrect">Correto! Ótimo trabalho! 🎉</div>
	<div v-if="this.userGotItRight == false" class="answerWrong">Mesmo que não tenhas acertado desta vez, estás no
		caminho certo! Continua a tentar, estás a aprender! 🌟</div>

	<div class="orderChoice" v-if="!this.hasPlayed">
		<div class="container">
			<div class="top">Mais importante</div>
			<div class="line"></div>
			<div class="buttons">
				<button class="buttonAnswerOrdered" @click.prevent="changeOrder(this.lineA)">{{ this.lineA }}</button>
				<button class="buttonAnswerOrdered" @click.prevent="changeOrder(this.lineB)">{{ this.lineB }}</button>
				<button class="buttonAnswerOrdered" @click.prevent="changeOrder(this.lineC)">{{ this.lineC }}</button>
				<button class="buttonAnswerOrdered" @click.prevent="changeOrder(this.lineD)">{{ this.lineD }}</button>
			</div>
			<div class="bottom">Menos importante</div>

		</div>
		<button class="buttonHelp" @click.prevent="finishGame()">Concluir</button><br>
		<button class="buttonHelp" @click.prevent="help()">{{ this.showHideHelp }}</button><br><br>
		
		<div class="blockExplanation" v-if="this.showTip">
			{{ this.tip }}
		</div>
	</div>


	<div class="explanation" v-if="this.hasPlayed">
		<div class="container">
			<div class="top">Mais importante</div>
			<div class="line"></div>
			<div class="buttons">
				<button class="buttonAnswerOrdered finalOrder">{{ this.orderedA }}</button>
				<button class="buttonAnswerOrdered finalOrder">{{ this.orderedB }}</button>
				<button class="buttonAnswerOrdered finalOrder">{{ this.orderedC }}</button>
				<button class="buttonAnswerOrdered finalOrder">{{ this.orderedD }}</button>
			</div>
			<div class="bottom">Menos importante</div>
		</div>
		<div>
			Explicação
			<div class="blockExplanation">
				{{ this.explanation }}
			</div>
		</div>
		<button class="buttonNext" @click.prevent="nextGame()">Seguinte</button><br>
	</div>

	Progresso
	<div class="outsideBorder">
		<div class="insideBar" :style="{ width: this.progress }"></div>
	</div>

</template>

<script>
/* eslint-disable */
export default {
	name: "DragMultipleChoice",
	data() {
		return {
			initialLineA: "",
			initialLineB: "",
			initialLineC: "",
			initialLineD: "",

			lineA: "",
			lineB: "",
			lineC: "",
			lineD: "",
			lastSelected: null,
			isSelected: null,
			showHideHelp: "Ajuda",
			showTip: false,
			questionDescription: "",
			correctLine: 0,
			correctLineText: "",
			explanation: "",
			tip: "",
			hasPlayed: false,
			userGotItRight: null,
			orderedA: "",
			orderedB: "",
			orderedC: "",
			orderedD: "",

			progress: "0%",
		}
	},
	async created() {
		/* console.log("sdfsdfds") */

		var data = JSON.parse(localStorage.getItem('questions'));
		console.log(data)
		var numberQuestion = JSON.parse(localStorage.getItem('numberQuestion'));

		if (numberQuestion > "5") {
			this.$router.push("/main2");
		}

		console.log(data[numberQuestion - 1]);
		var question = data[numberQuestion - 1];

		this.lineA = question.answer1;
		this.lineB = question.answer2;
		this.lineC = question.answer3;
		this.lineD = question.answer4;

		this.initialLineA = question.answer1;
		this.initialLineB = question.answer2;
		this.initialLineC = question.answer3;
		this.initialLineD = question.answer4;

		this.correctLine = question.correctAnswer;
		this.questionDescription = question.description;
		this.tip = question.tip;
		this.explanation = question.explanation;

		var progressDone = parseInt(numberQuestion) * 100 / 5;
		this.progress = progressDone + "%"

	},
	methods: {
		changeOrder(option) {
			console.log(option)
			if (this.lastSelected == null) {
				this.lastSelected = option;
			} else {
				if (this.lastSelected !== option) {

					//primeiro selecionado -> this.lastSelected
					//ultimo selecionado -> option


					/* console.log("O que estamos a mudar:")
					console.log("this.lastSelected: " + this.lastSelected)
					console.log("option: " + option)*/

					if (option == this.lineA) {
						this.lineA = this.lastSelected
						if (this.lastSelected == this.lineB) {
							this.lineB = option
						} else if (this.lastSelected == this.lineC) {
							this.lineC = option
						} else if (this.lastSelected == this.lineD) {
							this.lineD = option
						}
					} else if (option == this.lineB) {
						this.lineB = this.lastSelected
						if (this.lastSelected == this.lineA) {
							this.lineA = option
						} else if (this.lastSelected == this.lineC) {
							this.lineC = option
						} else if (this.lastSelected == this.lineD) {
							this.lineD = option
						}
					} else if (option == this.lineC) {
						this.lineC = this.lastSelected
						if (this.lastSelected == this.lineA) {
							this.lineA = option
						} else if (this.lastSelected == this.lineB) {
							this.lineB = option
						} else if (this.lastSelected == this.lineD) {
							this.lineD = option
						}
					} else if (option == this.lineD) {
						this.lineD = this.lastSelected
						if (this.lastSelected == this.lineA) {
							this.lineA = option
						} else if (this.lastSelected == this.lineB) {
							this.lineB = option
						} else if (this.lastSelected == this.lineC) {
							this.lineC = option
						}
					}
					this.lastSelected = null;
				}
			}
		},
		finishGame() {
			this.hasPlayed = true;
			var order = this.correctLine.toString();
			console.log(order[1]);
			if (order[0] == 1) {
				this.orderedA = this.initialLineA;
			} else if (order[0] == 2) {
				this.orderedA = this.initialLineB;
			} else if (order[0] == 3) {
				this.orderedA = this.initialLineC;
			} else if (order[0] == 4) {
				this.orderedA = this.initialLineD;
			}
			if (order[1] == 1) {
				this.orderedB = this.initialLineA;
			} else if (order[1] == 2) {
				this.orderedB = this.initialLineB;
			} else if (order[1] == 3) {
				this.orderedB = this.initialLineC;
			} else if (order[1] == 4) {
				this.orderedB = this.initialLineD;
			}
			if (order[2] == 1) {
				this.orderedC = this.initialLineA;
			} else if (order[2] == 2) {
				this.orderedC = this.initialLineB;
			} else if (order[2] == 3) {
				this.orderedC = this.initialLineC;
			} else if (order[2] == 4) {
				this.orderedC = this.initialLineD;
			}
			if (order[3] == 1) {
				this.orderedD = this.initialLineA;
			} else if (order[3] == 2) {
				this.orderedD = this.initialLineB;
			} else if (order[3] == 3) {
				this.orderedD = this.initialLineC;
			} else if (order[3] == 4) {
				this.orderedD = this.initialLineD;
			}

			if (this.lineA == this.orderedA
				&& this.lineB == this.orderedB
				&& this.lineC == this.orderedC
				&& this.lineD == this.orderedD) {
				this.userGotItRight = true;
				localStorage.setItem('numberAnswersCorrect', (parseInt(localStorage.getItem('numberAnswersCorrect')) + 1));
			} else {
				this.userGotItRight = false;
			}

		},
		help() {
			//console.log(this.showTip)
			if (this.showTip) {
				this.showTip = false;
				this.showHideHelp = "Ajuda";
			} else {
				this.showTip = true;
				this.showHideHelp = "Fechar Ajuda"
			}
		},
		nextGame() {
			localStorage.setItem('numberQuestion', (parseInt(localStorage.getItem('numberQuestion')) + 1));
			var data = JSON.parse(localStorage.getItem('questions'));
			var numberQuestion = JSON.parse(localStorage.getItem('numberQuestion'));
			var question = data[numberQuestion - 1];
			console.log(question);
			if (question != undefined) {
				this.gameModeChooser(question.type_id)
			} else {
				this.$router.push("/endGame")
			}
		},
		gameModeChooser(nextGameMode) {
			if (nextGameMode == 1) {
				this.$router.push("/multipleChoice");
			} else if (nextGameMode == 2) {
				this.$router.push("/twoChoice");
			} else if (nextGameMode == 3) {
				this.$router.push("/dragMultipleChoice");
			} else if (nextGameMode == 4) {
				this.$router.push("/orderOptions");
				location.reload();
			}
		}
	}
};

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explanation {
	display: block;
}

.orderChoice {
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

.buttonNext {
	margin-top: 10px;
	padding: 10px;
	border-radius: 22px;
	background-color: #095D7E;
	border: 0;
	color: white;
	cursor: pointer;
	width: 30%;
	margin-bottom: 50px;
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