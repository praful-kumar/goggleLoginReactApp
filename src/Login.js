import React from 'react'
import { GoogleLogin } from 'react-google-login';
export default function Login(props) {
    return (
        <div className='mainLogin'>
        
      <GoogleLogin className='google'
    clientId="776803220214-2sebppvier2dbnam4qdh5r91dig3md5n.apps.googleusercontent.com"
    buttonText="Login With Google"
    onSuccess={props.responseSuccessGoogle}
    onFailure={props.responsefailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
            
        </div>
    )
}
