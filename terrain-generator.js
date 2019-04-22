class Map {
  constructor (length, height) {
    this.dimensions = [length, height];
    this.nodes = {};
    this.nodesHandler = false;
  }
  generateNodes (proportion) {
    if (!proportion) proportion = 100;
    if (!this.nodesHandler) {
      const nodes = this.nodes;
      const quantity = this.dimensions.reduce((k, i) => k * i) / proportion;
      for (let i = 0; i < quantity; i++) {
        nodes[i] = {
          x: Math.random() * this.dimensions[0],
          y: Math.random() * this.dimensions[1]
        };
      }
      this.nodesHandler = true;
    }
    return this;
  }
  clearNodes () {
    this.nodes = {};
    this.nodesHandler = false;
    return this;
  }
  deleteNearNodes (radius) {
    const _nodes = this.nodes;
    for (const node in _nodes) {
      const region = _nodes[node];
      const keys = Object.keys(_nodes);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== node) {
          const point = _nodes[keys[i]];
          const inside = Geometry.circleBounds({x: point.x, y: point.y}, region, radius);
          if (inside) {
            delete _nodes[i];
            continue;
          }
        } else continue;
      } 
    }
    const refactorKeys = Object.keys(_nodes);
    let counter = 0;
    for (let i = 0; i < refactorKeys; i++) {
      if (refactorKeys[i] !== counter) {
        _nodes[counter] = _nodes[refactorKeys[i]];
        delete _nodes[refactorKeys[i]];
        counter++;
        continue;
      } else continue;
    }
  }
}

class Vector {
  static intersect (A, B, C, D) {
    const P = this.subtract(C, D);
    const r = this.subtract(B, A);
    const s = this.subtract(D, C);
    
    const vPxr = this.vectorProduct(P, r);
    const vPxs = this.vectorProduct(P, s);
    const vrxs = this.vectorProduct(r, s);
    
    if (!vPxr) return ((C.x - A.x < 0) != (C.x - B.x < 0)) || ((C.y - A.y < 0) != (C.y - B.y < 0));
 
    if (!vrxs) return false;
 
    const rxsr = 1 / vrxs;
    const t = vPxs * rxsr;
    const u = vPxr * rxsr;
 
    return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
  }
  static vectorProduct (vectorOne, vectorTwo) {
    return vectorOne.x * vectorTwo.y - vectorOne.y * vectorTwo.x;
  }
  static subtract (pointOne, pointTwo) {
    return {
      x: pointOne.x - pointTwo.x,
      y: pointOne.y - pointTwo.y
    }
  }
  static equality (pointOne, pointTwo) {
    return ((pointOne.x === pointTwo.x) && (pointOne.y === pointTwo.y));
  }
}

class Geometry {
  static circleBounds (point, origin, radius) {
    return ((point.x - origin.x)**2 + (point.y - origin.y)**2 <= radius**2);
  }
}
		
