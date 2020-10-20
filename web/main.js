
$('.Query').click(async () => {
  const location_name = $('.location').val()
  const District = $('.district').val()

  const result_T = await eel.weather_element(location_name, District, 'T')()
  const result_P = await eel.weather_element(location_name, District, 'PoP6h')()
  var data_T = {
    x: result_T[0],
    y: result_T[1],
    type: 'scatter',
    name: 'Temp C'
  };
  var data_P = {
    x: result_P[0],
    y: result_P[1],
    type: 'scatter',
    yaxis: 'y2',
    name: 'Rain %'

  };
  var layout = {
    xaxis: {
      title: 'Time',
      type: 'date'
    },
    yaxis: {
      title: 'Temp C',
    },
    yaxis2: {
      title: '降雨機率%',
      titlefont: { color: '#ff9408' },
      tickfont: { color: '#ff9408' },
      overlaying: 'y',
      side: 'right',
      range: [0, 100]
    }
  }

  Plotly.newPlot('myDiv', [data_T, data_P], layout);
  $('#myDiv').hide()
  $('#myDiv').slideDown()

})


$('.location_item').click(function () {
  $('.location').attr('value', $(this).val())
})
$('.district_DL').on('click', '.district_item', function () {
  $('.district').attr('value', $(this).val())
}
)
$('.district').hover(render_droplist)
function render_droplist() {
  $('.district_DL').empty()
  const Distric_reference = {
    '臺北市': ['北投區', '士林區', '內湖區', '中山區', '大同區', '松山區', '南港區', '中正區', '萬華區', '信義區', '大安區', '文山區'],
    '臺中市': ['北屯區', '西屯區', '北區', '南屯區', '西區', '東區', '中區', '南區', '和平區', '大甲區', '大安區', '外埔區', '后里區', '清水區', '東勢區', '神岡區', '龍井區', '石岡區', '豐原區', '梧棲區', '新社區', '沙鹿區', '大雅區', '潭子區', '大肚區', '太平區', '烏日區', '大里區', '霧峰區'],
    '臺南市': ['安南區', '中西區', '安平區', '東區', '南區', '北區', '白河區', '後壁區', '鹽水區',
      '新營區', '東山區', '北門區', '柳營區', '學甲區', '下營區', '六甲區', '南化區',
      '將軍區', '楠西區', '麻豆區', '官田區', '佳里區', '大內區', '七股區', '玉井區',
      '善化區', '西港區', '山上區', '安定區', '新市區', '左鎮區', '新化區', '永康區',
      '歸仁區', '關廟區', '龍崎區', '仁德區'],
    '高雄市': ['楠梓區','左營區','三民區','鼓山區','苓雅區','新興區','前金區','鹽埕區',
      '前鎮區','旗津區','小港區','那瑪夏區','甲仙區','六龜區','杉林區','內門區','茂林區','美濃區','旗山區','田寮區','湖內區','茄萣區','阿蓮區','路竹區','永安區','岡山區','燕巢區','彌陀區','橋頭區','大樹區','梓官區','大社區','仁武區','鳥松區','大寮區','鳳山區','林園區','桃源區'
      ]
  }


    Distric_reference[$('.location').val()].forEach(element => {
      const template = ` <input class="district_item DL_item" type="button" value="${element}">`
      $('.district_DL').append(template)
    });

}


