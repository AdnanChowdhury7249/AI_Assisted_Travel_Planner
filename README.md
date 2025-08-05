# AI_Assisted_Travel_Planner

An AI-powered full-stack web app that helps users create personalised travel itineraries based on their destination, budget, number of travellers, and trip duration. Built using React, FastAPI, and OpenAI GPT-4o.
 Features

     AI-generated itineraries using GPT-4o

     Create, view, and delete trips

     Each itinerary includes day-by-day breakdowns and budgeting advice

     Asynchronous backend for fast performance

     Clean, responsive UI with Tailwind CSS

     Fully integrated RESTful API

# Tech Stack
Frontend	Backend	Database	AI Service
React (Vite)	FastAPI (async)	PostgreSQL	OpenAI GPT-4o
Tailwind CSS	Pydantic Schemas	SQLAlchemy	dotenv/env
 Getting Started
1. Clone the repository

git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner

2. Set up the backend

cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

Create a .env file:

DATABASE_URL=your_postgres_db_url
OPENAI_API_KEY=your_openai_key

Then run:

uvicorn main:app --reload

3. Set up the frontend

cd frontend
npm install
npm run dev

# (Ideas for Expansion)

     User authentication (JWT)

     Itinerary export as PDF

     Trip search & filter

     Deployment on Vercel + Render

     Unit testing with Vitest & Pytest
