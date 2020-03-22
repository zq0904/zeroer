/**
 * 构建的类型
 */
export enum BuildType {
  /** 纯ts项目 */
  Ts = 'ts',
}

/**
 * 构建的版本
 */
export enum BuildVersion {
  umd = 'umd',
  cjs = 'cjs',
  esm = 'esm',
  esmStreamline = 'esm-streamline',
}

export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}
