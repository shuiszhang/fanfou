/**
 * Created by shuis on 2017/5/22.
 */
import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import {getAuthToken} from './util/storage';
import {Home, Detail, Message, Mine, Login, Favorite, FeedBack, FriendRequest, LookAround, Edit, PeopleList, TweetList, Search} from './screen';

class App extends Component{
  constructor(){
    super();
    global.oauthToken = null;
    global.isLogin = -1;

    this.state = {
      refresh: true,
    }
  }

  componentDidMount() {

  }

  _init = async () => {
    await getAuthToken();
  };

  render(){
    return (
      <Navigator>

      </Navigator>
    )
  }
}

const Tab = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Discovery: {
      screen: LookAround,
    },
    Message: {
      screen: Message,
    },
    Mine: {
      screen: Mine,
    }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      //  showLabel: false,
      style: {
        height: 40,
      },
    }
  }
);

const Navigator = StackNavigator(
  {
    Tab: {
      screen: Tab,
    },
    Login: {
      screen: Login,
    },
    Detail: {
      screen: Detail,
    },
    Message: {
      screen: Message,
    },
    Favorite: {
      screen: Favorite,
    },
    FeedBack: {
      screen: FeedBack,
    },
    FriendRequest: {
      screen: FriendRequest,
    },
    LookAround: {
      screen: LookAround,
    },
    Edit: {
      screen: Edit,
    },
    PeopleList: {
      screen: PeopleList,
    },
    TweetList: {
      screen: TweetList,
    },
    Search: {
      screen: Search,
    }
  },
  /*{
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true,
    },
  }*/
);

export default App;