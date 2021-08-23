class Counter {
    constructor() {
        this.v = 0;
    }

    setValue(v) {
        this.v = v;
    }

    add(v) {
        this.v += v;
    }

    addOne() {
        this.v += 1;
    }

    value() {
        return this.v;
    }
}