var x=document.getElementById("chart1");
var y=document.getElementById("chart2");
var z=document.getElementById("chart3");
x.addEventListener("mousemove", myfunction1);
y.addEventListener("mousemove", myfunction2);
z.addEventListener("mousemove", myfunction3);


function myfunction1(){
  document.getElementById("title").innerHTML = "該產業之單日負載預測"
};

function myfunction2(){
  document.getElementById("title").innerHTML = "用戶過去用電習慣"
};

function myfunction3(){
  document.getElementById("title").innerHTML = "用戶地址"
};
window.onload=Show;

// 
function Show(){
  Plotly.d3.csv("output/industry_output_0.csv", function(rows){
        var trace = {
          type: 'scatter',                    // set the chart type
          mode: 'lines',                      // connect points with lines
          x: rows.map(function(row){          // set the x-data
            return row['date'];
          }),
          y: rows.map(function(row){          // set the y-data
            return row['value'];
          }),
          line: {                             // set the width of the line.
            width: 2
          },
          
        };
          
          var data=[trace]
          var layout = {
            width: 650,
            yaxis: {title: "Requirement (kW)",
                  
                    fixedrange:true
                    },       // set the y axis title
            xaxis: {
              showgrid: false,                  // remove the x-axis grid lines
              tickformat: "%H:00" // customize the date format to "month, day"
            },
            
            margin: {
              r:50, l:50, t:50, b:50
            }
          
          };

          Plotly.newPlot(document.getElementById('chart1'), [trace], layout, {showLink: false});
      });

      };


ZC.LICENSE = ['7b185ca19b4be2cba68fdcd369c663a9'];


zingchart.render({
  id: 'chart5',
  height: '100%',
  width: '100%',
  data: {
    type: 'line',
    backgroundColor: "white",
    title: {
      text: "時段分布",
      textAlign: "center",
      fontColor: "black"
    },
    plot: {
      aspect: "spline",
      marker: {
        visible: false
      },
      margin: "dynamic"
    },
    tooltip: {
      fontColor: "black"

    },
    scaleX: {
      visible: false
    },
    scaleY: {
      lineColor: "black",
      tick: {
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        lineColor: "#ffde7b"
      }
    },
    series: [{
      values: generateSeriesData(100),
      lineColor: "black",
      lineWidth: "2px"
    }]
  }
});

zingchart.render({
  id: 'chart8',
  height: '100%',
  width: '100%',
  data: {
    type: 'bar',
    backgroundColor: 'white',
    plotarea: {
      margin: 'dynamic'
    },
    title: {
      text: "時段統計",
      textAlign: "center",
      fontColor: "black",
      adjustLayout: true
    },
    subtitle: {
      fontColor: "black",
      textAlign: "left"
    },
    scaleX: {
      lineColor: "transparent",
      item: {
        fontColor: "black",
      },
      tick: {
        lineColor: "transparent",
      },
      labels: ["A", "B", "C", "D"]
    },
    scaleY: {
      maxValue:10,
      lineColor: "transparent",
      item: {
        fontColor: "black"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      tick: {
        lineColor: "black",
      }
    },
    plot: {
      hoverState: {
        visible: false
      },
      valueBox: {
        placement: 'top'
      },
      tooltip: {
        visible: false
      }
    },
    series: [{
      values: [2, 3, 5, 6],
      backgroundColor:'skyblue'
    }]
  }
})

function generateSeriesData(num) {
  var values = [];
  var startDate = 1349617440000;
  for (var i = 0; i < num; i++) {
    values.push([(startDate + (i * 50000)), Math.floor(Math.random() * 30)])
  }
  return values;
}


//right  section
$( 'section' ).on('click', function() {
  $( this )
    .find('header').toggleClass('show')
    .siblings('div').slideToggle();
});

// // map
var map;
var directions;

function initMap() {
    
  map = new google.maps.Map(document.getElementById('chart3'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
    });
    
    
    google.maps.event.addListener(map,"zoomchanged",function(e){
      alert("changed")})

  
  //簡歷DirectionService物件
  directions= new google.maps.DirectionsService();
  //建立路徑規劃
  directions.route(
    { origin:"台北市羅斯福路四段一號",
      destination:"台北市大安區基隆路四段75號",
      travelMode:google.maps.TravelMode.TRANSIT,
    },
    function(results/*DirectionResult*/)
    {console.log(results);
      
      new google.maps.DirectionsRenderer(
        {directions:results,/*directions屬性需要 DirectionsResult物件*/
          map:map,
          panel:document.getElementById('result'),
          
        }
      );
    }
  );
} 
    
//form

$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li');
  
    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });
  
    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

//plot
function plot1(){
      var i=document.getElementById("industry").value;
      Plotly.d3.csv("output/industry_output_"+String(i)+".csv", function(rows){
        var trace = {
          type: 'scatter',                    // set the chart type
          mode: 'lines',                      // connect points with lines
          x: rows.map(function(row){          // set the x-data
            return row['date'];
          }),
          y: rows.map(function(row){          // set the y-data
            return row['value'];
          }),
          line: {                             // set the width of the line.
            width: 2
          },
          
        };
          
          var data=[trace]
          var layout = {
            width: 650,
            yaxis: {title: "Requirement (kW)",
                  
                    fixedrange:true
                    },       // set the y axis title
            xaxis: {
              showgrid: false,                  // remove the x-axis grid lines
              tickformat: "%H:00" // customize the date format to "month, day"
            },
            
            margin: {
              r:50, l:50, t:50, b:50
            }
          
          };

          Plotly.newPlot(document.getElementById('chart1'), [trace], layout, {showLink: false});
      });

      document.getElementById("pic").src="output/past/"+String(i)+".png"
      };

//price
function price(){
  $({countNum: $('.counter1').text()
    }).animate({countNum: 960}, {duration: 3000,easing: 'linear',
    
    step: function () {
      $('.counter1').text(Math.ceil(this.countNum));
    },
    complete: function () {
      $('.counter1').text("960");
    }
    
    });
};
