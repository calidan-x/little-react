// 渲染HTML原生标签

const React = {
  createElement(type, props, ...children) {
    let domElem = document.createElement(type);
    if (props) {
      for (const p in props) {
        domElem[p.toLowerCase()] = props[p];
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
      domElem.innerHTML = '';
      domElem.appendChild(renderFunc());
    };
    this.refresh();
  }
};

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
    </div>
  ),
  document.body
);
