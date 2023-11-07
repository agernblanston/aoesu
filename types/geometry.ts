

export type Coord = [number, number];
export interface Rect {
  lo: Coord;
  hi: Coord;
}

export interface Loop {
    coords: Coord[];
}
export interface Polygon {
    loops: Loop[];
}