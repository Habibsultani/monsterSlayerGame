const calculateHurtValue = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

console.log(calculateHurtValue(12, 4));

const app = Vue.createApp({
  data() {
    return {
      monasterHeal: 100,
      playerHeal: 100,
      currentRound: 0,
      message: null,
      buttuleLog: [],
    };
  },

  computed: {
    monsterBarHeal() {
      return { width: this.monasterHeal + "%" };
    },

    playerBarHeal() {
      return { width: this.playerHeal + "%" };
    },

    specialAttackController() {
      return this.currentRound % 3 !== 0;
    },

    healController() {
      return this.currentRound % 2 !== 0;
    },
  },

  watch: {
    playerHeal(value) {
      if (value <= 0 && this.monasterHeal <= 0) {
        // draw
        this.message = "Draw";
      } else if (value <= 0) {
        // player lose
        this.message = "Player";
      }
    },

    monasterHeal(value) {
      if (value <= 0 && this.playerHeal <= 0) {
        // draw
        this.message = "Draw";
      } else if (value < 0) {
        // player won
        this.message = "Monister";
      }
    },
  },

  methods: {
    monisterAttack() {
      this.currentRound++;
      const hurtValueM = calculateHurtValue(12, 5);
      this.monasterHeal -= hurtValueM;
      this.playerAttack();
      this.buttuleLog.push(`Player attaked and deal ${hurtValueM}`);
    },
    playerAttack() {
      const hurtValueP = calculateHurtValue(18, 8);
      this.playerHeal -= hurtValueP;
      this.buttuleLog.push(`Monster attaked and deal ${hurtValueP}`);
    },

    specialAttackM() {
      this.currentRound++;
      const spHurtVal = calculateHurtValue(25, 9);
      this.monasterHeal -= spHurtVal;
      this.buttuleLog.push(`Player attaked and deal ${spHurtVal}`);

      this.playerAttack();
    },

    heal() {
      this.currentRound++;
      const healvalue = calculateHurtValue(12, 7);
      if (this.playerHeal + healvalue > 100) {
        this.playerHeal = 100;
      } else {
        this.playerHeal += healvalue;
        this.buttuleLog.push(`Player healed  ${healvalue}`);
      }
      this.monisterAttack();
    },

    newGame() {
      this.monasterHeal = 100;
      this.playerHeal = 100;
      this.currentRound = 0;
      this.message = null;
      this.buttuleLog.length = 0;
    },

    surenderButton() {
      this.message = "Player";
      this.buttuleLog.length = 0;
    },
  },
});

app.mount("#game");
