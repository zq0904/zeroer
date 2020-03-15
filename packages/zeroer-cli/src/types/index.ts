import WebpackDevServer from 'webpack-dev-server'

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export interface ProjectConfig {
  domainName: string;
  name: string;
  version: string;
  'dll-entry': { [name: string]: string[] };
  mock: {
    host: string;
    port: number;
  };
  devServer: WebpackDevServer.Configuration & { host: string; port: number };
}
