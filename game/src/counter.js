class Counter {
    constructor() {
        this.v = 0;
        this.va = 0;
        this.multiplier = 1;

        setInterval(this.update.bind(this), 10);
    }

    evaluateItems() {
        this.va = 0;
        this.multiplier = 1;
        for (let i in ITEMS) {
            let it = ITEMS[i];
            if (it.multiplier != undefined)
                this.multiplier *= it.multiplier * it.lvl;
            else
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
        let val = v * this.multiplier;
        this.v += val;
        return val;
    }

    addOne() {
        this.v += this.multiplier;
        return this.multiplier;
    }
}