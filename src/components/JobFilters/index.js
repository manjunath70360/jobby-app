import './index.css'

const JobFilters = props => {
  const {employmentTypesList, salaryRangesList} = props
  const renderEmploymentCheckBox = () => {
    const {onChangeCheckBox} = props
    return employmentTypesList.map(eachType => {
      const onClickCheckBox = () => onChangeCheckBox(eachType.employmentTypeId)

      return (
        <li className="list" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            className="check-box"
            onChange={onClickCheckBox}
          />
          <label htmlFor={eachType.employmentTypeId} className="name-checkbox">
            {eachType.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => {
    const {onChangeRadio} = props
    return salaryRangesList.map(eachRange => {
      const onClickRadio = () => onChangeRadio(eachRange.salaryRangeId)

      return (
        <li className="list" key={eachRange.salaryRangeId}>
          <input
            type="radio"
            id={eachRange.salaryRangeId}
            className="radio-box"
            name="salaryRange"
            onChange={onClickRadio}
          />
          <label htmlFor={eachRange.salaryRangeId} className="name-radio">
            {eachRange.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentContainer = () => (
    <div className="container-list">
      <h1 className="side-header">Type of Employment</h1>
      <ul className="list-container">{renderEmploymentCheckBox()}</ul>
    </div>
  )

  const renderSalaryRangeContainer = () => (
    <div className="container-list">
      <h1 className="side-header">Salary Range</h1>
      <ul className="list-container">{renderSalaryRange()}</ul>
    </div>
  )

  return (
    <div className="job-filter-container">
      <hr className="hr" />
      {renderEmploymentContainer()}
      <hr className="hr" />
      {renderSalaryRangeContainer()}
    </div>
  )
}
export default JobFilters
