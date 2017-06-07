/**
 * Created by shuis on 2017/5/23.
 */
import React, { Component } from 'react';
import {
  FlatList
} from 'react-native';

import {TabBarIcon, TweetSeparator} from '../component/base';
import Tweet from '../component/Tweet';
import {mentions} from '../api/api';

class Message extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: '消息',
    tabBarLabel: '消息',
    tabBarIcon: <TabBarIcon icon={require('../img/message.png')}/>
  });

  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    this._fetchData();
  }

  _fetchData = async () => {
    try {
      let res = await mentions();
      console.log('mentions:',res);
      this.setState({
        data: res,
      });
    } catch (e) {

    }
  };

  _renderItem = ({item}) => {
    return <Tweet item={item}/>
  };

  _keyExtractor = (item, index) => index;

  _renderSeparator = () => {
    return <TweetSeparator/>
  };

  render(){
    return (
      <FlatList
        data = {this.state.data}
        renderItem = {this._renderItem}
        initialNumToRender = {6}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={this._renderSeparator}
      />
    )
  }
}

export default Message;