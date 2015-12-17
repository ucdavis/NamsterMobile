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
      <View>
      <View style={styles.row}>
        <Text>
          #{this.state.nam.namNumber}: {this.state.nam.status}
        </Text>
      </View>
      <View style={styles.row}>
        <Text>{this.state.nam.building} {this.state.nam.room}</Text>
      </View>
      <View style={styles.separator} />
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
    borderColor: '#DDDDDD'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  }
});

module.exports = NamCell;
