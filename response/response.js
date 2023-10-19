function Response() {
  this.code = 200;
  this.success = true;
  this.message = "";
  this.data = [];
  this.err = {};
}

async function successCreateMessage(msg, payload) {
  let res = new Response();
  res.code = 201;
  res.success = true;
  res.message = msg;
  res.data = payload;
  res.err = {};
  return res;
}

async function failMessage(msg) {
  let res = new Response();
  res.code = 400;
  res.success = false;
  res.message = msg;
  res.data = [];
  return res;
}

async function successMessage(msg, data) {
  let res = new Response();
  res.code = 200;
  res.success = true;
  res.message = msg;
  res.data = data;
  return res;
}

module.exports = {
  failMessage,
  successCreateMessage,
  successMessage,
};
