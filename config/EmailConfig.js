import nodemailer from "nodemailer";
export let transport = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user: "ibrahimjavaid56@gmail.com",
    pass: "wkuscemobeigehqj"
  }
});
// user: "ibrahimjavaid56@gmail.com",
// pass: "wkuscemobeigehqj"
// auth: {
//   user: "018d2d60647af0",
//   pass: "d954883e31bc5a"
// }