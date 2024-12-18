export class Deque {
  constructor() {
    this.items = [];
    this.head = 0; // 첫 번째 유효 요소의 인덱스
    this.tail = 0; // 마지막 유효 요소의 다음 인덱스
  }

  enqueue(value) {
    this.items[this.tail] = value; // tail 위치에 삽입
    this.tail++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const value = this.items[this.head];
    this.head++;
    if (this.head > 100 && this.head * 2 > this.tail) {
      this.items = this.items.slice(this.head, this.tail);
      this.tail -= this.head;
      this.head = 0;
    }
    return value;
  }

  peek() {
    return this.isEmpty() ? null : this.items[this.head];
  }

  showcase(i) {
    return this.items.slice(this.head, Math.min(this.head + i, this.tail)); 
  }

  length() {
    return this.tail - this.head;
  }

  isEmpty() {
    return this.head === this.tail;
  }
}
