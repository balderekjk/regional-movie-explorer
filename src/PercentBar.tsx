import React from 'react';

type PercentBarProps = {
  percent: number;
};

const PercentBar: React.FC<PercentBarProps> = ({ percent }) => {
  return (
    <div
      className="percent-bar"
      style={{
        background: `linear-gradient(to right, blue ${percent}%, white ${percent}%)`,
      }}
    >
      <p style={{ marginLeft: '3px' }}>
        {percent ? percent + '%' : 'No votes'}
      </p>
    </div>
  );
};

export default PercentBar;
