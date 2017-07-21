function PRICEZEROCOUPONBOND(discountingDepositPoints, //discounting curve
                          discountingFRAPoints,     //discounting curve
                          discountingFuturePoints,  //discounting curve
                          discountingSwapPoints,    //discounting curve
                          discountingBondPoints,    //discounting curve
                          discountingCompounding,   //discounting curve
                          discountingDayCounter,    //discounting curve
                          discountingInterpolator,  //discounting curve
                          faceAmount,               //bond
                          redemption,               //bond
                          issueDate,                //bond
                          maturityDate,             //bond
                          settlementDays,           //bond
                          calendar,                 //bond
                          convention,               //bond
                          yieldCounter,             //yield
                          yieldCompounding,         //yield
                          yieldFrequency,           //yield
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
  
  var data = {
            "ZeroCouponBond": {
                "Yield":{
                    "Frequency":yieldFrequency,
                    "Compounding":yieldCompounding,
                    "DayCounter":yieldCounter,
                },
                "MaturityDate":maturityDate,
                "IssueDate":issueDate,
                "SettlementDays":settlementDays,
                "FaceAmount":faceAmount,
                "Redemption":redemption,
                "Calendar":calendar,
                "Convention":convention,
            },
            "Pricing":{
                "AsOfDate": pricingAsOfDate,
            },
            "Curves":{
               "DiscountingTermStructure": discountData
            }
        };
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/priceZeroCouponBond', options);
  var responseValue = response.getContentText();
      
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    var NPVArray = ["NPV",responseArray["NPV"],,,]
    var YieldArray = ["Yield",responseArray["Yield"],,,]
    var DirtyPriceArray = ["DirtyPrice",responseArray["DirtyPrice"],,,]
    var CleanPriceArray = ["CleanPrice",responseArray["CleanPrice"],,,]
    
    output[0] = NPVArray;
    output[1] = YieldArray;
    output[2] = DirtyPriceArray;
    output[3] = CleanPriceArray;
    
    var i;
    
    for(i = 0; i<responseArray.Flows.length;i++){
      var tmpArray = new Array()
      tmpArray[0] = "Flow";
      tmpArray[1] = responseArray.Flows[i].Price;
      tmpArray[2] = responseArray.Flows[i].Discount;
      tmpArray[3] = responseArray.Flows[i].Date;
      tmpArray[4] = responseArray.Flows[i].Amount;
      output[i+4] = tmpArray;
    }
  }
  
  return output;
}

