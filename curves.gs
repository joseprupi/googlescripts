function CURVENODES(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints, OISPoints, DatedOISPoints,
                           bootstrapTrait, compounding, dayCounter, interpolator, asOfDate){

  var Points = new Array();
  
  for (var i = 0; i < depositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": depositPoints[i][0],
      "TenorTimeUnit": depositPoints[i][1],
      "TenorNumber": depositPoints[i][2],
      "FixingDays": depositPoints[i][3],
      "Calendar": depositPoints[i][4],
      "BusinessDayConvention": depositPoints[i][5],
      "DayCounter": depositPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < FRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": FRAPoints[i][0],
      "MonthsToStart": FRAPoints[i][1],
      "MonthsToEnd": FRAPoints[i][2],
      "FixingDays": FRAPoints[i][3],
      "Calendar": FRAPoints[i][4],
      "BusinessDayConvention": FRAPoints[i][5],
      "DayCounter": FRAPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < futurePoints.length; i++){
    var point ={
      "type": "Future",
      "Rate": futurePoints[i][0],
      "FutureStartDate": futurePoints[i][1],
      "FutMonths": futurePoints[i][2],
      "Calendar": futurePoints[i][3],
      "BusinessDayConvention": futurePoints[i][4],
      "DayCounter": futurePoints[i][5]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < swapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": swapPoints[i][0],
      "TenorTimeUnit": swapPoints[i][1],
      "TenorNumber": swapPoints[i][2],
      "Calendar": swapPoints[i][3],
      "SwFixedLegFrequency": swapPoints[i][4],
      "SwFixedLegConvention": swapPoints[i][5],
      "SwFixedLegDayCounter": swapPoints[i][6],
      "SwFloatingLegIndex": swapPoints[i][7],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < bondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":bondPoints[i][0],
      "FixingDays":bondPoints[i][1],
      "FaceAmount":bondPoints[i][2],
      "CouponRate":bondPoints[i][3],
      "DayCounter":bondPoints[i][4],
      "BusinessDayConvention":bondPoints[i][5],
      "Redemption":bondPoints[i][6],
      "IssueDate":bondPoints[i][7],
      "Schedule":{
          "Calendar":bondPoints[i][8],
          "EffectiveDate":bondPoints[i][9],
          "TerminationDate":bondPoints[i][10],
          "Frequency":bondPoints[i][11],
          "Convention":bondPoints[i][12],
          "TerminationDateConvention":bondPoints[i][13],
          "DateGenerationRule":bondPoints[i][14],
          "EndOfMonth":bondPoints[i][15]
      }
    }
    Points.push(point);
  }
  
  for (var i = 0; i < OISPoints.length; i++){
    var point ={
      "type": "OIS",
      "Rate": OISPoints[i][0],
      "TenorTimeUnit": OISPoints[i][1],
      "TenorNumber": OISPoints[i][2],
      "FixingDays": OISPoints[i][3],
      "OvernightIndex": OISPoints[i][4]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < DatedOISPoints.length; i++){
    var point ={
      "type": "DatedOIS",
      "Rate": DatedOISPoints[i][0],
      "StartDate": DatedOISPoints[i][1],
      "EndDate": DatedOISPoints[i][2],
      "OvernightIndex": DatedOISPoints[i][3]
    }
    Points.push(point);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "Id":"NodesTermStructure",
    "TermStructure":{
      "Compounding" : compounding,
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator,
      "BootstrapTrait": bootstrapTrait
    },
    "Points" : Points
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var data = {
    "Curves": curves,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/bootstrapNodes', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function GENERATEZEROCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints, OISPoints, DatedOISPoints, jumps,
                           bootstrapTrait, compounding, dayCounter, interpolator, asOfDate){

  var Points = new Array();
  var JumpsArray = new Array();
  
  for (var i = 0; i < depositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": depositPoints[i][0],
      "TenorTimeUnit": depositPoints[i][1],
      "TenorNumber": depositPoints[i][2],
      "FixingDays": depositPoints[i][3],
      "Calendar": depositPoints[i][4],
      "BusinessDayConvention": depositPoints[i][5],
      "DayCounter": depositPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < FRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": FRAPoints[i][0],
      "MonthsToStart": FRAPoints[i][1],
      "MonthsToEnd": FRAPoints[i][2],
      "FixingDays": FRAPoints[i][3],
      "Calendar": FRAPoints[i][4],
      "BusinessDayConvention": FRAPoints[i][5],
      "DayCounter": FRAPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < futurePoints.length; i++){
    var point ={
      "type": "Future",
      "Rate": futurePoints[i][0],
      "FutureStartDate": futurePoints[i][1],
      "FutMonths": futurePoints[i][2],
      "Calendar": futurePoints[i][3],
      "BusinessDayConvention": futurePoints[i][4],
      "DayCounter": futurePoints[i][5]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < swapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": swapPoints[i][0],
      "TenorTimeUnit": swapPoints[i][1],
      "TenorNumber": swapPoints[i][2],
      "Calendar": swapPoints[i][3],
      "SwFixedLegFrequency": swapPoints[i][4],
      "SwFixedLegConvention": swapPoints[i][5],
      "SwFixedLegDayCounter": swapPoints[i][6],
      "SwFloatingLegIndex": swapPoints[i][7],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < bondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":bondPoints[i][0],
      "FixingDays":bondPoints[i][1],
      "FaceAmount":bondPoints[i][2],
      "CouponRate":bondPoints[i][3],
      "DayCounter":bondPoints[i][4],
      "BusinessDayConvention":bondPoints[i][5],
      "Redemption":bondPoints[i][6],
      "IssueDate":bondPoints[i][7],
      "Schedule":{
          "Calendar":bondPoints[i][8],
          "EffectiveDate":bondPoints[i][9],
          "TerminationDate":bondPoints[i][10],
          "Frequency":bondPoints[i][11],
          "Convention":bondPoints[i][12],
          "TerminationDateConvention":bondPoints[i][13],
          "DateGenerationRule":bondPoints[i][14],
          "EndOfMonth":bondPoints[i][15]
      }
    }
    Points.push(point);
  }
  
  for (var i = 0; i < OISPoints.length; i++){
    var point ={
      "type": "OIS",
      "Rate": OISPoints[i][0],
      "TenorTimeUnit": OISPoints[i][1],
      "TenorNumber": OISPoints[i][2],
      "FixingDays": OISPoints[i][3],
      "OvernightIndex": OISPoints[i][4]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < DatedOISPoints.length; i++){
    var point ={
      "type": "DatedOIS",
      "Rate": DatedOISPoints[i][0],
      "StartDate": DatedOISPoints[i][1],
      "EndDate": DatedOISPoints[i][2],
      "OvernightIndex": DatedOISPoints[i][3]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < jumps.length; i++){
    var jump ={
      "Date":jumps[i][0],
      "Rate":jumps[i][1]
    }
    JumpsArray.push(jump);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  if(JumpsArray.length == 0){
    var TermStructure = {
      "Id":"ZeroRateTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points
    }
  }else{
    var TermStructure = {
      "Id":"ZeroRateTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points,
      "Jumps": JumpsArray
    }
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var zeroRate = {
    "DayCounter": dayCounter,
    "Compounding": compounding
  }
  
  var data = {
    "Curves": curves,
    "Pricing" : Pricing,
    "ZeroCurve": zeroRate
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/zeroRateCurve', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function GENERATEFWDCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints, OISPoints, DatedOISPoints, jumps,
                           bootstrapTrait, compounding, dayCounter, fwdCurvePeriodTimeUnit, fwdCurvePeriodNumber, 
                          fwdCurveCalendar, fwdDayCounter, fwdCompounding, interpolator, asOfDate){

  var Points = new Array();
  var JumpsArray = new Array();
  
  for (var i = 0; i < depositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": depositPoints[i][0],
      "TenorTimeUnit": depositPoints[i][1],
      "TenorNumber": depositPoints[i][2],
      "FixingDays": depositPoints[i][3],
      "Calendar": depositPoints[i][4],
      "BusinessDayConvention": depositPoints[i][5],
      "DayCounter": depositPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < FRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": FRAPoints[i][0],
      "MonthsToStart": FRAPoints[i][1],
      "MonthsToEnd": FRAPoints[i][2],
      "FixingDays": FRAPoints[i][3],
      "Calendar": FRAPoints[i][4],
      "BusinessDayConvention": FRAPoints[i][5],
      "DayCounter": FRAPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < futurePoints.length; i++){
    var point ={
      "type": "Future",
      "Rate": futurePoints[i][0],
      "FutureStartDate": futurePoints[i][1],
      "FutMonths": futurePoints[i][2],
      "Calendar": futurePoints[i][3],
      "BusinessDayConvention": futurePoints[i][4],
      "DayCounter": futurePoints[i][5]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < swapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": swapPoints[i][0],
      "TenorTimeUnit": swapPoints[i][1],
      "TenorNumber": swapPoints[i][2],
      "Calendar": swapPoints[i][3],
      "SwFixedLegFrequency": swapPoints[i][4],
      "SwFixedLegConvention": swapPoints[i][5],
      "SwFixedLegDayCounter": swapPoints[i][6],
      "SwFloatingLegIndex": swapPoints[i][7],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < bondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":bondPoints[i][0],
      "FixingDays":bondPoints[i][1],
      "FaceAmount":bondPoints[i][2],
      "CouponRate":bondPoints[i][3],
      "DayCounter":bondPoints[i][4],
      "BusinessDayConvention":bondPoints[i][5],
      "Redemption":bondPoints[i][6],
      "IssueDate":bondPoints[i][7],
      "Schedule":{
          "Calendar":bondPoints[i][8],
          "EffectiveDate":bondPoints[i][9],
          "TerminationDate":bondPoints[i][10],
          "Frequency":bondPoints[i][11],
          "Convention":bondPoints[i][12],
          "TerminationDateConvention":bondPoints[i][13],
          "DateGenerationRule":bondPoints[i][14],
          "EndOfMonth":bondPoints[i][15]
      }
    }
    Points.push(point);
  }
  
  for (var i = 0; i < OISPoints.length; i++){
    var point ={
      "type": "OIS",
      "Rate": OISPoints[i][0],
      "TenorTimeUnit": OISPoints[i][1],
      "TenorNumber": OISPoints[i][2],
      "FixingDays": OISPoints[i][3],
      "OvernightIndex": OISPoints[i][4]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < DatedOISPoints.length; i++){
    var point ={
      "type": "DatedOIS",
      "Rate": DatedOISPoints[i][0],
      "StartDate": DatedOISPoints[i][1],
      "EndDate": DatedOISPoints[i][2],
      "OvernightIndex": DatedOISPoints[i][3]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < jumps.length; i++){
    var jump ={
      "Date":jumps[i][0],
      "Rate":jumps[i][1]
    }
    JumpsArray.push(jump);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  if(JumpsArray.length == 0){
    var TermStructure = {
      "Id":"FwdTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points
    }
  }else{
    var TermStructure = {
      "Id":"FwdTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points,
      "Jumps": JumpsArray
    }
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var FwdCurve = {
  
    "PeriodNumber":fwdCurvePeriodNumber,
    "PeriodTimeUnit":fwdCurvePeriodTimeUnit,
    "Calendar":fwdCurveCalendar,
    "DayCounter":fwdDayCounter,
    "Compounding":fwdCompounding,
  }
  
  var data = {
    "Curves": curves,
    "FwdCurve" : FwdCurve,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/fwdRateCurve', options);
  var responseValue = response.getContentText();
  
  Logger.log(responseValue);
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function FWDCURVESECTION(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints, OISPoints, DatedOISPoints,jumps,
                           bootstrapTrait, compounding, dayCounter, fwdCurveStartDate, fwdCurveEndDate, 
                          fwdCurveCalendar, fwdDayCounter, fwdCompounding, interpolator, asOfDate){

  var Points = new Array();
  var JumpsArray = new Array();
  
  for (var i = 0; i < depositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": depositPoints[i][0],
      "TenorTimeUnit": depositPoints[i][1],
      "TenorNumber": depositPoints[i][2],
      "FixingDays": depositPoints[i][3],
      "Calendar": depositPoints[i][4],
      "BusinessDayConvention": depositPoints[i][5],
      "DayCounter": depositPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < FRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": FRAPoints[i][0],
      "MonthsToStart": FRAPoints[i][1],
      "MonthsToEnd": FRAPoints[i][2],
      "FixingDays": FRAPoints[i][3],
      "Calendar": FRAPoints[i][4],
      "BusinessDayConvention": FRAPoints[i][5],
      "DayCounter": FRAPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < futurePoints.length; i++){
    var point ={
      "type": "Future",
      "Rate": futurePoints[i][0],
      "FutureStartDate": futurePoints[i][1],
      "FutMonths": futurePoints[i][2],
      "Calendar": futurePoints[i][3],
      "BusinessDayConvention": futurePoints[i][4],
      "DayCounter": futurePoints[i][5]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < swapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": swapPoints[i][0],
      "TenorTimeUnit": swapPoints[i][1],
      "TenorNumber": swapPoints[i][2],
      "Calendar": swapPoints[i][3],
      "SwFixedLegFrequency": swapPoints[i][4],
      "SwFixedLegConvention": swapPoints[i][5],
      "SwFixedLegDayCounter": swapPoints[i][6],
      "SwFloatingLegIndex": swapPoints[i][7],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < bondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":bondPoints[i][0],
      "FixingDays":bondPoints[i][1],
      "FaceAmount":bondPoints[i][2],
      "CouponRate":bondPoints[i][3],
      "DayCounter":bondPoints[i][4],
      "BusinessDayConvention":bondPoints[i][5],
      "Redemption":bondPoints[i][6],
      "IssueDate":bondPoints[i][7],
      "Schedule":{
          "Calendar":bondPoints[i][8],
          "EffectiveDate":bondPoints[i][9],
          "TerminationDate":bondPoints[i][10],
          "Frequency":bondPoints[i][11],
          "Convention":bondPoints[i][12],
          "TerminationDateConvention":bondPoints[i][13],
          "DateGenerationRule":bondPoints[i][14],
          "EndOfMonth":bondPoints[i][15]
      }
    }
    Points.push(point);
  }
  
  for (var i = 0; i < OISPoints.length; i++){
    var point ={
      "type": "OIS",
      "Rate": OISPoints[i][0],
      "TenorTimeUnit": OISPoints[i][1],
      "TenorNumber": OISPoints[i][2],
      "FixingDays": OISPoints[i][3],
      "OvernightIndex": OISPoints[i][4]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < DatedOISPoints.length; i++){
    var point ={
      "type": "DatedOIS",
      "Rate": DatedOISPoints[i][0],
      "StartDate": DatedOISPoints[i][1],
      "EndDate": DatedOISPoints[i][2],
      "OvernightIndex": DatedOISPoints[i][3]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < jumps.length; i++){
    var jump ={
      "Date":jumps[i][0],
      "Rate":jumps[i][1]
    }
    JumpsArray.push(jump);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  if(JumpsArray.length == 0){
    var TermStructure = {
      "Id":"FwdTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points
    }
  }else{
    var TermStructure = {
      "Id":"FwdTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points,
      "Jumps": JumpsArray
    }
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var FwdCurve = {
  
    "StartDate":fwdCurveStartDate,
    "EndDate":fwdCurveEndDate,
    "Calendar":fwdCurveCalendar,
    "DayCounter":fwdDayCounter,
    "Compounding":fwdCompounding,
  }
  
  var data = {
    "Curves": curves,
    "FwdCurve" : FwdCurve,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/fwdRateCurve', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function INTERPOLATEDFWDCURVE(points, compounding, dayCounter, fwdCurvePeriodTimeUnit, fwdCurvePeriodNumber, 
                          fwdCurveCalendar, fwdDayCounter, fwdCompounding, interpolator, asOfDate){

  var Points = new Array();
  
  for (var i = 0; i < points.length; i++){
    var point ={
      "Date": points[i][1],
      "Rate": points[i][0]    }
    Points.push(point);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "Id":"FwdTermStructure",
    "TermStructure":{
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator,
      "BootstrapTrait": "InterpolatedFwd"
    },
    "Points" : Points
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var FwdCurve = {
  
    "PeriodNumber":fwdCurvePeriodNumber,
    "PeriodTimeUnit":fwdCurvePeriodTimeUnit,
    "Calendar":fwdCurveCalendar,
    "DayCounter":fwdDayCounter,
    "Compounding":fwdCompounding,
  }
  
  var data = {
    "Curves": curves,
    "FwdCurve" : FwdCurve,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/fwdRateCurve', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function INTERPOLATEDFWDCURVESECTION(points, compounding, dayCounter, fwdStartDate, fwdEndDate, 
                          fwdCurveCalendar, fwdDayCounter, fwdCompounding, interpolator, asOfDate){

  var Points = new Array();
  
  Logger.log('I was called!');
  
  for (var i = 0; i < points.length; i++){
    var point ={
      "Date": points[i][1],
      "Rate": points[i][0]    }
    Points.push(point);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "Id":"FwdTermStructure",
    "TermStructure":{
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator,
      "BootstrapTrait": "InterpolatedFwd"
    },
    "Points" : Points
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var FwdCurve = {
  
    "StartDate":fwdStartDate,
    "EndDate":fwdEndDate,
    "Calendar":fwdCurveCalendar,
    "DayCounter":fwdDayCounter,
    "Compounding":fwdCompounding,
  }
  
  var data = {
    "Curves": curves,
    "FwdCurve" : FwdCurve,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/fwdRateCurve', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}

function GENERATEDISCOUNTCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints, OISPoints, DatedOISPoints, jumps,bootstrapTrait,
                           compounding, dayCounter, interpolator, asOfDate){

  var Points = new Array();
  var JumpsArray = new Array();
  
  for (var i = 0; i < depositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": depositPoints[i][0],
      "TenorTimeUnit": depositPoints[i][1],
      "TenorNumber": depositPoints[i][2],
      "FixingDays": depositPoints[i][3],
      "Calendar": depositPoints[i][4],
      "BusinessDayConvention": depositPoints[i][5],
      "DayCounter": depositPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < FRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": FRAPoints[i][0],
      "MonthsToStart": FRAPoints[i][1],
      "MonthsToEnd": FRAPoints[i][2],
      "FixingDays": FRAPoints[i][3],
      "Calendar": FRAPoints[i][4],
      "BusinessDayConvention": FRAPoints[i][5],
      "DayCounter": FRAPoints[i][6],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < futurePoints.length; i++){
    var point ={
      "type": "Future",
      "Rate": futurePoints[i][0],
      "FutureStartDate": futurePoints[i][1],
      "FutMonths": futurePoints[i][2],
      "Calendar": futurePoints[i][3],
      "BusinessDayConvention": futurePoints[i][4],
      "DayCounter": futurePoints[i][5]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < swapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": swapPoints[i][0],
      "TenorTimeUnit": swapPoints[i][1],
      "TenorNumber": swapPoints[i][2],
      "Calendar": swapPoints[i][3],
      "SwFixedLegFrequency": swapPoints[i][4],
      "SwFixedLegConvention": swapPoints[i][5],
      "SwFixedLegDayCounter": swapPoints[i][6],
      "SwFloatingLegIndex": swapPoints[i][7],
    }
    Points.push(point);
  }
  
  for (var i = 0; i < bondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":bondPoints[i][0],
      "FixingDays":bondPoints[i][1],
      "FaceAmount":bondPoints[i][2],
      "CouponRate":bondPoints[i][3],
      "DayCounter":bondPoints[i][4],
      "BusinessDayConvention":bondPoints[i][5],
      "Redemption":bondPoints[i][6],
      "IssueDate":bondPoints[i][7],
      "Schedule":{
          "Calendar":bondPoints[i][8],
          "EffectiveDate":bondPoints[i][9],
          "TerminationDate":bondPoints[i][10],
          "Frequency":bondPoints[i][11],
          "Convention":bondPoints[i][12],
          "TerminationDateConvention":bondPoints[i][13],
          "DateGenerationRule":bondPoints[i][14],
          "EndOfMonth":bondPoints[i][15]
      }
    }
    Points.push(point);
  }
  
  for (var i = 0; i < OISPoints.length; i++){
    var point ={
      "type": "OIS",
      "Rate": OISPoints[i][0],
      "TenorTimeUnit": OISPoints[i][1],
      "TenorNumber": OISPoints[i][2],
      "FixingDays": OISPoints[i][3],
      "OvernightIndex": OISPoints[i][4]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < DatedOISPoints.length; i++){
    var point ={
      "type": "DatedOIS",
      "Rate": DatedOISPoints[i][0],
      "StartDate": DatedOISPoints[i][1],
      "EndDate": DatedOISPoints[i][2],
      "OvernightIndex": DatedOISPoints[i][3]
    }
    Points.push(point);
  }
  
  for (var i = 0; i < jumps.length; i++){
    var jump ={
      "Date":jumps[i][0],
      "Rate":jumps[i][1]
    }
    JumpsArray.push(jump);
  }
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  if(JumpsArray.length == 0){
    var TermStructure = {
      "Id":"DiscountTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points
    }
  }else{
    var TermStructure = {
      "Id":"DiscountTermStructure",
      "TermStructure":{
        "DayCounter" : dayCounter,
        "Interpolator" : interpolator,
        "BootstrapTrait": bootstrapTrait
      },
      "Points" : Points,
      "Jumps": JumpsArray
    }
  }
  
  var curves = [];
  curves[0] = TermStructure;
  
  var data = {
    "Curves": curves,
    "Pricing" : Pricing
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/discountCurve', options);
  var responseValue = response.getContentText();
      
  var output;
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });
  }
  
  return output;
}



