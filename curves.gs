function GENERATEZEROCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints,
                           compounding, dayCounter, interpolator, asOfDate){

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
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "TermStructure":{
      "Compounding" : compounding,
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator
    },
    "Points" : Points
  }
  
  var data = {
    "TermStructure": TermStructure,
    "Pricing" : Pricing
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

function GENERATEFWDCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints,
                           compounding, dayCounter, fwdCurvePeriodTimeUnit, fwdCurvePeriodNumber, interpolator, asOfDate){

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
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "TermStructure":{
      "Compounding" : compounding,
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator
    },
    "Points" : Points
  }
  
  var FwdCurve = {
  
    "FwdCurvePeriodNumber":fwdCurvePeriodNumber,
    "FwdCurvePeriodTimeUnit":fwdCurvePeriodTimeUnit,
  }
  
  var data = {
    "TermStructure": TermStructure,
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


function GENERATEDISCOUNTCURVE(depositPoints, FRAPoints, futurePoints, swapPoints, bondPoints,
                           compounding, dayCounter, interpolator, asOfDate){

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
  
  var Pricing = {
    "AsOfDate" : asOfDate
  }
  
  var TermStructure = {
    "TermStructure":{
      "Compounding" : compounding,
      "DayCounter" : dayCounter,
      "Interpolator" : interpolator
    },
    "Points" : Points
  }
  
  var data = {
    "TermStructure": TermStructure,
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