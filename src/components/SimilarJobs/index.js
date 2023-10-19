import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {details} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = details

  return (
    <li className="similar-job-card">
      <div className="top-sections">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="company-logo-similar"
        />
        <div className="name-rating-container">
          <h1 className="company-name-similar">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="job-icons-star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="bottom-section">
        <h1 className="side-name-description">Description</h1>
        <p className="description">{jobDescription}</p>
      </div>
      <div className="bottom-similar-section">
        <div className="location-container-similar">
          <IoLocationSharp className="job-icons-similar" />
          <p className="location-similar">{location}</p>
        </div>
        <div className="employment-type-container-similar">
          <BsFillBriefcaseFill className="job-icons-similar" />
          <p className="employment-type-similar">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
