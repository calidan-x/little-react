// 所有Component的States
var componentStates = {};
var componentId = '';
var componentIdCounter = 1;
var stateCounter = 0;
function useState(initVal) {
    if (!componentStates[componentId]) {
        componentStates[componentId] = [];
    }
    var componentState = componentStates[componentId];
    if (componentState.length <= stateCounter) {
        componentState[stateCounter] = initVal;
    }
    var val = componentState[stateCounter];
    // 缓存stateCounter的高阶函数
    var setVal = (function (c) { return function (val) {
        componentState[c] = val;
        ReactDOM.refresh();
    }; })(stateCounter);
    stateCounter++;
    return [val, setVal];
}
var React = {
    createElement: function (type, props) {
        var children = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            children[_i - 2] = arguments[_i];
        }
        var domElem = null;
        // 是组件
        if (typeof type === 'function') {
            componentId = 'Comp' + componentIdCounter;
            componentIdCounter++;
            stateCounter = 0;
            // 传入组件属性
            domElem = type(props);
        }
        // 是原生html标签
        else {
            domElem = document.createElement(type);
            if (props) {
                domElem.onclick = function () { return alert(123); };
                for (var p in props) {
                    domElem[p.toLowerCase()] = props[p];
                }
            }
        }
        // 子节点
        if (children) {
            children.forEach(function (c) {
                if (c) {
                    if (typeof c !== 'object') {
                        domElem.appendChild(document.createTextNode(c));
                    }
                    else {
                        domElem.appendChild(c);
                    }
                }
            });
        }
        return domElem;
    }
};
var ReactDOM = {
    refresh: function () { },
    render: function (renderFunc, domElem) {
        this.refresh = function () {
            componentIdCounter = 1;
            domElem.innerHTML = '';
            domElem.appendChild(renderFunc());
        };
        this.refresh();
    }
};
function Comp(_a) {
    var t = _a.t;
    var _b = useState('点击标题'), title = _b[0], setTitle = _b[1];
    var _c = useState(1), count = _c[0], setCount = _c[1];
    return (React.createElement("div", null,
        t,
        React.createElement("div", { onClick: function () {
                setTitle('标题改变');
            } }, title),
        React.createElement("button", { onClick: function () {
                setCount(count + 1);
            } },
            "\u70B9\u51FB\uFF1A",
            count)));
}
// 因为没有生成 Virtual DOM 所以第一个参数只能传入一个重新渲染的函数
ReactDOM.render(function () { return (React.createElement("div", null,
    React.createElement(Comp, { t: "AAA1" }),
    React.createElement("br", null),
    React.createElement(Comp, { t: "BBB2" }),
    React.createElement("br", null),
    React.createElement(Comp, { t: "CCC3" }),
    React.createElement("br", null),
    React.createElement(Comp, { t: "DDD4" }),
    React.createElement("br", null),
    JSON.stringify(componentStates))); }, document.body);
