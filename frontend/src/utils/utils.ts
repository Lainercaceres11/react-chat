export const formatMessageTime = (time: string) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};
