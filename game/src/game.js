class Game {
    constructor() {
        
    }

    init() {
        // Counter
        this.cc = gId("counter");
        this.cs = gId("per_second");
        this.counter = new Counter();

        // Key button
        this.sb = gId("sb");
        this.sb.addEventListener("mousedown", this.click.bind(this));
        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));
        document.setValue = this.setValue.bind(this);

        // Particles
        this.click_particle = new ParticleSystem(1.0, (p) => { 
            p.y = lerp(p.y, p.iy - 110, 0.05); 
            p.x = p.ix + Math.sin((p.ix * 5 + p.normalized_time) * 10) * 10;
            p.alpha = p.normalized_time;
        });
        
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
            e.addEventListener("click", this.buy.bind(this, it));
        }
        this.item_container.removeChild(item_template);
        this.adjustSize();
        window.addEventListener("resize", this.adjustSize.bind(this));
        
        this.update();

        setInterval(this.update.bind(this), 100);
    }

    adjustSize() {
        this.item_container.style['height'] = (window.innerHeight - gId("header").offsetHeight) + "px";
    }

    update() {
        this.updateCounter();
        this.updateItems();
    }
    
    updateItems() {
        for (let i in ITEMS) {
            let it = ITEMS[i];

            it.dyn_element.classList.remove("item_buyable");
            it.dyn_element.getElementsByClassName("icost")[0].innerHTML = nfmt(it.cost);
            it.dyn_element.getElementsByClassName("ilvl")[0].innerHTML = '<span class="_ilvl">x</span>' + it.lvl;

            if (it.cost <= this.counter.v) {
                it.dyn_element.classList.add("item_buyable");
            }
        }
    }
    
    updateCounter() {
        this.cc.innerHTML = nfmt(this.counter.v);
        this.cs.innerHTML = "per second: " + nfmt1(this.counter.va);
    }

    buy(it) {
        if (this.counter.v < it.cost) return;

        this.counter.spend(Math.floor(it.cost));
        it.lvl++;
        it.cost = it.cost_func(it.cost);
        
        if (it.initial_value != undefined)
            it.value = it.value == undefined ? it.value_func(it.initial_value) : it.value_func(it.value);

        this.counter.evaluateItems();

        this.update();
        this.shake();
    }
    
    setValue(v) {
        this.counter.setValue(v);
        this.update();
    }

    click(e) {
        let val = this.counter.addOne();
        this.updateCounter();

        if (e == undefined) {
            let b = this.sb.getBoundingClientRect(); 
            let r = Math.random() * 50 - 25;
            this.addPointParticle(b.right - (b.width / 2) + r, b.top, val);
        } else {
            this.addPointParticle(e.clientX, e.clientY, val);
        }
    }
    
    keydown(e) {
        if (e.code == "Space" && this.canclick) {
            this.click();
            sb.classList.add("sb_active");
            this.canclick = false;
        }
    }
     
    keyup(e) {
        if (e.code == "Space") {
            this.sb.classList.remove("sb_active");
            this.canclick = true;
        }
    }
    
    // Particles
    addPointParticle(x, y, val) {
        let element = document.createElement('div');
        element.textContent = "+" + val;
        element.classList.add("particle");45
        element.classList.add("score");
        let xr = (Math.random() * 30) - 30;
        let yr = (Math.random() * 30) - 20;
        this.click_particle.pushParticle(element, { x: x + xr, y: y + yr });
        document.body.insertBefore(element, document.body.firstChild);
    }

    // Effects
    shake(val = 20, el = undefined) {
        if (el == undefined) el = gId("game");
        co(function*() {
            for (let i = 0; i < val; i++) {
                let x = (Math.random() * 30) - 15;
                let y = (Math.random() * 30) - 15;
                let z = (Math.random() * 6) - 3;
                el.style['transform'] = "translateX(" + x + "px) translateY(" + y + "px) rotateZ(" + z + "deg)";
                yield .01;
            }
            el.style['transform'] = "translateX(0px) translateY(0px) rotateZ(0deg)";
        });
    }
}
