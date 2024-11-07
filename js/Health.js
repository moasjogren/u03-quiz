class Health {
  constructor(parentElement, callback) {
    this.parentElement = parentElement;

    this.callback = callback;
    this.health = 3;
    this.renderLives();
  }

  decreaseHealth() {
    if (this.health === 0) return;

    this.health -= 1;
    this.renderLives();

    if (this.health === 0) {
      this.callback();
    }
  }

  reset() {
    this.health = 3;
    this.renderLives();
  }

  renderLives() {
    this.parentElement.innerHTML = "";

    for (let i = 0; i < this.health; i++) {
      let heart = document.createElement("img");
      heart.src = "./img/image 5.svg";
      heart.alt = "Heart";
      this.parentElement.appendChild(heart);
    }

    for (let i = 0; i < 3 - this.health; i++) {
      let heart = document.createElement("img");
      heart.src = "./img/image 6.svg";
      heart.alt = "Broken heart";
      this.parentElement.appendChild(heart);
    }
  }
}

/*

const lifeElement = document.querySelector(".quiz-container__life");

const gaga = new Health(lifeElement, () => {
  console.log("game over");
});

window.gaga = gaga;
*/
