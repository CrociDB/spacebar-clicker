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
        document.setValue = this.setValue.bind(this);

        // Items
        this.items = [];
        this.item_container = gId("items");
        let item_template = gId("it");
        for (let i in ITEMS) {
            let it = ITEMS[i];
            let html = item_template.innerHTML
                .replace("%1", it.name)
                .replace("%2", it.description)
                .replace("%3", it.cost)
                .replace("%4", it.lvl);
            let e = document.createElement("li");
            e.classList.add("item");
            e.innerHTML = html;
            this.item_container.appendChild(e);
            it.dyn_element = e;
        }
        this.item_container.removeChild(item_template);
    }

    setValue(v) {
        this.counter.setValue(v);
        this.updateCounter();
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
