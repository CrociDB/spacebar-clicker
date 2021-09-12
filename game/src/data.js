let ITEMS = [
    {
        name: "Monkey Finger",
        description: "Monkey Finger that presses the key every 5 seconds",
        cost: 30,
        initial_value: .2,
        lvl: 0,
        cost_func: (x) => 1.1 * x,
        value_func: (x) => x,
    },
    {
        name: "Rusty Robot Finger",
        description: "These are much faster than a Monkey, trust me",
        cost: 120,
        initial_value: 3,
        lvl: 0,
        cost_func: (x) => 1.3 * x,
        value_func: (x) => 1.2 * x,
    },
    {
        name: "Robot Finger",
        description: "They're not rusty hehe",
        cost: 500,
        initial_value: 20,
        lvl: 0,
        cost_func: (x) => 1.4 * x,
        value_func: (x) => 1.2 * x,
    },
    {
        name: "Double Manual Hits",
        description: "Every hit now is worth double!",
        cost: 6000,
        multiplier: 2,
        lvl: 0,
        cost_func: (x) => 4.0 * x,
    },
    {
        name: "Rusty Machine",
        description: "It's fast, man!",
        cost: 10000,
        initial_value: 150,
        lvl: 0,
        cost_func: (x) => 1.5 * x,
        value_func: (x) => 1.2 * x,
    },
];

let total_item_value = (item) => {
    let c = 0;
    let v = item.initial_value;

    for (let i = 0; i < item.lvl; i++) {
        c += v;
        v = item.value_func(v);
    }

    return c;
}

let LEVELS = [
    {
        psvalue: 0,
        rain: 0,
    },
    {
        psvalue: 10,
        rain: 5,
    },
    {
        psvalue: 100,
        rain: 10,
    },
    {
        psvalue: 500,
        rain: 12,
    },
    {
        psvalue: 1000,
        rain: 15,
    },
    {
        psvalue: 5000,
        rain: 17,
    },
    {
        psvalue: 10000,
        rain: 18,
    },
    {
        psvalue: 50000,
        rain: 19,
    },
    {
        psvalue: 100000,
        rain: 20,
    },
];

const SOUNDS = {
    click: [
        jsfxr([0,0,0.07086974935991196,0.45065582613048494,0.12451125371771453,0.6610070860477287,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0.5]),
        jsfxr([0,0,0.07086974935991196,0.35,0.12451125371771453,0.7,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0.5]),
        jsfxr([0,0,0.1,0.35,0.12451125371771453,0.65,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0.5]),
    ],
    buy: [
        jsfxr([3,0,0.2914228463087029,0.39443991332966943,0.47848602130372286,0.08144714074126518,0,0.24222569085835757,0,0,0,-0.6369038513918057,0.7915717139323191,0,0,0,0,0,1,0,0,0,0,0.5]),
        jsfxr([3,0,0.2914228463087029,0.39443991332966943,0.55,0.15,0,0.24222569085835757,0,0,0,-0.6369038513918057,0.7915717139323191,0,0,0,0,0,1,0,0,0,0,0.5]),
        jsfxr([3,0,0.25,0.39443991332966943,0.45,0.25,0,0.24222569085835757,0,0,0,-0.6369038513918057,0.7915717139323191,0,0,0,0,0,1,0,0,0,0,0.5]),
    ],
};
