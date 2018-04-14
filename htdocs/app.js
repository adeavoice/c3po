//'use strict'; //ECMAScript standard
/* Чат-бот умеет выводить информацию о школьном расписание уроков

 Вопросы, на которые умеет отвечать бот:
 1. Какое расписание на [сегодня/день недели/неделю]? ++доработано: Какое расписание сегодя?
 1a. Покажи (всё) расписание (на) [сегодня/день недели/неделю]. --доработать: Покажи/выведи/напиши/напечатай/дай (всё) расписание
 1b. Какие предметы/уроки (в) [сегодня/день недели]?
 2. Во сколько/Когда начинаются/заканчиваются уроки (в) [сегодня/день недели]?
 3. Сколько/какое количество предметов/уроков (в) [сегодня/день недели]?

 --4. Есть ли (у меня) [предмет] (в) [сегодня/день недели]?
 --5. Во сколько (начинаются/заканчиваются) (у меня) [предмет] (в) [сегодня/день недели]?
 --6. В каком кабинете/где будет предмет/урок?

 */

////////////////////////////////////////////////////////////////////////////////
// Подключаем библиотеку Telegraf и внешние скрипты
////////////////////////////////////////////////////////////////////////////////
var TelegramBot = require('telegraf'); // telegraf library
var Config      = require('./config'); // get config

////////////////////////////////////////////////////////////////////////////////
// Создаем объект приложения бота Телеграмм
////////////////////////////////////////////////////////////////////////////////
var app         = new TelegramBot(Config.bot_token);

////////////////////////////////////////////////////////////////////////////////
// Описываем переменную-объект "Школьное расписание"
////////////////////////////////////////////////////////////////////////////////
var schedule = { monday :   [ {time:' 8:30', end:' 9:10', subject:'Биология', room:'39а'},
                              {time:' 9:30', end:'10:10', subject:'История', room:'Б'},
                              {time:'10:30', end:'11:10', subject:'Математика', room:'45'},
                              {time:'11:25', end:'12:05', subject:'Физкультура', room:'ТЗ'}],
                 tuesday:   [ {time:' 8:30', end:' 9:10', subject:'Английский язык/Математика', room:'39/45'},
                              {time:' 9:30', end:'10:10', subject:'Русский язык', room:'37'},
                              {time:'10:30', end:'11:10', subject:'Литература', room:'37'},
                              {time:'11:25', end:'12:05', subject:'Русский язык', room:'37'},
                              {time:'12:20', end:'13:00', subject:'Математика/Английский язык', room:'45/10'},
                              {time:'13:15', end:'13:55', subject:'География', room:'41'},
                              {time:'14:05', end:'14:45', subject:'---/СК математика', room:'45'}],
                 wednesday: [ {time:' 8:30', end:' 9:10', subject:'Математика', room:'45'},
                              {time:' 9:30', end:'10:10', subject:'Самароведение', room:'42'},
                              {time:'10:30', end:'11:10', subject:'Английский язык', room:'39/10'},
                              {time:'11:25', end:'12:05', subject:'Изобразительное искусство', room:'Б'},
                              {time:'12:20', end:'13:00', subject:'Математика', room:'45'},
                              {time:'13:15', end:'13:55', subject:'Естествознание', room:'ф2'},
                              {time:'14:05', end:'14:45', subject:'СК математика/---', room:'45'}],
                 thursday:  [ {time:' 8:30', end:' 9:10', subject:'Технология', room:'49/19'},
                              {time:' 9:30', end:'10:10', subject:'Технология', room:'49/19'},
                              {time:'10:30', end:'11:10', subject:'Русский язык', room:'36'},
                              {time:'11:25', end:'12:05', subject:'Русский язык', room:'36'},
                              {time:'12:20', end:'13:00', subject:'Физкультура', room:'БЗ'},
                              {time:'13:15', end:'13:55', subject:'Литература', room:'36'}],
                 friday:    [ {time:' 8:30', end:' 9:10', subject:'История', room:'ф3'},
                              {time:' 9:30', end:'10:10', subject:'Информатика/Математика', room:'48/45'},
                              {time:'10:30', end:'11:10', subject:'Музыка', room:'Муз.зал'},
                              {time:'11:25', end:'12:05', subject:'Математика/Информатика', room:'45/48'},
                              {time:'12:20', end:'13:00', subject:'Обществознание', room:'ф3'},
                              {time:'13:15', end:'13:55', subject:'Математика', room:'45'}],
                 saturday:  [ {time:' 8:30', end:' 9:10', subject:'Русский язык', room:'44'},
                              {time:' 9:20', end:'10:00', subject:'Физкультура', room:'МЗ'},
                              {time:'10:10', end:'10:50', subject:'Математика', room:'45'},
                              {time:'11:00', end:'11:40', subject:'Русский язык', room:'44'},
                              {time:'11:50', end:'12:30', subject:'Литература', room:'44'},
                              {time:'12:40', end:'13:20', subject:'Английский язык', room:'39/10'}],
                 sunday:    []
               };

