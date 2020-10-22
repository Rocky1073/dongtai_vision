// var baseurl='http://36.22.189.85:83';
var baseurl = 'http://192.168.71.33:84';

function gflx(data) {
  var hightop = '';
  for (var i = 0; i < data.highTop.length; i++) {
    hightop += `<li><span class="top-num">${i + 1}</span><span class="top-text">${
      data.highTop[i].item
    }</span><span class="yel-digi">${data.highTop[i].count}</span></li>`;
  }
  $('.top-list').empty();
  $('.top-list').append(hightop);
}
function yuanhuan(data) {
  console.log(data);
  var citylist = [];
  var dcllist = [];
  var ycllist = [];
  var wcllist = [];
  for (var i = 0; i < data.length; i++) {
    citylist.push(data[i].area_name);
    dcllist.push(data[i].in_sum.toFixed(2));
    ycllist.push(data[i].over_num.toFixed(2));
    wcllist.push(data[i].money.toFixed(2));
  }
  var chartSource = echarts.init(document.getElementById('ajfbCav'));
  chartSource.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#384757' } } },
      grid: { left: '5%', right: '5%', top: '5%', bottom: '15%' },
      xAxis: [
          {
              type: 'category',
              data: citylist,
              axisLabel: { show: true, textStyle: { color: '#fff', fontSize: '18' } },
              axisLine: { show: true, color: { normal: { color: '#fff' } } },
          },
      ],
      yAxis: [
          {
              name: '不文明现象',
              nameTextStyle: { color: '#fff' },
              axisLabel: { show: true, textStyle: { color: '#fff' } },
              axisLine: { show: true, color: { normal: { color: '#37f4ff' } } },
          },
          { type: 'value', name: '金额', show: true, axisLabel: { show: true, textStyle: { color: '#fff' } } },
      ],
      series: [
          {
              name: '待处理',
              type: 'bar',
              data: dcllist,
              barWidth: '10%',
              yAxisIndex: 0,
              itemStyle: { normal: { color: '#fed700', barBorderRadius: [50, 50, 0, 0] } },
          },
          {
              name: '已处理',
              type: 'bar',
              data: ycllist,
              barWidth: '10%',
              yAxisIndex: 0,
              itemStyle: { normal: { color: '#37f4ff', barBorderRadius: [50, 50, 0, 0] } },
              barGap: '50%',
          },
          {
              name: '金额',
              type: 'line',
              yAxisIndex: 1,
              data: wcllist,
              itemStyle: { normal: { color: '#fe5959', barBorderRadius: [0, 50, 50, 0] } },
              smooth: true,
          },
      ],
  });
}

$.get(baseurl + '/haining_bigscreen/urp/lawhightop/weblist.json', function(data) {
  console.log(data);
  //*案卷分布*//
  $('#ajfb li').click(function() {
    var sum;
    var cavdata;
    var index = $(this).index();
    if (index == 0) {
      sum = data.areaFounds.weekSum;
      cavdata = data.areaFounds.week;
    } else if (index == 1) {
      sum = data.areaFounds.monthSum;
      cavdata = data.areaFounds.month;
    } else {
      sum = data.areaFounds.yearSum;
      cavdata = data.areaFounds.year;
    }
    $('#zbajsum').text(sum.in_sum.toFixed(2));
    $('#jbajsum').text(sum.over_num.toFixed(2));
    $('#fkzje').text(sum.money.toFixed(2));
    yuanhuan(cavdata);
  });
  $('#ajfb li:last-child').trigger('click');

  var listdata;
  var rollhtml = '';
  var xingxinghtml = '';
  var paiminghtml = '';
  listdata = data.personTops.numTop;
  for (var i = 0; i < listdata.length; i++) {
    xingxinghtml = '';
    for (var j = 0; j < listdata[i].star; j++) {
      xingxinghtml += `<img src="image/xingxing.png" alt="">`;
    }
    if (i == '0') {
      paiminghtml = '<div class="paiming"><img src="image/fir-top.png" alt=""></div>';
    } else if (i == '1') {
      paiminghtml = '<div class="paiming"><img src="image/sec-top.png" alt=""></div>';
    } else if (i == '2') {
      paiminghtml = '<div class="paiming"><img src="image/thi-top.png" alt=""></div>';
    } else {
      paiminghtml = '<div class="paiming"><div class="paixu">' + (i + 1) + '</div></div>';
    }
    var namebig;
    if (namelist[listdata[i].name]) {
      namebig = namelist[listdata[i].name];
    } else {
      namebig = 'rentou';
    }

    rollhtml += `<li >
                        <img class="touxiang" src="renyuanimg/${namebig}.jpg" alt="">
                                    <div class="roll-detail">
                                        <p><span class="rentou-name">${listdata[i].name}</span><span>(${listdata[i].place})</span></p>
                                        <p>${xingxinghtml}</p>
                                        <p>主办案卷：<span>${listdata[i].mainNum}</span>件</p>
                                        <p>结办案卷：<span>${listdata[i].overNum}</span>件</p>
                                     
                                    </div>
                                  ${paiminghtml}
                                </li>`;
  }
  $('.roll-con ul').empty();
  $('.roll-con ul').append(rollhtml);
});
