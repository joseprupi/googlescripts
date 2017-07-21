function PRICEVANILLASWAP(discountingDepositPoints, //discounting curve
                          discountingFRAPoints,     //discounting curve
                          discountingFuturePoints,  //discounting curve
                          discountingSwapPoints,    //discounting curve
                          discountingBondPoints,    //discounting curve
                          discountingCompounding,   //discounting curve
                          discountingDayCounter,    //discounting curve
                          discountingInterpolator,  //discounting curve
                          fwdDepositPoints,         //fwd curve
                          fwdFRAPoints,             //fwd curve
                          fwdFuturePoints,          //fwd curve
                          fwdSwapPoints,            //fwd curve
                          fwdBondPoints,            //fwd curve
                          fwdCompounding,           //fwd curve
                          fwdDayCounter,            //fwd curve
                          fwdInterpolator,          //fwd curve
                          swapStartDate,            //swap
                          swapLenghtInYears,        //swap
                          swapNotional,             //swap
                          swapCalendar,             //swap
                          swapType,                 //swap
                          fixedLegFrequency,        //fixed leg
                          fixedLegConvention,       //fixed leg
                          fixedLegTerminationConvention,       //fixed leg
                          fixedLegDayCounter,       //fixed leg
                          fixedLegRate,             //fixed leg
                          fixedLegDateGenerationRule,  //fixed leg
                          fixedLegEndOfMonth,       //fixed leg
                          floatingLegFrequency,     //floating leg
                          floatingLegConvention,    //floating leg
                          floatingLegTerminationConvention,    //floating leg
                          floatingLegDayCounter,    //floating leg
                          floatingLegSpread,        //floating leg
                          floatingDateGenerationRule,  //floating leg
                          floatingEndOfMonth,       //floating leg
                          floatingLegIndexSettlementDays,      //floating leg index
                          floatingLegIndexCalendar,            //floating leg index
                          floatingLegIndexConvention,          //floating leg index
                          floatingLegIndexEndOfMonth,          //floating leg index
                          floatingLegIndexDayCounter,          //floating leg index
                          indexFixings,          //floating leg index 
                          pricingAsOfDate           //pricing
                         ){
  
  var DiscountPoints = new Array();
  
  for (var i = 0; i < discountingDepositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": discountingDepositPoints[i][0],
      "TenorTimeUnit": discountingDepositPoints[i][1],
      "TenorNumber": discountingDepositPoints[i][2],
      "FixingDays": discountingDepositPoints[i][3],
      "Calendar": discountingDepositPoints[i][4],
      "BusinessDayConvention": discountingDepositPoints[i][5],
      "DayCounter": discountingDepositPoints[i][6],
    }
    DiscountPoints.push(point);
  }
  
  for (var i = 0; i < discountingFRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": discountingFRAPoints[i][0],
      "MonthsToStart": discountingFRAPoints[i][1],
      "MonthsToEnd": discountingFRAPoints[i][2],
      "FixingDays": discountingFRAPoints[i][3],
      "Calendar": discountingFRAPoints[i][4],
      "BusinessDayConvention": discountingFRAPoints[i][5],
      "DayCounter": discountingFRAPoints[i][6],
    }
    DiscountPoints.push(point);
  }
  
  for (var i = 0; i < discountingFuturePoints.length; i++){
    var point ={
	    "type": "Future",
	    "Rate": discountingFuturePoints[i][0],
	    "FutureStartDate": discountingFuturePoints[i][1],
	    "FutMonths": discountingFuturePoints[i][2],
	    "Calendar": discountingFuturePoints[i][3],
	    "BusinessDayConvention": discountingFuturePoints[i][4],
	    "DayCounter": discountingFuturePoints[i][5]
    }
    DiscountPoints.push(point);
  }
  
  for (var i = 0; i < discountingSwapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": discountingSwapPoints[i][0],
      "TenorTimeUnit": discountingSwapPoints[i][1],
      "TenorNumber": discountingSwapPoints[i][2],
      "Calendar": discountingSwapPoints[i][3],
      "SwFixedLegFrequency": discountingSwapPoints[i][4],
      "SwFixedLegConvention": discountingSwapPoints[i][5],
      "SwFixedLegDayCounter": discountingSwapPoints[i][6],
      "SwFloatingLegIndex": discountingSwapPoints[i][7],
    }
    DiscountPoints.push(point);
  }
  
  for (var i = 0; i < discountingBondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":discountingBondPoints[i][0],
      "FixingDays":discountingBondPoints[i][1],
      "FaceAmount":discountingBondPoints[i][2],
      "CouponRate":discountingBondPoints[i][3],
      "DayCounter":discountingBondPoints[i][4],
      "BusinessDayConvention":discountingBondPoints[i][5],
      "Redemption":discountingBondPoints[i][6],
      "IssueDate":discountingBondPoints[i][7],
      "Schedule":{
          "Calendar":discountingBondPoints[i][8],
          "EffectiveDate":discountingBondPoints[i][9],
          "TerminationDate":discountingBondPoints[i][10],
          "Frequency":discountingBondPoints[i][11],
          "Convention":discountingBondPoints[i][12],
          "TerminationDateConvention":discountingBondPoints[i][13],
          "DateGenerationRule":discountingBondPoints[i][14],
          "EndOfMonth":discountingBondPoints[i][15]
      }
    }
    DiscountPoints.push(point);
  }
  
  var DiscountTermStructure = {
    "Compounding" : discountingCompounding,
    "DayCounter" : discountingDayCounter,
    "Interpolator" : discountingInterpolator,
    
  }
  
  var discountData = {
    "TermStructure": DiscountTermStructure,
    "Points" : DiscountPoints
  }
  
  
  var ForecastingPoints = new Array();
  
  for (var i = 0; i < fwdDepositPoints.length; i++){
    var point ={
      "type": "Deposit",
      "Rate": fwdDepositPoints[i][0],
      "TenorTimeUnit": fwdDepositPoints[i][1],
      "TenorNumber": fwdDepositPoints[i][2],
      "FixingDays": fwdDepositPoints[i][3],
      "Calendar": fwdDepositPoints[i][4],
      "BusinessDayConvention": fwdDepositPoints[i][5],
      "DayCounter": fwdDepositPoints[i][6],
    }
    ForecastingPoints.push(point);
  }
  
  for (var i = 0; i < fwdFRAPoints.length; i++){
    var point ={
      "type": "FRA",
      "Rate": fwdFRAPoints[i][0],
      "MonthsToStart": fwdFRAPoints[i][1],
      "MonthsToEnd": fwdFRAPoints[i][2],
      "FixingDays": fwdFRAPoints[i][3],
      "Calendar": fwdFRAPoints[i][4],
      "BusinessDayConvention": fwdFRAPoints[i][5],
      "DayCounter": fwdFRAPoints[i][6],
    }
    ForecastingPoints.push(point);
  }
  
  for (var i = 0; i < fwdFuturePoints.length; i++){
    var point ={
	    "type": "Future",
	    "Rate": fwdFuturePoints[i][0],
	    "FutureStartDate": fwdFuturePoints[i][1],
	    "FutMonths": fwdFuturePoints[i][2],
	    "Calendar": fwdFuturePoints[i][3],
	    "BusinessDayConvention": fwdFuturePoints[i][4],
	    "DayCounter": fwdFuturePoints[i][5]
    }
    ForecastingPoints.push(point);
  }
  
  for (var i = 0; i < fwdSwapPoints.length; i++){
    var point ={
      "type": "Swap",
      "Rate": fwdSwapPoints[i][0],
      "TenorTimeUnit": fwdSwapPoints[i][1],
      "TenorNumber": fwdSwapPoints[i][2],
      "Calendar": fwdSwapPoints[i][3],
      "SwFixedLegFrequency": fwdSwapPoints[i][4],
      "SwFixedLegConvention": fwdSwapPoints[i][5],
      "SwFixedLegDayCounter": fwdSwapPoints[i][6],
      "SwFloatingLegIndex": fwdSwapPoints[i][7],
    }
    ForecastingPoints.push(point);
  }
  
  for (var i = 0; i < fwdBondPoints.length; i++){
    var point ={
      "type":"Bond",
      "Rate":fwdBondPoints[i][0],
      "FixingDays":fwdBondPoints[i][1],
      "FaceAmount":fwdBondPoints[i][2],
      "CouponRate":fwdBondPoints[i][3],
      "DayCounter":fwdBondPoints[i][4],
      "BusinessDayConvention":fwdBondPoints[i][5],
      "Redemption":fwdBondPoints[i][6],
      "IssueDate":fwdBondPoints[i][7],
      "Schedule":{
          "Calendar":fwdBondPoints[i][8],
          "EffectiveDate":fwdBondPoints[i][9],
          "TerminationDate":fwdBondPoints[i][10],
          "Frequency":fwdBondPoints[i][11],
          "Convention":fwdBondPoints[i][12],
          "TerminationDateConvention":fwdBondPoints[i][13],
          "DateGenerationRule":fwdBondPoints[i][14],
          "EndOfMonth":fwdBondPoints[i][15]
      }
    }
    DiscountPoints.push(point);
  }
  
  var ForecastingTermStructure = {
    "Compounding" : fwdCompounding,
    "DayCounter" : fwdDayCounter,
    "Interpolator" : fwdInterpolator,
    
  }
  
  var forecastingData = {
    "TermStructure": ForecastingTermStructure,
    "Points" : ForecastingPoints
  }
  
  var fixings = new Array();
  
  for (var i = 0; i < indexFixings.length; i++){
    var point ={
      "Date": indexFixings[i][0],
      "Rate": indexFixings[i][1]
    }
    fixings.push(point);
  }
  
  var indexdata;
  
  if(fixings.length == 0){
  
    indexdata = {
      "SettlementDays":floatingLegIndexSettlementDays,
      "Calendar":floatingLegIndexCalendar,
      "Convention":floatingLegIndexConvention,
      "EndOfMonth":floatingLegIndexEndOfMonth,
      "DayCounter":floatingLegIndexDayCounter
    };
    
  }else{
  indexdata = {
      "SettlementDays":floatingLegIndexSettlementDays,
      "Calendar":floatingLegIndexCalendar,
      "Convention":floatingLegIndexConvention,
      "EndOfMonth":floatingLegIndexEndOfMonth,
      "DayCounter":floatingLegIndexDayCounter,
      "Fixings": fixings
    };
  }
  
  var data = {
            "VanillaInterestRateSwap": {
                "Notional": swapNotional,
                "SwapType": swapType,
                "StartDate": swapStartDate,
                "LengthInYears": swapLenghtInYears,
                "Calendar": swapCalendar,
                "FixedLeg":{
                    "Rate":fixedLegRate,
                    "DayCounter":fixedLegDayCounter,
                    "Schedule":{
                         "Frequency":fixedLegFrequency,
                         "Convention":fixedLegConvention,
                         "TerminationDateConvention":fixedLegTerminationConvention,
                         "DateGenerationRule":fixedLegDateGenerationRule,
                         "EndOfMonth":fixedLegEndOfMonth
                    }
                },
                "FloatingLeg": {
                    "DayCounter":floatingLegDayCounter,
                    "Spread":floatingLegSpread,
                    "Schedule":{
                         "Frequency":floatingLegFrequency,
                         "Convention":floatingLegConvention,
                         "TerminationDateConvention":floatingLegTerminationConvention,
                         "DateGenerationRule":floatingDateGenerationRule,
                         "EndOfMonth":floatingEndOfMonth
                    },
                    "Index":indexdata
                }
            },
            "Pricing":{
                "AsOfDate": pricingAsOfDate,
            },
            "Curves":{
                "DiscountingTermStructure": discountData,
                "ForecastingTermStructure": forecastingData
             }
        };
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/priceVanillaSwap', options);
  var responseValue = response.getContentText();
      
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    var NPVArray = ["NPV",responseArray["NPV"],,,,,,]
    var NFairRateArray = ["FairRate",responseArray["FairRate"],,,,,,]
    var NPVFairSpread = ["FairSpread",responseArray["FairSpread"],,,,,,]
    /*output = responseArray.map(function(obj) {
      return Object.keys(obj).map(function(key) { 
        return obj[key];
      });
    });*/
    
    output[0] = NPVArray;
    output[1] = NFairRateArray;
    output[2] = NPVFairSpread;
    
    var i;
                
    for(i = 0; i<responseArray.FloatingFlows.length;i++){
      var tmpArray = new Array()
      tmpArray[0] = "Floating";
      if(responseArray.FloatingFlows[i].Type == "FixedInterest"){
        tmpArray[1] = responseArray.FloatingFlows[i].Type;
        tmpArray[2] = responseArray.FloatingFlows[i].FixingDate;
        tmpArray[3] = responseArray.FloatingFlows[i].Rate;
        tmpArray[4] = responseArray.FloatingFlows[i].Amount;
        tmpArray[5] = responseArray.FloatingFlows[i].AccrualStartDate;
        tmpArray[6] = responseArray.FloatingFlows[i].AccrualEndDate;
      }else{
        tmpArray[1] = responseArray.FloatingFlows[i].Type;
        tmpArray[2] = responseArray.FloatingFlows[i].FixingDate;
        tmpArray[3] = responseArray.FloatingFlows[i].Rate;
        tmpArray[4] = responseArray.FloatingFlows[i].Amount;
        tmpArray[5] = responseArray.FloatingFlows[i].AccrualStartDate;
        tmpArray[6] = responseArray.FloatingFlows[i].AccrualEndDate;
        tmpArray[7] = responseArray.FloatingFlows[i].Discount;
        tmpArray[8] = responseArray.FloatingFlows[i].Price;
      }
      output[i+3] = tmpArray;
    }
    
    for(j = 0; j<responseArray.FixedFlows.length;j++){
      var tmpArray = new Array()
      tmpArray[0] = "Fixed";
      if(responseArray.FixedFlows[j].Type == "FixedInterest"){
        tmpArray[1] = responseArray.FixedFlows[j].Type;
        tmpArray[2] = responseArray.FixedFlows[j].Rate;
        tmpArray[3] = responseArray.FixedFlows[j].Amount;
        tmpArray[4] = responseArray.FixedFlows[j].AccrualStartDate;
        tmpArray[5] = responseArray.FixedFlows[j].AccrualEndDate;
      }else{
        tmpArray[1] = responseArray.FixedFlows[j].Type;
        tmpArray[2] = responseArray.FixedFlows[j].Rate;
        tmpArray[3] = responseArray.FixedFlows[j].Amount;
        tmpArray[4] = responseArray.FixedFlows[j].AccrualStartDate;
        tmpArray[5] = responseArray.FixedFlows[j].AccrualEndDate;
        tmpArray[6] = responseArray.FixedFlows[j].Discount;
        tmpArray[7] = responseArray.FixedFlows[j].Price;
      }
      output[j+i+3] = tmpArray;
    }    
  }
  
  return output;
}