function PRICEZEFIXEDRATEBOND(discountingDepositPoints, //discounting curve
                          discountingFRAPoints,     //discounting curve
                          discountingFuturePoints,  //discounting curve
                          discountingSwapPoints,    //discounting curve
                          discountingBondPoints,    //discounting curve
                          discountingCompounding,   //discounting curve
                          discountingDayCounter,    //discounting curve
                          discountingInterpolator,  //discounting curve
                          faceAmount,               //bond
                          redemption,               //bond
                          issueDate,                //bond
                          rate,                     //bond
                          settlementDays,           //bond
                          dayCounter,               //bond
                          convention,               //bond
                          scheduleCalendar,         //schedule  
                          scheduleEffectiveDate,    //schedule
                          scheduleTerminationDate,  //schedule
                          schedulePeriod,           //schedule
                          scheduleConvention,       //schedule
                          scheduleTerminationDateConvention, //schedule
                          scheduleDateGenerationRule, //schedule
                          scheduleEndOfMonth,       //schedule
                          yieldCounter,             //yield
                          yieldCompounding,         //yield
                          yieldFrequency,           //yield
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
  
  var data = {
            "FixedRateBond": {
                "Yield":{
                    "Frequency":yieldFrequency,
                    "Compounding":yieldCompounding,
                    "DayCounter":yieldCounter,
                },
                "Schedule":{
                  "Calendar":scheduleCalendar,
                  "EffectiveDate":scheduleEffectiveDate,
                  "TerminationDate":scheduleTerminationDate,
                  "Frequency":schedulePeriod,
                  "Convention":scheduleConvention,
                  "TerminationDateConvention":scheduleTerminationDateConvention,
                  "DateGenerationRule":scheduleDateGenerationRule,
                  "EndOfMonth":scheduleEndOfMonth
                },
                "SettlementDays":settlementDays,
                "FaceAmount":faceAmount,
                "Rate":rate,
                "DayCounter":dayCounter,
                "Convention":convention,
                "Redemption":redemption,
                "IssueDate":issueDate,
            },
            "Pricing":{
                "AsOfDate": pricingAsOfDate,
            },
            "Curves": {
                "DiscountingTermStructure": discountData
            }
        };
  
  var dataResult = JSON.stringify(data);
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/priceFixedRateBond', options);
  var responseValue = response.getContentText();
      
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    var NPVArray = ["NPV",responseArray["NPV"],,,]
    var YieldArray = ["Yield",responseArray["Yield"],,,]
    var DirtyPriceArray = ["DirtyPrice",responseArray["DirtyPrice"],,,]
    var CleanPriceArray = ["CleanPrice",responseArray["CleanPrice"],,,]
    var AccruedPriceArray = ["AccruedAmount",responseArray["AccruedAmount"],,,]
    var AccruedDaysArray = ["AccruedDays",responseArray["AccruedDays"],,,]
    var BPSArray = ["BPS",responseArray["BPS"],,,]                             
    var ConvexityArray = ["Convexity",responseArray["Convexity"],,,]                             
    var ModifiedDurationArray = ["ModifiedDuration",responseArray["ModifiedDuration"],,,]      
    var MacaulayDurationArray = ["MacaulayDuration",responseArray["MacaulayDuration"],,,]      

    output[0] = NPVArray;
    output[1] = YieldArray;
    output[2] = DirtyPriceArray;
    output[3] = CleanPriceArray;
    output[4] = AccruedPriceArray;
    output[5] = AccruedDaysArray;
    output[6] = BPSArray;
    output[7] = ConvexityArray;
    output[8] = ModifiedDurationArray;
    output[9] = MacaulayDurationArray;
    
    var i;
    
    for(i = 0; i<responseArray.Flows.length;i++){
      var tmpArray = new Array()
      if(responseArray.Flows[i].Type == "FixedInterest"){
        tmpArray[0] = responseArray.Flows[i].Type;
        tmpArray[1] = responseArray.Flows[i].Rate;
        tmpArray[2] = responseArray.Flows[i].Amount;
        tmpArray[3] = responseArray.Flows[i].AccrualStartDate;
        tmpArray[4] = responseArray.Flows[i].AccrualEndDate;
      }else{
        tmpArray[0] = responseArray.Flows[i].Type;
        tmpArray[1] = responseArray.Flows[i].Rate;
        tmpArray[2] = responseArray.Flows[i].Amount;
        tmpArray[3] = responseArray.Flows[i].AccrualStartDate;
        tmpArray[4] = responseArray.Flows[i].AccrualEndDate;
        tmpArray[5] = responseArray.Flows[i].Discount;
        tmpArray[6] = responseArray.Flows[i].Price;
      }
      output[i+10] = tmpArray;
    }
  }
  
  return output;
}

