# AI Journey

## 1. AI Assistants 

- ChatGPT: For quick questions about the project creation and some styles.
- Gemini: For more complex questions, help with implementation and testing.


## 2. Useful prompts

**How can I create an endpoint with Node.js that connects with an AI API?**

I had never done anything like this so I didn't know how to continue after creating the POST endpoint structure, so I used AI to help me complete it with the code needed for it to work.

**How can I use Lucide Icons on Angular?**

I knew how to import them on React and the documentation about how to use them on Angular was deprecated so I asked AI how to do it.


## 3. AI errors

AI (Gemini in this case) got wrong anytime I wanted to know which AI model to use:
- It suggested Gemini-2.5 flash as one of the fastest options but it was too slow.
- Then it suggested Gemini-1.5 flash but it was deprecated.
- Then I asked to use Groq API and it gave me some of the best models that were supposedly free but they weren't.
- Finally, it gave me some code to check which models were free and available on Groq's API and ended using 'openai/gpt-oss-20b'.

ChatGPT got wrong when I started asking about how to import Lucide Icons, it gave me incoherent code that had different versions of the library and led to compilation errors. 

## 4. Code I don't fully understand

I don't fully understand this line in index.js:
```javascript
const completion = await groq.chat.completions.create({
  messages: [
    {
      role: "system",
      content: "You are an assistant that outputs strictly valid JSON."
    },
    {
      role: "user",
      content: prompt
    }
  ],
  model: "openai/gpt-oss-20b",
  response_format: { type: "json_object" },
  temperature: 0.2
});
```
I understand that is how you send the prompt to the AI model but I don't fully understand why there are 2 messages in the array instead of just the prompt nor how does the role tag work.

I also don't understand part of the code for the tests in either frontend or backend because I have never developed such tests for applications before, so I left some AI comments to help me understand it better.

## 5. Further improvements

- Multilingual selector for AI suggestions.
- User autentication and saved listing history.
- Listing suggestions from photos.
- Integration of this tool in an upload form: as you complete some fields, AI fills some others depending on what you've already wrote.