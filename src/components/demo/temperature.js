import React from "react";


function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      <div className="SplitPane-c">
        {props.children}
      </div>
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}


class TemperatureInput extends React.Component {
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div className="tem-box">
        <FancyBorder color="blue" left={<span>props.left</span>} right={<span>props.right</span>} >
          <legend>props.children温度{scale}:</legend>
        </FancyBorder>
        <input value={temperature} onChange={this.handleChange} />
      </div>
    );
  }
}

export default TemperatureInput;


/**
 *
 *
  redux 使用场景：
    1.用户的使用方式复杂
    2.不同身份的用户有不同的使用方式（比如普通用户和管理员）
    3.多个用户之间可以协作
    4.与服务器大量交互，或者使用了WebSocket
    5.View要从多个来源获取数据
    6.某个组件的状态，需要共享
    7.某个状态需要在任何地方都可以拿到
    8.一个组件需要改变全局状态
    9.一个组件需要改变另一个组件的状态

  设计思想：
    1.Web 应用是一个状态机，视图与状态是一一对应的。
    2.所有的状态，保存在一个对象里面。
    
 *
 */