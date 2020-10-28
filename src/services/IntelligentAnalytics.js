import { stringify } from 'qs';
import request from '@/utils/request';

const POST = 'POST';
const GET = 'GET';

// const Link2 = 'http://61.153.37.214:81'; // 正式外网服务器 - 岱山
// const Link = 'http://192.168.71.136:8080'; // 正式外网服务器 - 岱山

/*
export async function getQuotaDataList(params) {
  return request(`${Link2}/api/bigscreen/getQuotaDataList?${stringify(params)}`, { method: GET });
}

export async function getCameraTopThree() {
  return request(`${Link2}/api/bigscreen/getCameraTopThree`, { method: POST });
}

export async function getDeviceState(params) {
  return request(`${Link2}/api/iot/device/state?${stringify(params)}`, { method: GET });
}

export async function getRealTimeAlarmDataList(params) {
  return request(`${Link2}/api/bigscreen/getRealTimeAlarmDataList?${stringify(params)}`, { method: GET });
}

export async function getFourTotalOnline(params) {
  return request(`${Link2}/api/bigscreen/getFourTotalOnline?${stringify(params)}`, { method: GET });
}

export async function getAlarmSortDataList(params) {
  return request(`${Link2}/api/bigscreen/getAlarmSortDataList?${stringify(params)}`, { method: GET });
}

export async function getEventSummarize(params) {
  return request(`${Link2}/api/bigscreen/eventSummarize?${stringify(params)}`, { method: POST });
}
*/

/*
new
*/

// 指标类情况
export async function indicators(params) {
  return request(`${Link}/api/bigscreen/indicators?${stringify(params)}`, { method: POST });
}

// 告警排名
export async function warnRank(params) {
  return request(`${Link}/api/bigscreen/warnRank?${stringify(params)}`, { method: POST });
}

//实时报警
export async function timeWarn() {
  return request(`${Link}/api/bigscreen/timeWarn`, { method: POST });
}

// 指标类情况 地图上部
export async function indicatorsMiddle(params) {
  return request(`${Link}/api/bigscreen/indicatorsMiddle?${stringify(params)}`, { method: POST });
}

// 指标类情况 地图
export async function indicatorsMap(params) {
  return request(`${Link}/api/bigscreen/indicatorsMap?${stringify(params)}`, { method: POST });
}

// 设备设施
export async function equipment(params) {
  return request(`${Link}/api/bigscreen/equipment?${stringify(params)}`, { method: POST });
}

// 违章监控点TOP3
export async function videoTop3(params) {
  return request(`${Link}/api/bigscreen/videoTop3?${stringify(params)}`, { method: POST });
}
