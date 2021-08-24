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
