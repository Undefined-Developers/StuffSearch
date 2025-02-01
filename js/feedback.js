const feedbackForm = document.getElementById('feedbackForm');
const responseMessage = document.getElementById('responseMessage');

async function sendFeedbackToServer(username, feedback, rating) {
  try {
    const payload = {
      username: username,
      feedback: feedback,
      rating: rating,
    };

    const response = await fetch('/api/submit-feedback', { // Endpoint deines Servers
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error('Error sending feedback:', error);
    return false;
  }
}

feedbackForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value.trim();
  const feedback = document.getElementById('feedback').value.trim();
  const rating = document.querySelector('input[name="rating"]:checked')?.value;

  if (!username || !feedback || !rating) {
    responseMessage.textContent = "Please fill out all fields.";
    responseMessage.style.color = "red";
    return;
  }

  if (feedback.length < 10 || feedback.length > 500) {
    responseMessage.textContent = "Feedback must be between 10 and 500 characters.";
    responseMessage.style.color = "red";
    return;
  }

  const success = await sendFeedbackToServer(username, feedback, rating);
  if (success) {
    responseMessage.textContent = "Feedback submitted! Thanks.";
    responseMessage.style.color = "green";
    feedbackForm.reset();
  } else {
    responseMessage.textContent = "Cannot send feedback. Please try again later.";
    responseMessage.style.color = "red";
  }
});
