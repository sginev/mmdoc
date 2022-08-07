import { Application, Sprite, Texture } from "pixi.js";
import { Container3D, Mesh3D, Sprite3D, SpriteBillboardType } from "pixi3d";

interface ICardData {
  t: string;
}
const cards = [
  { t: `https://public.cx/mmdoc/factions/inferno/103.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/95.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/95.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/94.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/94.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/92.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/92.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/80.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/80.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/79.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/79.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/58.webp` },
  { t: `https://public.cx/mmdoc/factions/inferno/49.webp` },
]
const back_t = `https://public.cx/mmdoc/back/back.webp`;

class VCard extends Container3D {
  timeElapsed = 0;
  flippedness = 0;

  public readonly frontTexture: Texture;
  public readonly backTexture: Texture;
  public readonly front: Sprite3D;
  public readonly back: Sprite3D;

  constructor(public readonly data: ICardData) {
    super();

    // this.frontTexture = Texture.from(data.t);
    this.frontTexture = Texture.from(`https://public.cx/mock/cards/bg-0.png`);
    this.backTexture = Texture.from(back_t);

    this.front = new Sprite3D(this.frontTexture);
    this.front.anchor.set(0.5, 0.5);
    this.front.scale.set(0.2, 0.2, 0.2);
    this.front.rotationQuaternion.setEulerAngles(0, 0, 0);
    this.front.position.set(0, 0, -.001);
    this.addChild(this.front);

    this.back = new Sprite3D(this.backTexture);
    this.back.anchor.set(0.5, 0.5);
    this.back.scale.set(0.2, 0.2, 0.2);
    this.back.rotationQuaternion.setEulerAngles(0, 0, 0);
    this.back.position.set(0, 0, .001);
    this.addChild(this.back);
  }

  onEnterFrame() {
    this.timeElapsed += 0.01;
    // this.flippedness = Math.sin(this.timeElapsed) * 0.5 + 0.5;
    this.flippedness = this.timeElapsed % 2;
    this.rotationQuaternion.setEulerAngles(0, this.flippedness * 180, 0);

    // const showBack = this.flippedness < 0.5;
    // this.front.texture = showBack ? this.backTexture : this.frontTexture;
  }
}

export async function initializeAndStartDuel(app: Application) {
  for (const card of cards) {
    const vcard = new VCard(card);
    vcard.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
    app.stage.addChild(vcard);

    

    // const texture = Texture.from(card.t);
    // const sprite = new Sprite(texture);
    // sprite.x = Math.random() * app.screen.width;
    // sprite.y = Math.random() * app.screen.height;
    // app.stage.addChild(sprite);
  }
}
