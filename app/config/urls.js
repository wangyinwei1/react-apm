// api base url
export const baseUrl = '/api'

// login url
export const loginUrl = 'http://uyuntest.cn/tenant/#/login'

// other urls
const urls = {
  user: '/tenant/api/v1/user/details/view',
}

export default {
  /**
   * get url with name
   */
  get(scope, name) {
    if (name) {
      return urls[scope][name]
    }

    return urls[scope]
  }
}
