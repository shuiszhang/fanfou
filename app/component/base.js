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
      <View>
        <View style={style.tweetHeader}>
          <Image source={{uri: item.user.profile_image_url}} style={{width:24, height:24}}/>
          <View style={style.tweetHeaderRight}>
            <Text style={{color: '#3F72AF'}}>{item.user.name}</Text>
            <Text style={{color: '#4ea1d3'}}>{format_time(item.created_at) + get_source(item.source)}</Text>
          </View>
        </View>
        <Text style={{color:'#252c41'}}>
          {item.text}
        </Text>
        {
          item.photo
            ?
            <View style={{justifyContent:'center', alignItems:'center'}}>
              <Image source={{uri: item.photo.largeurl}} resizeMode={'contain'} style={{height:200, width:200}}/>
            </View>
            :
            null
        }
      </View>
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
    backgroundColor: '#eef3f4',
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