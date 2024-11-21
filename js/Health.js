const heartImg = "./img/heart.png";
const brokenHeartImg = "./img/broken-heart.png";

class Health {
  constructor(parentElement) {
    this.parentElement = parentElement;

    this.lives = 3;
    this.render();
  }

  removeLife() {
    if (this.lives === 0) return;

    this.lives -= 1;
    this.render();
  }

  reset() {
    this.lives = 3;
    this.render();
  }

  render() {
    this.parentElement.innerHTML = "";

    for (let i = 0; i < this.lives; i++) {
      let heart = document.createElement("img");
      heart.src = heartImg;
      heart.alt = "Full heart";
      this.parentElement.appendChild(heart);
    }

    for (let i = 0; i < 3 - this.lives; i++) {
      let heart = document.createElement("img");
      heart.src = brokenHeartImg;
      heart.alt = "Broken heart";
      this.parentElement.appendChild(heart);
    }
  }
}
