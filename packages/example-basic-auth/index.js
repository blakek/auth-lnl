import express from 'express';
import templateFile from 'template-file';
import { basicAuthMiddleware } from './basic-auth-middleware.js';

const app = express();
const { renderTemplateFile } = templateFile;

app.get('/login', [basicAuthMiddleware], async (req, res) => {
  // `user` is added to `req` from `basicAuthMiddleware`
  if (!req.user) {
    res.status(401).send({ message: 'Invalid username or password' });
    return;
  }

  res.send({ user: req.user });
});

app.listen(3000, () => {
  console.log('Running at http://localhost:3000/');
});
