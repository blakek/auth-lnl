import express from 'express';
import { dirname, resolve } from 'path';
import templateFile from 'template-file';
import { fileURLToPath } from 'url';
import { basicAuthMiddleware } from './basic-auth-middleware.js';

const app = express();
const { renderTemplateFile } = templateFile;
const __dirname = dirname(fileURLToPath(import.meta.url));
const relativeFile = filename => resolve(__dirname, filename);

app.get('/style.css', express.static('./'));

app.get('/account', async (req, res) => {
  const accountView = await renderTemplateFile(
    relativeFile('views/account.html')
  );

  res.send(accountView);
});

app.post('/check-login', [basicAuthMiddleware], async (req, res) => {
  // `user` is added to `req` from `basicAuthMiddleware`
  if (!req.user) {
    res.status(401).send({ message: 'Invalid username or password' });
    return;
  }

  res.send({ message: 'ok' });
});

app.get('/login', async (req, res) => {
  const loginView = await renderTemplateFile(relativeFile('views/login.html'));

  res.send(loginView);
});

app.post('/userinfo', [basicAuthMiddleware], async (req, res) => {
  // `user` is added to `req` from `basicAuthMiddleware`
  if (!req.user) {
    res.status(401).send({ message: 'Invalid username or password' });
    return;
  }

  res.send({ ...req.user });
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000/');
});
