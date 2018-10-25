import React, { Component } from "react";
import { connect } from "react-redux";
// this is 'glue' between react and redux libraries needed to bind reducer and component

import { fetchFamilies } from "../actions/index";
// importing actual action creator
import { bindActionCreators } from "redux";
// this connects actions to reducers so action result can flow through reducers and affect state > view

class FamiliesList extends Component {

constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

    componentDidMount() {
      this.props.fetchFamilies();
      this.setState({isLoaded:true});
    }

  // renderList() {
  //   return this.props.books.map(item => {
  //     return (
  //       <li
  //         key={item.title}
  //         className="list-group-item"
  //         onClick={() => this.props.selectBook(item)}
  //       >
  //         {item.title}
  //       </li>
  //     );
  //   });
  // }

  // render() {
  //   return <ul className="list-group col-sm-6">{this.renderList()}</ul>;
  // }


  render() {
    if (this.state.isLoaded) {
      return <div>Families have loaded</div>
    } else {
      return <div>Family list coming</div>
    }
  }
}

function mapStateToProps(state) {
  // whatever object is returned from here, will be available as props inside BookList
  // this is needed to create state and goes with 'export default connect(mapStateToProps)(BookList)'
  return {
    families: state.families,
  };
}

export default connect(
  mapStateToProps, { fetchFamilies }
)(FamiliesList);
// 'export default connect(mapStateToProps)(BookList)' takes a function and a component and produces a container.
// container is a component that is aware of a state
// export makes new container where state.books is passed in as props for BookList, available to use in app
// if state changes, this container will instantly rerender with new list of books

// 'export default connect(mapStateToProps, mapDispatchToProps)(BookList)' enables action creator to flow through reducer
