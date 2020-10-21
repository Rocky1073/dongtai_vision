/*-----------------------------------------------违章建筑chart---------------------------------------------*/


/*-----------------------------------------------违章建筑曲线图开始---------------------------------------------*/
// var wj = [19, 18, 32, 22, 25, 19, 14];
// var wjName = ['住宅', '商用', '厂房', '厂库', '养殖', '广告设施', '其他'];


function wjytFuc(wj,wjName) {
    var wjLineChart = echarts.init(document.getElementById('wj-line'));
    wjLineChart.setOption(wjLine());
    wjLineChart.setOption({

        xAxis: {
            data: wjName
        },
        yAxis: {},
        series: [{
            type: 'line',
            data: wj,
        }]
    });
}

function wjLine() {
    var option = {
        tooltip: {
            show:true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle:{
                    color:'rgba(37,95,207,0.2)',
                }
            },
            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            borderColor:'#fff',
            padding: [8, 10], //内边距
            extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
        },
        grid: {
            borderWidth: 0,
            right:5,
            left:40,
            top: 15,
            bottom: 35,
            textStyle: {
                color: "#fff"
            },
            borderColor:''
        },

        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
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
                interval:0,
                inside: false,
                textStyle: {
                    color: '#5EA3E1',
                    fontWeight: 'normal',
                    fontSize: '14',
                },
            },
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 3,
            axisLabel: {
                textStyle: {
                    color: '#6EBFF8',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12

                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#32346c',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#5EA3E1',
                }
            },
            axisTick: {
                show: false
            },
        }],

        series: [
            {
                name: '违建面积',
                type: 'line',
                smooth: true,
                symbolSize: 7,
                symbol: 'circle',
                hoverAnimation:true,
                legendHoverLink:true,
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 1)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0.1)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.2)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 1,
                            color: '#09c7ff'
                        }, {
                            offset: 0.9,
                            color: '#06ddff'
                        }, {
                            offset: 0.25,
                            color: '#00ffff'
                        }, {
                            offset: 0,
                            color: '#37fdff'
                        }], false),
                        barBorderRadius: 0,
                        label: {
                            show: false,
                            position: 'top',
                            formatter: function(p) {
                                return p.value > 0 ? (p.value) : '';
                            }
                        }
                    }
                },
            }
        ]
    };
    return option;
}
/*-----------------------------------------------违章建筑曲线图结束---------------------------------------------*/

/*-----------------------------------------------违章数量柱状图开始---------------------------------------------*/

// var category = ['苏孟乡', '秋滨街道', '三江街道', '西关街道', '江南街道', '罗埠镇', '洋埠镇', '汤溪镇'];
// var lineData = [45, 33, 38, 29, 27, 47, 38, 31];
// var barData = [20, 22, 30, 27, 15, 40, 32, 24];
function wjmjFuc(category,lineData,barData) {
    var wjbarChart = echarts.init(document.getElementById('wj-bar'));
    wjbarChart.setOption(wjBar(category,lineData,barData));
}

function wjBar() {
    // option
    var option = {
        tooltip: {
            show:true,
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                shadowStyle:{
                    color:'rgba(37,95,207,0.2)',
                }
            },

            backgroundColor: 'rgba(0,0,0,0.7)', // 背景
            borderColor:'#fff',
            padding: [8, 10], //内边距
            extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
            formatter: '{b0}总违建: {c1}<br />{b1}已拆除: {c0}',
        },
        grid: {
            borderWidth: 0,
            right:5,
            left:40,
            top: 78,
            bottom: 35,
            textStyle: {
                color: "#fff"
            },
            borderColor:''
        },
        legend: {
            data: ['总违建', '已拆除'],
            right:0,
            top:16,
            textStyle: {
                color: "#fff",
                fontSize:15,
            },
            itemWidth: 15,
            itemHeight: 15,
            itemGap: 35,
            inactiveColor:'#3AD9FC'
        },
        xAxis: [{
            data:category,
            type: 'category',
            axisTick: {
                show: false
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
                interval:0,
                inside: false,
                textStyle: {
                    color: '#5EA3E1',
                    fontWeight: 'normal',
                    fontSize: '14',
                },
                formatter:function(params){
                    var newParamsName = "";// 最终拼接成的字符串
                    var paramsNameNumber = params.length;// 实际标签的个数
                    var provideNumber = 2;// 每行能显示的字的个数
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整
                    /**
                     * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                     */
                    // 条件等同于rowNumber>1
                    if (paramsNameNumber > provideNumber) {
                        /** 循环每一行,p表示行 */
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";// 表示每一次截取的字符串
                            var start = p * provideNumber;// 开始截取的位置
                            var end = start + provideNumber;// 结束截取的位置
                            // 此处特殊处理最后一行的索引值
                            if (p == rowNumber - 1) {
                                // 最后一次不换行
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                // 每一次拼接字符串并换行
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;// 最终拼成的字符串
                        }

                    } else {
                        // 将旧标签的值赋给新标签
                        newParamsName = params;
                    }
                    //将最终的字符串返回
                    return newParamsName
                }
            },
        }],
        yAxis: [{
            type: 'value',
            splitNumber: 3,
            axisLabel: {
                textStyle: {
                    color: '#6EBFF8',
                    fontStyle: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12

                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#32346c',
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: '#5EA3E1',
                }
            },
            axisTick: {
                show: false
            },
        }],
        series: [{
            name: '已拆除',
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#edc93a'},
                            {offset: 1, color: '#ffe000'}
                        ]
                    ),
                    borderWidth: 0,
                    shadowColor: '#dfc300',
                    shadowBlur:10
                },

            },
            data: barData
        }, {
            name: '总违建',
            type: 'bar',
            barGap: '-100%',
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#7000F2'},
                            {offset: 1, color: '#8825ff'}
                        ]
                    )
                }
            },
            z: -12,
            data: lineData
        }, ]
    };
    return option;
}



/*-----------------------------------------------违章建筑柱形结束---------------------------------------------*/







