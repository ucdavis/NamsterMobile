'use strict';

var React = require('react-native');

var NamCell = require('./NamCell');
var SearchFactory = require('./SearchFactory');

var {
  StyleSheet,
  View,
  ListView,
  Text
} = React;

var NamList = React.createClass({
  getInitialState: function() {
    return {
      dataList: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      nams: [],
      page: 0,
      pageSize: 50,
      loading: true
    };
  },
  componentWillMount() {
    console.log('mounted', this.props.query);
    if (this.props.query){
      this.fetchData();
    } else if (this.props.filter){
      this.filterData();
    }
  },
  filterData: function() {
    var self = this;
    self.setState({nams: [], loading: true});

    SearchFactory.fetchFilteredData(self.props.filter, function(data){
      self.setState({
        nams: data.hits.hits,
        loading: false
      });
    });
  },
  fetchData: function() {
    var self = this;
    self.setState({nams: [], loading: true});

    SearchFactory.fetchQueryData(self.props.query, function(data){
      self.setState({
        nams: data.hits.hits,
        loading: false
      });
    });
  },
  onSelected: function(nam){
    this.props.onSelected(nam);
  },
  renderLoading: function(){
    return (
      <View style={styles.centeredContainer}>
      <Text>Loading... </Text>
      </View>
    );
  },
  render: function(){
    if (this.state.loading){
      return this.renderLoading();
    } else if (this.state.nams.length === 0){
      return (
        <View style={styles.centeredContainer}>
          <Text>No Nams Found</Text>
        </View>
      );
    }

    var dataSource = this.state.dataList.cloneWithRows(this.state.nams);
    return (
      <View style={this.props.query ? styles.searchContainer : styles.navigationContainer}>
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
    marginTop: 65,
  },
  searchContainer: {
    flex: 1,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = NamList;
