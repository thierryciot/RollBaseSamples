try {
    if (!rbf_isNewUI()) {
        throw 'This Script is written for New UI';
    }

    var onLoad = function () {
        if(console){
            var curWeather = "{!Current_Weather_Conditions}";
            var curTemp = "{!Outside_Temperature}";
            var curTempFar = ({!Outside_Temperature#value} * (9 / 5)) + 32;
            curTempFar = Math.round( curTempFar );
            var curHum = "{!Outside_Humidity}";

            $("#curWeatherId").text(curWeather);

            $("#curTempId").text(curTemp);
            $("#curTempFarId").text(curTempFar);

            $("#curHumidityId").text(curHum);
        }
    };

    rb.newui.util.addEventListener(rb.newui.util.customEvents.rbs_pageRender, onLoad); //instead of document.ready(onLoad) or $(onLoad);
}
catch (err) {
    if (console) {
        console.log(err);
    }
}