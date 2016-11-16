class Animal {
  constructor (public name: string) {}
  move (meters: number) {
    alert(`${this.name} moved ${meters}m.`);
  }
}

class Snake extends Animal {
  constructor (name: string) { super(name); }
  move () {
    alert('Slitering...');
    super.move(5);
  }
}

class Horse extends Animal {
  constructor (name: string) { super(name); }
  move () {
    alert('Galloping...');
    super.move(45);
  }
}

let same = new Snake('Sammy the Python');
let tom: Animal = new Horse('Tommy the Palomino');

same.move();
tom.move(34);
