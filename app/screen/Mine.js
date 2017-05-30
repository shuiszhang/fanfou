/**
 * Created by shuis on 2017/5/23.
 */
import React, { Component } from 'react';
import {
  Button,
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import {ListItem, Line, TabBarIcon} from '../component/base';

import {verify_credentials} from '../api/api';

class Mine extends Component{
  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarLabel: '我的',
    tabBarIcon: <TabBarIcon icon={require('../img/mine.png')}/>
  });

  constructor(props){
    super(props);

    this.state = {
      isLogin: false,
      name: '',
      location: '',
      description: '',
      profile_image_url: '',
      followers_count: '',
      friends_count: '',
      statuses_count: '',
      following: false,
      created_at: '',
    }
  }

  componentDidMount(){
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    try {
      let res = await verify_credentials();
      storage.save({
        key: 'userInfo',
        data: res,
        expires: null,
      });
      this.setState({
        isLogin: true,
        ...res
      });
    } catch (err) {

    }
  };

  _onPress = (route) => () => {
    this.props.navigation.navigate(route);
  };

  render(){
    console.log('nnn:', this.state);
    return (
      <View style={style.main}>
        {
          this.state.isLogin
          ?
          <Info {...this.state}/>
          :
          <View style={style.login}>
            <Button title="登录" onPress={this._onPress('Login')}/>
          </View>
        }
        <Line/>
        <ListItem title='我的消息' onPress={this._onPress('Message')}/>
        <Line/>
        <ListItem title='我的收藏' onPress={this._onPress('Favorite')}/>
        <Line/>
        <ListItem title='随便看看' onPress={this._onPress('LookAround')}/>
        <Line/>
        <ListItem title='好友请求' onPress={this._onPress('FriendRequest')}/>
        <Line/>
        <ListItem title='意见反馈' onPress={this._onPress('FeedBack')}/>
        <Line/>
      </View>
    )
  }
}

const Info = ({profile_image_url, name, location, friends_count, followers_count, statuses_count}) => {
  console.log('aaaa:', profile_image_url);
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        {
          profile_image_url
          ?
          <Image source={{uri: profile_image_url}} style={{width:48, height:48}}/>
          :
          null
        }
        <Text>{name}</Text>
        <Text>{location}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent:'center'}}>
        <NumCell label={'关注'} num={friends_count}/>
        <NumCell label={'粉丝'} num={followers_count}/>
        <NumCell label={'消息'} num={statuses_count}/>
      </View>
    </View>
  )
};

const NumCell = ({label, num}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>{label}</Text>
      <Text>{num}</Text>
    </View>
  )
};

const style = StyleSheet.create({
  main: {
    paddingTop: 50,
  },
  login: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
});

export default Mine;