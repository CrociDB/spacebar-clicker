class Game {
    constructor() {
        
    }

    init() {
        // Counter
        this.cc = gId("counter");
        this.counter = new Counter();

        // Key button
        this.sb = gId("sb");
        this.sb.addEventListener("click", this.click.bind(this));
        document.addEventListener("keydown", this.keydown.bind(this));
    }

    click() {
        this.counter.addOne();
        this.updateCounter();
    }

    keydown(e) {
        if (e.code == "Space") this.click();
    }

    updateCounter() {
        this.cc.innerHTML = this.counter.value();
    }
}
