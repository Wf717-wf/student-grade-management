// service配置
export const TIME_OUT = 20000
export let BASE_URL = 'http://127.0.0.1:9000/'
// import.meta.env是vite默认提供的环境变量

if (import.meta.env.MODE === 'production') {
  // BASE_URL = "http://10.26.128.3:8080";
  BASE_URL = 'http://127.0.0.1:9000/'
} else {
  BASE_URL = 'http://127.0.0.1:9000/'
}
