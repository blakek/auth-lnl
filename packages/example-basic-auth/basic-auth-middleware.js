import dotProp from 'dot-prop';
import { getUser } from '../users/index.js';

const { get } = dotProp;

async function basicAuthMiddleware(req, _res, next) {
  const { username, password } = parseAuthHeader(req.headers.authorization);
  const user = await getUser(username, password);
  req.user = user;
  next();
}

function parseAuthHeader(authHeader) {
  const detailsSearch = /Basic (?<encodedLoginDetails>.*)/;

  // Find details in Authorization header
  const encodedLoginDetails = get(
    detailsSearch.exec(authHeader),
    'groups.encodedLoginDetails',
    ''
  );

  // Decode details
  const decodedLoginDetails = Buffer.from(
    encodedLoginDetails,
    'base64'
  ).toString('utf-8');

  // In Basic Auth, username and password are separated by a colon
  const [username, password] = decodedLoginDetails.split(':');

  return { username, password };
}

export { basicAuthMiddleware, parseAuthHeader };
