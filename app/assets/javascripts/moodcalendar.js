let data = {
  entries: caldata,
  years: [
    { year: "2018", range: {start: "2018-01-01", end: "2018-12-31"} }
  ]
}

// Fills in grey boxes for dates without entries before the current one
// NEED TO FILL THIS IN ON THE SERVER WHEN GENERATING DATA FROM THE DB
// That is: The server needs to generate an array of days for the whole
// year, and for days with entries, it should pass the mood of that entry
// For other days, it should pass a mood of "none"
// Also, TODO: figure out what to do with days that have multiple entries
// even if it just involves ignoring all but the first
var now = new Date();
var daysOfYear = [];
for (var d = new Date(2018, 0, 0); d <= new Date(); d.setDate(d.getDate() + 1)) {
    // daysOfYear.push(new Date(d));
    data.entries.push({date: d.toISOString().slice(0,10), mood: "none"})
}

// Colour scheme:
// Positive [Strong]: darkorange
// Positive [Medium]: orange
// Positive [Weak]:   gold
// Negative [Weak]:   grey
// Negative [Medium]: dimgrey
// Negative [Strong]: black
// No entry:          #ebedf0
var themes = {
  standard: {
    background: "#ffffff",
    text: "#000000",
    meta: "#666666",
    moods: {
      "curious": 'orange',
      "happy": 'darkorange',
      "serene": 'darkorange',
      "grateful": 'orange',
      "scared": 'dimgrey',
      "anxious": 'dimgrey',
      "loving": 'orange',
      "angry": 'black',
      "sad": 'black',
      "remorseful": 'dimgrey',
      "bored": 'grey',
      "thoughtful": 'gold',
      "none": '#ebedf0'
    }
  },
};


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getTheme() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeName = opts.themeName;

  if (themeName in themes) {
    return themes[themeName];
  }

  return themes.standard;
}

function getDateInfo(data, date) {
  return data.entries.find(function (contrib) {
    return contrib.date === date;
  });
}

var DATE_FORMAT = "YYYY-MM-DD";
var boxWidth = 10;
var boxMargin = 2;
var textHeight = 15;
var defaultFontFace = "IBM Plex Mono";
var headerHeight = 10;
var canvasMarginHeight = 10;
var canvasMarginWidth = 10;
var yearHeight = textHeight + (boxWidth + boxMargin) * 8 + canvasMarginHeight;
var scaleFactor = window.devicePixelRatio || 1;

function getStartDate() {
  let d = new Date()
  d.setDate(d.getDate() - 90);
  return moment(d)
}

function drawYear(ctx) {

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var year = opts.year,
      _opts$offsetX = opts.offsetX,
      offsetX = _opts$offsetX === void 0 ? 0 : _opts$offsetX,
      _opts$offsetY = opts.offsetY,
      offsetY = _opts$offsetY === void 0 ? 0 : _opts$offsetY,
      data = opts.data,
      _opts$fontFace = opts.fontFace,
      fontFace = _opts$fontFace === void 0 ? defaultFontFace : _opts$fontFace;
  var thisYear = moment().format("YYYY");
  var today = year.year === thisYear ? moment() : moment(year.range.end);
  // var today = //moment(year.range.end);
  var start = moment("".concat(year.year, "-01-01"));
  // var start = getStartDate();
  var firstDate = start.clone();
  var theme = getTheme(opts);

  if (firstDate.day() !== 6) {
    firstDate.day(-(firstDate.day() + 1 % 7));
  }

  var nextDate = firstDate.clone();
  var firstRowDates = [];
  var graphEntries = [];

  while (nextDate <= today && nextDate.day(7) <= today) {
    var date = nextDate.format(DATE_FORMAT);
    firstRowDates.push({
      date: date,
      info: getDateInfo(data, date)
    });
  }

  graphEntries.push(firstRowDates);

  var _loop = function _loop(i) {
    graphEntries.push(firstRowDates.map(function (dateObj) {
      var date = moment(dateObj.date).day(i).format(DATE_FORMAT);
      return {
        date: date,
        info: getDateInfo(data, date)
      };
    }));
  };

  for (var i = 1; i < 7; i += 1) {
    _loop(i);
  }

  ctx.textBaseline = "hanging";
  ctx.fillStyle = theme.text;
  ctx.font = "10px '".concat(fontFace, "'");

  for (var y = 0; y < graphEntries.length; y += 1) {
    for (var x = 0; x < graphEntries[y].length; x += 1) {
      var day = graphEntries[y][x];

      if (moment(day.date) > today || !day.info) {
        continue;
      }

      var color = theme.moods[day.info.mood];
      ctx.fillStyle = color;
      ctx.fillRect(offsetX + (boxWidth + boxMargin) * x, offsetY + textHeight + (boxWidth + boxMargin) * y, 10, 10);
      // ctx.fillRect(offsetX + (boxWidth + boxMargin) * x, textHeight + (boxWidth + boxMargin) * y, 10, 10);
    }
  } // Draw Month Label


  var lastCountedMonth = 0;

  for (var _y = 0; _y < graphEntries[0].length; _y += 1) {
    var _date = moment(graphEntries[0][_y].date);

    var month = _date.month() + 1;
    var firstMonthIsDec = month == 12 && _y == 0;
    var monthChanged = month !== lastCountedMonth;

    if (monthChanged && !firstMonthIsDec) {
      ctx.fillStyle = theme.meta;
      // ctx.fillText(_date.format('MMM'), offsetX + (boxWidth + boxMargin) * _y, offsetY);
      lastCountedMonth = month;
    }
  }
}

function drawMoods(canvas, opts) {
  var data = opts.data
  var height = data.years.length * yearHeight + canvasMarginHeight + headerHeight + 10;
  var width = 53 * (boxWidth + boxMargin) + canvasMarginWidth * 2;
  canvas.width = width * scaleFactor;
  canvas.height = height * scaleFactor;
  var ctx = canvas.getContext("2d");
  ctx.scale(scaleFactor, scaleFactor);
  ctx.textBaseline = "hanging";

  canvasMarginWidth = (ctx.canvas.width - 558) / 2;

  data.years.forEach(function (year, i) {
    var offsetY = yearHeight * i + canvasMarginHeight + headerHeight;
    var offsetX = canvasMarginWidth;
    drawYear(ctx, _objectSpread({}, opts, {
      year: year,
      offsetX: offsetX,
      offsetY: offsetY,
      data: data
    }));
  });
}