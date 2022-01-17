import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItemCard from '../JobItemCard'
import FilterGroup from '../FilterGroup'
import ProfileDetails from '../ProfileDetails'

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

const apiStatusWords = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentTypeList: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusWords.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusWords.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentTypeList, salaryRange, searchInput} = this.state
    const employmentFilter = employmentTypeList.join()

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentFilter}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const {jobs} = data
      const updatedJobs = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsList: updatedJobs, apiStatus: apiStatusWords.success})
    } else {
      this.setState({apiStatus: apiStatusWords.failure})
    }
  }

  onUpdateEmploymentList = (boolean, id) => {
    const {employmentTypeList} = this.state
    const filterList = employmentTypeList

    if (boolean === true) {
      filterList.push(id)
    } else {
      const index = filterList.indexOf(id)
      filterList.splice(index, 1)
    }
    this.setState({employmentTypeList: filterList}, this.getJobsList)
  }

  onUpdateSalaryRange = id => {
    this.setState({salaryRange: id}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onUpdateSearchInput = () => {
    this.getJobsList()
  }

  noJobsView = () => (
    <div className="no-jobs-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return this.noJobsView()
    }

    return (
      <ul className="job-cards-container">
        {jobsList.map(each => (
          <JobItemCard key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  checkStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusWords.success:
        return this.renderJobsList()
      case apiStatusWords.failure:
        return this.renderFailureView()
      case apiStatusWords.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div>
        <Header />
        <div className="jobs-container">
          <div className="filter-group-container">
            <ProfileDetails />
            <hr />
            <FilterGroup
              onUpdateEmploymentList={this.onUpdateEmploymentList}
              onUpdateSalaryRange={this.onUpdateSalaryRange}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
            />
          </div>
          <div className="display-jobs-container">
            <div className="input-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onUpdateSearchInput}
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.checkStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
