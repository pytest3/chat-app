export function generateConversationId(userId1, userId2) {
  console.log("echo, userId2", userId2);
  console.log("echo, userId1", userId1);
  const sortedId = [userId1, userId2].sort();
  console.log("echo", sortedId);
  return `${sortedId[0]}-${sortedId[1]}`;
}
