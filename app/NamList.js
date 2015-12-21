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
  fetchingData: false, //static so we don't fetch data multiple times
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
    this.setState({loading: true});
    this.loadNams();
  },
  loadNams() {
    if (this.props.query){
      this.fetchData();
    } else if (this.props.filter){
      this.filterData();
    }
  },
  filterData: function() {
    var self = this;
    self.fetchingData = true;

    SearchFactory.fetchFilteredData(self.props.filter, function(data){
      self.fetchingData = false;
      self.setState({
        nams: self.state.nams.concat(data.hits.hits),
        totalHits: data.hits.total,
        page: self.state.page + 1,
        loading: false
      });
    });
  },
  fetchData: function() {
    var self = this;
    self.fetchingData = true;

    SearchFactory.fetchQueryData(self.props.query, self.state.page, self.state.pageSize, function(data){
      self.fetchingData = false;
      self.setState({
        nams: self.state.nams.concat(data.hits.hits),
        totalHits: data.hits.total,
        page: self.state.page + 1,
        loading: false
      });
    });
  },
  onSelected: function(nam){
    this.props.onSelected(nam);
  },
  onEndReached: function(){
    console.log('on end reached called');
    if (this.state.nams.length < this.state.totalHits && !this.fetchingData){
      this.fetchingData = true;
      //if there are still results out there, grab another pageSize worth
      console.log('going to next page');
      this.loadNams();
    }
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
          onEndReached={this.onEndReached}
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
