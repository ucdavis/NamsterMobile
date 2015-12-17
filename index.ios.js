/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var Search = require('./app/Search');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var NamNav = React.createClass({
  render: function(){
    return(
    <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
        title: "Nam List",
        component: Search,
    }} />
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
  navigationContainer: {
    flex: 1
  }
});

AppRegistry.registerComponent('namstrmobile', () => namstrmobile);
