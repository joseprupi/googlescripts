function GETECALENDARS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getCalendars', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.Calendar;
}

function GETEFREQUENCIES() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getFrequencys', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.Frequency;
}

function GETTIMEUNITS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getTimeUnits', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.TimeUnit;
}

function GETDAYCONVENTIONS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getBusinessDayConventions', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.BusinessDayConvention;
}

function GETDAYCOUNTERS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getDayCounters', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.DayCounter;
}

function GETPOINTTYPES() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getPointTypes', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.PointType;
}

function GETIBORS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getIbors', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.Ibor;
}

function GETCOMPOUNDINGS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getCompoundings', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.Compounding;
}

function GETINTERPOLATORS() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getInterpolators', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.Interpolator;
}

function GETSWAPTYPES() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getSwapTypes', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.SwapType;
}

function GETDATEGENERATIONRULES() {
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/getDateGenerationRules', options);
  var responseValue = response.getContentText();
  
  return JSON.parse(responseValue).message.DateGenerationRule;
}

