import Fanfou from 'fanfou-api';
import config from '../../fanfou.config';
import {getAuthToken} from '../util/storage';

const request =  async (request_data) => {
  try {
    if (!oauthToken) {
      await getAuthToken();
    }
    let ff = new Fanfou(Object.assign({}, config, oauthToken));
    let res = await ff.request_async(request_data);
    return res.body;
  } catch (err) {
    console.log('error:request:', err);
  }
};

export const auth = async () => {
  try {
    let ff = new Fanfou(config);
    let res = await ff.auth_async();
    return res.text;
  } catch (err) {
    console.error(err);
  }
};

export const verify_credentials = () => {
  let request_data = {
    url: 'http://api.fanfou.com/account/verify_credentials.json',
    method: 'GET',
    data:{
      format: 'html',
    }
  };
  return request(request_data);
};

//随便看看
export const public_timeline = async () => {
  let request_data = {
    url: 'http://api.fanfou.com/statuses/public_timeline.json',
    method: 'GET',
    data:{
      //format: 'html',
    }
  };
  return request(request_data);
};

//显示指定用户及其好友的消息
export const home_timeline = async (params) => {
  let request_data = {
    url: 'http://api.fanfou.com/statuses/home_timeline.json',
    method: 'GET',
    data:{
      //format: 'html',
      ...params
    }
  };
  return request(request_data);
};

//显示回复/提到当前用户的20条消息
export const mentions = async () => {
  let request_data = {
    url: 'http://api.fanfou.com/statuses/mentions.json',
    method: 'GET',
    data:{
      //format: 'html',
    }
  };
  return request(request_data);
};

//发送消息
export const update = async (status_text) => {
  let request_data = {
    url: 'http://api.fanfou.com/statuses/update.json',
    method: 'POST',
    data:{
      //format: 'html',
      status: status_text
    }
  };
  return request(request_data);
};

//关注
export const friends = async () => {
  let request_data = {
    url: 'http://api.fanfou.com/users/friends.json',
    method: 'GET',
    data:{
      //format: 'html',
    }
  };
  return request(request_data);
};

//粉丝
export const followers = async () => {
  let request_data = {
    url: 'http://api.fanfou.com/users/followers.json',
    method: 'GET',
    data:{
      //format: 'html',
    }
  };
  return request(request_data);
};