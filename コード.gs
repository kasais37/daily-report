const CALENDAR_ID = CalendarApp.getId();

function getCalendarEvents() {
  const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
  var date = new Date();
  date.setDate(date.getDate() + 1);
  const events = calendar.getEventsForDay(date);
  const values = [];
  
  for(const event of events){
    const record = [
      event.getTitle(),
      event.getStartTime(),
      event.getEndTime()
    ];
    values.push(record);
  }
   
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('予定');
  const lastRow = sheet.getLastRow();
  rng = sheet.getRange("A2:C20");
  rng.clearContent();
    
  if(isBusinessDay(date)){
    sheet.getRange(2, 1, values.length, values[0].length).setValues(values);
    createDraft();
  }
}

function isBusinessDay(date){
  if (date.getDay() == 0 || date.getDay() == 6) {
    return false;
  }
//  var calJa = CalendarApp.getCalendarById('ja.japanese#holiday@group.v.calendar.google.com');
//  if(calJa.getEventsForDay(date).length > 0){
//    return false;
//  }
  return true;
}

function createDraft() {
  const values = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('日報下書き').getDataRange().getValues();
  const to = values[1][1];
  const subject = values[2][1];
  let body = '';
  for(i = 3; i < 25; i++){
    body += values[i][1]; 
  }
  GmailApp.createDraft(to, subject, body); 
}