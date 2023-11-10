import React from 'react'
import { ThreeCircles } from "react-loader-spinner";

const Spinner = (props) => {
  return (
    props.loading ? (
      <div
        style={{
          display: "flex",
          justifyContent: 'center',
          alignItems: 'center',
          position: "absolute",
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.8)",
          transition: "all .3s ease",
          top: 0,
          bottom: 0,
          textAlign: "center",
          height: '100%'
        }}
      >
        <div><ThreeCircles color="#3699FF" width={50} /></div>
      </div>
    ) : null
  )
}

export default Spinner