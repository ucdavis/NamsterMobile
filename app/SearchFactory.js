'use strict';

var React = require('react-native');

var SearchUrl = '';

// named
var SearchFactory = {
  fetchQueryData: function(q, onComplete){
    fetch(SearchUrl + '?q=' + q)
      .then((response) => response.json())
      .then((responseData) => {
        onComplete(responseData);
      })
      .done();
  },
  fetchFilteredData: function(filter, onComplete){
    fetch(SearchUrl + '?size=20', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.generateFilter(filter))
    })
    .then((response) => response.json())
    .then((responseData) => {
      onComplete(responseData);
    })
    .done();
  },
  generateFilter: function(filter){
    var mustClause = [];
    if (filter.room){
      mustClause.push({
        "term": {
          "exactRoom": filter.room
        }
      });
    }
    if (filter.building){
      mustClause.push({
        "term": {
          "exactBuilding": filter.building
        }
      });
    }
    if (filter.department){
      mustClause.push({
        "term": {
          "exactDepartment": filter.department
        }
      });
    }

    return {
      "filter": {
        "bool": {
          "must": [
            mustClause
          ]
        }
      }
    };
  },
}

module.exports = SearchFactory;
