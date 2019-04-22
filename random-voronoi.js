class Map {
  constructor (length, height) {
    this.dimensions = [length, height];
    this.nodes = {};
    this.nodesHandler = false;
  }
  generateNodes (proportion) {
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
  }
  clearNodes () {
    this.nodes = {};
    this.nodesHandler = false;
  }
}
