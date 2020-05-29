import { TodoAction } from './todos'
export * from './todos'

/**
 * 所有模块的action
 */
export type Actions = TodoAction

/**
 * 过滤类型
 */
export enum FilterType {
  All = 'All',
  Unfinished = 'Unfinished',
  Complete = 'Complete',
}

/**
 * 展示的过滤类型
 */
export const filterTypes = [
  FilterType.All,
  FilterType.Unfinished,
  FilterType.Complete
]

/**
 * 根据 展示的过滤类型 映射 文案
 */
export const MapFilterTypeToText = {
  [FilterType.All]: '所有',
  [FilterType.Unfinished]: '未完成',
  [FilterType.Complete]: '完成',
}
