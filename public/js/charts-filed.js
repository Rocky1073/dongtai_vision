/*filed页面统计图*/

/*----------------------------------------------------------第一个饼状图------------------------------------------------*/
function getSource(scaleData, target) {
  var chartSource = echarts.init(document.getElementById(target));
  var rich = {
    white: {
      color: '#8FC7FB',
      align: 'center',
      padding: [0, 0],
    },
  };
  var data = [];
  // var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
  // var colors = ['#00ffff', '#00c5f3', '#0066df', '#e7cb00', '#e69800', '#e65200', '#e22a00'];
  var color = ['#00ffff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
  var colors = ['#00ffff', '#0066df', '#e7cb00', '#e69800', '#e65200', '#e22a00'];
  for (var i = 0; i < scaleData.length; i++) {
    data.push({
      value: scaleData[i].value,
      name: scaleData[i].name,
      itemStyle: {
        normal: {
          borderWidth: 6,
          shadowBlur: 20,
          borderColor: color[i],
          shadowColor: colors[i],
        },
      },
    });
  }
  var seriesObj = [
    {
      minAngle: 15,
      name: '',
      type: 'pie',
      clockWise: false,
      radius: [60, 64],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: true,
            position: 'outside',
            color: '#fff',
            fontSize: '13',
            formatter: function(params) {
              var percent = 0;
              var total = 0;
              for (var i = 0; i < scaleData.length; i++) {
                total += scaleData[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(2);
              if (params.name !== '') {
                return params.name + '\n{white|' + '占比' + percent + '%}';
              } else {
                return '';
              }
            },
            rich: rich,
          },
          labelLine: {
            fontSize: '14',
            length: 2,
            length2: 50,
            show: true,
            color: '#fff',
            type: 'dashed',
            smooth: true,
          },
        },
      },
      data: data,
    },
  ];
  chartSource.setOption({
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        const result = scaleData.filter(function(item) {
          return item.name === params.name;
        });
        return result[0].integral + ' ：' + params.value;
      },
      backgroundColor: 'rgba(0,0,0,0.7)', // 背景
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
      padding: [8, 10], //内边距
    },
    legend: {
      show: false,
    },
    toolbox: {
      show: false,
    },
    series: seriesObj,
  });
}

/*第二个图*/

/*--------------------------------------------------------第二个柱状图--------------------------------------------------*/

function getTopEvents(xData, data) {
  var ChartColumnar = echarts.init(document.getElementById('echart-columnar'));
  var optionColumnarOne = {
    tooltip: {
      show: 'true',
      trigger: 'item',
      padding: [8, 10], //内边距
    },
    grid: { borderWidth: 0, top: 8, bottom: 45, right: 15, textStyle: { color: '#fff' }, borderColor: '' },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        axisLine: { show: true, lineStyle: { color: '#5EA3E1' } },
        xisLine: { show: true, lineStyle: { color: '#363e83' } },
        axisLabel: {
          interval: 0,
          inside: false,
          rotate: -30,
          textStyle: { color: '#fff', fontWeight: 'normal', fontSize: '12' },
        },
        data: xData,
      },
    ],
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#32346c',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#5EA3E1',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#5EA3E1',
          fontWeight: 'normal',
          fontSize: '12',
        },
        formatter: '{value}',
      },
    },
    series: [
      {
        name: '事件个数',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#2effff',
              },
              {
                offset: 1,
                color: '#009BF9',
              },
            ]),
            barBorderRadius: [50, 50, 1, 1],
            borderWidth: 0,
            shadowColor: 'rgba(105,123, 214, 0.7)',
            shadowBlur: 15,
          },
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(105,123, 214, 0.7)',
          },
        },
        zlevel: 2,
        barWidth: '20%',
        data: data,
      },
    ],
  };
  ChartColumnar.setOption(optionColumnarOne);
}

