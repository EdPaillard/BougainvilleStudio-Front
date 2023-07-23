import React from 'react'

type Props = {
    id: number,
    contentID: number
}

const ErrorFragment = ({id, contentID}: Props) => {
  return (
    <div>Oups, quelque chose a mal tourné</div>
  )
}

export default ErrorFragment