/**
 * Created by shuis on 2017/5/23.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import {TabBarIcon, TweetSeparator} from '../component/base';
import Tweet from '../component/Tweet';
import {home_timeline} from '../api/api';

class Home extends Component{
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '首页',
    headerTitle: '饭否',
    tabBarIcon: <TabBarIcon icon={require('../img/home.png')}/>,
    headerLeft: <View />,
    headerRight: (
      <TouchableWithoutFeedback onPress={()=>{navigation.state.params.onPress()}}>
        <View style={{padding:10}}>
          <Image source={require('../img/edit.png')}/>
        </View>
      </TouchableWithoutFeedback>
    )
  });

  constructor(props){
    super(props);

    this.state = {
      refreshing: false,
      footRefreshing: false,
      data: [],
      showImageViewer: false,
      image: [{url:''}],
    };

    this.lastId = '';
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onPress:() => this.props.navigation.navigate('Edit'),
    })
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = async (id) => {
    try {
      if (id) {
        this.setState({
          footRefreshing: true,
        });
      } else {
        this.setState({
          refreshing: true,
        });
      }

      let res = [];
      if (id) {
        res = await home_timeline({max_id: id});
      } else {
        res = await home_timeline();
      }
      if (res === false) {
        //未登录
        this.props.navigation.navigate('Mine');
      }
      if (res) {
        let lastItem = res[res.length-1];
        this.lastId = lastItem.id;
      }
      let newData = res;
      if (id) {
        newData = this.state.data.concat(res);
      }
      this.setState({
        refreshing: false,
        footRefreshing: false,
        data: newData,
      });
    } catch (e) {
      console.log('error:Home _fetchData:', e);
    }
  };

  _renderItem = ({item}) => {
    return <Tweet item={item} navigation={this.props.navigation}/>;
  };

  _keyExtractor = (item, index) => index;

  _onRefresh = () => {
    this._fetchData();
  };

  _onEndReached = () => {
    this._fetchData(this.lastId);
  };

  _footer = () => {
    return (
      <View style={{alignItems:'center', justifyContent:'center'}}>
        {
          this.state.footRefreshing
          ?
            <ActivityIndicator animating={this.state.footRefreshing}/>
            :
            <Text>上拉加载更多</Text>
        }
      </View>
    )
  };

  _renderSeparator = () => {
    return <TweetSeparator/>
  };

  render(){
    return (
      <View>
        <FlatList
          data = {this.state.data}
          renderItem = {this._renderItem}
          initialNumToRender = {6}
          keyExtractor = {this._keyExtractor}
          onRefresh = {this._onRefresh}
          refreshing = {this.state.refreshing}
          onEndReached = {this._onEndReached}
          onEndReachedThreshold = {0.1}
          ListFooterComponent = {this._footer}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    )
  }
}

export default Home;