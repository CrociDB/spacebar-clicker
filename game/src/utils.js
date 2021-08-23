// DOM utils
const gId = t => document.getElementById(t);
const qSel = t => document.querySelector(t);
const qSelA = t => document.querySelectorAll(t);
const cEl = s => {
    let template = document.createElement("template");
    template.innerHTML = s;
    return template.content.firstChild;
};

// Text utils
const repltxt = (t, vs) => {
    vs.forEach((e, i) => t = t.replace("%" + (i+1), e));
    return t;
};

// Number utils
const fmt = (value, f) => { return (f + value).slice(-f.length); };
const clamp = (val, min, max) => { return Math.min(Math.max(val, min), max); };
const nfmt = (v) => Math.floor(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const nfmt1 = (v) => v.toFixed(1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Randoms
const randnum = (v = 1) => Math.random() * v;
const randint = (v) => Math.round(randnum(v));
const randsig = () => randint(10) % 2 == 0 ? 1 : -1;
const randweight = (c, p) => {
    let sum = c.map(p).reduce((l, r) => l + r);
    let rand = randint(sum);   
    return c.filter(e => {
        rand = rand - p(e);
        return rand <= 0;
    })[0];
};
const randweightsqrd = (c, p) => randweight(c, v => p(v) * p(v));

// Coroutine
const co = (f) => {
    let g = f();

    const next = () => {
        let result = g.next();
        if (!result.done) {
            setTimeout(next, result.value * 1000);
        }
    };

    next();
};

// Audio stuff
const audio_player = [new Audio(), new Audio()];
let audio_index = 0;
let AUDIO = true;
const playaudio = (a) => {
    if (AUDIO) {
        audio_index = (audio_index + 1) % audio_player.length;

        audio_player[audio_index].pause();
        audio_player[audio_index].src = a;
        audio_player[audio_index].play();
    }
};

// Fade
const fadeIn  = () => {
    gId("fadeDiv").classList.add("fadehid");
    playaudio(SOUNDS.fade_in);
};

const fadeOut = () => {
    gId("fadeDiv").classList.remove("fadehid");
    playaudio(SOUNDS.fade_out);
};