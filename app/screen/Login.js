/**
 * Created by shuis on 2017/5/27.
 */
import React, { Component } from 'react';
import {
  Button,
  View,
  Image,
  TextInput,
  StyleSheet
} from 'react-native';

import Toast from 'react-native-root-toast';
import {auth} from '../api/api';

class Login extends Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '登录'
  });

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  _onChangeUsername = (value) => {
    this.setState({
      username: value,
    })
  };

  _onChangePassword = (value) => {
    this.setState({
      password: value,
    })
  };

  _onPress = async () => {
    try {
      console.log(this.state);
      let res = await auth(this.state);
      if (!res) {
        //登录失败
        let toast = Toast.show('用户名或密码错误', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      } else {
        //save token
        storage.save({
          key: 'authToken',
          data: res,
          expires: null,
        })
      }
    } catch (err) {
      let toast = Toast.show('用户名或密码错误', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      console.log(err);
      if (err.status == '401') {
        //账号或密码错误
      }
    }
  };

  render(){
    return (
      <View>
        <View style={style.cell}>
          <Image source={require('../img/email.png')}/>
          <TextInput placeholder={'邮箱'} autoCapitalize={'none'} style={style.input} underlineColorAndroid="transparent" value={this.state.username} onChangeText={this._onChangeUsername}/>
        </View>
        <View style={style.cell}>
          <Image source={require('../img/password.png')}/>
          <TextInput placeholder={'密码'} autoCapitalize={'none'} style={style.input} underlineColorAndroid="transparent" value={this.state.password} onChangeText={this._onChangePassword}/>
        </View>
        <Button title="登录" onPress={this._onPress}/>
      </View>
    )
  }
}

const style = StyleSheet.create({
  cell: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#c7d0d5'
  },

  input: {
    width:200,
    height:30,
    paddingLeft: 10,
    padding: 0,
  }
});

export default Login;