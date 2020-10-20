import { stringify } from 'qs';
import request from '@/utils/request';

const POST = 'POST';
const GET = 'GET';

export async function getQuotaDataList(params) {
  return request(`${Link}/bigscreen/getQuotaDataList?${stringify(params)}`, { method: GET });
}

export async function getCameraTopThree() {
  return request(`${Link}/bigscreen/getCameraTopThree`, { method: POST });
}

export async function getDeviceState(params) {
  return request(`${Link}/iot/device/state?${stringify(params)}`, { method: GET });
}

export async function getRealTimeAlarmDataList(params) {
  return request(`${Link}/bigscreen/getRealTimeAlarmDataList?${stringify(params)}`, { method: GET });
}

export async function getFourTotalOnline(params) {
  return request(`${Link}/bigscreen/getFourTotalOnline?${stringify(params)}`, { method: GET });
}

export async function getAlarmSortDataList(params) {
  return request(`${Link}/bigscreen/getAlarmSortDataList?${stringify(params)}`, { method: GET });
}

export async function getEventSummarize(params) {
  return request(`${Link}/bigscreen/eventSummarize?${stringify(params)}`, { method: POST });
}
