import axios from 'axios';
import express from 'express';
import session from 'express-session';
import jwt from 'jsonwebtoken';
import { dirname, resolve } from 'path';
import templateFile from 'template-file';
import { fileURLToPath } from 'url';
import {
  client_id,
  client_secret,
  logout_url,
  token_url
} from './auth-config.js';

const { renderTemplateFile } = templateFile;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const relativeFile = filename => resolve(__dirname, filename);

// Simple middleware for ensuring a user is logged in or redirecting them to
// /login
function requireToken(req, res, next) {
  if (req.session.user) return next();
  return res.redirect('/login');
}

// Middleware to tell Express to use sessions
app.use(session({ secret: 'another-secret-to-keep' }));

app.get('/style.css', express.static('./'));

// Either go to account or login
app.get('/', [requireToken], (_req, res) => {
  res.redirect('/account');
});

// Show account details
app.use('/account', [requireToken], async (req, res) => {
  const user = req.session.user;
  const userProfile = jwt.decode(user.id_token);

  const responseString = await renderTemplateFile(
    relativeFile('account.html'),
    { tokens: JSON.stringify(user), userProfile }
  );

  res.send(responseString);
});

// Handle exchanging OAuth 2.0 authorization_code for an access token
app.use('/callback', async (req, res) => {
  try {
    const { data } = await axios.post(token_url, {
      client_id,
      client_secret,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3001/callback'
    });

    // Start a session using a cookie set to the user's tokens
    req.session.user = data;
    // Redirect to the protected page
    res.redirect('/account');
  } catch (error) {
    console.log('got error');
    console.error(error);
  }
});

app.get('/login', async (_req, res) => {
  res.sendFile(relativeFile('login.html'));
});

app.use('/logout', async (req, res) => {
  // Clear this user's session cookie
  req.session.destroy();
  // Redirect to Auth0 to complete the loguout
  res.redirect(logout_url);
});

app.listen(3001, () => {
  console.log('Running at http://localhost:3001/');
});
