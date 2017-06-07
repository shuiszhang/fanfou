/**
 * Created by shuis on 2017/6/7.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

class Page extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.id
  });

  constructor(props) {
    super(props);
  }

  render(){
    return (
      <View>
        <Text>个人主页</Text>
      </View>
    )
  }
}

export default Page;