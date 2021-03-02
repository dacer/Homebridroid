import axios, { AxiosInstance } from 'axios';

class APIKit {
  private static instance: AxiosInstance;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() { }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(baseUrl?: string, token?: string): AxiosInstance {
      if (!APIKit.instance) {
          APIKit.instance = axios.create({
            baseURL: baseUrl,
          });
      }

      this.setClientToken(token)
      return APIKit.instance;
  }

  private static setClientToken = (token?: string) => {
    APIKit.instance.interceptors.request.use(function(config) {
      if (token) config.headers["Authorization"] = `bearer ${token}`
      config.headers["accept"] = "application/json, text/plain, */*"
      config.headers["Content-Type"] = "application/json"
      return config;
    })
  }
}

export default APIKit;