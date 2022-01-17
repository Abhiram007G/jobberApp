import {Component} from 'react'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import {BiLinkExternal} from 'react-icons/bi'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const apiStatusWords = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobs: [],
    apiStatus: apiStatusWords.initial,
  }

  componentDidMount() {
    this.getItemDetails()
  }

  getItemDetails = async () => {
    this.setState({apiStatus: apiStatusWords.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = {
        jobDetails: fetchedData.job_details,
        similarJobs: fetchedData.similar_jobs,
      }

      const {jobDetails, similarJobs} = data

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        title: jobDetails.title,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }

      const updatedSimilarJobs = similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        jobDescription: each.job_description,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobItemDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusWords.success,
      })
    } else {
      this.setState({apiStatus: apiStatusWords.failure})
    }
  }

  similarJobItem = jobDetails => {
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      title,
      rating,
      id,
    } = jobDetails
    return (
      <li key={id} className="similar-job-item">
        <div className="similar-job-item-row-1">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-job-logo"
          />
          <div className="title-text-container">
            <h1>{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="similar-job-item-row-2">
          <div className="each-block">
            <GoLocation />
            <p className="type-text">{location}</p>
          </div>
          <div className="each-block middle">
            <BsFillBriefcaseFill />
            <p className="type-text">{employmentType}</p>
          </div>
        </div>
      </li>
    )
  }

  renderJobItemDetails = () => {
    const {jobItemDetails, similarJobs} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      title,
      rating,
      skills,
    } = jobItemDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-card-container">
          <div className="row-1">
            <div>
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
            </div>
            <div className="title-text-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="row-2">
            <div className="each-block">
              <GoLocation />
              <p className="type-text">{location}</p>
            </div>
            <div className="each-block middle">
              <BsFillBriefcaseFill />
              <p className="type-text">{employmentType}</p>
            </div>
            <div className="each-block lpa">
              <p>{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className="description-heading-container">
              <h1>Description</h1>
              <a href={companyWebsiteUrl} className="external-link">
                <p className="external-link-text">Visit</p>
                <BiLinkExternal />
              </a>
            </div>
            <p>{jobDescription}</p>
            <h1>Skills</h1>
            <ul className="skills-container">
              {skills.map(each => (
                <li key={each.name} className="skill-item">
                  <img
                    src={each.imageUrl}
                    alt={each.name}
                    className="skill-logo"
                  />
                  <p className="skill-text">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <div className="life-matter">
              <h1>Life at Company</h1>
              <p>{description}</p>
            </div>
            <div>
              <img
                src={imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-items-container">
            {similarJobs.map(each => this.similarJobItem(each))}
          </ul>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something went wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getItemDetails}
      >
        Retry
      </button>
    </div>
  )

  loader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  checkStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusWords.success:
        return this.renderJobItemDetails()
      case apiStatusWords.failure:
        return this.renderFailureView()
      case apiStatusWords.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-main-container">
        <Header />
        <div className="job-item-card-container">{this.checkStatus()}</div>
      </div>
    )
  }
}

export default JobItemDetails
