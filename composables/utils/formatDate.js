function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }

  function isFutureTimestamp(timestamp) {
    const givenTime = new Date(timestamp);
    const currentTime = new Date();
  
    return givenTime > currentTime; // Returns false if givenTime is in the past
  }

  export {isFutureTimestamp,formatDate}