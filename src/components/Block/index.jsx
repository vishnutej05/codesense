/* eslint-disable react/prop-types */
const Block = ({ width, count, date }) => {
  // Calculate opacity based on submission count
  function calcOpacity(count) {
    // Define the minimum and maximum opacity values
    const minOpacity = 0.2; // Minimum opacity for low submission counts
    const maxOpacity = 1.0; // Maximum opacity for high submission counts

    // Clamp the count to a reasonable range (avoiding negative or very high values)
    const clampedCount = Math.max(0, Math.min(count, 10)); // Adjust 10 based on your expected range

    // Calculate the normalized opacity between min and max based on the clamped count
    const normalizedOpacity =
      (clampedCount / 10) * (maxOpacity - minOpacity) + minOpacity;

    return normalizedOpacity;
  }
  const opacity = calcOpacity(count); // Assuming calcOpacity function exists

  return (
    <div
      style={{
        backgroundColor: `rgba(20, 255, 20, ${opacity})`, // Green color with varying opacity
        width: `${width}px`,
      }}
      className={`sq-block aspect-square rounded-sm border border-black border-opacity-30`}
      title={`Date: ${date}, Submissions: ${count}`} // Set tooltip content
    />
  );
};

export default Block;
