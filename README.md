# 🧠 GPT API Playground

- ⚛️ React (TypeScript)
- 🧠 OpenAI GPT-3.5-Turbo
- 🗂 MongoDB + Mongoose
- 🔧 Express backend with request logging
- 🧪 Visual API tester for prompt experimentation

---

## 🚀 Project Setup

### 📁 Clone the Repository
### 🛠 Backend Setup (`/backend`)
```bash
cd backend
npm install
```

#### 🔐 Create a `.env` file
```
MONGO_URI=your-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
```

#### ▶️ Run the Backend Server
```bash
npm run dev
```

> Runs on: `http://localhost:4000`

---

### 🎨 Frontend Setup (`/frontend`)

```bash
cd ../frontend
npm install
npm start
```

> Runs on: `http://localhost:3000`

---

## 🧪 Features
- 🔌 Test any GET / POST / DELETE endpoint
- ✨ Format OpenAI requests automatically
- 📥 View GPT responses with clean formatting
- 📚 Full MongoDB logging (requests + responses)
- 📊 View structured payloads and error responses

---

## 📁 Folder Structure

```
my-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── types/
│   │   └── ApiTester.tsx
│   └── public/
├── README.md
```

---

## 🧩 Technologies Used

| Layer     | Stack                   |
|-----------|-------------------------|
| Frontend  | React + TypeScript      |
| Backend   | Node.js + Express       |
| Database  | MongoDB + Mongoose      |
| AI        | OpenAI GPT-3.5 Turbo API|
| Styling   | CSS Modules             |

---

## 💡 Example Workflow

1. Select or paste a prompt into the tester
2. Click **Send Request**
3. View:
   - ✅ Full OpenAI payload
   - ✅ Assistant reply
   - ✅ Auto-logged request + response in MongoDB

---

## 🛠 Future Features

- 🔁 Prompt history + templates
- 👤 User auth & session tracking
- 📊 Usage analytics dashboard
- 💬 Multi-turn chat interface
- ☁️ Deployable GPT playground tool

---

## ✨ Credits

Built by Alex Kim
Powered by OpenAI, React, Express, and MongoDB  
