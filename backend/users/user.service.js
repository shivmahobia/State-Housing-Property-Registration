const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { secret } = require("config.json");
const db = require("database/db");

module.exports = {
  authenticate,
  getAll,
  getAllProperty,
  getAllQuarter,
  propertyId,
  quarterId,
  quarter_Qid,
  getProject,
  projectId,
  getById,
  create,
  paymentSchema,
  applicationFormcreate,
  paymentsService,
  applicationFormUpdate,
  update,
  passupdate,
  BookingUpdate,
  BookedProperyFlag,
  BookedProjectFlag,
  UpdatePropertynum,
  delete: _delete,
  forgotPassword,
  forgotPasswordAuthenticate,
  propertyP_id,
  update_password,
  BookingId,
};

async function authenticate({ email_id, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { email_id } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    // throw 'Username or password is incorrect';
    console.log("iff");
    return { status: 400, message: "wrong pass" };
  } else {
    console.log("else");
    // authentication successful
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "1d" });
    return { ...omitHash(user.get()), token };
  }
}

async function forgotPasswordAuthenticate({ email_id }) {
  const email = await db.User.findAll({ where: { email_id: email_id } });
  console.log("shiv this is email ", email);
  if (!email) {
    return { status: 400, message: "Email not found!" };
  } else {
    return email;
  }
}

async function getAll() {
  return await db.User.findAll();
}

async function getAllProperty() {
  return await db.Property.findAll();
}
async function getAllQuarter() {
  return db.Quarter.findAll();
}

async function getProject() {
  return await db.Project.findAll({
    where: {
      Project_flag: true,
    },
  });
}

async function getById(id) {
  return await getUser(id);
}

async function BookingId(id) {
  return await getBooking_data(id);
}

async function propertyId(id) {
  return await getProperty(id);
}

async function quarterId(P_id) {
  return await quarterId(P_id);
}

async function propertyP_id(P_id) {
  return await shivpropertyP_id(P_id);
}
async function quarter_Qid(Q_id) {
  return await quarter_Q_id(Q_id);
}

async function forgotPassword(email_id) {
  return await forgotPassword(email_id);
}

async function projectId(id) {
  return await projectId(id);
}

async function create(params) {
  // validate

  if (
    await db.User.findOne({ where: { mobile_number: params.mobile_number } })
  ) {
    let message = { status: 400, message: "wrong pass" };
    // return { status: 406 , message: 'Mobile Number "' + params.mobile_number + '" is already taken' }
    throw 'Mobile Number "' + params.mobile_number + '" is already taken';
    // throw 'Mobile Number "' + params.mobile_number + '" is already taken ';
  }

  // hash password
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  // save user
  await db.User.create(params);
}



async function paymentSchema(params) {

  await db.Payment.create(params);
}



async function applicationFormcreate(params) {
  await db.ApplicationForm.create(params);
}

async function paymentsService(params) {
  await db.Payment.create(params);
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const usernameChanged = params.email_id && user.email_id !== params.email_id;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { email_id: params.email_id } }))
  ) {
    throw 'Email Id "' + params.email_id + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function passupdate(id, params) {
  const user = await getUser(id);

  // hash password if it was entered
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function BookingUpdate(Q_id, params) {
  const user = await getQuarter(Q_id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function BookedProperyFlag(P_id, params) {
  const user = await getPropery(P_id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function BookedProjectFlag(id, params) {
  const user = await getProjectFlag(id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function UpdatePropertynum(id, params) {
  const user = await getProperyPid(id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function update_password(email_id, params) {
  const user = await getEmail_id(email_id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function applicationFormUpdate(id, params) {
  const user = await getApplication(id);

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";
  return user;
}

// helper functions

async function getBooking_data(id) {
  const user = await db.ApplicationForm.findByPk(id);
  if (!user) throw "Application not found";
  return user;
}

// helper functions

async function getQuarter(Q_id) {
  const user = await db.Quarter.findOne({ where: { Q_id: Q_id } });
  if (!user) throw "Quarter not found";
  return user;
}
// helper functions

async function getPropery(P_id) {
  const user = await db.Property.findOne({ where: { P_id: P_id } });
  if (!user) throw "Propery not found";
  return user;
}
// helper functions

async function getProjectFlag(id) {
  const user = await db.Project.findByPk(id);
  if (!user) throw "Project not found";
  return user;
}
// helper functions

async function getProperyPid(id) {
  const user = await db.Property.findByPk(id);
  if (!user) throw "Project not found";
  return user;
}
// helper functions

async function getEmail_id({ email_id }) {
  const email = await db.User.findAll({ where: { email_id: email_id } });
  console.log("shiv this is email ", email);
  if (!email) {
    return { status: 400, message: "Email not found!" };
  } else {
    return email;
  }
}

// helper functions

async function getApplication(id) {
  const user = await db.ApplicationForm.findByPk(id);
  if (!user) throw "Application not found";
  return user;
}

// helper functions

async function getProperty(id) {
  const property = await db.Property.findAll({
    where: {
      id: id,
      Property_flag: true,
    },
  });
  if (!property) throw "Property not found";
  return property;
}

// helper functions

async function projectId(id) {
  const project = await db.Project.findByPk(id);
  if (!project) throw "Project not found";
  return project;
}

// helper functions

async function quarterId(P_id) {
  const quarter = await db.Quarter.findAll({
    where: {
      P_id: P_id,
      Booking_flag: true,
    },
  });
  if (!quarter) throw "Quartettttt not found";
  return quarter;
}

// helper functions

async function shivpropertyP_id(P_id) {
  const quarter = await db.Property.findAll({
    where: {
      P_id: P_id,
    },
  });
  if (!quarter) throw "Property is not found";
  return quarter;
}

// helper functions

async function quarter_Q_id(Q_id) {
  const quarter = await db.Quarter.findOne({ where: { Q_id: Q_id } });
  if (!quarter) throw "Q_id not found";
  return quarter;
}

async function forgotPassword(email_id) {
  const emailId = await db.User.findAll({
    where: {
      email_id: email_id,
    },
  });
  if (!emailId) throw "Email not found";
  return emailId;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
