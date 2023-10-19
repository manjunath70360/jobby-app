import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusList = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    similarJobs: [],
    skillsList: [],
    lifeAtCompanyDetails: [],
    isDetailsLoaded: apiStatusList.inProgress,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isDetailsLoaded: apiStatusList.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jobDetails = data.job_details

      const similarJobs = data.similar_jobs
      const updatedJobDetailsData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,

        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        title: jobDetails.title,
      }
      const skills = jobDetails.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const lifeAtCompany = {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      }

      const updatedSimilarJobs = similarJobs.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        employmentType: eachSimilarJob.employment_type,
        id: eachSimilarJob.id,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))

      this.setState({
        jobDetails: updatedJobDetailsData,
        similarJobs: updatedSimilarJobs,
        skillsList: skills,
        lifeAtCompanyDetails: lifeAtCompany,
        isDetailsLoaded: apiStatusList.success,
      })
    } else {
      this.setState({isDetailsLoaded: apiStatusList.failure})
    }
  }

  onClickJobDetailReloadBtn = () => {
    this.setState(
      {isDetailsLoaded: apiStatusList.inProgress},
      this.getJobDetails,
    )
  }

  renderFailureViewForJobDetail = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-header">Oops! Something went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickJobDetailReloadBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderForJobDetail = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {
      jobDetails,
      similarJobs,
      skillsList,
      lifeAtCompanyDetails,
    } = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,

      location,
      packagePerAnnum,
      rating,

      title,
    } = jobDetails

    return (
      <>
        <div className="job-card-container">
          <div className="top-section">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <div className="side-heading-url">
              <h1 className="side-name-description">Description</h1>
              <a href={companyWebsiteUrl}>
                <div className="company-url">
                  <p className="visit">Visit</p>
                  <FiExternalLink className="icon-link" />
                </div>
              </a>
            </div>
            <p className="description">{jobDescription}</p>
          </div>

          <h1 className="side-name-details">Skills</h1>
          <ul className="skill-container">
            {skillsList.map(eachSkill => (
              <li className="skill-list-item" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="icon-skill"
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="side-name-life-at-company">Life at Company</h1>
          <div className="description-img">
            <p className="lift-at-company-description">
              {lifeAtCompanyDetails.description}
            </p>
            <img
              src={lifeAtCompanyDetails.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-job-container-div">
          <h1 className="side-header-similar-jobs">Similar Jobs</h1>
          <ul className="similar-job-container">
            {similarJobs.map(eachJob => (
              <SimilarJobs details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderResultingView = () => {
    const {isDetailsLoaded} = this.state

    switch (isDetailsLoaded) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.failure:
        return this.renderFailureViewForJobDetail()
      default:
        return this.renderLoaderForJobDetail()
    }
  }

  render() {
    console.log(this.props)
    return (
      <>
        <Header />
        <div className="job-details-container">
          {this.renderResultingView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
