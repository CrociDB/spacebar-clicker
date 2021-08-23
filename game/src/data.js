let ITEMS = [
    {
        name: "Monkey Finger",
        description: "Monkey Finger that presses the key every 5 seconds",
        cost: 50,
        initial_value: .2,
        lvl: 0,
        cost_func: (x) => 1.2 * x,
        value_func: (x) => 1.1 * x,
    },
    {
        name: "Rusty Robot Finger",
        description: "These are much faster than a Monkey, trust me",
        cost: 1000,
        initial_value: 5,
        lvl: 0,
        cost_func: (x) => 1.2 * x,
        value_func: (x) => 1.1 * x,
    },
    {
        name: "Robot Finger",
        description: "They're not rusty hehe",
        cost: 10000,
        initial_value: 100,
        lvl: 0,
        cost_func: (x) => 1.2 * x,
        value_func: (x) => 1.1 * x,
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
