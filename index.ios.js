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
  TextInput,
  ListView,
  NavigatorIOS,
  View,
} = React;

var SearchUrl = 'https://caesdev:3tKCPScPQPW3J4pX@aws-us-east-1-portal9.dblayer.com:10241/datanams/_search';

var NamNav = React.createClass({
  render: function(){
    return(
    <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
        title: "Nam List",
        component: HomeComponent,
    }} />
    );
  }
});

var HomeComponent = React.createClass({
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

var NamDetail = React.createClass({
  render: function(){
    return (
      <View style={styles.centeredContainer}>
        <Text>{this.props.nam.namNumber}: </Text>
        <Text>{this.props.nam.building}</Text>
        <Text style={styles.right}>{this.props.nam.department}</Text>
      </View>
    );
  }
});

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
        <Text style={styles.right}>{this.state.nam.department}</Text>
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

var namstrmobile = React.createClass({
  render: function() {
   return (
      <NamNav />
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
  },
});

AppRegistry.registerComponent('namstrmobile', () => namstrmobile);
