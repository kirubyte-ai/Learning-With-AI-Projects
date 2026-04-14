## Learning-With-AI-Projects

## 🧊 Fridge Hero – AI Recipe Generator

## 🍽️ Overview
Fridge Hero is a simple web application that generates recipe ideas based on ingredients provided by the user. It uses an AI model (Gorq API) to transform user inputs into a creative dish name and a simple recipe.

---

## 🎯 Objective
To build a basic AI-powered web application that:
- Takes user input (ingredients)
- Sends it to an AI model
- Displays a generated recipe in a user-friendly format

---

## ⚙️ Features
- Input fields for ingredients
- "Cook Magic" button to generate recipes
- AI-generated dish name and recipe steps
- Loading state while fetching response
- Styled UI with a centered layout and card design

---

## 🔄 How It Works (AI Pipeline)

1. **User Input**
   - User enters ingredients (e.g., tomato, cheese, bread)

2. **Prompt Creation**
   - App builds a prompt like:
     > "I have tomato, cheese, and bread. Give me a fancy dish name and a simple 3-step recipe."

3. **API Call**
   - Sends request to Gorq API using `fetch()`

4. **AI Response**
   - Receives generated recipe text

5. **Display Output**
   - Shows result in a styled card on the webpage

---

## 🛠️ Technologies Used
- HTML
- CSS
- JavaScript (Fetch API)
- Gorq API

---

## ✨ Key Learnings
- How to integrate APIs into a web application
- How to handle asynchronous requests using `fetch`
- Building prompts dynamically from user input
- Managing UI states (loading, result display)
- Structuring a simple AI-powered frontend app

---

## 🧠 Example

**Input:**
- Tomato
- Cheese
- Bread

**Output:**
> Dish: Cheesy Tomato Delight  
> Recipe: Toast the bread, add sliced tomatoes and cheese, and grill until golden.

---

## 🚀 Future Improvements
- Add image-based ingredient detection
- Save favorite recipes
- Improve UI with animations
- Add multiple recipe variations

---

## 👩‍💻 Author
**Kirthiga Nagarajan**
