import React from "react";

class DemoSon extends React.Component {
    constructor(props) {
        console.log('子1-constructor')
        super(props);
        console.log(props.name);
        this.state = {
            hua: '❀',
            xin: '❤'
        };
    }

    static getDerivedStateFromProps() {
        console.log('子2-static getDerivedStateFromProps');
        return true;
    }

    render() {
        console.log('子3-render')
        return (
            <div>子组件{this.state.hua}</div>
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
        return {hasError: true};
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

export default DemoSon;
