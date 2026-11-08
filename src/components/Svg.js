import React from 'react';

const StatsGrid = () => {
  // Array to represent the grid cells (e.g., a 3x4 grid would have 12 items)
  // For the style blocks, you just need DIVs with the right classes.
  const totalCells = 32;
  const gridCells = Array.from({ length: totalCells }, (_, i) => i); 

  return (
      <div className="structural-grid">
        {gridCells.map((_, index) => (
          <div 
            key={index} 
            className="grid-cell"
            style={{
              backgroundColor: 
                index >= 16 && index <= 18
                  ? '#0d121c' 
                  : 'var(--grid-bg-color)'
            }}
          />
        ))}
      </div>
  );
};

export default StatsGrid;