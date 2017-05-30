/**
 * Created by shuis on 2017/5/27.
 */
import Fanfou from 'fanfou-api';
import config from '../../fanfou.config';

const _auth = async (params) => {
  try {
    //Object.assign( config, params);
    const ff = new Fanfou(config);
    let res = await new Promise((resolve, reject) => {
      ff.auth((err, res) => {
        if (err) {
          reject(err);
        } else {
          console.log('in promise:', res);
          resolve(res);
        }
      });
    });
    console.log('auth res:', res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

const request = (method) => {
  return async (request_data) => {
    try {
      console.log('oauthToken:', oauthToken);
      console.log('22:', Object.assign({}, config, {oauth_token: oauthToken}));
      const ff = new Fanfou(Object.assign({}, config, {oauth_token: oauthToken}));
      let func = method === 'GET' ? ff.get : ff.post;
      console.log('ff:', ff);
      let res = await new Promise((resolve, reject) => {
        ff.get(request_data, (err, res) => {
          if (err) {
            reject(err);
          } else {
            console.log('in promise:', res);
            resolve(res);
          }
        });
      });
      return res;
    } catch (e) {
      console.error(e);
    }
  }
};

export const get = request('GET');
export const post = request('POST');
export const auth = _auth;