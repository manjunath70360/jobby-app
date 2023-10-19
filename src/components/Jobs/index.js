import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import ProfileCard from '../ProfileCard'
import JobFilters from '../JobFilters'
import JobCard from "../JobCard"

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusList = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileData: [],
    checkedBoxesList: [],
    activeRadio: '',
    searchInput: '',
    jobsList: [],
    isProfileLoaded: apiStatusList.inProgress,
    isJobsListLoaded: apiStatusList.inProgress,
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsList()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsList()
  }

  onChangeCheckBox = id => {
    const {checkedBoxesList} = this.state
    let updateList = checkedBoxesList

    if (checkedBoxesList.includes(id)) {
      updateList = updateList.filter(eachId => eachId !== id)
    } else {
      updateList = [...updateList, id]
    }
    this.setState({checkedBoxesList: updateList}, this.getJobsList)
  }

  onChangeRadio = id => {
    this.setState({activeRadio: id}, this.getJobsList)
  }

  getJobsList = async () => {
    this.setState({isJobsListLoaded: apiStatusList.inProgress})
    const {checkedBoxesList, activeRadio, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const checkedBoxes = checkedBoxesList.join(',')
    console.log(checkedBoxes)
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkedBoxes}&minimum_package=${activeRadio}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobsDetails = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsDetails,
        isJobsListLoaded: apiStatusList.success,
      })
    } else {
      this.setState({isJobsListLoaded: apiStatusList.failure})
    }
  }

  getProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({isProfileLoaded: apiStatusList.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profileDataDetails = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: profileDataDetails,
        isProfileLoaded: apiStatusList.success,
      })
    } else {
      this.setState({isProfileLoaded: apiStatusList.failure})
    }
  }

  onClickProfileReloadBtn = () => {
    this.setState(
      {isProfileLoaded: apiStatusList.inProgress},
      this.getProfileDetails,
    )
  }

  onClickJobsReloadBtn = () => {
    this.setState(
      {isJobsListLoaded: apiStatusList.inProgress},
      this.getJobsList,
    )
  }

  renderFailureViewForJobsList = () => (
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
        onClick={this.onClickJobsReloadBtn}
      >
        Retry
      </button>
    </div>
  )

  renderFailureViewForProfile = () => (
    <div className="profile-card-container">
      <button
        type="button"
        className="retry-btn"
        onClick={this.onClickProfileReloadBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderForJobList = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderLoaderForProfile = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    const isEmpty = jobsList.length > 1

    return (
      <>
        {!isEmpty ? (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="empty-img"
            />
            <h1 className="failure-header">No Jobs Found</h1>
            <p className="para">
              We could not find any jobs. Try other filters
            </p>
          </>
        ) : (
          <ul className="job-cards-container">
            {jobsList.map(eachJob => (
              <JobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderProfileCard = () => {
    const {profileData} = this.state

    return <ProfileCard profileDetails={profileData} />
  }

  renderResultForProfileView = () => {
    const {isProfileLoaded} = this.state

    switch (isProfileLoaded) {
      case apiStatusList.success:
        return this.renderProfileCard()
      case apiStatusList.failure:
        return this.renderFailureViewForProfile()
      default:
        return this.renderLoaderForProfile()
    }
  }

  renderResultingView = () => {
    const {isJobsListLoaded} = this.state

    switch (isJobsListLoaded) {
      case apiStatusList.success:
        return this.renderSuccessView()
      case apiStatusList.failure:
        return this.renderFailureViewForJobsList()
      default:
        return this.renderLoaderForJobList()
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-content">
          <div className="left-side-content">
            {this.renderResultForProfileView()}
            <JobFilters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onChangeCheckBox={this.onChangeCheckBox}
              onChangeRadio={this.onChangeRadio}
            />
          </div>
          <div className="right-side-content">
            <div className="search-container">
              <input
                type="search"
                placeholder="search"
                className="search-input"
                onChange={this.onChangeSearch}
                value={searchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearchBtn}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderResultingView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
