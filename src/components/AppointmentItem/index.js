import './index.css'

const AppointmentItem = props => {
  const {appointmentObj, dateFormat, checkStartStatus} = props
  const {id, Name, date, isStarred} = appointmentObj

  const onClickStar = () => {
    checkStartStatus(id)
  }

  const star =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const filledstar =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const resultstar = isStarred ? filledstar : star

  return (
    <li className="list-content-container">
      <div className="list-head">
        <p className="list-heading">{Name}</p>
        <button
          type="button"
          className="btn"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={resultstar} alt="star" />
        </button>
      </div>
      <p className="list-date">
        {dateFormat(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}
export default AppointmentItem
