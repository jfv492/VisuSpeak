import defaultProfilePicture from "../../assets/images/AccountSettingsHeadshot.jpg";

const UserCard = ({ user, lastChanged }) => {
    const lastChangedDate = new Date(lastChanged).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
  
    return (
      <div className="d-flex user-card">
        <img src={user.photoURL || defaultProfilePicture} alt={user.displayName} className="user-card-image" />
        <div className="user-card-info">
          <h4>{user.displayName}</h4>
          <span>Last activity: {lastChangedDate}</span>
          <br />
          {/* Assuming you store the user fee somewhere on the user object */}
          <span className="user-card-organization lead">{user.organizationName}</span>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  