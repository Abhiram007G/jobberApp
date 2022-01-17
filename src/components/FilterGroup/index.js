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

const FilterGroup = props => {
  const renderTypeOfEmployment = () => (
    <ul className="employment-type">
      {employmentTypesList.map(each => {
        const {employmentTypeId, label} = each
        const {onUpdateEmploymentList} = props
        const onClickCheckbox = event => {
          onUpdateEmploymentList(event.target.checked, employmentTypeId)
        }

        return (
          <li key={employmentTypeId}>
            <input
              type="checkbox"
              onClick={onClickCheckbox}
              id={employmentTypeId}
            />
            <label htmlFor={employmentTypeId}>{label}</label>
          </li>
        )
      })}
    </ul>
  )

  const renderSalaryRange = () => (
    <ul className="employment-type">
      {salaryRangesList.map(each => {
        const {salaryRangeId, label} = each
        const {onUpdateSalaryRange} = props

        const onChangeRadioButton = event => {
          onUpdateSalaryRange(event.target.value)
        }

        return (
          <li key={salaryRangeId}>
            <input
              type="radio"
              value={salaryRangeId}
              id={salaryRangeId}
              onChange={onChangeRadioButton}
              name="salaryRange"
            />
            <label htmlFor={salaryRangeId}>{label}</label>
          </li>
        )
      })}
    </ul>
  )

  return (
    <div>
      <h1>Type of Employment</h1>
      {renderTypeOfEmployment()}
      <hr />
      <h1>Salary Range</h1>
      {renderSalaryRange()}
      <hr />
    </div>
  )
}

export default FilterGroup
