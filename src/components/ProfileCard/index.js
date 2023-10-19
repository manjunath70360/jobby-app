import './index.css'

const ProfileCard = props => {
  const {profileDetails} = props
  const {name, profileImageUrl, shortBio} = profileDetails

  return (
    <div className="profile-card">
      <img src={profileImageUrl} alt="profile" className="profile-img" />
      <h1 className="name">{name}</h1>
      <p className="role">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
