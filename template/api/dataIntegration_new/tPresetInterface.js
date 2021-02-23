// 引用封装后的axios
import api from '@/libs/ajax/http'
// 引用服务名
import {appServer} from '../appServer'

// 获取数据列表
export function getTPresetInterfaceList(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTPresetInterfaceList',
    params: {...params}
  })
}

// 新增及修改方法
export function saveTPresetInterface(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'saveTPresetInterface',
    data: {...params}
  })
}

export function saveTableinfo(params) {
  return api({
    method: 'post',
    url: appServer.data + 'createTableInfo',
    data: {...params}
  })
}

// 逻辑删除
export function delTPresetInterface(params) {
  return api({
    method: 'post',
    url: appServer.integrate + 'delTPresetInterface',
    params: {...params}
  })
}

// 查询所有列表
export function getTPresetInterfaceById() {
  return api({
    method: 'get',
    url: appServer.integrate + 'getTPresetInterfaceAll'
  })
}

export function startOrStopTPresetInterfaceById(params) {
  return api({
    method: 'get',
    url: appServer.integrate + 'startOrStopTPresetInterfaceById',
    params: {...params}
  })
}
