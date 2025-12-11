import React from "react";

import Institution from "../Institution";

interface EducationProps {
  institutions: any[]; // Use InstitutionData[] if exported
}

const chunkArray = (myArray: any[], chunkSize: number) => {
  const cloneArray = myArray.slice();
  const results = [];

  while (cloneArray.length) {
    results.push(cloneArray.splice(0, chunkSize));
  }
  return results;
};

const Education: React.FC<EducationProps> = ({ institutions }) => {
  const groups = chunkArray(institutions, 2);
  return (
    <div>
      <div className="inner-title">
        <h3>My Education</h3>
        <p>The studies which partially made the developer that I am now.</p>
      </div>
      <div className="inner-content">
        {groups.map((group, idx) => {
          return (
            <div className="row" key={idx}>
              {group.map((inst: any, i: number) => (
                <Institution data={inst} key={i} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
