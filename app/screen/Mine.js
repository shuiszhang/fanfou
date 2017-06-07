/**
 * Created by shuis on 2017/5/23.
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

  _onPress = (route, params) => () => {
    this.props.navigation.navigate(route, params);
  };

  render(){
    console.log('nnn:', this.state);
    return (
      <View style={style.main}>
        {
          this.state.isLogin
          ?
          <Info {...this.state} click={this._onPress}/>
          :
          <View style={style.login}>
            <Button title="登录" onPress={this._onPress('Login')}/>
          </View>
        }
        <Line/>
        <ListItem title='发饭' onPress={this._onPress('Edit')}/>
        <Line/>
        <ListItem title='我的收藏' onPress={this._onPress('TweetList', {title: '我的收藏'})}/>
        <Line/>
        <ListItem title='好友请求' onPress={this._onPress('FriendRequest')}/>
        <Line/>
        <ListItem title='意见反馈' onPress={this._onPress('FeedBack')}/>
        <Line/>
      </View>
    )
  }
}

const Info = ({profile_image_url, name, location, friends_count, followers_count, statuses_count, click}) => {
  return (
    <View>
      <View style={{alignItems: 'center', padding: 10}}>
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
      <View style={{flexDirection: 'row', justifyContent:'space-around', backgroundColor:'#95E1D3', padding: 10}}>
        <NumCell label={'关注'} num={friends_count} click={click('PeopleList', {title: '关注'})}/>
        <NumCell label={'粉丝'} num={followers_count} click={click('PeopleList', {title: '粉丝'})}/>
        <NumCell label={'消息'} num={statuses_count} click={click('TweetList', {title: '我的消息'})}/>
      </View>
    </View>
  )
};

const NumCell = ({label, num, click}) => {
  return (
    <TouchableOpacity onPress={click}>
      <View style={{alignItems: 'center'}}>
        <Text>{label}</Text>
        <Text>{num}</Text>
      </View>
    </TouchableOpacity>
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