/**
 * Created by shuis on 2017/5/27.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
const flexCenter = {alignItems : 'center', justifyContent : 'center'};

class Button extends Component{
  static defaultProps  = {
    backgroundColor : "#7F7DFF",
    height : 40,
    width : 100,
    loading : false,
    fontSize : 14,
    borderRadius: 10,
    fontColor: 'white'
  };

  onPress(){
    setTimeout( (() => {
      this.props.onPress && this.props.onPress()
    }).bind(this), 10)
  }

  render(){
    const {height, width, fontColor, backgroundColor, borderRadius, loading, fontSize, title} = this.props;
    let fSize = Platform.OS === 'android' ? fontSize * 1.2 : fontSize;
    if(loading) {
      console.log('aaa');
      return (
        <View
          style={{backgroundColor, width,  height, ...flexCenter, borderRadius}}>
          <ActivityIndicator />
        </View>
      )
    }
    console.log('bbb');
    return(
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        style={{backgroundColor, width,  height, ...flexCenter, borderRadius, ...this.props.style}}>
        <Text style={{color : fontColor, fontSize : fSize, fontWeight : Platform.OS === 'android' ? "bold" : "normal"}}>{title}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button;