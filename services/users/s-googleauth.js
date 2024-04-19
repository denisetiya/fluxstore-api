const {google} = require("googleapis");
const {findUserByEmail, createUser} = require("../../repository/r-users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
)


const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

const authorizeUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope,
  include_granted_scopes: true
})


const callback = async (tokens) => {

  oauth2Client.setCredentials(tokens);

  const outh2 = google.oauth2({
    auth: oauth2Client,
    version: "v2"
  })
  
  const { data } = await outh2.userinfo.get();
  
  if (!data) {
    throw new Error("Google login failed");
  }

  const user = await findUserByEmail(data.email);

  const hashPassword = await bcrypt.hash(data.id, 10);

  if (!user) {
    const newUser = await createUser({
      name: data.name,
      email: data.email,
      profilePic: data.picture,
      password: hashPassword
    })

    if (!newUser) {
      throw new Error("Google login failed");
    }

    const token = jwt.sign({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      profilePic: newUser.profilePic
    }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    return {newUser, token};

    }
    else{
      const token = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
      }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      return {user, token};
        
      }
    }


module.exports = {
  authorizeUrl,
  oauth2Client,
  callback
}