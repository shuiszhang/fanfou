/**
 * Created by shuis on 2017/6/6.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import {Line} from '../component/base';

import {friends, followers} from '../api/api';

class PeopleList extends Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title,
  });

  constructor(props){
    super(props);
    if (this.props.navigation.state.params.title === '关注') {
      this.fetch = friends;
    } else if (this.props.navigation.state.params.title === '粉丝') {
      this.fetch = followers;
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
    return (
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image source={{url: item.profile_image_url}} style={{width:20, height:20, marginRight: 5}}/>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    )
  };

  _renderSeparator = () => {
    return <Line/>
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

export default PeopleList;