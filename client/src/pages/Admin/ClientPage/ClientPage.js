import React from "react";
import classes from "./ClientPage.module.css";

const ClientPage = ({ user }) => {
  return (
    <div className="container ">
      <div className={classes.adminPageRow}>
        <div className={classes.left}>
          {user.avatar ? (
            <>
              <img
                src={user.avatar}
                alt={user.avatar}
                className={classes.image}
              />
              <label htmlFor="uploadImage">Uplad</label>
              <input
                type="file"
                name=""
                id="uploadImage"
                className={classes.inputUpload}
              />
            </>
          ) : (
            <img
              src="/uploads/user.png"
              alt="/uploads/user.png"
              className={classes.image}
            />
          )}
        </div>
        <div className={classes.right}>
          {user.firstName ? (
            <>
              <h1>{user.fullName}</h1>
              <h1>{user.firstName}</h1>
            </>
          ) : (
            <h1>{user.phoneNumber}</h1>
          )}
        </div>
        <div className={classes.adminPagePanel}>
          <div className={classes.itemPanele}>
            <h4>Update account</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;