////////////////////////////////////////////////////////////////////////////////
// Описываем вспомогательные функции
////////////////////////////////////////////////////////////////////////////////
// Translate Day Of The Week (tdotw) - Перевести с английского день недели
var tdotw = function(day_of_the_week) {
  var days = {"monday":"понедельник", "tuesday":"вторник", "wednesday":"среда", "thursday":"четверг", "friday":"пятница", "saturday":"суббота", "sunday":"воскресенье"};
  //  return days[day_of_the_week];
  switch(day_of_the_week) {
    case "monday"   :return "понедельник";
    case "tuesday"  :return "вторник";
    case "wednesday":return "среда";
    case "thursday" :return "четверг";
    case "friday"   :return "пятница";
    case "saturday" :return "суббота";
    case "sunday"   :return "воскресенье";
  }
}

var schmonday = function(ind) {
  return schedule.monday[ind].time + ' - ' + schedule.monday[ind].end + ' ' + schedule.monday[ind].subject + ' ' + schedule.monday[ind].room + '\n';
}

var schday0 = function(day_of_the_week, ind) {
  return schedule.monday[ind];
  //.monday.[ind].time + ' - ' + schedule.monday[ind].end + ' ' + schedule.monday[ind].subject + ' ' + schedule.monday[ind].room + '\n';
}

var schday1 = function(day_of_the_week, ind) {
  return schedule.day_of_the_week;
  //.monday.[ind].time + ' - ' + schedule.monday[ind].end + ' ' + schedule.monday[ind].subject + ' ' + schedule.monday[ind].room + '\n';
}

var schday2 = function(day_of_the_week, ind) {
  return schedule.day_of_the_week[ind];
  //.monday.[ind].time + ' - ' + schedule.monday[ind].end + ' ' + schedule.monday[ind].subject + ' ' + schedule.monday[ind].room + '\n';
}

// "Получить расписание по дню недели"
var getScheduleDay = function(state, day_of_the_week) {
  switch(state){
    case 1:
      switch(day_of_the_week){
        case "monday":    var s = "понедельник:\n";
                          for ( var i = 0; i < schedule.monday.length; i++ ) {
                            //s = s + schedule.monday[i].time + ' - ' + schedule.monday[i].end + ' ' + schedule.monday[i].subject + ' ' + schedule.monday[i].room + '\n';
                            s = s + schmonday(i);
                          }
                          return s;
        case "tuesday":   var s = "вторник:\n ";
                          for ( var i = 0; i < schedule.tuesday.length; i++ ) {
                            s = s + schedule.tuesday[i].time + ' - ' + schedule.tuesday[i].end + ' ' + schedule.tuesday[i].subject + ' ' + schedule.tuesday[i].room + '\n';
                          }
                          return s;
        case "wednesday": var s = "среду:\n";
                          for ( var i = 0; i < schedule.wednesday.length; i++ ) {
                            s = s + schedule.wednesday[i].time + ' - ' + schedule.wednesday[i].end + ' ' + schedule.wednesday[i].subject + ' ' + schedule.wednesday[i].room + '\n';
                          }
                          return s;
        case "thursday":  var s = "четверг:\n";
                          for ( var i = 0; i < schedule.thursday.length; i++ ) {
                            s = s + schedule.thursday[i].time + ' - ' + schedule.thursday[i].end + ' ' + schedule.thursday[i].subject + ' ' + schedule.thursday[i].room + '\n';
                          }
                          return s;
        case "friday":    var s = "пятницу:\n";
                          for ( var i = 0; i < schedule.friday.length; i++ ) {
                            s = s + schedule.friday[i].time + ' - ' + schedule.friday[i].end + ' ' + schedule.friday[i].subject + ' ' + schedule.friday[i].room + '\n';
                          }
                          return s;
        case "saturday":   var s = "субботу:\n";
                          for ( var i = 0; i < schedule.saturday.length; i++ ) {
                            s = s + schedule.saturday[i].time + ' - ' + schedule.saturday[i].end + ' ' + schedule.saturday[i].subject + ' ' + schedule.saturday[i].room + '\n';
                          }
                          return s;
        case "sunday":    return "воскресенье:\nБез уроков. Отдыхай, дружок :)";
        default:          return "";
      }
    case 2:
      switch(day_of_the_week){
        case "monday":    var s = 'в понедельник в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "tuesday":   var s = 'во вторник в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "wednesday": var s = 'в среду в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "thursday":  var s = 'в четверг в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "friday":    var s = 'в пятницу в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "saturday":  var s = 'в субботу в '+ schedule[day_of_the_week][0].time;
                          return s;
        case "sunday":    return "в воскресенье нет уроков";
        default:          return "";
      }
    case 3:
      switch(day_of_the_week){
        case "monday":    var s = 'в понедельник в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "tuesday":   var s = 'во вторник в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "wednesday": var s = 'в среду в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "thursday":  var s = 'в четверг в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "friday":    var s = 'в пятницу в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "saturday":  var s = 'в субботу в '+ schedule[day_of_the_week][schedule[day_of_the_week].length-1].end;
                          return s;
        case "sunday":    return "в воскресенье нет уроков";
        default:          return "";
      }
    case 4:
      switch(day_of_the_week){
        case "monday":    var s = 'в понедельник '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "tuesday":   var s = 'во вторник '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "wednesday": var s = 'в среду '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "thursday":  var s = 'в четверг '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "friday":    var s = 'в пятницу '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "saturday":  var s = 'в субботу '+ schedule[day_of_the_week].length + ' шт.';
                          return s;
        case "sunday":    return "в воскресенье нет уроков";
        default:          return "";
      }
    default:          return "";
  }
  
}

