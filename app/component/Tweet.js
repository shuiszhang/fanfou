/**
 * Created by shuis on 2017/6/7.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  Linking,
  TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import {get_source, format_time} from '../util/util';

class Tweet extends Component {
  constructor(props){
    super(props);
    this.state = {
      showImageViewer: false,
    }
  }

  _clickItem = (item) => () => {
    if (item.photo) {
      this.setState({
        image: [{url:item.photo.largeurl}],
        showImageViewer: true,
      });
    }
  };

  _closeImageViewer = () => {
    this.setState({
      image: [],
      showImageViewer: false,
    });
  };

  _onLinkPress = (url) => {
    let reg = /http:\/\/fanfou.com\/(.*)/;
    let arr = reg.exec(url);
    if (arr) {
      //@饭否用户
      console.log(arr[1]);
    } else {
      Linking.openURL(url);
    }
  };

  render(){
    let {item} = this.props;
    return (
      <TouchableOpacity style={style.tweetMain} onPress={this._clickItem(item)}>
        <View>
          <View style={style.tweetHeader}>
            <Image source={{uri: item.user.profile_image_url}} style={{width:24, height:24}}/>
            <View style={style.tweetHeaderRight}>
              <Text style={{color: '#3F72AF'}}>{item.user.name}</Text>
              <Text style={{color: '#4ea1d3'}}>{format_time(item.created_at) + get_source(item.source)}</Text>
            </View>
          </View>
          <HTMLView
            value={`<div>${item.text}</div>`}
            style={{flexDirection: 'row', flexWrap:'wrap'}}
            onLinkPress={this._onLinkPress}
            stylesheet={tweet}
          />
          {
            item.photo
              ?
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image source={{uri: item.photo.largeurl}} resizeMode={'contain'} style={{height:200, width:200}}/>
              </View>
              :
              null
          }
          <Modal visible={this.state.showImageViewer} transparent={true} onRequestClose={this._closeImageViewer}>
            <ImageViewer imageUrls={this.state.image} onClick={this._closeImageViewer}/>
          </Modal>
        </View>
      </TouchableOpacity>
    )
  }
}

const tweet = StyleSheet.create({
  a: {
    color: '#169B62',
  },
  div: {
    color: '#252c41',
  },
  b: {
    color: '#FF3366',
  }
});

const style = StyleSheet.create({
  tweetMain: {
    borderColor: '#c7d0d5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#eef3f4',
    padding: 10,
  },

  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },

  tweetHeaderRight: {
    paddingLeft: 5,
  },
});

export default Tweet;