/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

class Favorite extends Component{
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '收藏',
  });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>我的收藏</Text>
      </View>
    )
  }
}

export default Favorite;