function ISLEAP(year) {
  
  var data = {
  "Year":year,
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/isLeap', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["IsLeap"];
  }
  
  return output;
}

function ENDOFMONTH(date) {
  
  var data = {
  "Date":date,
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/endOfMonth', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["EndOfMonth"];
  }
  
  return output;
}

function ISENDOFMONTH(date) {
  
  var data = {
  "Date":date,
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/isEndOfMonth', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["IsEndOfMonth"];
  }
  
  return output;
}

function NTHWEEKDAY(nth, weekday, month, year) {
  
  var data = {
     "Nth":nth,
   "Weekday":weekday,
   "Month":month,
   "Year": year
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/nthWeekDay', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["NthWeekDay"];
  }
  
  return output;
}

function NEXTWEEKDAY(date, weekday) {
  
  var data = {
    "Date":date,
    "Weekday":weekday
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/nextWeekDay', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["NextWeekDay"];
  }
  
  return output;
}

function ISBUSINESSDAY(date, calendar) {
  
  var data = {
    "Date":date,
    "Calendar":calendar
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/isBusinessDay', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["IsBusinessDay"];
  }
  
  return output;
}

function ISHOLIDAY(date, calendar) {
  
  var data = {
    "Date":date,
    "Calendar":calendar
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/isHoliday', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["IsHoliday"];
  }
  
  return output;
}

function HOLIDAYLIST(from, to, calendar, includeWeekends) {
  
  var data = {
    "From":from,
    "To":to,
    "IncludeWeekends":includeWeekends,
    "Calendar":calendar
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/holidayList', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    
    var i;
                
    for(i = 0; i<responseArray.HolidayList.length;i++){
      output[i] = responseArray.HolidayList[i];
    }
  }
  
  return output;
}

function ADJUSTDATE(date, calendar, convention) {
  
  var data = {
    "Date":date,
    "Calendar":calendar,
    "Convention":convention
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/adjustDate', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["AdjustedDate"];
  }
  
  return output;
}

function ADVANCEDATE(date, calendar, convention, number, timeUnit, endOfMonth) {
  
  var data = {
    "Date":date,
    "Calendar":calendar,
    "Convention":convention,
    "Number":number,
    "TimeUnit":timeUnit,
    "EndOfMonth":endOfMonth
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/advanceDate', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["AdvancedDate"];
  }
  
  return output;
}

function BUSINESSDAYSBETWEEN(from, to, calendar, includeFirst, includeLast) {
  
  var data = {
    "From":from,
    "To":to,
    "Calendar":calendar,
    "IncludeFirst":includeFirst,
    "IncludeLast":includeLast
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/businessDaysBetween', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["BusinessDaysBetween"];
  }
  
  return output;
}

function ISMMDATE(date) {
  
  var data = {
  "Date":date,
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/isIMMdate', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["IsIMMdate"];
  }
  
  return output;
}

function NEXTIMMDATE(date) {
  
  var data = {
  "Date":date,
  }
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/nextIMMdate', options);
  var responseValue = response.getContentText();
  
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    output[0] = responseArray["NextIMMdate"];
  }
  
  return output;
}