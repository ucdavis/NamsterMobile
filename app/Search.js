'use strict';

var React = require('react-native');

var NamDetail = require('./NamDetail');
var NamList = require('./NamList');

var {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  ScrollView,
  NavigatorIOS,
  View,
} = React;

var SearchUrl = '';

var Search = React.createClass({
  getInitialState: function() {
    return {
      query: '',
      nams: [],
      loading: false,
      searched: false
    };
  },
  onSearch: function(){
    this.fetchData();
  },
  onSelected: function(nam){
    this.props.navigator.push({
        title: "Nam Detail",
        component: NamDetail,
        passProps: {nam: nam, onFilterSelected: this.onFilterSelected},
    });
  },
  onFilterSelected: function(filter){
    fetch(SearchUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.generateFilter(filter))
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.props.navigator.push({
          title: "Filter List",
          component: NamList,
          passProps: {nams: responseData.hits.hits, searched: true, onSelected: this.onSelected},
      });
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
  fetchData: function() {
    this.setState({nams: [], loading: true});
    fetch(SearchUrl + '?q=' + this.state.query)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          nams: responseData.hits.hits,
          loading: false,
          searched: true
        });
      })
      .done();
  },
  renderLoading: function(){
    return (
      <View style={styles.centeredContainer}>
      <Text>Loading... </Text>
      </View>
    );
  },
  renderNamList: function(){
    return (
      <NamList nams={this.state.nams} searched={this.state.searched} onSelected={this.onSelected} />
    );
  },
  render: function(){
    var namList = !this.state.loading ? this.renderNamList() : this.renderLoading();

    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 40, margin: 20, padding: 2, borderColor: 'gray', borderWidth: 1}}
        autoCorrect={false}
        autoFocus={true}
        clearButtonMode={'always'}
        onChangeText={(query) => this.setState({query})}
        value={this.state.query}
        onSubmitEditing={this.onSearch}
        returnKeyType={'search'}
        placeholder={'Search for NAMs'}
      />
      {namList}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
  container: {
    marginTop: 65,
    backgroundColor: '#F5FCFF'
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Search;
