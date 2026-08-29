export interface ProjectSeed {
  id: string;
  name: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  githubUrl: string;
}

export const projects: ProjectSeed[] = [
  { id: "project_banking_app", name: "Banking Application", description: "A core banking system with accounts, transfers, and transaction history.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/banking-application" },
  { id: "project_ecommerce_platform", name: "E-Commerce Platform", description: "A storefront with product catalog, cart, checkout, and order management.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/ecommerce-platform" },
  { id: "project_chat_app", name: "Real-Time Chat Application", description: "A messaging app with rooms, presence, and real-time delivery.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/realtime-chat" },
  { id: "project_job_portal", name: "Job Portal", description: "A platform connecting job seekers with employers, including search and applications.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/job-portal" },
  { id: "project_payment_system", name: "Payment Processing System", description: "A service handling payment intents, webhooks, and reconciliation.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/payment-processing" },
  { id: "project_social_analytics", name: "Social Media Analytics Dashboard", description: "A dashboard aggregating engagement metrics across social platforms.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/social-analytics" },
  { id: "project_inventory_system", name: "Inventory Management System", description: "A system tracking stock levels, suppliers, and reorder points.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/inventory-management" },
  { id: "project_ride_sharing", name: "Ride Sharing Backend", description: "A backend matching riders and drivers with live location updates.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/ride-sharing-backend" },
  { id: "project_video_streaming", name: "Video Streaming Platform", description: "A platform for uploading, transcoding, and streaming video content.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/video-streaming" },
  { id: "project_recipe_community", name: "Recipe Sharing Community", description: "A social platform for sharing and rating recipes.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/recipe-community" },
  { id: "project_finance_tracker", name: "Personal Finance Tracker", description: "An app for tracking income, expenses, and budgets.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/finance-tracker" },
  { id: "project_task_manager", name: "Task Management Tool", description: "A Kanban-style tool for organizing tasks and projects.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/task-manager" },
  { id: "project_blogging_platform", name: "Blogging Platform", description: "A publishing platform with drafts, comments, and tagging.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/blogging-platform" },
  { id: "project_hotel_booking", name: "Hotel Booking System", description: "A reservation system with availability search and booking flows.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/hotel-booking" },
  { id: "project_fitness_tracker", name: "Fitness Tracking App", description: "An app for logging workouts and visualizing progress over time.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/fitness-tracker" },
  { id: "project_learning_platform", name: "Online Learning Platform", description: "A platform for hosting courses, quizzes, and progress tracking.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/learning-platform" },
  { id: "project_weather_pipeline", name: "Weather Data Pipeline", description: "A pipeline ingesting, transforming, and storing weather sensor data.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/weather-data-pipeline" },
  { id: "project_log_monitoring", name: "Log Monitoring Dashboard", description: "A dashboard for aggregating and alerting on application logs.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/log-monitoring" },

  { id: "project_mobile_banking", name: "Mobile Banking App", description: "A native mobile app for account balances, transfers, and alerts.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/mobile-banking-app" },
  { id: "project_ios_fitness_companion", name: "iOS Fitness Companion", description: "A native iOS app for tracking workouts and health metrics.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/ios-fitness-companion" },
  { id: "project_cross_platform_notes", name: "Cross-Platform Notes App", description: "A notes app built once and shipped to iOS and Android.", difficulty: "Beginner", githubUrl: "https://github.com/devgraph-demo/cross-platform-notes" },
  { id: "project_ml_recommendation_engine", name: "Machine Learning Recommendation Engine", description: "A recommendation service trained on user interaction data.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/ml-recommendation-engine" },
  { id: "project_sentiment_analysis", name: "Sentiment Analysis Tool", description: "An NLP tool that classifies the sentiment of customer feedback.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/sentiment-analysis-tool" },
  { id: "project_data_viz_dashboard", name: "Data Visualization Dashboard", description: "An interactive dashboard for exploring large analytical datasets.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/data-viz-dashboard" },
  { id: "project_serverless_image_pipeline", name: "Serverless Image Processing Pipeline", description: "An event-driven pipeline that resizes and optimizes uploaded images.", difficulty: "Intermediate", githubUrl: "https://github.com/devgraph-demo/serverless-image-pipeline" },
  { id: "project_event_driven_orders", name: "Event-Driven Order System", description: "An order-processing system built around asynchronous domain events.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/event-driven-orders" },
  { id: "project_api_gateway", name: "API Gateway Service", description: "A gateway service handling routing, auth, and rate limiting for microservices.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/api-gateway-service" },
  { id: "project_multiplayer_game_backend", name: "Multiplayer Game Backend", description: "A real-time backend for matchmaking and multiplayer game state.", difficulty: "Advanced", githubUrl: "https://github.com/devgraph-demo/multiplayer-game-backend" },
];