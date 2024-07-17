import React from "react";
import PropTypes from "prop-types";

export const UserInfo = ({ username, email, birthday }) => {
  return (
    <div className="user-info">
      <p>
        <strong>Username:</strong> {username}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Birthday:</strong> {birthday}
      </p>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
};