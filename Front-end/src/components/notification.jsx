export const Notification = ({clase, message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={clase}>
        {message}
      </div>
    )
  }