// 渲染Component组件

let componentId = '';
let componentIdCounter = 1;

const React = {
  createElement(type, props, ...children) {
    let domElem = null;
    // 是组件
    if (typeof type === 'function') {
      componentId = 'Comp' + componentIdCounter;
      componentIdCounter++;
      // 传入组件属性
      domElem = type(props);
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
          } else {
            domElem.appendChild(c);
          }
        }
      });
    }
    return domElem;
  }
};

const ReactDOM = {
  refresh() {},
  render(renderFunc: any, domElem: HTMLElement) {
    this.refresh = () => {
      componentIdCounter = 1;
      domElem.innerHTML = '';
      domElem.appendChild(renderFunc());
    };
    this.refresh();
  }
};

function Comp({ text }: { text: string }) {
  return <div>{text}</div>;
}

ReactDOM.render(
  () => (
    <div>
      <button
        onClick={() => {
          alert('点击事件');
        }}
      >
        点击事件
      </button>
      <Comp text="AAA1" />
      <br />
      <Comp text="BBB2" />
      <br />
      <Comp text="CCC3" />
      <br />
      <Comp text="DDD4" />
      <br />
    </div>
  ),
  document.body
);
