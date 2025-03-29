
export const formatLocalTime = (utcTimestamp?: string): string => {
    if (!utcTimestamp) return "N/A"; // Handle missing or undefined values
    return new Date(utcTimestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format (AM/PM)
    });
  };
  export const formatLocalDate = (utcTimestamp?: string): string => {
    if (!utcTimestamp) return "N/A";
    return new Date(utcTimestamp).toLocaleDateString([], {
      weekday: "short", // e.g., "Mon"
      month: "short",   // e.g., "Mar"
      day: "numeric",   // e.g., "28"
    });
  };