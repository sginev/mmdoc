import { Application, Sprite, Texture } from 'pixi.js';
import { Container3D, Mesh3D, Sprite3D, SpriteBillboardType } from 'pixi3d';
import { globalTime } from '../utils/global-time';
import { VSpot } from './VSpot';

interface ICardData {
  t: string;
}

const back_t = `https://public.cx/mmdoc/back/back.webp`;

export class VCard extends Container3D {
  flippedness = 0;

  public readonly frontTexture: Texture;
  public readonly backTexture: Texture;
  public readonly front: Sprite3D;
  public readonly back: Sprite3D;

  spot: VSpot | null = null;

  constructor(public readonly data: ICardData) {
    super();

    this.frontTexture = Texture.from(data.t);
    this.backTexture = Texture.from(back_t);

    this.front = new Sprite3D(this.frontTexture);
    this.front.anchor.set(0.5, 0.5);
    this.front.scale.set(0.2, 0.2, 0.2);
    this.front.rotationQuaternion.setEulerAngles(0, 0, 0);
    this.front.position.set(0, 0, -0.001);
    this.addChild(this.front);

    this.back = new Sprite3D(this.backTexture);
    this.back.anchor.set(0.5, 0.5);
    this.back.scale.set(0.2, 0.2, 0.2);
    this.back.rotationQuaternion.setEulerAngles(0, 0, 0);
    this.back.position.set(0, 0, 0.001);
    this.addChild(this.back);
  }

  onEnterFrame() {
    this.flippedness = globalTime.totalSeconds % 2;
    // this.rotationQuaternion.setEulerAngles(0, this.flippedness * 180, 0);

    // const showBack = this.flippedness < 0.5;
    // this.front.texture = showBack ? this.backTexture : this.frontTexture;
  }
}
