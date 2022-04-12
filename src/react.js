// 完成简单的Virtual DOM
const componentStates = {};
let componentId = '';
let componentIdCounter = 1;
let stateCounter = 0;
function useState(initVal) {
    if (!componentStates[componentId]) {
        componentStates[componentId] = [];
    }
    const componentState = componentStates[componentId];
    if (componentState.length <= stateCounter) {
        componentState[stateCounter] = initVal;
    }
    const val = componentState[stateCounter];
    // 缓存stateCounter的高阶函数
    const setVal = ((c) => (val) => {
        componentState[c] = val;
        ReactDOM.refresh();
    })(stateCounter);
    stateCounter++;
    return [val, setVal];
}
const React = {
    createElement(type, props, ...children) {
        return { type, props, children };
    }
};
const generateDOM = (vElement) => {
    const { type, props, children } = vElement;
    let domElem = null;
    // 是组件
    if (typeof type === 'function') {
        componentId = 'Comp' + componentIdCounter;
        componentIdCounter++;
        stateCounter = 0;
        // 传入组件属性
        domElem = generateDOM(type(props));
    }
    // 是原生html标签
    else {
        domElem = document.createElement(type);
        if (props) {
            for (const p in props) {
                domElem[p.toLowerCase()] = props[p];
            }
        }
    }
    // 子节点
    if (children) {
        children.forEach((c) => {
            if (c) {
                if (typeof c !== 'object') {
                    domElem.appendChild(document.createTextNode(c));
                }
                else {
                    domElem.appendChild(generateDOM(c));
                }
            }
        });
    }
    return domElem;
};
const ReactDOM = {
    virtualDOM: {},
    rootElement: null,
    refresh() {
        componentIdCounter = 1;
        this.rootElement.innerHTML = '';
        this.rootElement.appendChild(generateDOM(this.virtualDOM));
    },
    render(elements, domElem) {
        this.virtualDOM = elements;
        this.rootElement = domElem;
        this.refresh();
    }
};
function Comp({ text }) {
    const [title, setTitle] = useState('点击标题');
    const [count, setCount] = useState(1);
    return (React.createElement("div", null,
        text,
        React.createElement("div", { onClick: () => {
                setTitle('标题改变');
            } }, title),
        React.createElement("button", { onClick: () => {
                setCount(count + 1);
            } },
            "\u70B9\u51FB\uFF1A",
            count)));
}
// 因为没有生成 Virtual DOM 所以第一个参数只能传入一个重新渲染的函数
ReactDOM.render(React.createElement("div", null,
    React.createElement("button", { onClick: () => {
            alert('点击事件');
        } }, "\u70B9\u51FB\u4E8B\u4EF6"),
    React.createElement(Comp, { text: "AAA1" }),
    React.createElement("br", null),
    React.createElement(Comp, { text: "BBB2" }),
    React.createElement("br", null),
    React.createElement(Comp, { text: "CCC3" }),
    React.createElement("br", null),
    React.createElement(Comp, { text: "DDD4" }),
    React.createElement("br", null)), document.body);
