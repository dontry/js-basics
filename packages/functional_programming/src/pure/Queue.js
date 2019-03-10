function Queue(elems) {
  console.log(elems);
  this._q = elems;
}

Queue.prototype = {
  enqueue(thing) {
    this._q.push(thing);
    return new Queue(this._q);
  }
};

const seed = [1, 2, 3];

const q1 = new Queue(seed);

q1;

const q2 = q1.enqueue(108);
q2;

seed.push(10);
q1;
q2;

function SaferQueue(elems) {
  this._q = [...elems];
}

SaferQueue.prototype = {
  enqueue(thing) {
    return new SaferQueue([...this._q, thing]);
  }
};

const seed2 = [1, 2, 3, 4];

const q3 = new SaferQueue(seed2);
q3;

const q4 = q3.enqueue(5);
q4;

seed.push(6);

q3;
q4;

module.exports = { Queue, SaferQueue };
