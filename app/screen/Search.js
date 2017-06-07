/**
 * Created by shuis on 2017/6/7.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {search} from '../api/api';
import {TweetSeparator} from '../component/base';
import Tweet from '../component/Tweet';

class Search extends Component{
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: '#e9e9ef', margin: 5, flex: 1, paddingLeft: 5}}>
        <Image source={require('../img/search.png')}/>
        <TextInput
          autoCapitalize={'none'}
          autoCorrect={false}
          style={{flex:1, paddingLeft: 5}}
          onChange={navigation.state.params && navigation.state.params.onChange}
        />
      </View>
    ),
    headerRight: (
      <TouchableOpacity onPress={()=>{navigation.state.params.onPress()}} style={{marginRight: 10}}>
        <Text>搜索</Text>
      </TouchableOpacity>
    )
  });

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      query: '',
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onPress:this._fetchData,
      onChange: this._onChange,
    })
  }

  _onChange = (event) => {
    this.setState({
      query: event.nativeEvent.text,
    });
  };

  _fetchData = async () => {
    try {
      let res = await search(this.state.query);
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

  _keyExtractor = (item, index) => index;

  _renderSeparator = () => {
    return <TweetSeparator/>
  };

  render(){
    return(
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

export default Search;