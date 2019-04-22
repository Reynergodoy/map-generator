class Map {
  constructor (length, height) {
    this.dimensions = [length, height];
    this.nodes = {};
  }
  generateNodes () {
    const nodes = this.nodes;
    const quantity = this.dimensions.reduce((k, i) => k * i) / 2;
    for (let i = 0; i < quantity; i++) {
      nodes[i] = {
        x: Math.random() * this.dimensions[0],
        y: Math.random() * this.dimensions[1]
      };
    }
  }
}
