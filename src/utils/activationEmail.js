const getActivationEmail = (user, username, activationToken) => `
<head>
  <style>

    h1 {
      font-weight: 600;
      font-size: 40px;
    }
  </style>
</head>

<div>
  <h1>Welcome to We Robot</h1>
  <p>Hello ${user},</p>
  <p>
    Thank you for joining We Robot. Please visit the link bellow to activate
    your user: ${username}.
  </p>

  <a href="http://localhost/users/activate/${activationToken}">Click here to activate ${username}</a>
</div>
`;

module.exports = getActivationEmail;
