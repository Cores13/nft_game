import React, { useEffect } from "react";
import Phaser from "phaser";
import { IonPhaser } from "@ion-phaser/react";

var start = false;
var platforms;

const game = {
  width: "100%",
  height: "90%",
  type: Phaser.AUTO,

  scene: {
    init: preload,
    create: create,
    update: update,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

// load assets
function preload() {
  this.load.image("background", "assets/png/BG.png");

  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

//initial setup
function create() {
  this.add.image(1900, 770, "background").setScale(1);
  this.add.image(400, 300, "star");

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
}

// 60fps
function update() {}
export const Game = () => {
  return <IonPhaser game={game} />;
};
