<template>
    <div>
        <div class="heyUser">Olá, {{ this.nameUser }}</div>
        <div class="topImg"><img class="iconImg" src="../assets/loginimg.png" alt="Dor" /></div>
    </div>
    
    
   <h4>Selecione o que lhe preocupa mais hoje</h4>
   <div class="outsideBox">
    <div class="threelineBox">
        <button class="buttonNav selected" @click.prevent="Login()">Dor<br>
            <img class="iconImg" src="../assets/symptoms/Dor.png" alt="Dor" />
        </button>
        <button class="buttonNav" @click.prevent="Login()">Dispneia
            <img class="iconImg" src="../assets/symptoms/Dispneia.png" alt="Dispneia" />
        </button>
        <button class="buttonNav" @click.prevent="Login()">Insónia
            <img class="iconImg" src="../assets/symptoms/Insonia.png" alt="Insonia" />
        </button>
    </div>
    <div class="threelineBox">
        <button class="buttonNav selected" @click.prevent="Login()">Fadiga
            <img class="iconImg" src="../assets/symptoms/Fadiga.png" alt="Fadiga" />
        </button>
        <button class="buttonNav" @click.prevent="Login()">Ansiedade
            <img class="iconImg" src="../assets/symptoms/Ansiedade.png" alt="Ansiedade" />
        </button>
        <button class="buttonNav" @click.prevent="Login()">Anorexia
            <img class="iconImg" src="../assets/symptoms/Anorexia.png" alt="Anorexia" />
        </button>
    </div>
    <div class="threelineBox">
        <button class="buttonNav" @click.prevent="Login()">Diarreia
            <img class="iconImg" src="../assets/symptoms/Diarreia.png" alt="Diarreia" />
        </button>
        <button class="buttonNav selected" @click.prevent="Login()">Obstipação
            <img class="iconImg" src="../assets/symptoms/Obstipação.png" alt="Obstipação" />
        </button>
        <button class="buttonNav selected" @click.prevent="Login()">Vómitos
            <img class="iconImg" src="../assets/symptoms/Vómitos.png" alt="Vómitos" />
        </button>
    </div>
   </div>
   <button class="buttonNext" @click.prevent="Login()">Seguinte</button>
</template>

<script>
/* eslint-disable */
export default {
    name: "CurrentSymptoms",
    data() {
    return {
      nameUser: "",
    };
  },
  methods: {
   
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .heyUser{
        margin-left: 1%;
        text-align: left;
    }
    .topImg{
        text-align: right;
        margin-top: -10%;
    }

    .threelineBox{
        margin-bottom: 50px;
    }

    .buttonNav{
        margin: 5px;
        width: 30%;
        background-color: #BDECFF;
        border: none;
        border-radius: 20px;
        box-shadow: #cfcfcf75 2px 2px;
    }

    .selected{
        background-color: #095D7E;
        box-shadow: #0b506b8c 2px 2px;
        color: white;
    }

    .iconImg {
        /* width: 105px; */
        height: 75px;
    }

    .buttonNext {
    padding: 10px;
    border-radius: 22px;
    background: rgb(9, 93, 126);
    background: linear-gradient(90deg, rgba(9, 93, 126, 1) 0%, rgba(46, 134, 169, 1) 100%);
    font-size: 16px;
    border: 0;
    color: white;
    cursor: pointer;
    width: 40%;
  }
</style>