// import { useSelector } from "react-redux"

import { connect } from "react-redux"

const Notification = (props) => {
  // const notification = useSelector(state => state.notification)
  const notification = props.notification

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  let component = null
  if (notification) {
    component = (
      <div style={style}>
        {notification}
      </div>
    )
  }

  return component
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

// export default Notification
export default connect(mapStateToProps, null)(Notification)