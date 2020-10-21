// 市容市貌echares图
// 店铺分数echart图
function showStoreScoreMap(dataSingle) {
    var storeScore = echarts.init(document.getElementById('storeScore'));
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '25%',
            bottom: '3%',
            top: '4%',
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#74c1fc',
                fontSize: '16',
                align: 'right'
            },
            data: ['大于80(%)', '60-80(%)', '40-60(%)', '20-40(%)', '小于20(%)']
        },
        series: [
            // {
            //     type: 'bar',
            //     barGap: '-100%',
            //     barWidth: 10,
            //     itemStyle: {
            //         color: '#152576',
            //         barBorderRadius: [0, 5, 5, 0]
            //     },
            //     data: dataAll
            //
            // },
            {
                type: 'bar',
                barGap: '-100%',
                barWidth: 10,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [
                            {offset: 0, color: '#009dff'},
                            {offset: 1, color: '#01f2e6'}
                        ]
                    ),
                    barBorderRadius: [0, 5, 5, 0]
                },
                data: dataSingle
            }
        ]
    };
    storeScore.setOption(option);
}

//商户信用评定
function getstoreStar(scaleData) {
    var storeStar = echarts.init(document.getElementById('storeStar'));
    var rich = {
        white: {
            color: '#8FC7FB',
            align: 'center',
            padding: [0, 0]
        },
        color1: {
            color: '#fff',
            fontFamily: "DS-DIGI",
            fontSize: 22
        },
        color2: {
            color: '#fed700',
            fontFamily: "DS-DIGI",
            fontSize: 18
        },
        color3: {
            color: '#74c1fc',
            fontFamily: "DS-DIGI",
            fontSize: 14
        }
    };
    var placeHolderStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false,
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
    };
    var data = [];
    // var color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000'];
    // var colors = ['#00ffff', '#00c5f3', '#0066df', '#e7cb00', '#e69800', '#e65200', '#e22a00'];
    var color = ['#1c7dfa', '#59c73b', '#37f4ff', '#ff5959', '#fed700'];
    // var colors = ['#00ffff', '#0066df', '#e7cb00', '#e69800', '#e65200'];
    for (var i = 0; i < scaleData.length; i++) {
        data.push({
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 6,
                    // shadowBlur: 20,
                    borderColor: color[i]
                    // shadowColor: colors[i]
                }
            }
        });
    }

    var seriesObj = [{
        minAngle: 20,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
        avoidLabelOverlap: true,
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
                    formatter: function (params) {
                        // var percent = 0;
                        // var total = 0;
                        // for (var i = 0; i < scaleData.length; i++) {
                        //     total += scaleData[i].value;
                        // }
                        // percent = ((params.value / total) * 100).toFixed(2);
                        if (params.name !== '') {
                            return '{color2|' + params.value + '}' + '\n' + '{color3|' + params.name + '}';
                        } else {
                            return '';
                        }
                    },
                    rich: rich
                },
                labelLine: {
                    length: 10,
                    length2: 45,
                    show: true,
                    smooth: true,
                    lineStyle: {
                        // color: 'red',
                        width: 2,
                        type: 'solid'
                    }
                }

            }
        },
        data: data
    }];
    option = {
        // backgroundColor: '#04243E',
        tooltip: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                padding: [8, 10], //内边距
            },
        },
        legend: {
            show: false,
        },
        toolbox: {
            show: false
        },
        series: seriesObj
    };
    storeStar.setOption(option);
}

//商户信用评定
function getstoreCredit(scaleData) {
    var storeCredit = echarts.init(document.getElementById('storeCredit'));
    var rich = {
        white: {
            color: '#8FC7FB',
            align: 'center',
            padding: [0, 0]
        },
        color1: {
            color: '#fff',
            fontFamily: "DS-DIGI",
            fontSize: 22
        },
        color2: {
            color: '#fed700',
            fontFamily: "DS-DIGI",
            fontSize: 18
        },
        color3: {
            color: '#74c1fc',
            fontFamily: "DS-DIGI",
            fontSize: 14
        },
        color4: {
            color: '#fed700',
            fontFamily: "DS-DIGI",
            fontSize: 14
        }
    };
    var placeHolderStyle = {
        normal: {
            label: {
                show: false
            },
            labelLine: {
                show: false,
            },
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
    };
    var data = [];
    var color = ['#1c7dfa', '#59c73b', '#37f4ff', '#ff5959', '#fed700'];
    for (var i = 0; i < scaleData.length; i++) {
        data.push({
            value: scaleData[i].value,
            name: scaleData[i].name,
            itemStyle: {
                normal: {
                    borderWidth: 6,
                    // shadowBlur: 20,
                    borderColor: color[i]
                    // shadowColor: colors[i]
                }
            }
        });
    }
    var seriesObj = [{
        minAngle: 20,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
        avoidLabelOverlap: true,
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
                    formatter: function (params) {
                        // var percent = 0;
                        // var total = 0;
                        // for (var i = 0; i < scaleData.length; i++) {
                        //     total += scaleData[i].value;
                        // }
                        // percent = ((params.value / total) * 100).toFixed(2);
                        if (params.name !== '') {
                            return  '{color2|' + params.value + '}' + '\n' + '{color3|' + params.name + '}';
                        } else {
                            return '';
                        }
                    },
                    rich: rich
                },
                labelLine: {
                    length: 10,
                    length2: 45,
                    show: true,
                    smooth: true,
                    lineStyle: {
                        // color: 'red',
                        width: 2,
                        type: 'solid'
                    }
                }

            }
        },
        data: data
    }];
    option = {
        // backgroundColor: '#04243E',
        tooltip: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
                padding: [8, 10], //内边距
            },
        },
        legend: {
            show: false,
        },
        toolbox: {
            show: false
        },
        series: seriesObj
    };
    storeCredit.setOption(option);
}