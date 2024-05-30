<template>

	<h2>{{ this.questionDescription }}</h2>
	<div v-if="!this.hasPlayed">Escolhe a opção correta<br></div>
	<div v-if="this.userGotItRight == true" class="answerCorrect">Correto! Ótimo trabalho! 🎉</div>
	<div v-if="this.userGotItRight == false" class="answerWrong">Mesmo que não tenhas acertado desta vez, estás no
		caminho certo! Continua a tentar, estás a aprender! 🌟</div>

	<div class="multipleChoice" v-if="!this.hasPlayed">
		<button class="buttonAnswer" :style="{ border: isSelected == '1' ? '3px solid black' : '' }"
			@click.prevent="action(1)">{{ this.lineA }}</button><br>
		<button class="buttonAnswer" :style="{ border: isSelected == '2' ? '3px solid black' : '' }"
			@click.prevent="action(2)">{{ this.lineB }}</button><br>
		<button class="buttonAnswer" :style="{ border: isSelected == '3' ? '3px solid black' : '' }"
			@click.prevent="action(3)">{{ this.lineC }}</button><br>
		<button class="buttonAnswer" :style="{ border: isSelected == '4' ? '3px solid black' : '' }"
			@click.prevent="action(4)">{{ this.lineD }}</button><br>
		<button class="buttonHelp" @click.prevent="finishGame()">Escolher</button><br>
		<button class="buttonHelp" @click.prevent="help()">{{ this.showHideHelp }}</button><br><br>
		<div class="blockExplanation" v-if="this.showTip">
			{{ this.tip }}
		</div>
	</div>

	<div class="explanation" v-if="this.hasPlayed">
		<button class="buttonAnswer correctAnswer">{{ this.correctLineText }}</button><br>
		<h4>Explicação</h4>
		<div class="blockExplanation">
			{{ this.explanation }}
		</div>
		<button class="buttonHelp" @click.prevent="nextGame()">Seguinte</button>
	</div>

	<!-- <button class="buttonHelp" @click.prevent="Login(this.email, this.password)">Seguinte</button><br> -->
	Progresso
	<div class="outsideBorder">
		<div class="insideBar" :style="{ width: this.progress }"></div>
	</div>
</template>

<script>
/* import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'; */

export default {
	name: "MultipleChoice",
	data() {
		return {
			isSelected: null,
			showHideHelp: "Ajuda",
			showTip: false,
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
			selectedAnswer: "",
			userGotItRight: null,
			progress: "0%",
		};
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
		this.correctLine = question.correctAnswer;
		this.questionDescription = question.description;
		this.tip = question.tip;
		this.explanation = question.explanation;

		var progressDone = parseInt(numberQuestion) * 100 / 5;
		this.progress = progressDone + "%"

	},
	methods: {
		finishGame() {
			if (this.selectedAnswer == "") return;

			/* toast.success('Correto!', {
				autoClose: 2000,
			  }); */
			//alert("correto!")

			this.hasPlayed = true;

			if (this.correctLine == 1) {
				this.correctLineText = this.lineA;
			} else if (this.correctLine == 2) {
				this.correctLineText = this.lineB;
			} else if (this.correctLine == 3) {
				this.correctLineText = this.lineC;
			} else if (this.correctLine == 4) {
				this.correctLineText = this.lineD;
			}

			if (this.selectedAnswer == this.correctLine) {
				this.userGotItRight = true;
				localStorage.setItem('numberAnswersCorrect', (parseInt(localStorage.getItem('numberAnswersCorrect')) + 1));

			} else {
				this.userGotItRight = false;
			}


			/* console.log(this.answer)
			console.log(this.correctAnswer)
			if (this.answer == this.correctAnswer) {
			  this.showExplanation = true;
			  this.userGotItRight = true;
			  localStorage.setItem('numberAnswersCorrect', (parseInt(localStorage.getItem('numberAnswersCorrect')) + 1));
			} else {
			  this.showExplanation = true;
			  this.userGotItRight = false;
			} */
		},
		action(number) {
			this.selectedAnswer = number;
			this.isSelected = number;
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
		nextGame() {
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
				location.reload();
			} else if (nextGameMode == 2) {
				this.$router.push("/twoChoice");
			} else if (nextGameMode == 3) {
				this.$router.push("/dragMultipleChoice");
			} else if (nextGameMode == 4) {
				this.$router.push("/orderOptions");
			}
		}
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