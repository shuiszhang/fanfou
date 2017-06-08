/**
 * Created by shuis on 2017/5/29.
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import {TabBarIcon, TweetSeparator} from '../component/base';
import Tweet from '../component/Tweet';

import {public_timeline} from '../api/api';

class LookAround extends Component{
  static navigationOptions = ({ navigation }) => ({
    title: '随便看看',
    tabBarLabel: '发现',
    tabBarIcon: <TabBarIcon icon={require('../img/discovery.png')}/>,
    headerRight: (
      <TouchableWithoutFeedback onPress={()=>{navigation.state.params.onPress()}}>
        <View style={{padding:10}}>
          <Image source={require('../img/refresh.png')}/>
        </View>
      </TouchableWithoutFeedback>
    )
  });

  constructor(props){
    super(props);
    this.state = {
      data: [],
      showImageViewer: false,
      image: [{url:''}],
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onPress:this._fetch,
    })
  }

  componentDidMount() {
    this._fetch();
  }

  _fetch = async () => {
    try {
      let res = await public_timeline();
      this.setState({
        data: res,
      });
    } catch (e) {

    }
  };

  _renderItem = ({item}) => {
    return <Tweet item={item} navigation={this.props.navigation}/>;
  };

  _keyExtractor = (item, index) => index;

  _renderSeparator = () => {
    return <TweetSeparator/>
  };

  render(){
    return (
      <View>
        <FlatList
          data = {this.state.data}
          renderItem = {this._renderItem}
          initialNumToRender = {6}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    )
  }
}

export default LookAround;