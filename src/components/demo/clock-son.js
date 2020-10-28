import React from "react";


class ClockSon extends React.Component {
    constructor(props) {
        console.log('子1-constructor')
        super(props);
        console.log(props.name);
        this.state = {
            hua: '❀',
            xin: '❤',
            showXin: true,
            ifReader: true
        };
    }

    static getDerivedStateFromProps() {
        console.log('子2-static getDerivedStateFromProps');
        return true;
    }

    render() {
        console.log('子3-render')
        //隐藏组件 render null ，但不会影响组件的生命周期
        if (!this.state.ifReader) {
            return null;
        }

        let nums = [1, 2, 3, 4, 5];
        var items = nums.map((i) => {
            return <div key={i}>元素集合{this.state.hua}{i}</div>//遍历中key的重要性
        });

        return (
            <div className="demo-son">
                <div className="title">子组件</div>
                <div className="box">{items}</div>
                <div className="box" >
                    {this.state.showXin && <div>条件渲染1{this.state.xin}</div>}
                    {this.state.showXin ? <div>条件渲染2{this.state.xin}</div> : <div>2</div>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.change()
        }, 5000);
        console.log('子4-componentDidMount');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('子componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('子componentWillUnmount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('子shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate() {
        console.log('子getSnapshotBeforeUpdate');
        return null;
    }

    static getDerivedStateFromError(error) {
        console.log('子static getDerivedStateFromError');
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log('子componentDidCatch');
    }

    change() {
        this.setState({
            hua: '❀❀'
        })
    }
}

export default ClockSon;
