/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

class FriendRequest extends Component{
  static navigationOptions = ({ navigation }) => ({
    tabBarLabel: '好友请求',
  });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        <Text>好友请求</Text>
      </View>
    )
  }
}

export default FriendRequest;