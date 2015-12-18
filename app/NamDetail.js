'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  View,
  Text
} = React;

var NamDetail = React.createClass({
  roomSelected: function(){
    this.props.onFilterSelected(
      {
        room: this.props.nam.room,
        building: this.props.nam.building
      }
    );
  },
  buildingSelected: function(){
    this.props.onFilterSelected({ building: this.props.nam.building});
  },
  departmentSelected: function(){
    if (this.props.nam.department){
      this.props.onFilterSelected({department: this.props.nam.department});
    }
  },
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
        <TouchableHighlight onPress={(this.roomSelected)}>
        <View style={styles.item}>
          <Text style={styles.label}>Room</Text>
          <Text>{ this.props.nam.room }</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={(this.buildingSelected)}>
        <View style={styles.item}>
          <Text style={styles.label}>Building</Text>
          <Text>{ this.props.nam.building }</Text>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={(this.departmentSelected)}>
        <View style={styles.item}>
          <Text style={styles.label}>Department</Text>
          <Text>{ this.props.nam.department }</Text>
        </View>
        </TouchableHighlight>
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
