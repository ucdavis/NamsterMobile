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
  NavigatorIOS,
  View,
} = React;

var NAMS = [
  {number: '101A', building: 'Mrak', department: 'Ag Biz'},
  {number: '101B', building: 'Mrak', department: 'Ag Biz'},
  {number: '101C', building: 'Mrak', department: 'Ag Biz'},
  {number: '101D', building: 'Mrak', department: 'Ag Biz'},
  {number: '101E', building: 'Mrak', department: 'Ag Biz'},
  {number: '103', building: 'Bainer', department: 'Geology'}];

var NamNav = React.createClass({
  render: function(){
    return(
    <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
        title: "Nam List",
        component: NamList,
    }} />
    );
  }
});

var NamCell = React.createClass({
  render: function(){
    return (
      <TouchableHighlight>
      <View style={styles.row}>
        <Text>{this.props.nam.number}: </Text>
        <Text>{this.props.nam.building}</Text>
        <Text style={styles.right}>{this.props.nam.department}</Text>
      </View>
      </TouchableHighlight>
    );
  }
});

var NamList = React.createClass({
  getInitialState: function() {
    return {
      dataList: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      nams: NAMS
    };
  },
  render: function(){
    var dataSource = this.state.dataList.cloneWithRows(this.state.nams);
    return (
      <View style={styles.navigationContainer}>
        <ListView
          dataSource={dataSource}
          renderRow={(nam)=><NamCell nam={nam} />}
          style={styles.listView}
        />
      </View>
    );
  }
});

var namstrmobile = React.createClass({
  render: function() {
   return (
      <NamNav />
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
  navigationContainer: {
        flex: 1
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
