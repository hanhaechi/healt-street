import React, { Fragment, Component } from "react";
import $ from "jquery";

export default class FamiliesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      families: []
    };
  }

  sortList(list) {
    return list.sort((a, b) => {
      this.sortAbsentHelper(a, "sortOrder");
      this.sortAbsentHelper(b, "sortOrder");
      return a.sortOrder - b.sortOrder;
    });
  }

  sortAbsentHelper(item, key) {
    return !item[key] ? (item[key] = 999) : item[key];
  }

  revealDetails(id) {
    if ($("aside[class='show']")[0]) {
      $("aside[class='show']")[0].parentElement.childNodes.item(0).className =
        "list-group-item list-group-item-action";
      $("aside[class='show']")
        .removeClass("show")
        .addClass("hidden");
    }
    $(`aside[id='${id}']`)[0].parentElement.childNodes.item(0).className =
      "list-group-item list-group-item-action selected";
    $(`aside[id='${id}']`)
      .removeClass("hidden")
      .addClass("show");
  }

  componentDidMount() {
    fetch(
      "https://app2.health-street.net/api/v1/services/query/family?key=MjIxNzI4RjQtM0RFRi00RjAzLUFGNzYtNEQ5NTRFNTJGMEY2&phylum=2"
    )
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            families: this.sortList(result)
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, families } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Fragment>
          <h4>Select a test to see details</h4>
          <div className="d-flex-inline p-2 bd-highlight">
            <div className="list-group">
              {families.map(family => (
                <div key={family.id} family={family}>
                  <a
                    key={family.id}
                    className="list-group-item list-group-item-action"
                    onClick={event => this.revealDetails(family.id)}
                  >
                    {family.name}
                  </a>
                  <aside id={family.id} className="hidden" family={family}>
                    {family.services.map(service => (
                      <div key={service.id}>
                        <h5>{service.serviceName}</h5>
                        <p>Fee: {service.fee} USD</p>
                        <p>Total reviews: {service.totalReviews}</p>
                      </div>
                    ))}
                  </aside>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      );
    }
  }
}