/*--------------------------------------------------------第三个柱状图--------------------------------------------------*/
function showFileDatas(xData, dataQuc, dataTime, dataDelay) {
  // console.log(xData, dataQuc, dataTime, dataDelay);
  var charAfenbu = echarts.init(document.getElementById('charAfenbu'));
  // var xData = ["苏孟乡", "秋滨街道", "三江街道", "西关街道", "江南街道", "罗埠镇", "洋埠镇", "汤溪镇"];
  // /*快速处理*/
  // var dataQuc = [110, 100, 80, 70, 50, 100, 160, 50];
  // /*按时处理*/
  // var dataTime = [44, 22, 110, 150, 60, 60, 55, 45];
  // /*超市处理*/
  // var dataDelay = [33, 14, 90, 40, 50, 70, 40, 23];
  var optionAfenbu = {
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(37,95,207,0.2)',
        },
      },
      backgroundColor: 'rgba(0,0,0,0.7)', // 背景
      borderColor: '#fff',
      padding: [8, 10], //内边距
      extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
    },
    legend: {
      data: ['快速处理', '按时处理', '超时完成'],
      align: 'right',
      right: 10,
      height: 15,
      textStyle: {
        color: '#fff',
        fontSize: 15,
      },
      itemWidth: 15,
      itemHeight: 15,
      itemGap: 35,
      inactiveColor: '#3AD9FC',
    },
    grid: {
      borderWidth: 0,
      right: 15,
      left: 35,
      top: 40,
      bottom: 25,
      textStyle: {
        color: '#fff',
      },
      borderColor: '',
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5EA3E1',
          },
        },
        xisLine: {
          show: true,

          lineStyle: {
            color: '#363e83',
          },
        },
        axisLabel: {
          interval: 0,
          inside: false,
          textStyle: {
            color: '#5EA3E1',
            fontWeight: 'normal',
            fontSize: '16',
          },
        },
        data: xData,
      },
      {
        type: 'category',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        data: xData,
      },
    ],
    yAxis: {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#32346c',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#5EA3E1',
        },
      },
      axisLabel: {
        textStyle: {
          color: '#5EA3E1',
          fontWeight: 'normal',
          fontSize: '12',
        },
        formatter: '{value}',
      },
    },
    series: [
      {
        name: '快速处理',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#27fcff',
              },
              {
                offset: 1,
                color: '#10dee8',
              },
            ]),
            barBorderRadius: [50, 50, 1, 1],
            borderWidth: 0,
            shadowColor: '#1ec0c3',
            shadowBlur: 15,
          },
          emphasis: {
            shadowBlur: 20,
            shadowColor: '#27fcff',
          },
        },
        zlevel: 2,
        barWidth: '8%',
        data: dataQuc,
      },
      {
        name: '按时处理',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#ffe000',
              },
              {
                offset: 1,
                color: '#edc93a',
              },
            ]),
            barBorderRadius: [50, 50, 1, 1],
            borderWidth: 0,
            shadowColor: '#bf9f32',
            shadowBlur: 15,
          },
          emphasis: {
            shadowBlur: 20,
            shadowColor: '#ffe000',
          },
        },
        zlevel: 2,
        barWidth: '8%',
        data: dataTime,
      },
      {
        name: '超时完成',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#ff5b00',
              },
              {
                offset: 1,
                color: '#ff5b00',
              },
            ]),
            barBorderRadius: [50, 50, 1, 1],
            borderWidth: 0,
            shadowColor: '#c94e00',
            shadowBlur: 15,
          },
          emphasis: {
            shadowBlur: 20,
            shadowColor: '#ff5b00',
          },
        },
        zlevel: 2,
        barWidth: '8%',
        data: dataDelay,
      },
    ],
  };
  charAfenbu.setOption(optionAfenbu);
}

/*--------------------------------------------------------热词展示-----------------------------------------------------*/

function getHotWords(JosnList) {
  var hotWord = echarts.init(document.getElementById('hotWord'));
  // var maskImage = new Image();
  // maskImage.src = '../image/sssss.png';
  var optionHotWord = {
    tooltip: { show: true },
    series: [
      {
        name: '搜索指数',
        type: 'wordCloud',
        size: ['100%', '100%'],
        sizeRange: [12, 36],
        //textRotation: [0, 45, 90, -45],
        rotationRange: [-0, 0],
        left: 'center',
        top: 'center',
        width: '100%',
        height: '80%',
        right: null,
        bottom: null,
        //shape: 'circle',
        // shape: 'circle',
        textPadding: 10,
        autoSize: {
          enable: true,
          minSize: 12,
        },
        textStyle: {
          normal: {
            color: function() {
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 105) + 150,
                  Math.round(Math.random() * 105) + 150,
                  Math.round(Math.random() * 105) + 150,
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            shadowBlur: 10,
            shadowColor: '#333',
          },
        },
        data: JosnList,
      },
    ],
  };
  optionHotWord.series[0].data = JosnList;
  hotWord.setOption(optionHotWord);
}

