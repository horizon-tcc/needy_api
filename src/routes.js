const routes = require("express").Router();
const multer = require("multer");
const multerconfig = require("./config/multer");
const path = require("path");

// Middlewares

const tokenValidate = require("./middlewares/tokenValidate");
routes.use(tokenValidate);

// Controllers

const LoginController = require("./controllers/LoginController");
const BancoSangueController = require("./controllers/BancoSangueController");
const DoadoresController = require("./controllers/DoadoresController");
const ResponsavelController = require("./controllers/ResponsavelController");
const DoacaoController = require("./controllers/DoacaoController");

routes.post("/login", LoginController.validate);

routes.get("/bancos", BancoSangueController.indexAll);
routes.get("/bancos/:id", BancoSangueController.index);

routes.get("/doacao/:idDoacao/:idDoador", DoacaoController.index);

routes.get("/doadores", DoadoresController.indexAll);
routes.get("/doadores/:id", DoadoresController.index);

routes.get("/responsavel/:id", ResponsavelController.index);

routes.post("/imagens", multer(multerconfig).single("image"), (req, res) =>
  res.json({ sucess: true })
);

// API Services

const SendMailer = require("./services/sendmailer/SendMailer");

routes.post("/sendmail", SendMailer.sendmail);

module.exports = routes;
