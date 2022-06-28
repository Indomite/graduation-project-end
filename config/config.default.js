/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql: {
      // 数据库信息配置
      client: {
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '',
        database: 'graduation_project_mysql',
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
      // 允许访问接口的白名单
      domainWhiteList: [ 'http://localhost:8080' ],
    },
    multipart: {
      mode: 'file',
      fileSize: '50mb',
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1645859780744_7845';

  config.middleware = [];

  config.jwt = {
    secret: 'Indomite',
    expiresIn: '1h',
  };

  config.session = {
    key: 'EGG_SESSION',
    maxAge: 1000*60*5,
    encrypt: true
  }

  // 跨域配置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,PUT,POST,DELETE',
  };

  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};