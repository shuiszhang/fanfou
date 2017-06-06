/**
 * Created by shuis on 2017/6/6.
 */
import React, { Component } from 'react';
import {
  TextInput,
  View,
  Image,
  StyleSheet
} from 'react-native';
import Toast from 'react-native-root-toast';
import Button from '../component/Button';

import {update} from '../api/api';

class Edit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '发饭',
  });

  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
  }

  _onChangeText = (text) => {
    this.setState({
      text: text,
    });
  };

  _submit = async () => {
    console.log(this.state.text);
    try {
      let res = await update(this.state.text);
      this.setState({
        text: '',
      });
      let toast = Toast.show('发送成功', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      console.log('_submit res:', res);
    } catch (e) {
      console.log(e);
    }
  };

  render(){
    return(
      <View>
        <TextInput
          placeholder={'有什么想说的...'}
          placeholderTextColor={'#727272'}
          autoCapitalize={'none'}
          autoCorrect={false}
          multiline={true}
          onChangeText={this._onChangeText}
          value={this.state.text}
          style={{height: '50%', borderWidth: StyleSheet.hairlineWidth, borderColor: '#727272', padding:5}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button title="发饭" onPress={this._submit}/>
        </View>
      </View>
    )
  }
}

export default Edit;