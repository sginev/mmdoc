import { Application, Sprite, Texture } from 'pixi.js';
import { Container3D, Mesh3D, Sprite3D, SpriteBillboardType } from 'pixi3d';
import { globalTime } from '../utils/global-time';
import { VCard } from './VCard';

export class VSpot extends Container3D {
  public readonly sprite: Sprite3D;

  cards: VCard[] = [];

  constructor(x: number, y: number) {
    super();
    
    const texture = Texture.from(`https://public.cx/mock/cards/bg-0.png`);
    this.sprite = new Sprite3D(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.3);
    this.sprite.rotationQuaternion.setEulerAngles(0, 0, 90);
    this.addChild(this.sprite);

    this.position.set(x, y, 0);
  }

  onEnterFrame() {
    this.alpha = 0.5 + 0.5 * Math.abs(Math.sin(globalTime.totalSeconds));
  }

  addCard(vcard: VCard) {
    if (vcard.spot) {
      vcard.spot.removeCard(vcard);
    }

    this.cards.push(vcard);
    vcard.spot = this;

    this.arrangeCards?.();
  }

  removeCard(vcard: VCard) {
    const index = this.cards.indexOf(vcard);
    if (index >= 0) {
      this.cards.splice(index, 1);
    }
    
    if (vcard.spot === this) {
      vcard.spot = null;
    }

    this.arrangeCards?.();
  }

  arrangeCards?: () => void;
}

export module VSpot {
  export function arrangeCards_Pile(this: VSpot) {
    const { cards } = this;
    const count = cards.length;
    for (let i = 0; i < count; i++) {
      const card = cards[i];
      card.position.set(this.x, this.y, 0.02 * i);
      card.rotationQuaternion.copyFrom(this.rotationQuaternion);
    }
  }
}
