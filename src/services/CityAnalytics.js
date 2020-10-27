import { stringify } from 'qs';
import request from '@/utils/request';

const POST = 'POST';
const GET = 'GET';

export async function placeCode() {
  return request(`${Link}/api/bigscreen/getPlaceCode`, { method: POST });
}

// 综合得分排名
export async function allScoreRank(params) {
  return request(`${Link}/api/bigscreen/allScoreRank?${stringify(params)}`, { method: POST });
}

// 进步最大
export async function cityIndex(params) {
  return request(`${Link}/api/bigscreen/cityIndex?${stringify(params)}`, { method: POST });
}

// 城市体征综合指数
export async function mostBetter(params) {
  return request(`${Link}/api/bigscreen/mostBetter?${stringify(params)}`, { method: POST });
}

// 趋势变化
export async function trendChange(params) {
  return request(`${Link}/api/bigscreen/trendChange?${stringify(params)}`, { method: POST });
}

// 区域对比
export async function areaContrast(params) {
  return request(`${Link}/api/bigscreen/areaContrast?${stringify(params)}`, { method: POST });
}
