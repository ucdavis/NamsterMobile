/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  ListView,
  View,
} = React;

var NAMS = [
  {number: '101A', building: 'Mrak', department: 'Ag Biz'},
  {number: '103', building: 'Bainer', department: 'Geology'}];

var namstrmobile = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(NAMS),
      loaded: true
    });
    // fetch(REQUEST_URL)
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
    //       loaded: true,
    //     });
    //   })
    //   .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
   return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderNam}
        style={styles.listView}
      />
    );
  },
  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading nams...
        </Text>
      </View>
    );
  },
  renderNam: function(nam){
    return (
      <TouchableHighlight>
      <View style={styles.row}>
        <Text>{nam.number}: </Text>
        <Text>{nam.building}</Text>
        <Text style={styles.right}>{nam.department}</Text>
      </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
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
  },
});

AppRegistry.registerComponent('namstrmobile', () => namstrmobile);
