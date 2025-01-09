const WEBHOOK_URL_SOURCE = "/data/webhook.php";
  
const feedbackForm = document.getElementById('feedbackForm');
const responseMessage = document.getElementById('responseMessage');

async function getWebhookUrl() {
  try {
    const response = await fetch(WEBHOOK_URL_SOURCE); // Direkte Anfrage ohne Proxy
    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen der Webhook-URL: ${response.statusText}`);
    }
    const webhookUrl = await response.text(); // Webhook-URL als Text
    return webhookUrl.trim();
  } catch (error) {
    console.error('Fehler beim Abrufen der Webhook-URL:', error);
    return null;
  }
}

async function sendFeedbackToDiscord(webhookUrl, username, feedback, rating) {
  try {
    const payload = {
      username: username,
      content: `Feedback: ${feedback}\nStars: ${rating}`,
    };

    console.log('Payload:', payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Fehler beim Senden des Feedbacks: ${errorText}`);
    }
    return true;
  } catch (error) {
    console.error('Fehler beim Senden des Feedbacks:', error);
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

  const webhookUrl = await getWebhookUrl();
  if (!webhookUrl) {
    responseMessage.textContent = "Error: Could not fetch Webhook Link.";
    responseMessage.style.color = "red";
    return;
  }

  const success = await sendFeedbackToDiscord(webhookUrl, username, feedback, rating);
  if (success) {
    responseMessage.textContent = "Feedback submitted! Thanks.";
    responseMessage.style.color = "green";
    feedbackForm.reset();
  } else {
    responseMessage.textContent = "Cannot send feedback. Please try again later.";
    responseMessage.style.color = "red";
  }
});