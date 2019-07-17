import pwd from 'pwd';
import { omit } from '@auth-lnl/utils';

const users = [
  {
    name: 'Administrator',
    // admin
    passwordHash:
      'tLf8XxZ9bmsopBFWlWL+A30q7vjdktfkZbXP98bgtOqo4WoB3USRMpp99cutF71rN7s46wn1s8c8DAxPzNpdj9D4BbeTqsJeuVVjtNfAWm1GmQskMcdR6GTvhw3Hd6FX98EIZ5FSwbDA1pXqUJVijynpK5snOUl51XQ4gx96z3g=',
    passwordSalt:
      '91s5NuJNzXAimFVrCFol+fKNsehjp4YXBy4+zXWcFLG56hdtryhaR5c+vPojSMQByTiVM0H/W8rc/ePXsYbkQ4V1TP5umGoYeHmtKDkh6/TIBqbk6mL07HfL3MNy/iEhHhfQvoDkV8vFqWu7Z/Ah0daQ/Xgz6k/UIBqiMAONDcI=',
    roles: ['demo:read', 'demo:write'],
    username: 'admin'
  },
  {
    name: 'Helmholtz Watson',
    // test123
    passwordHash:
      'CHgnYb0Ln9/A6slK+Tt6Y/rnC97V2e4OrwxKRLTxvCPNdjEg98WJgyAeSYGOQyOr+19/YGvqEuDY9D14dIBCuHLpe8XVMMZExNT9tgCkKe+KZKhKI0Tv/CsQwY7pmlBrsBHpBYLg1sLRRnfWlSG/6Nx5tBaKe387BvWvEC0nQ2A=',
    passwordSalt:
      '90S8Ov7zDbK4QOiLGT2Fa1+2zjsPCDjMWOcujIGNfdleCzuxb4N5LOVXPnbkl6nQSQnGxBSd/8e7P9BigQN2SSjjBPmDRhCojvv5KecNCJ+aYz6rw514i+dy5Eo+baqY/4RUdAtd719SJ6PQxZI62iEtUGGkjtGjoOK4CwPL77Y=',
    roles: ['demo:read'],
    username: 'hw'
  }
];

async function getUser(username, password) {
  console.info('users > simulating database lookup');

  // Get user with same username
  const matchingUser = users.find(user => user.username === username);

  // Return nothing if no match found
  if (!matchingUser) return null;

  try {
    const { hash } = await pwd.hash(password, matchingUser.passwordSalt);

    // Mismatch in password should return same as no found user
    if (hash !== matchingUser.passwordHash) return null;

    // Remove password from user object
    const user = omit(['passwordHash', 'passwordSalt'], matchingUser);

    return user;
  } catch (error) {
    // Invalid input. Return same response if no match found.
    return null;
  }
}

export { getUser };
