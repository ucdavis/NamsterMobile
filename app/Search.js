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

var SearchUrl = 'https://caesdev:3tKCPScPQPW3J4pX@aws-us-east-1-portal9.dblayer.com:10241/datanams/_search';

var Search = React.createClass({
  getInitialState: function() {
    return {
      query: '',
      nams: [],
      loading: false
    };
  },
  onSearch: function(){
    this.fetchData();
  },
  onSelected: function(nam){
    this.props.navigator.push({
        title: "Nam Detail",
        component: NamDetail,
        passProps: {nam: nam},
    });
  },
  fetchData: function() {
    this.setState({nams: [], loading: true});
    fetch(SearchUrl + '?q=' + this.state.query)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          nams: responseData.hits.hits,
          loading: false
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
      <NamList nams={this.state.nams} onSelected={this.onSelected} />
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
