declare module "spectral.js" {
  export class Color {
    constructor(input: string | number[]);
    tintingStrength: number;
    toString(): string;
  }

  export function mix(...colorsWithFactors: [Color, number][]): Color;
  export function palette(color1: Color, color2: Color, size: number): Color[];
  export function gradient(
    t: number,
    ...colorsWithStops: [Color, number][]
  ): Color;
}
