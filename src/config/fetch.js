import {
  baseUrl,
  loginUrl
} from './env'


export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  let dataStr = '';
  if(type == 'POST'){
    //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    dataStr += 'token=1111'
    console.log(dataStr)
  }
  dataStr=dataStr.substring(0, dataStr.length - 1)
  //console.log(dataStr);

  if (type == 'GET') {
    //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    dataStr += 'token=1111'
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
    console.log(dataStr)
  }
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        "Content-type":"application/x-www-form-urlencoded;charset=UTF-8",
        "token": "111"
      },

      mode: "cors",
      cache: "force-cache",
    }
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: dataStr
      })
    }
    try {
      var response = await fetch(url, requestConfig);
      if (response.status=='601'){
        window.localStorage.removeItem("token");
        window.location.href=loginUrl;
        return {"status":"400","message":"参数错误,重新登录"};
      }
      if (response.status=='602'){
        window.location.href=userCenterUrl;//回到个人中心
        return {"status":"602","msg":"权限出错"};
      }
      var responseJson = await response.json();
    } catch (error) {
      throw new Error(error)
    }
    return responseJson

  } else {
    let returnObj;
    return new Promise(function(resolve,reject){
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }
      let sendData = '';
      if (type == 'POST') {
        sendData = dataStr;
      }
      requestObj.open(type, url, true);
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      requestObj.send(sendData);
      requestObj.onreadystatechange = () => {

        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            returnObj = obj;
            resolve(returnObj);
          } else if(requestObj.status == 601){
            window.localStorage.removeItem("token");
            // window.location.href=loginUrl;
            resolve({"status":"400","message":"参数错误,重新登录"});
          }else if(requestObj.status==602){
            // window.location.href=userCenterUrl;//回到个人中心
            return {"status":"602","msg":"权限出错"};
          }
          else {
            throw new Error(requestObj);
          }
        }
      }
    });

  }
}
