'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  View,
  Text
} = React;

var NamDetail = React.createClass({
  render: function() {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.item}>
          <Text style={styles.label}>#</Text>
          <Text>{ this.props.nam.namNumber }</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Status</Text>
          <Text>{ this.props.nam.status }</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Building</Text>
          <Text>{ this.props.nam.building }</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Department</Text>
          <Text>{ this.props.nam.department }</Text>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  scrollview: {
    height: 740,
    backgroundColor: "#FFFFFF"
  },
  item: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
  label: {
    color: "#007AFF",
    marginBottom: 5
  },
});

module.exports = NamDetail;
