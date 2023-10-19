import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="list-item">
      <Link to={`/jobs/${id}`} className="job-card-container">
        <div className="top-section">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="name-rating-container">
            <h1 className="company-name">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="job-icons-star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middle-section">
          <div className="left-side-part">
            <div className="location-container icon-name-container">
              <IoLocationSharp className="job-icons" />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container icon-name-container">
              <BsFillBriefcaseFill className="job-icons" />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>

        <div className="bottom-section">
          <hr className="hr-line" />
          <h1 className="side-name-description">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}
export default JobCard
