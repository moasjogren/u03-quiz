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
      heart.src = "./img/image5.png";
      heart.alt = "Heart";
      this.parentElement.appendChild(heart);
    }

    for (let i = 0; i < 3 - this.health; i++) {
      let heart = document.createElement("img");
      heart.src = "./img/image6.png";
      heart.alt = "Broken heart";
      this.parentElement.appendChild(heart);
    }
  }
}
