export * from './todos'

export enum FilterType {
  All = 'All',
  Unfinished = 'Unfinished',
  Complete = 'Complete',
}

export const filterTypes = [
  FilterType.All,
  FilterType.Unfinished,
  FilterType.Complete
]

export const MapFilterTypeToText = {
  [FilterType.All]: '所有',
  [FilterType.Unfinished]: '未完成',
  [FilterType.Complete]: '完成',
}
