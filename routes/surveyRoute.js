const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys");

module.exports = app => {
  app.post("/api/survey", requireLogin, requireCredits, async (req, res) => {
    const { title, body, subject, recipents } = req.body;
    const survey = new Survey({
      title,
      body,
      subject,
      recipents: recipents.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    //sending email
    const mail = new Mailer(survey, surveyTemplate(survey));
    try {
      await mail.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      res.status(422).send(err);
    }
  });
};
