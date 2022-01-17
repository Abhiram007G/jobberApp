import {Link} from 'react-router-dom'

import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {GoLocation} from 'react-icons/go'
import './index.css'

const JobItemCard = props => {
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
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-card-container">
        <div className="row-1">
          <div>
            <img
              src={companyLogoUrl}
              alt="company logo"
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
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItemCard
