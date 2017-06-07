/**
 * Created by shuis on 2017/6/7.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import {TweetSeparator, Tweet} from '../component/base';
import {favorites, user_timeline} from '../api/api';

class TweetList extends Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  constructor(props){
    super(props);
    if (this.props.navigation.state.params.title === '我的消息') {
      this.fetch = user_timeline;
    } else if (this.props.navigation.state.params.title === '我的收藏') {
      this.fetch = favorites;
    } else {
      this.fetch = null;
    }

    this.state = {
      data: [],
    };
  }

  componentDidMount(){
    this._fetchData();
  }

  _fetchData = async () => {
    try {
      let res = await this.fetch();
      console.log(res);
      this.setState({
        data: res,
      });
    } catch (e) {

    }
  };

  _renderItem = ({item}) => {
    return <Tweet item={item}/>;
  };

  _renderSeparator = () => {
    return <TweetSeparator/>
  };

  _keyExtractor = (item, index) => index;

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

export default TweetList;