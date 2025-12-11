import React from 'react'
import { getSocialIconClass } from '../../../util'
import './styles.css'
import './socicon.css'

interface ProfileData {
  network: string;
  url: string;
}

interface ProfileProps {
  data: ProfileData;
}

const Profile: React.FC<ProfileProps> = ({ data }) => {
  const { network, url } = data
  return (
    <div className='ico'>
      <a className='no-underline' href={url}>
        <span className={getSocialIconClass(network)} title={network} />
      </a>
    </div>
  )
}

export default Profile
