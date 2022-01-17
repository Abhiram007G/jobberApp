import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusWords = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusWords.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusWords.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusWords.success,
      })
    } else {
      this.setState({apiStatus: apiStatusWords.failure})
    }
  }

  profileSuccessView = () => {
    const {profileDetails} = this.state

    const {profileImageUrl, shortBio, name} = profileDetails
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="name">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  failureView = () => (
    <div className="retry-container">
      <button
        type="button"
        onClick={this.getProfileDetails}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  loader = () => (
    <div className="loader-container retry-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  checkStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusWords.success:
        return this.profileSuccessView()
      case apiStatusWords.failure:
        return this.failureView()
      case apiStatusWords.inProgress:
        return this.loader()
      default:
        return null
    }
  }

  render() {
    return this.checkStatus()
  }
}

export default ProfileDetails
