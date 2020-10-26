import React from "react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iptValue: '默认值',
            selValue: 'grapefruit',
            mulSelValue: ['grapefruit', 'lime']
        };
    }

    iptChange = (event) => {
        this.setState({ iptValue: event.target.value });
    }

    selChange = (event) => {
        this.setState({ selValue: event.target.value });
    }

    mulSelChange = (event) => {
        this.setState({ mulSelValue: event.target.value });
    }

    // iptChange/selChange/mulSelChange合一
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        console.log('ipt的值: ' + this.state.iptValue);
        console.log('sel的值: ' + this.state.selValue);
        console.log('mulSel的值: ' + this.state.mulSelValue);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>受控组件</div>
                <div className="box">
                    input:
                    <input type="text" name="iptValue" value={this.state.iptValue} onChange={this.handleChange} />
                </div>
                <div className="box">
                    input指定value值(除undefined/null)会阻止用户更改输入：
                    <input value="1"/>
                </div>
                <div className="box">
                    select:
                    <select name="selValue" value={this.state.selValue} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </div>
                <div className="box">
                    multiple-select:
                    <select name="mulSelValue" multiple={true} value={this.state.mulSelValue} onChange={this.handleChange}>
                        <option value="grapefruit">葡萄柚</option>
                        <option value="lime">酸橙</option>
                        <option value="coconut">椰子</option>
                        <option value="mango">芒果</option>
                    </select>
                </div>

                <div className="title">非受控组件：value 只读</div>

                <div className="box">
                    <input type="file" />
                </div>
                <div className="box">
                    <input type="submit" value="提交" />
                </div>
                
            </form>
        );
    }
}

class DemoSon extends React.Component {
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
                <NameForm></NameForm>
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

export default DemoSon;
