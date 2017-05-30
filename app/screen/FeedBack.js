/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

class FeedBack extends Component{
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '意见反馈',
  });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>意见反馈</Text>
      </View>
    )
  }
}

export default FeedBack;