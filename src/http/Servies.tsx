import axios from "axios";

// 创建axios默认请求
// axios.defaults.baseURL = "http://106.14.174.206/api"; // 后端代码
// 配置超时时间
axios.defaults.timeout = 100000;
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export interface BaseHttpResponse {
  code: number;
  data: any;
  message: string;
}

// 请求的方式
type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

class Http {
  static request(
    url: string,
    data: object,
    method: IMethod,
    headers?: object
  ): Promise<BaseHttpResponse> {
    if (method === 'GET') {
      return new Promise((resolve, reject) => {
        axios
          .get(url, { params: data, headers: headers })
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        axios({
          method: method,
          data: data,
          headers: headers,
          url: url
        }).then(res => {
          resolve(res.data);
        })
          .catch(err => {
            reject(err);
          });

      });
    }
  }
}

export default Http