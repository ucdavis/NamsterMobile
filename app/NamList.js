'use strict';

var React = require('react-native');

var NamCell = require('./NamCell');

var {
  StyleSheet,
  View,
  ListView
} = React;

var NamList = React.createClass({
  getInitialState: function() {
    return {
      dataList: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  },
  onSelected: function(nam){
    this.props.onSelected(nam);
  },
  render: function(){
    var dataSource = this.state.dataList.cloneWithRows(this.props.nams);
    return (
      <View style={styles.navigationContainer}>
        <ListView
          dataSource={dataSource}
          renderRow={(nam)=><NamCell nam={nam} onSelected={this.onSelected} />}
          style={styles.listView}
        />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = NamList;
