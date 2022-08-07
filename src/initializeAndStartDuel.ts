import { Application, Sprite, Texture } from 'pixi.js';
import { Container3D, Mesh3D, Sprite3D, SpriteBillboardType } from 'pixi3d';
import { VCard } from './game-client/VCard';
import { VSpot } from './game-client/VSpot';

const cardsProps = [
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
];

const spotsProps = {
  a1: { x: -1.5, y: -1 },
  a2: { x: -0.5, y: -1 },
  a3: { x: 0.5, y: -1 },
  a4: { x: 1.5, y: -1 },
  b1: { x: -1.5, y: -2 },
  b2: { x: -0.5, y: -2 },
  b3: { x: 0.5, y: -2 },
  b4: { x: 1.5, y: -2 },
  deck: { x: -3, y: -1.5 },
};

const MUL_X = 1;
const MUL_Y = 1.5;

export async function initializeAndStartDuel(app: Application) {
  const spots: Record<keyof typeof spotsProps, VSpot> = {} as any;

  const propsEntries = Object.entries(spotsProps) as [
    keyof typeof spotsProps,
    typeof spotsProps[keyof typeof spotsProps]
  ][];
  for (const [spotKey, spotProps] of propsEntries) {
    const spot = new VSpot(spotProps.x * MUL_X, spotProps.y * MUL_Y);
    app.stage.addChild(spot);

    spot.arrangeCards = VSpot.arrangeCards_Pile;

    spots[spotKey] = spot;
  }

  const cards: VCard[] = [];

  for (const card of cardsProps) {
    const vcard = new VCard(card);
    vcard.position.set(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
    app.stage.addChild(vcard);

    cards.push(vcard);

    spots.deck.addCard(vcard);
  }

  setInterval(() => {
    //// Get random card 
    const card = cards[Math.floor(Math.random() * cards.length)];
    //// Get random spot
    const sportsArray = [...Object.values(spots)];
    const spot = sportsArray[Math.floor(Math.random() * sportsArray.length)];

    spot.addCard(card);
  }, 25)
}