/*-------------------------------------------------------中间折线图-----------------------------------------------------*/
function showSevenDatas(shangBao, liAn, chuZhi, dates) {
  var centerChart = echarts.init(document.getElementById('centerChart'));
  // var uploadedDataURL = "/asset/get/s/data-1509963075764-ry3rrh6CW.js";
  centerChart.setOption(initBaseline());
  centerChart.setOption({ xAxis: { data: dates }, yAxis: {} });

  function initBaseline() {
    var option = {
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(37,95,207,0.2)',
          },
        },
        backgroundColor: 'rgba(0,0,0,0.7)', // 背景
        borderColor: '#fff',
        padding: [8, 10], //内边距
        extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
      },
      legend: {
        data: ['上报数', '立案数', '处置数'],
        align: 'right',
        right: 10,
        height: 15,
        textStyle: {
          color: '#fff',
          fontSize: 15,
        },
        itemWidth: 15,
        itemHeight: 15,
        itemGap: 35,
        inactiveColor: '#3AD9FC',
      },
      grid: {
        borderWidth: 0,
        right: 15,
        left: 35,
        top: 40,
        bottom: 35,
        textStyle: {
          color: '#fff',
        },
        borderColor: '',
      },

      xAxis: [
        {
          type: 'category',
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#5EA3E1',
            },
          },
          xisLine: {
            show: true,

            lineStyle: {
              color: '#363e83',
            },
          },
          axisLabel: {
            interval: 0,
            inside: false,
            textStyle: {
              color: '#5EA3E1',
              fontWeight: 'normal',
              fontSize: '16',
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          splitNumber: 3,
          axisLabel: {
            textStyle: {
              color: '#6EBFF8',
              fontStyle: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 12,
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#32346c',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#5EA3E1',
            },
          },
          axisTick: {
            show: false,
          },
        },
      ],

      series: [
        {
          name: '上报数',
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'circle',
          hoverAnimation: true,
          legendHoverLink: true,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)',
                  },
                ],
                false,
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 1,
                    color: '#ffae12',
                  },
                  {
                    offset: 0.9,
                    color: '#ffbd15',
                  },
                  {
                    offset: 0.25,
                    color: '#ffe000',
                  },
                  {
                    offset: 0,
                    color: '#fff300',
                  },
                ],
                false,
              ),
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter: function(p) {
                  return p.value > 0 ? p.value : '';
                },
              },
            },
          },
          data: shangBao,
        },
        {
          name: '立案数',
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'circle',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)',
                  },
                ],
                false,
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 1,
                    color: '#f1910f',
                  },
                  {
                    offset: 0.9,
                    color: '#f1910e',
                  },
                  {
                    offset: 0.25,
                    color: '#ff7721',
                  },
                  {
                    offset: 0,
                    color: '#ff7721',
                  },
                ],
                false,
              ),
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter: function(p) {
                  return p.value > 0 ? p.value : '';
                },
              },
            },
          },
          data: liAn,
        },
        {
          name: '处置数',
          type: 'line',
          smooth: true,
          symbolSize: 10,
          symbol: 'circle',
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(0, 136, 212, 0.3)',
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(0, 136, 212, 0)',
                  },
                ],
                false,
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10,
            },
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 1,
                    color: '#09c7ff',
                  },
                  {
                    offset: 0.9,
                    color: '#06ddff',
                  },
                  {
                    offset: 0.25,
                    color: '#00ffff',
                  },
                  {
                    offset: 0,
                    color: '#37fdff',
                  },
                ],
                false,
              ),
              barBorderRadius: 0,
              label: {
                show: false,
                position: 'top',
                formatter: function(p) {
                  return p.value > 0 ? p.value : '';
                },
              },
            },
          },
          data: chuZhi,
        },
      ],
    };

    return option;
  }
}