////////////////////////////////////////////////////////////////////////////////
// Задаём реакцию бота на обязательные команды
////////////////////////////////////////////////////////////////////////////////
app.command('start', (ctx) => {
  console.log('start', ctx.from);
  ctx.reply('Привет, меня зовут c3po...\n'+
            'Я знаю всё о школьном расписании.\n'+
            'Что бы вы хотели узнать?'
            );
})

app.command('help', (ctx) => {
  console.log('help', ctx.from);
  ctx.reply('Помоги себе сам, будь умничкой ;)');
});

////////////////////////////////////////////////////////////////////////////////
// Задаём реакцию бота на текстовые сообщения
////////////////////////////////////////////////////////////////////////////////
app.on('text', function(ctx) {
  var txt = ctx.message.text.toLowerCase(); // Заглавные буквы свойства "text" из объекта контекста "ctx" делает маленткими
  console.log(txt); // Выводим в консоль значение переменной txt (текст сообщения пользователя), которая содержит значение свойства "text" (маленькие буквы) из объекта контекста "ctx" (контекст послания пользователя)

  //Анализ текста
  var mon =     /(понедельник|пн.|пн$)/.test(txt); // . - символ, $ - конец "слова" | - или
  var tue =         /(вторник| вт.|вт$)/.test(txt);
  var wed =     /(среда|среду|ср.|ср$)/.test(txt);
  var thu =         /(четверг|чт.|чт$)/.test(txt);
  var fri = /(пятница|пятницу|пт.|пт$)/.test(txt);
  var sat = /(суббота|субботу|сб.|сб$)/.test(txt);
  var sun =     /(воскресенье|вс.|вс$)/.test(txt);
  var day = /(день|сегодня)/.test(txt);
  var week = /(неделю)/.test(txt);
  var tomo = /(завтра)/.test(txt);

  //Получаем сегодняшнюю дату и масив с днями недели
  var today = new Date(); // Сегодняшняя дата
  var AllDays = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
  var Day = AllDays[today.getDay()]; // Сегодняшний день недели (today.getDay() возвращает значение от 0 до 6)
  // Переносим Вс. в хвост массива
  AllDays.splice(AllDays.indexOf("sunday"),1); // Удаляем элемент с названием Вс.: indexOf - индекс элемента; splice(index, cnt) удалить элементы начиная с индекса index в количестве cnt
  AllDays.push("sunday"); // Добавляем элемент в хвост массива

  var Days = [];
  /* || - логическое "или" (логическое сложение), && - логическое "и" (логическое умножение)
  false||false = false
  true ||false = true
  false||true  = true
  true ||true  = true
  false&&false = false
  true &&false = false
  false&&true  = false
  true &&true  = true */
  if (mon||day&&Day==="monday"   ||tomo&&Day==="sunday"   ) { Days.push("monday");    }
  if (tue||day&&Day==="tuesday"  ||tomo&&Day==="monday"   ) { Days.push("tuesday");   }
  if (wed||day&&Day==="wednesday"||tomo&&Day==="tuesday"  ) { Days.push("wednesday"); }
  if (thu||day&&Day==="thursday" ||tomo&&Day==="wednesday") { Days.push("thursday");  }
  if (fri||day&&Day==="friday"   ||tomo&&Day==="thursday" ) { Days.push("friday");    }
  if (sat||day&&Day==="saturday" ||tomo&&Day==="friday"   ) { Days.push("saturday");  }
  if (sun||day&&Day==="sunday"   ||tomo&&Day==="saturday" ) { Days.push("sunday");    }

  //1. Какое расписание на [сегодня/день недели/неделю]? ++доработано: Какое расписание сегодя?
  //1a. Покажи (всё) расписание (на) [сегодня/день недели/неделю]. --доработать: Покажи/выведи/напиши/напечатай/дай (всё) расписание
  //1b. Какие предметы/уроки (в) [сегодня/день недели]?
  var Q1 = /расписание сегодня|расписание(?= на| в| во)|какие(?= предметы сегодня| уроки сегодня)|какие(?= предметы(?= в| во)| уроки(?= в| во))/.test(txt);
  //2. Во сколько начинаются/заканчиваются уроки (в) [сегодня/день недели]?
  var Q21 = /во сколько начинаются(?= уроки(?= | в| во)| предметы(?= | в| во)| занятия(?= | в| во))|когда начинаются(?= уроки(?= | в| во)| предметы(?= | в| во)| занятия(?= | в| во))/.test(txt);
  var Q22 = /во сколько заканчиваются(?= уроки(?= | в| во)| предметы(?= | в| во)| занятия(?= | в| во))|когда заканчиваются(?= уроки(?= | в| во)| предметы(?= | в| во)| занятия(?= | в| во))/.test(txt);
  //3. Сколько/какое количество предметов/уроков (в) [сегодня/день недели]?
  var Q3 = /сколько(?= уроков(?= | в| во)| предметов(?= | в| во)| занятий(?= | в| во))|какое количество(?= уроков(?= | в| во)| предметов(?= | в| во)| занятий(?= | в| во))/.test(txt);
  //4. Во сколько (начинаются/заканчиваются) (у меня) [предмет] (в) [сегодня/день недели]?
  //var Q41 = /во сколько|когда начинается (?= у меня)|(?= урок|предмет|занятие)/.test(txt);
  //var Q42 = /во сколько|когда заканчиваются (?= у меня)|(?= урок|предмет|занятие)/.test(txt);
  //5. Есть ли (у меня) [предмет] (в) [сегодня/день недели]?
  //var Q5 = /есть ли|есть(?= у меня)|предметы(?= сегодня|)|занятия(?= сегодня)/.test(txt);
  var Answer = "";

/*
var schmonday = function(ind) {
  return schedule.monday[ind].time + ' - ' + schedule.monday[ind].end + ' ' + schedule.monday[ind].subject + ' ' + schedule.monday[ind].room + '\n';
}

var schday0 = function(day_of_the_week, ind) {
  return schedule.monday[ind];
}

var schday1 = function(day_of_the_week, ind) {
  return schedule.day_of_the_week;
}

var schday2 = function(day_of_the_week, ind) {
  return schedule.day_of_the_week[ind];
}
*/

  if (test(txt) == "schday0") {
    ctx.reply( schday0("monday",1) );
  } else if (test(txt) == "schday1") {
    ctx.reply( schday1("monday",1) );
  } else if (test(txt) == "schday2") {
    ctx.reply( schday2("monday",1) );
  }

  if (Q1) {
    if (week) {
      var Answer = "Расписание на неделю...\n";
      for ( var i = 0; i < AllDays.length; i++ ) {
        Answer = Answer + getScheduleDay(AllDays[i]) + "\n";
      }
    } else {
      if (Days.length > 0) {
        var Answer = "Вот расписание на ";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getScheduleDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(1, Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, что-то пошло не так..."; }
    }
    ctx.reply( Answer ); // Отправляем готовый ответ пользователю
  } else if (Q21) {
    if (Days.length > 0) {
        var Answer = "Уроки начинаются: \n";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getScheduleDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(2, Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, что-то пошло не так..."; }
    ctx.reply( Answer ); // Отправляем готовый ответ пользователю
  } else if (Q22) {
    if (Days.length > 0) {
        var Answer = "Уроки заканчиваются: \n";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getScheduleDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(3, Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, что-то пошло не так..."; }
    ctx.reply( Answer ); // Отправляем готовый ответ пользователю
  } else if (Q3) {
    if (Days.length > 0) {
        var Answer = "Кол-во уроков: \n";
        for ( var i = 0; i < Days.length; i++ ) {
          // Самописные функции tdotw, getScheduleDay
          //Answer = Answer + tdotw(Days[i]) + ":\n";
          Answer = Answer + getScheduleDay(4, Days[i]) + "\n";
        }
      } else { Answer = "Упс... Не знаю, что и сказать, что-то пошло не так..."; }
    ctx.reply( Answer ); // Отправляем готовый ответ пользователю
  } else {
    // Ответ бота, если день недели не был указан в сообщении
    ctx.reply( 'Упс... Не смог распознать суть вашего вопроса о расписании уроков, попробуйте сформулировать вопрос иначе...' ); //Скайвокер
  }
});

////////////////////////////////////////////////////////////////////////////////
// Запускаем приложение бота
////////////////////////////////////////////////////////////////////////////////
app.startPolling();
