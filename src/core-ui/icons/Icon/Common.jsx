import classNames from 'classnames'
import React from 'react'

//facade
const Common = ({ Icon, color, size, classStyle }) => {
  return (
    <React.Fragment >
      < Icon style={{ color: color, fontSize: size }} className={classNames(classStyle)} />
    </React.Fragment>
  )
}

export default Common
