/**
 * Created by shuis on 2017/5/23.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  FlatList
} from 'react-native';

import {ListItem, Line, TabBarIcon, Tweet} from '../component/base';
import {mentions} from '../api/api';

class Message extends Component{
  static navigationOptions = ({ navigation }) => ({
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

  render(){
    return (
      <FlatList
        data = {this.state.data}
        renderItem = {this._renderItem}
        initialNumToRender = {6}
        keyExtractor={this._keyExtractor}
      />
    )
  }
}

export default Message;