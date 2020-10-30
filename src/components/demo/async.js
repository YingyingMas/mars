import store from "../../store";
import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectSubreddit, fetchPosts } from "../../actions/index";

class Async extends React.Component {
  render () {
    const { data, search } = this.props
    return (
      <div className="num-add">
        <div>点击下面调取接口</div>
        <div onClick={search}></div>
        <div>{data}</div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({
    search: () => {
      dispatch(selectSubreddit('reactjs'))
      dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))
    }
  }, dispatch)
});

const AsyncCom = connect(
  mapStateToProps,
  mapDispatchToProps
)(Async);

export default AsyncCom;
