/**
 * Created by shuis on 2017/5/29.
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
import {get_source, format_time} from '../util/util'

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

export const TabBarIcon = ({tintColor, focused, icon}) => {
  return (
    <View style={style.tabBarIcon}>
      <Image source={icon} />
    </View>
  )
};

export const Tweet = ({item}) => {
  return (
    <TouchableOpacity style={style.tweetMain}>
      <View style={style.tweetHeader}>
        <Image source={{uri: item.user.profile_image_url}} style={{width:24, height:24}}/>
        <View style={style.tweetHeaderRight}>
          <Text>{item.user.name}</Text>
          <Text>{format_time(item.created_at) + get_source(item.source)}</Text>
        </View>
      </View>
      <Text>
        {item.text}
      </Text>
    </TouchableOpacity>
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

  tabBarIcon: {
    //height: 24,
  },

  tweetMain: {
    borderColor: '#c7d0d5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 3,
  },

  tweetHeader: {
    flexDirection: 'row',
    paddingBottom: 10,
  },

  tweetHeaderRight: {
    paddingLeft: 5,
  },
});