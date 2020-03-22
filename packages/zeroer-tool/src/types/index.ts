/**
 * 构建的类型
 */
export enum BuildType {
  /** 纯ts项目 */
  Ts = 'ts',
}

/**
 * 构建版本的类型
 */
export enum BuildVersion {
  umd = 'umd',
  cjs = 'cjs',
  esm = 'esm',
  esmStreamline = 'esm-streamline',
}

/**
 * 构建的环境类型
 */
export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

/**
 * 由于使用了 minimist program 统一默认的命令行参数
 */
export const defaultCommandLineArgs = {
  config: 'project.config.ts',
}

/**
 * 项目的配置文件
 */
export interface ProjectConfig {
  /**
   * 构建umd版本 导出的全局变量名
   */
  'umd-global-variable-name'?: string;
  /**
   * 扩展名数组 用于babel等转换的扩展名数组
   */
  extensions?: string[];
}
