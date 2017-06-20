if(cards){
    for(var i=0;i<cards.length;i++){
        var card = $(cards[i]);
        var tempSliderEle = card.find('.temperature');
        var tempSlider = tempSliderEle.data('kendoSlider');
        var recUid = card.attr('data-uid');
        if(recUid){
            var rec = dataSource.getByUid(recUid);
            var recId = rec["recordId"];
            var currTempVal = rec["Set_Temperature"];
            var confirmMsgEle = card.find('.confirmTempChange');
            var setTempValue = rec["Set_Temperature"];
            if(!tempSlider){
                tempSliderEle.kendoSlider({
                    max:100,
                    min:0,
                    value:currTempVal,
                    dragHandleTitle:'Drag to change temperature',
                    tickPlacement:'bottomRight',
                    recId:recId,
                    currTempVal:currTempVal,
                    change:function(e){
                        var value = e.value;
                        changeTemperatureVal(value,confirmMsgEle,dataSource,this.options["recId"],this,this.options["currTempVal"]);
                    }
                });
            }
            createChart(card,rec);
            var diff = Math.abs(rec["Current_Temperature"] - setTempValue);
            if(diff > 2){
                card.find('.card-redflag').show();
            }
        }
    }
}
function changeTemperatureVal(value, confirmMsgEle, dataSource, recId, slider, currTempVal){
//   debugger;
    var confirmDlg =  confirmMsgEle.data('kendoConfirm');
    if(!confirmDlg){
        confirmDlg =confirmMsgEle.kendoConfirm({
            content: "Do you want to change room temperature?",
        }).data("kendoConfirm")
    }
    if(!confirmDlg) return;
    confirmDlg.wrapper.find('.k-header').css('padding','0px');
    confirmDlg.element.css('padding','10px');
    confirmDlg.result.done(function(){
        rbf_setField('Room',recId,'Set_Temperature',value,false,function(){
            console.log("Successfully updated field value")
            dataSource.read();
        })
    }).fail(function(){
        slider.value(currTempVal);
        console.log("User aborted temp value")
    })
}

function createChart(cardEle,record) {
    var humidityEle = cardEle.find('.card-humidity');
    var recHValue= Number(record['Humidity']);
    humidityEle.kendoChart({
        legend: {
            visible: false
        },
        series: [{
            type: "bullet",
            color:'#0277BD',
            data: [[recHValue,65]]
        }],
        chartArea: {
            margin: {
                left: 0
            }
        },
        categoryAxis: {
            majorGridLines: {
                visible: false
            },
            majorTicks: {
                visible: false
            }
        },
        valueAxis: [{
            plotBands: [{
                from: 0, to: 35, color: "green", opacity: .4
            }, {
                from: 35, to: 65, color: "orange", opacity: .4
            },{
                from: 65, to: 100, color: "red", opacity: .4
            }],
            majorGridLines: {
                visible: false
            },
            min: 0,
            max: 100,
            minorTicks: {
                visible: true
            }
        }],
        tooltip: {
            visible: true,
            template: "Current Value: #= value.target #"
        }
    });
    var co2Ele = cardEle.find('.card-co2');
    var recco2Value= Number(record['CO2_']);
    co2Ele.kendoChart({
        legend: {
            visible: false
        },
        series: [{
            type: "bullet",
            color:'#0277BD',
            data: [[recco2Value,1000]]
        }],
        chartArea: {
            margin: {
                left: 0
            }
        },
        categoryAxis: {
            majorGridLines: {
                visible: false
            },
            majorTicks: {
                visible: false
            }
        },
        valueAxis: [{
            plotBands: [{
                from: 0, to: 350, color: "green", opacity: .4
            }, {
                from: 350, to: 1000, color: "orange", opacity: .4
            },{
                from: 1000, to: 2000, color: "red", opacity: .4
            }],
            majorGridLines: {
                visible: false
            },
            min: 0,
            max: 2000,
            minorTicks: {
                visible: true
            }
        }],
        tooltip: {
            visible: true,
            template: "Current Value: #= value.target #"
        }
    });
    var vocEle = cardEle.find('.card-voc');
    var recVocValue= Number(record['VOCs_']);
    vocEle.kendoChart({
        legend: {
            visible: false
        },
        series: [{
            type: "bullet",
            color:'#0277BD',
            data: [[recVocValue,10]]
        }],
        categoryAxis: {
            majorGridLines: {
                visible: false
            },
            majorTicks: {
                visible: false
            }
        },
        valueAxis: [{
            plotBands: [{
                from: 0, to: 3, color: "green", opacity: .4
            }, {
                from: 3, to: 10, color: "orange", opacity: .4
            },{
                from: 10, to: 20, color: "red", opacity: .4
            }],
            majorGridLines: {
                visible: false
            },
            min: 0,
            max: 20,
            minorTicks: {
                visible: true
            }
        }],
        tooltip: {
            visible: true,
            template: "Current Value: #= value.target #"
        }
    });
}