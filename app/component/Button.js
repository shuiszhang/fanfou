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
    fontSize : 14
  };

  onPress(){
    setTimeout( (() => {
      this.props.onPress && this.props.onPress()
    }).bind(this), 10)
  }

  render(){
    const {height, width, fontColor, backgroundColor, children, loading, fontSize} = this.props;
    let borderRadius = 0;
    let fSize = Platform.OS === 'android' ? fontSize * 1.2 : fontSize;
    if(loading) {
      return (
        <View
          style={{backgroundColor, width,  height, ...flexCenter, borderRadius}}>
          <ActivityIndicator />
        </View>
      )
    }
    return(
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        style={{backgroundColor, width,  height, ...flexCenter, borderRadius, ...this.props.style}}>
        <Text style={{color : 'white', fontSize : fSize, fontWeight : Platform.OS === 'android' ? "bold" : "normal"}}>{children}</Text>
      </TouchableOpacity>
    )
  }
}

export default Button;