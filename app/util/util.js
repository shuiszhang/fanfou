/**
 * Created by shuis on 2017/5/30.
 */

//"<a href="http://imach.me/gohanapp" target="_blank">御飯 iOS</a>"
export const get_source = (data) => {
  let reg = /<a.*>(.*)<\/a>/;
  let arr = reg.exec(data);
  if (arr) {
    return arr[1];
  } else {
    return data;
  }
};

//"Tue May 30 02:40:15 +0000 2017"
export const format_time = (time) => {
  let end = new Date(time);
  let diff = (new Date()).getTime() - end.getTime(); //毫秒

  let ret = Math.floor(diff / 1000);//秒
  if (ret < 5) {
    return '刚刚';
  } else if (ret < 60) {
    return ret + '秒前';
  }

  ret = Math.floor(ret/60); //分钟
  if (ret < 60) {
    return ret + '分钟前';
  }

  ret = Math.floor(ret/60); //小时
  if (ret < 24) {
    return ret + '小时前';
  }

  ret = Math.floor(ret/24); //天
  if (ret < 10) {
    return ret + '天前';
  } else {
    return `${end.getFullYear()}年${end.getMonth()}月${end.getDay()}日`;
  }
};

export const parse_auth = (str) => {
  let obj = {};
  str.split('&').forEach(v => {
    obj[v.split('=')[0]] = v.split('=')[1];
  });
  return obj;
};