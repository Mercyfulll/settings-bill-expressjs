import express from 'express';
import moment from 'moment';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import settingsBill from './settings-bill.js'

var app = express();
var settingBill = settingsBill()

app.use(express.static(('public')))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// function to update the levels and use the next middleware to render
function updateLevels(req, res, next) {
  const hasReachedWarningLevel = settingBill.hasReachedWarningLevel();
  const hasReachedCriticalLevel = settingBill.hasReachedCriticalLevel();
  res.locals.hasReachedWarningLevel = hasReachedWarningLevel;
  res.locals.hasReachedCriticalLevel = hasReachedCriticalLevel;
  next();
}


app.get("/", updateLevels, function (req, res) {
    res.render("index", {
        amount: settingBill.getCosts(),
        totals: settingBill.totals(),
    })
})

app.post("/settings", function (req, res) {

    settingBill.setCosts({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,
    });

    // console.log(settingBill.getCosts());

    res.redirect("/")

})

app.post("/action", function (req, res) {
    const hasReachedCriticalLevel = settingBill.hasReachedCriticalLevel()
    if(!hasReachedCriticalLevel)
    settingBill.checkbox(req.body.actionType)
    res.redirect("/")
})

app.get("/actions", function (req, res) {

    res.render('actions', {
        actions: settingBill.actions(),
    })

})

app.get("/actions/:actionType", function (req, res) {
    const actionType = req.params.actionType
    const actionedList = settingBill.actionsFor(actionType)

    const relativeTime = actionedList.forEach((list) => {
        
        list.timestamp = moment().startOf('hour').fromNow()

    })

    res.render('actions', {
        actions: settingBill.actionsFor(actionType),
        relativeTime
    })
})

const PORT = process.env.PORT || 3011

app.listen(PORT, () => {
    console.log("App started at port:", PORT)
}) 