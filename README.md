# 🍳 Fridge Hero – AI Recipe Generator (Aesthetic UI Edition)

## ✨ Overview

Fridge Hero is an AI-powered web app that generates creative recipes based on user-provided ingredients.
This project focuses not only on functionality but also on delivering a visually rich and emotional user experience.

It combines:

* 🤖 AI-generated recipes (Groq API)
* 💖 Aesthetic UI themes
* 🎨 Interactive animations and effects
* 🎵 Background music for immersive experience

---

## 🚀 Features

* 🧾 Ingredient-based recipe generation
* 💌 Poetic-style recipe output
* 🌸 Falling flowers & sparkle animations
* 💖 Heart animation on recipe load
* ✨ Cursor sparkle trail
* 🎵 Background music toggle
* 🌙 Night romantic mode
* 🎨 Theme toggle (default ↔ aesthetic UI)

---

## 🧠 How This Project Was Built

Instead of writing code manually, this project was created by **prompting AI (Antigravity)** to generate and refine the application step-by-step.

### Step-by-step approach:

1. **Base UI Creation**

   * Designed a clean layout with inputs, button, and result section

2. **UI Enhancement**

   * Applied glassmorphism design
   * Added gradients, spacing, and modern styling

3. **API Integration (Groq)**

   * Connected user inputs to AI
   * Generated recipes dynamically

4. **User Experience Improvements**

   * Added loading states
   * Disabled button during processing

5. **Response Formatting**

   * Structured output into:

     * Dish name
     * Description
     * Ingredients
     * Steps

6. **Aesthetic Enhancements**

   * Added animations (flowers, sparkles)
   * Improved transitions and visual feel

7. **Theme System**

   * Created romantic soft UI mode
   * Added night mode variation

8. **Interactive Features**

   * Background music toggle
   * Cursor sparkle effects
   * Heart animation on result

9. **Final Optimization**

   * Cleaned code
   * Improved performance
   * Ensured responsiveness

---

## 🧾 Prompts Used

### 🧱 Base UI

```
Create a clean and modern web app called "Fridge Hero".

Requirements:
- Centered layout
- A heading with the app name and a short tagline
- Three input fields labeled Ingredient 1, Ingredient 2, Ingredient 3
- A button labeled "Cook Magic"
- An empty result container below the button

Design style:
- Modern glassmorphism UI
- Gradient background (purple/blue tones)
- Rounded corners, soft shadows
- Clean font and spacing

Keep the code simple using HTML, CSS, and JavaScript.
```

---

### 🎨 UI Enhancement

```
Improve the UI styling to make it look like a premium product.

Add:
- Smooth hover effects on button
- Subtle animations (fade-in or scale)
- Better spacing and alignment
- Stylish input fields with focus effects
- A card-style result container with rounded corners and shadow

Make it visually impressive for a portfolio project.
```

---

### 🤖 Groq API Integration

```
Add JavaScript functionality to:

- Read values from the three input fields when the button is clicked

- Build a prompt like:
"I have [ingredient1], [ingredient2], and [ingredient3]. Give me a fancy dish name and a simple 3-step recipe."

- Send a POST request to Groq API using this endpoint:
https://api.groq.com/openai/v1/chat/completions

- Use model: llama3-8b-8192 (or any available Groq model)

- Use this request format:
{
  "model": "llama3-8b-8192",
  "messages": [
    {
      "role": "user",
      "content": "PROMPT_HERE"
    }
  ]
}

- Add headers:
Authorization: Bearer YOUR_GROQ_API_KEY
Content-Type: application/json

- Extract the response text from:
data.choices[0].message.content

- Display the response inside the result container

Use async/await and keep the code clean and readable.
```

---

### ⚡ Loading State

```
Enhance the user experience:

- When the button is clicked, change button text to "Cooking..."
- Disable the button while loading
- Show a loading animation or message
- After response, restore button text to "Cook Magic"
```

---

### 💌 Format Beautifully the Recipe Output

```
Improve how the API response is displayed:

- Separate dish name and steps clearly
- Use headings, spacing, and bullet points
- Style it like a recipe card
- Make it visually readable and attractive
```

---

### 🌸 Falling Animations

```
Add falling flowers and sparkles:
- Animate from top to bottom
- Slight side movement
- Settle softly at bottom
```

---

### 💖 Heart Animation

```
Trigger floating heart animation when recipe loads:
- Hearts rise and fade
- Soft colors and smooth motion
```

---

### ✨ Cursor Sparkle Trail

```
Create sparkle effects that follow cursor:
- Fade quickly
- Lightweight and smooth
```

---

### 💖 Aesthetic Theme Mode

```
Add toggle for romantic UI:
- Pink/lavender gradients
- Soft glow and rounded elements
- Smooth transition between themes
```

---

### 🌙 Night Mode

```
Create dark romantic theme:
- Deep purple/navy background
- Glowing elements
- Star-like particles
```

---

### 🎵 Background Music

```
Add music toggle:
- Soft instrumental loop
- Play/pause control
- Low volume, non-intrusive
```

---

### 🧪 Final Optimization

```
- Clean and refactor code
- Improve performance
- Ensure smooth animations
- Maintain responsiveness
```

---

## 💡 Key Learning

This project demonstrates:

* Prompt engineering skills
* UI/UX design thinking
* AI integration in web apps
* Creating interactive user experiences

---

## 🔗 Future Improvements

* 📱 Mobile optimization
* 💾 Save favorite recipes
* 🎤 Voice input for ingredients
* 🌐 Deploy live version

---

## 💖 Final Note

This project is built as a blend of **technology + emotion + design**, showing how AI can be used not just to build apps, but to create meaningful user experiences.

---
