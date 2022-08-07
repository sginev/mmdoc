import { DisplayObject } from "@pixi/display";

export function assignOnEnterFrameFunction<T extends DisplayObject>(target: T, onEnterFrame: (this: T) => void) {
  return Object.assign(target, { onEnterFrame });
}

type ObjectWithOnEnterFrameAndChildren = any;

export function callOnEnterFrameRecursively(target: Partial<ObjectWithOnEnterFrameAndChildren>) {
  if (target.onEnterFrame) {
    target.onEnterFrame.call(target);
  }
  if (target.children) {
    for (const child of target.children) {
      callOnEnterFrameRecursively(child);
    }
  }
}
