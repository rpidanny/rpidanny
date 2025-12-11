import React from "react";

import Profile from "../Profile";

interface SocialProps {
  data: any[]; // Or use ProfileData[] if I export it
}

const Social: React.FC<SocialProps> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map((profile, idx) => (
        <Profile data={profile} key={idx} />
      ))}
    </React.Fragment>
  );
};

export default Social;
