import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // { path: "/", name: "Home", component: Home },
  {
    path: '/intelligent-analytics',
    name: 'IntelligentAnalytics',
    component: () => import('../views/IntelligentAnalytics/IntelligentAnalytics.vue'),
  },
  {
    path: '/street-analysis',
    name: 'StreetAnalysis',
    component: () => import('../views/StreetAnalysis/StreetAnalysis.vue'),
  },
];

const router = new VueRouter({ base: '/dongtai_vision/', routes });

export default router;


/*
负责前端与服务端开发工作，兼任项目助理，保证项目按正常节点推进与后期更新维护。
独立负责前端项目开发
1、负责前台架构的搭建，功能开发
1、基于Antd-Pro脚手架与React提高开发效率
2、使用ES6与Babel实现功能提高代码质量
3、使用AntV与Echarts做数据可视化解决方案
4、配合后台工程师实现各类数据的交互
服务端Java项目开发
1、基于SpringBoot与MyBatis，开发业务接口
2、设计Oracle和MySQL表结构，做数据库性能调优经验
3、用Tomcat、WebLogic、Maven部署项目
4、运营维护Linux集群


担任前端工程师职务，从事产品开发项目工作，兼任省执法项目助理。
1. 负责前台架构的搭建，功能开发
2. 技术规格制定以及负责代码质量管理
3. 保证项目按照时间节点正常推进
4. 保证后期改版与更新维护

开发环境：IDEA+Nginx+Git+npm
技术架构：React+ES6+Umi+dva+antd+lodash
项目描述：通过对浙江省司法厅综合行政执法指导办公室在执法工作上的现状和存在的问题进行了剖析，为指导全省的执法项目，提出了主动感知、快速响应以及案件流转等执法目标，并开发实现。
个人职责：
1. 负责前台架构的搭建，功能开发
2. 技术规格制定以及负责代码质量管理
3. 保证项目按照时间节点正常推进
4. 配合后台工程师实现各类数据的交互
5. 保证后期改版及更新维护

前端采用MX架构，JS原生实现页面。UAP平台，技术栈采用Spring MVC，hibernate，oracle，Sotower BPM，Smart BI，tomcat，nginx，Memcache服务器缓存，session共享。
*/
