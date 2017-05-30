/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  FlatList
} from 'react-native';
import {ListItem, Line, TabBarIcon, Tweet} from '../component/base';

import {public_timeline} from '../api/api';

class LookAround extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: '随便看看',
    tabBarLabel: '发现',
    tabBarIcon: <TabBarIcon icon={require('../img/discovery.png')}/>
  });

  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this._fetch();
  }

  _fetch = async () => {
    try {
      let res = await public_timeline();
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

export default LookAround;