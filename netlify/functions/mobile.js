exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const prompt = `
Suggest the best mobile phone available in India based on:

Budget: ${data.budget}
Brand: ${data.brand}
Camera: ${data.camera}
Display: ${data.display}
RAM: ${data.ram}
Storage: ${data.storage}

Give:
1. Best phone recommendation
2. Approximate price
3. Key features
4. Why it is recommended
5. Available online stores in India
`;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: 500
        })
      }
    );

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer: result.choices[0].message.content
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
