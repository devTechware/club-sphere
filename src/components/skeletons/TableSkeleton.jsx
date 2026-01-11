const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i}>
                <div className="h-4 bg-base-300 rounded w-20 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="hover">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex}>
                  <div className="h-4 bg-base-300 rounded w-full animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
