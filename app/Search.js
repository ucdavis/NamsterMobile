'use strict';

var React = require('react-native');

var NamDetail = require('./NamDetail');
var NamList = require('./NamList');
var SearchFactory = require('./SearchFactory');

var {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  ScrollView,
  NavigatorIOS,
  View,
} = React;

var Search = React.createClass({
  getInitialState: function() {
    return {
      searchText: '',
      query: '',
      filter: null
    };
  },
  onSearch: function(){
    this.setState({query: this.state.searchText});
  },
  onSelected: function(nam){
    this.props.navigator.push({
        title: "Nam Detail",
        component: NamDetail,
        rightButtonTitle: 'Home',
        onRightButtonPress: () => this.props.navigator.popToTop(),
        passProps: {nam: nam, onFilterSelected: this.onFilterSelected},
    });
  },
  onFilterSelected: function(filter){
    var self = this;
    self.props.navigator.push({
        title: "Filter List",
        component: NamList,
        rightButtonTitle: 'Home',
        onRightButtonPress: () => self.props.navigator.popToTop(),
        passProps: {filter: filter, query: '', onSelected: self.onSelected},
    });
  },
  render: function(){
    var namList = !this.state.query && !this.state.filter ? <Text></Text> : <NamList query={this.state.query} onSelected={this.onSelected} />;
    return (
      <View style={styles.container}>
      <TextInput
        style={{height: 40, margin: 20, padding: 2, borderColor: 'gray', borderWidth: 1}}
        autoCorrect={false}
        autoFocus={true}
        clearButtonMode={'always'}
        onChangeText={(searchText) => this.setState({searchText})}
        value={this.state.searchText}
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
    flex: 1,
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
