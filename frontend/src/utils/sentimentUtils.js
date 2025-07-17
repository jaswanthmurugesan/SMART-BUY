// Utility for sentiment analysis
export function getSentimentEmoji(sentiment) {
  switch (sentiment) {
    case 'positive': return '😊';
    case 'negative': return '😞';
    default: return '😐';
  }
}
