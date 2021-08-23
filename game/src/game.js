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
        
        this.updateItems();
    }
    
    updateItems() {
        for (let i in ITEMS) {
            let it = ITEMS[i];

            it.dyn_element.classList.remove("item_buyable");

            // stupid workaround to remove all event listeners
            let swap = it.dyn_element;
            it.dyn_element = it.dyn_element.cloneNode(true);
            swap.replaceWith(it.dyn_element);

            it.dyn_element.getElementsByClassName("icost")[0].innerHTML = nfmt(it.cost);
            it.dyn_element.getElementsByClassName("ilvl")[0].innerHTML = it.lvl;

            if (it.cost <= this.counter.value()) {
                it.dyn_element.classList.add("item_buyable");
                it.dyn_element.addEventListener("click", this.buy.bind(this, it));
            }
        }
    }

    buy(it) {
        if (this.counter.value() < it.cost) return;

        this.counter.spend(Math.floor(it.cost));
        it.lvl++;
        it.cost = it.cost_func(it.cost);
        it.value = it.value_func(it.value);

        this.updateCounter();
        this.updateItems();
    }

    setValue(v) {
        this.counter.setValue(v);
        this.updateCounter();
        this.updateItems();
    }

    click() {
        this.counter.addOne();
        this.updateCounter();
    }

    keydown(e) {
        if (e.code == "Space") this.click();
    }

    updateCounter() {
        this.cc.innerHTML = this.counter.fvalue();
    }
}
