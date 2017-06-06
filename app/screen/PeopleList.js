/**
 * Created by shuis on 2017/6/6.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

class PeopleList extends Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  constructor(props){
    super(props);
  }

  render(){
    return (
      <View>
        {
          [1,2,3].map((item, index) => {
            return <View key={index} style={{flexDirection: 'row'}}>
              <Image source={{url: "http://s3.meituan.net/v1/mss_3d027b52ec5a4d589e68050845611e68/avatar/s0/01/3e/jg.jpg?1331998789"}}/>
              <View>
                <Text>用户名</Text>
                <Text>签名</Text>
              </View>
            </View>
          })
        }
      </View>
    )
  }
}

export default PeopleList;