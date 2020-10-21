function getBiaoPan(rateV,crateV,arateV,jrateV) {

    /*实例化*/
    var mylianlv = echarts.init(document.getElementById('lianlv'));
    var chuzhilv = echarts.init(document.getElementById('chuzhilv'));
    var anshilv = echarts.init(document.getElementById('anshilv'));
    var jieanlv = echarts.init(document.getElementById('jieanlv'));


    /*表盘配置项*/
    var rate = rateV;
    var linear_color = {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#00fcec',
            borderColor: '#192050',
        }, {
            offset: 1,
            color: '#009ffe',
            borderColor: '#192050',
        }]
    };
    var option = {
        // backgroundColor: '#fff',
        title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 30,
            fontStyle: 'italic',
            offsetCenter: [0, '100%'],
        },
        series: [{
            name: '辅助', //建立环形图辅助界面
            type: 'pie',
            hoverAnimation: false,
            startAngle: 180,
            center: ["50%", '70%'],
            radius: ['70%', '100%'],
            labelLine: {
                show: false
            },
            data: [{
                value: rate / 2,
                itemStyle: {
                    normal: {
                        color: linear_color,
                        // borderColor: "#20275E",
                        borderWidth: 1,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    },
                }
            }, {
                value: 0.5 - rate / 2,
                itemStyle: {
                    normal: {
                        color: '#1e2761',
                        // borderColor: '#192050',
                        borderWidth: 3,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 5,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    }
                }
            }, {
                value: 0.5,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)',

                    }
                }
            }]
        }, {
            name: '转化率',
            type: 'gauge',
            hoverAnimation: false,
            min: 0,
            max: 100,
            splitNumber: 5,
            startAngle: 180,
            endAngle: 0,
            center: ["50%", '70%'],
            radius: '90%',
            data: [rate * 100],
            splitLine: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: [
                        [1, linear_color],
                    ],
                    width: 0,

                }
            },
            axisTick: {
                show: false,
            },
            itemStyle: {
                shadowColor: '#1E2454',
                shadowBlur: 20
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: true,
                length: '40%',
                width: 5,
            },
            detail: {
                formatter: (rate * 100).toFixed(1) + '%',
                color: '#fff',
                fontWeight: 'bolder',
                fontSize: 30,
                offsetCenter: ['8%', '51%'],
                fontWeight: 'bolder',
                fontFamily: "DS-DIGI"
            }
        }]
    };
    mylianlv.setOption(option);


    /*处置率*/
    /*表盘配置项*/
    var crate = crateV;
    var clinear_color = {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#F6CF57',
            borderColor: '#192050',
        }, {
            offset: 1,
            color: '#ff7808',
            borderColor: '#192050',
        }]
    };
    var coption = {
        // backgroundColor: '#fff',
        title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 30,
            fontStyle: 'italic',
            offsetCenter: [0, '100%'],
        },
        series: [{
            name: '辅助', //建立环形图辅助界面
            type: 'pie',
            hoverAnimation: false,
            startAngle: 180,
            center: ["50%", '70%'],
            radius: ['70%', '100%'],
            labelLine: {
                show: false
            },
            data: [{
                value: crate / 2,
                itemStyle: {
                    normal: {
                        color: clinear_color,
                        // borderColor: "#20275E",
                        borderWidth: 1,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    },
                }
            }, {
                value: 0.5 - rate / 2,
                itemStyle: {
                    normal: {
                        color: '#1e2761',
                        // borderColor: '#192050',
                        borderWidth: 3,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 5,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    }
                }
            }, {
                value: 0.5,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)',

                    }
                }
            }]
        }, {
            name: '转化率',
            type: 'gauge',
            hoverAnimation: false,
            min: 0,
            max: 100,
            splitNumber: 5,
            startAngle: 180,
            endAngle: 0,
            center: ["50%", '70%'],
            radius: '90%',
            data: [crate * 100],
            splitLine: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: [
                        [1, clinear_color],
                    ],
                    width: 0,

                }
            },
            axisTick: {
                show: false,
            },
            itemStyle: {
                shadowColor: '#1E2454',
                shadowBlur: 20
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: true,
                length: '40%',
                width: 5,
            },
            detail: {
                formatter: (crate * 100).toFixed(1) + '%',
                color: '#fff',
                fontWeight: 'bolder',
                fontSize: 30,
                offsetCenter: ['8%', '51%'],
                fontWeight: 'bolder',
                fontFamily: "DS-DIGI"
            }
        }]
    };
    chuzhilv.setOption(coption);


    /*按时结案率*/
    /*表盘配置项*/
    var arate = arateV;
    var alinear_color = {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#77E750',
            borderColor: '#192050',
        }, {
            offset: 1,
            color: '#17A830',
            borderColor: '#192050',
        }]
    };
    var aoption = {
        // backgroundColor: '#fff',
        title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 30,
            fontStyle: 'italic',
            offsetCenter: [0, '100%'],
        },
        series: [{
            name: '辅助', //建立环形图辅助界面
            type: 'pie',
            hoverAnimation: false,
            startAngle: 180,
            center: ["50%", '70%'],
            radius: ['70%', '100%'],
            labelLine: {
                show: false
            },
            data: [{
                value: arate / 2,
                itemStyle: {
                    normal: {
                        color: alinear_color,
                        // borderColor: "#20275E",
                        borderWidth: 1,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    },
                }
            }, {
                value: 0.5 - arate / 2,
                itemStyle: {
                    normal: {
                        color: '#1e2761',
                        // borderColor: '#192050',
                        borderWidth: 3,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 5,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    }
                }
            }, {
                value: 0.5,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)',

                    }
                }
            }]
        }, {
            name: '转化率',
            type: 'gauge',
            hoverAnimation: false,
            min: 0,
            max: 100,
            splitNumber: 5,
            startAngle: 180,
            endAngle: 0,
            center: ["50%", '70%'],
            radius: '90%',
            data: [arate * 100],
            splitLine: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: [
                        [1, alinear_color],
                    ],
                    width: 0,

                }
            },
            axisTick: {
                show: false,
            },
            itemStyle: {
                shadowColor: '#1E2454',
                shadowBlur: 20
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: true,
                length: '40%',
                width: 5,
            },
            detail: {
                formatter: (arate * 100).toFixed(1) + '%',
                color: '#fff',
                fontWeight: 'bolder',
                fontSize: 30,
                offsetCenter: ['8%', '51%'],
                fontWeight: 'bolder',
                fontFamily: "DS-DIGI"
            }
        }]
    };
    anshilv.setOption(aoption);

    /*按时结案率0*/
    /*表盘配置项*/
    var jrate = jrateV;
    var jlinear_color = {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
            offset: 0,
            color: '#F97B2E',
            borderColor: '#192050',
        }, {
            offset: 1,
            color: '#E12E24',
            borderColor: '#192050',
        }]
    };
    var joption = {
        // backgroundColor: '#fff',
        title: {
            // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 30,
            fontStyle: 'italic',
            offsetCenter: [0, '100%'],
        },
        series: [{
            name: '辅助', //建立环形图辅助界面
            type: 'pie',
            hoverAnimation: false,
            startAngle: 180,
            center: ["50%", '70%'],
            radius: ['70%', '100%'],
            labelLine: {
                show: false
            },
            data: [{
                value: jrate / 2,
                itemStyle: {
                    normal: {
                        color: jlinear_color,
                        // borderColor: "#20275E",
                        borderWidth: 1,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    },
                }
            }, {
                value: 0.5 - jrate / 2,
                itemStyle: {
                    normal: {
                        color: '#1e2761',
                        // borderColor: '#192050',
                        borderWidth: 3,
                        shadowColor: '#20275E', //默认透明
                        shadowOffsetX: 5,
                        shadowOffsetY: 0,
                        shadowBlur: 10,
                    }
                }
            }, {
                value: 0.5,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0)',

                    }
                }
            }]
        }, {
            name: '转化率',
            type: 'gauge',
            hoverAnimation: false,
            min: 0,
            max: 100,
            splitNumber: 5,
            startAngle: 180,
            endAngle: 0,
            center: ["50%", '70%'],
            radius: '90%',
            data: [jrate * 100],
            splitLine: {
                show: false,
            },

            axisLine: {
                lineStyle: {
                    color: [
                        [1, jlinear_color],
                    ],
                    width: 0,

                }
            },
            axisTick: {
                show: false,
            },
            itemStyle: {
                shadowColor: '#1E2454',
                shadowBlur: 20
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                show: true,
                length: '40%',
                width: 5,
            },
            detail: {
                formatter: (jrate * 100).toFixed(1) + '%',
                color: '#fff',
                fontWeight: 'bolder',
                fontSize: 30,
                offsetCenter: ['8%', '51%'],
                fontWeight: 'bolder',
                fontFamily: "DS-DIGI"
            }
        }]
    };
    jieanlv.setOption(joption);

}

