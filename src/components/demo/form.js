// react 中的各表单控件
import React from "react";

class Form extends React.Component {
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
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div className="box">
                        <div>受控组件</div>
                        <div>
                            input:
                            <input type="text" name="iptValue" value={this.state.iptValue} onChange={this.handleChange} />
                        </div>
                        <div>
                            input指定value值(除undefined/null)会阻止用户更改输入：
                            <input value="1" onChange={this.handleChange} />
                        </div>
                        <div>
                            select:
                            <select name="selValue" value={this.state.selValue} onChange={this.handleChange}>
                                <option value="grapefruit">葡萄柚</option>
                                <option value="lime">酸橙</option>
                                <option value="coconut">椰子</option>
                                <option value="mango">芒果</option>
                            </select>
                        </div>
                        <div>
                            multiple-select:
                            <select name="mulSelValue" multiple={true} value={this.state.mulSelValue} onChange={this.handleChange}>
                                <option value="grapefruit">葡萄柚</option>
                                <option value="lime">酸橙</option>
                                <option value="coconut">椰子</option>
                                <option value="mango">芒果</option>
                            </select>
                        </div>

                        <div className="title">非受控组件：value 只读</div>

                        <div>
                            <input type="file" />
                        </div>
                        <div>
                            <input type="submit" value="提交" />
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default Form;