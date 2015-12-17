'use strict';

var React = require('react-native');
var {
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} = React;

var NamCell = React.createClass({
  getInitialState: function() {
    return {
      nam: this.props.nam._source
    };
  },
  namSelected: function(){
    this.props.onSelected(this.state.nam);
  },
  render: function(){
    return (
      <TouchableHighlight onPress={(this.namSelected)}>
      <View style={styles.row}>
        <Text>{this.state.nam.namNumber}: </Text>
        <Text>{this.state.nam.building}</Text>
        <Text>{this.state.nam.department}</Text>
      </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#DDDDDD'
  }
});

module.exports = NamCell;
