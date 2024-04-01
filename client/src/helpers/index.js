export function generateConversationId(userId1, userId2) {
  const sortedId = [userId1, userId2].sort();
  return `${sortedId[0]}-${sortedId[1]}`;
}