function PRICEFLOATINGRATEBOND(discountingDepositPoints, //discounting curve
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
                          faceAmount,               //bond
                          redemption,               //bond
                          issueDate,                //bond
                          spread,                   //bond
                          settlementDays,           //bond
                          dayCounter,               //bond
                          convention,               //bond
                          scheduleCalendar,         //schedule  
                          scheduleEffectiveDate,    //schedule
                          scheduleTerminationDate,  //schedule
                          schedulePeriod,           //schedule
                          scheduleConvention,       //schedule
                          scheduleTerminationDateConvention, //schedule
                          scheduleDateGenerationRule, //schedule
                          scheduleEndOfMonth,       //schedule
                          indexSettlementDays,   //index
                          indexCalendar,         //index
                          indexConvention,       //index
                          indexEndOfMonth,       //index
                          indexDayCounter,       //index
                          indexFixings,          //index   
                          yieldCounter,             //yield
                          yieldCompounding,         //yield
                          yieldFrequency,           //yield
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
  
  var data = {
            "FloatingRateBond": {
                "Yield":{
                    "Frequency":yieldFrequency,
                    "Compounding":yieldCompounding,
                    "DayCounter":yieldCounter,
                },
                "Schedule":{
                  "Calendar":scheduleCalendar,
                  "EffectiveDate":scheduleEffectiveDate,
                  "TerminationDate":scheduleTerminationDate,
                  "Frequency":schedulePeriod,
                  "Convention":scheduleConvention,
                  "TerminationDateConvention":scheduleTerminationDateConvention,
                  "DateGenerationRule":scheduleDateGenerationRule,
                  "EndOfMonth":scheduleEndOfMonth
                },
                "Index":{  
                  "SettlementDays":indexSettlementDays,
                  "Calendar":indexCalendar,
                  "Convention":indexConvention,
                  "EndOfMonth":indexEndOfMonth,
                  "DayCounter":indexDayCounter,
                  "Fixings": fixings
                },
                "SettlementDays":settlementDays,
                "FaceAmount":faceAmount,
                "Spread":spread,
                "DayCounter":dayCounter,
                "Convention":convention,
                "Redemption":redemption,
                "IssueDate":issueDate,
            },
            "Pricing":{
                "AsOfDate": pricingAsOfDate,
            },
            "Curves": {
                "DiscountingTermStructure": discountData,
                "ForecastingTermStructure": forecastingData
            }
        };
 
  
  var options = {
   'method' : 'post',
   'contentType': 'application/json',
   'payload' : JSON.stringify(data)
 };
  
  var response = UrlFetchApp.fetch('https://api.quantra.io/priceFloatingRateBond', options);
  var responseValue = response.getContentText();
      
  var output = new Array();
  
  if(JSON.parse(responseValue).response == "ko"){
    output = JSON.parse(responseValue).message;
    output = JSON.stringify(output);
  }else{
    var responseArray = JSON.parse(responseValue).message;
    var NPVArray = ["NPV",responseArray["NPV"],,,]
    var YieldArray = ["Yield",responseArray["Yield"],,,]
    var DirtyPriceArray = ["DirtyPrice",responseArray["DirtyPrice"],,,]
    var CleanPriceArray = ["CleanPrice",responseArray["CleanPrice"],,,]
    var AccruedPriceArray = ["AccruedAmount",responseArray["AccruedAmount"],,,]
    var AccruedDaysArray = ["AccruedDays",responseArray["AccruedDays"],,,]
    var BPSArray = ["BPS",responseArray["BPS"],,,]                             
    var ConvexityArray = ["Convexity",responseArray["Convexity"],,,]                             
    var ModifiedDurationArray = ["ModifiedDuration",responseArray["ModifiedDuration"],,,]      
    var MacaulayDurationArray = ["MacaulayDuration",responseArray["MacaulayDuration"],,,]      

    output[0] = NPVArray;
    output[1] = YieldArray;
    output[2] = DirtyPriceArray;
    output[3] = CleanPriceArray;
    output[4] = AccruedPriceArray;
    output[5] = AccruedDaysArray;
    output[6] = BPSArray;
    output[7] = ConvexityArray;
    output[8] = ModifiedDurationArray;
    output[9] = MacaulayDurationArray;
    
    var i;
    
    for(i = 0; i<responseArray.Flows.length;i++){
      var tmpArray = new Array()
      if(responseArray.Flows[i].Type == "FixedInterest"){
        tmpArray[0] = responseArray.Flows[i].Type;
        tmpArray[1] = responseArray.Flows[i].FixingDate;
        tmpArray[2] = responseArray.Flows[i].Rate;
        tmpArray[3] = responseArray.Flows[i].Amount;
        tmpArray[4] = responseArray.Flows[i].AccrualStartDate;
        tmpArray[5] = responseArray.Flows[i].AccrualEndDate;
      }else{
        tmpArray[0] = responseArray.Flows[i].Type;
        tmpArray[1] = responseArray.Flows[i].FixingDate;
        tmpArray[2] = responseArray.Flows[i].Rate;
        tmpArray[3] = responseArray.Flows[i].Amount;
        tmpArray[4] = responseArray.Flows[i].AccrualStartDate;
        tmpArray[5] = responseArray.Flows[i].AccrualEndDate;
        tmpArray[6] = responseArray.Flows[i].Discount;
        tmpArray[7] = responseArray.Flows[i].Price;
      }
      output[i+10] = tmpArray;
    }
  }
  
  return output;
}