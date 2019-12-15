module.exports = {
  'dll-entry': {
    // @babel/polyfill 7.4.0之后 已经不推选使用 (原因：这个软件包没有使人们有可能从提供平滑的迁移路径core-js@2到core-js@3)
    _polyfill: ['core-js/stable', 'regenerator-runtime/runtime'], 
    _zero: ['react', 'react-dom', 'react-router-dom', 'prop-types', 'classnames', 'mobx', 'mobx-react', 'axios', 'qs'],
  }
}
