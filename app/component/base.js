/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export const ListItem = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.listItem}>
      <Text>{title}</Text>
    </TouchableOpacity>
  )
};

export const Line = () => {
  return (
    <View style={style.line}/>
  )
};

export const TweetSeparator = () => {
  return (
    <View style={style.separator}/>
  )
};

export const TabBarIcon = ({tintColor, focused, icon}) => {
  return (
    <View style={style.tabBarIcon}>
      <Image source={icon} />
    </View>
  )
};

const style = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 10,
  },

  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#c7d0d5'
  },

  separator: {
    height: 3,
    backgroundColor: '#e9e9ef',
  },

  tabBarIcon: {
    //height: 24,
  },
});