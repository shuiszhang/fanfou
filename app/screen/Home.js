/**
 * Created by shuis on 2017/5/23.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList
} from 'react-native';
import Button from '../component/Button';

import {ListItem, Line, TabBarIcon, Tweet} from '../component/base';
import {home_timeline} from '../api/api'

class Home extends Component{
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '首页',
    headerTitle: '饭否',
    tabBarIcon: <TabBarIcon icon={require('../img/home.png')}/>
  });

  constructor(props){
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData = async () => {
    try {
      let res = await home_timeline();
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

export default Home;