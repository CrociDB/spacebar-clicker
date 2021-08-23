class Counter {
    constructor() {
        this.v = 0;
        this.va = 0;

        setInterval(this.update.bind(this), 10);
    }

    evaluateItems() {
        this.va = 0;
        for (let i in ITEMS) {
            let it = ITEMS[i];
            this.va += total_item_value(it);
        }
    }

    update() {
        this.v += this.va / 100; // divides by 100 because values are per seconds it runs every 0.01 seconds.
    }

    setValue(v) {
        this.v = v;
    }

    spend(v) {
        this.v -= v;
    }

    add(v) {
        this.v += v;
    }

    addOne() {
        this.v += 1;
    }
}