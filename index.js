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

app.get("/", function (req, res) {
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
        //  listActioned = moment(actionsList.timestamp).fromNow()
        list.timestamp = moment(list.timestamp).fromNow()

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