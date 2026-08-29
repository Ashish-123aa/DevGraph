/**
 * Every pair below was chosen deliberately to reflect a real-world
 * relationship (see spec section 8: "Do not create random meaningless
 * relationships"). Developer-authored relationships (KNOWS/USES/BUILT) are
 * generated separately in seed.ts from each developer's track, so a
 * developer's skills, technologies, and projects always cohere.
 */

// --- Skill -> Skill : RELATED_TO (undirected in spirit, stored one-directional) ---
export const skillRelatedTo: [string, string][] = [
  ["skill_java", "skill_oop_design"],
  ["skill_javascript", "skill_typescript"],
  ["skill_python", "skill_data_pipelines"],
  ["skill_sql", "skill_database_design"],
  ["skill_rest_apis", "skill_graphql"],
  ["skill_rest_apis", "skill_auth"],
  ["skill_microservices", "skill_message_queues"],
  ["skill_microservices", "skill_containerization"],
  ["skill_react_dev", "skill_state_management"],
  ["skill_html_css", "skill_responsive_design"],
  ["skill_responsive_design", "skill_accessibility"],
  ["skill_containerization", "skill_k8s_orchestration"],
  ["skill_cicd", "skill_iac"],
  ["skill_cloud_fundamentals", "skill_iac"],
  ["skill_observability", "skill_performance_optimization"],
  ["skill_nosql_modeling", "skill_database_design"],
  ["skill_data_pipelines", "skill_data_warehousing"],
  ["skill_security_fundamentals", "skill_auth"],
  ["skill_algorithms", "skill_performance_optimization"],
  ["skill_automated_testing", "skill_performance_optimization"],
  ["skill_go", "skill_microservices"],
  ["skill_system_design", "skill_microservices"],
  ["skill_system_design", "skill_message_queues"],

  // --- Mobile / AI-ML / Architecture additions ---
  ["skill_mobile_development", "skill_ios_development"],
  ["skill_mobile_development", "skill_android_development"],
  ["skill_ml_fundamentals", "skill_deep_learning"],
  ["skill_ml_fundamentals", "skill_statistics_probability"],
  ["skill_deep_learning", "skill_nlp"],
  ["skill_data_visualization", "skill_statistics_probability"],
  ["skill_caching_strategies", "skill_performance_optimization"],
  ["skill_event_driven_architecture", "skill_message_queues"],
  ["skill_serverless_architecture", "skill_cloud_fundamentals"],
  ["skill_networking_fundamentals", "skill_security_fundamentals"],
  ["skill_ui_ux_principles", "skill_accessibility"],
  ["skill_agile_scrum", "skill_system_design"],
];

// --- Skill -> Skill : PREREQUISITE_FOR (forms learning chains) ---
export const skillPrerequisiteFor: [string, string][] = [
  ["skill_programming_fundamentals", "skill_data_structures"],
  ["skill_data_structures", "skill_algorithms"],
  ["skill_algorithms", "skill_system_design"],
  ["skill_programming_fundamentals", "skill_oop_design"],
  ["skill_oop_design", "skill_java"],
  ["skill_programming_fundamentals", "skill_javascript"],
  ["skill_javascript", "skill_typescript"],
  ["skill_programming_fundamentals", "skill_python"],
  ["skill_html_css", "skill_react_dev"],
  ["skill_javascript", "skill_react_dev"],
  ["skill_react_dev", "skill_state_management"],
  ["skill_sql", "skill_database_design"],
  ["skill_database_design", "skill_nosql_modeling"],
  ["skill_rest_apis", "skill_microservices"],
  ["skill_auth", "skill_security_fundamentals"],
  ["skill_git", "skill_cicd"],
  ["skill_cicd", "skill_iac"],
  ["skill_cloud_fundamentals", "skill_k8s_orchestration"],
  ["skill_containerization", "skill_k8s_orchestration"],
  ["skill_data_structures", "skill_data_pipelines"],
  ["skill_data_pipelines", "skill_data_warehousing"],
  ["skill_system_design", "skill_message_queues"],
  ["skill_algorithms", "skill_performance_optimization"],
  ["skill_rest_apis", "skill_graphql"],
  ["skill_python", "skill_data_pipelines"],

  // --- Mobile / AI-ML additions ---
  ["skill_programming_fundamentals", "skill_mobile_development"],
  ["skill_oop_design", "skill_ios_development"],
  ["skill_oop_design", "skill_android_development"],
  ["skill_python", "skill_ml_fundamentals"],
  ["skill_statistics_probability", "skill_ml_fundamentals"],
  ["skill_ml_fundamentals", "skill_deep_learning"],
  ["skill_deep_learning", "skill_nlp"],
  ["skill_data_structures", "skill_statistics_probability"],
  ["skill_rest_apis", "skill_event_driven_architecture"],
  ["skill_cloud_fundamentals", "skill_serverless_architecture"],
  ["skill_git", "skill_agile_scrum"],
  ["skill_html_css", "skill_ui_ux_principles"],
];

// --- Skill -> Technology : ENABLES ---
export const skillEnablesTechnology: [string, string][] = [
  ["skill_java", "tech_spring_boot"],
  ["skill_javascript", "tech_nodejs"],
  ["skill_javascript", "tech_react"],
  ["skill_typescript", "tech_nextjs"],
  ["skill_python", "tech_fastapi"],
  ["skill_python", "tech_django"],
  ["skill_sql", "tech_postgresql"],
  ["skill_sql", "tech_mysql"],
  ["skill_nosql_modeling", "tech_mongodb"],
  ["skill_rest_apis", "tech_express"],
  ["skill_message_queues", "tech_kafka"],
  ["skill_message_queues", "tech_rabbitmq"],
  ["skill_containerization", "tech_docker"],
  ["skill_k8s_orchestration", "tech_kubernetes"],
  ["skill_iac", "tech_terraform"],
  ["skill_cloud_fundamentals", "tech_aws"],
  ["skill_cloud_fundamentals", "tech_gcp"],
  ["skill_cloud_fundamentals", "tech_azure"],
  ["skill_cicd", "tech_jenkins"],
  ["skill_cicd", "tech_github_actions"],
  ["skill_observability", "tech_prometheus"],
  ["skill_observability", "tech_grafana"],
  ["skill_data_warehousing", "tech_elasticsearch"],
  ["skill_react_dev", "tech_vite"],
  ["skill_automated_testing", "tech_jest"],
  ["skill_graphql", "tech_express"],
  ["skill_react_dev", "tech_nextjs"],

  // --- Mobile / AI-ML / Cloud / Testing additions ---
  ["skill_ios_development", "tech_swift"],
  ["skill_android_development", "tech_kotlin"],
  ["skill_mobile_development", "tech_flutter"],
  ["skill_mobile_development", "tech_react_native"],
  ["skill_ml_fundamentals", "tech_scikit_learn"],
  ["skill_deep_learning", "tech_tensorflow"],
  ["skill_deep_learning", "tech_pytorch"],
  ["skill_serverless_architecture", "tech_aws_lambda"],
  ["skill_serverless_architecture", "tech_cloudflare_workers"],
  ["skill_microservices", "tech_grpc"],
  ["skill_automated_testing", "tech_cypress"],
  ["skill_automated_testing", "tech_playwright"],
];

// --- Technology -> Technology : COMPLEMENTS ---
export const technologyComplements: [string, string][] = [
  ["tech_nodejs", "tech_express"],
  ["tech_nodejs", "tech_redis"],
  ["tech_nodejs", "tech_postgresql"],
  ["tech_spring_boot", "tech_postgresql"],
  ["tech_docker", "tech_kubernetes"],
  ["tech_react", "tech_vite"],
  ["tech_react", "tech_nextjs"],
  ["tech_fastapi", "tech_postgresql"],
  ["tech_kafka", "tech_elasticsearch"],
  ["tech_terraform", "tech_aws"],
  ["tech_prometheus", "tech_grafana"],
  ["tech_kubernetes", "tech_prometheus"],
  ["tech_express", "tech_mongodb"],
  ["tech_django", "tech_postgresql"],
  ["tech_nginx", "tech_docker"],
  ["tech_jest", "tech_react"],
  ["tech_github_actions", "tech_docker"],

  // --- Mobile / AI-ML additions ---
  ["tech_react_native", "tech_react"],
  ["tech_flutter", "tech_kotlin"],
  ["tech_tensorflow", "tech_pytorch"],
  ["tech_pytorch", "tech_scikit_learn"],
  ["tech_aws_lambda", "tech_aws"],
  ["tech_cloudflare_workers", "tech_grpc"],
  ["tech_cypress", "tech_playwright"],
  ["tech_grpc", "tech_kubernetes"],
];

// --- Skill -> JobRole : REQUIRED_FOR ---
export const skillRequiredForRole: [string, string][] = [
  ["skill_java", "role_backend_engineer"],
  ["skill_rest_apis", "role_backend_engineer"],
  ["skill_database_design", "role_backend_engineer"],
  ["skill_system_design", "role_backend_engineer"],
  ["skill_auth", "role_backend_engineer"],

  ["skill_javascript", "role_frontend_engineer"],
  ["skill_html_css", "role_frontend_engineer"],
  ["skill_react_dev", "role_frontend_engineer"],
  ["skill_state_management", "role_frontend_engineer"],
  ["skill_responsive_design", "role_frontend_engineer"],
  ["skill_accessibility", "role_frontend_engineer"],

  ["skill_javascript", "role_fullstack_developer"],
  ["skill_react_dev", "role_fullstack_developer"],
  ["skill_rest_apis", "role_fullstack_developer"],
  ["skill_sql", "role_fullstack_developer"],
  ["skill_database_design", "role_fullstack_developer"],

  ["skill_containerization", "role_devops_engineer"],
  ["skill_cicd", "role_devops_engineer"],
  ["skill_iac", "role_devops_engineer"],
  ["skill_cloud_fundamentals", "role_devops_engineer"],
  ["skill_observability", "role_devops_engineer"],
  ["skill_k8s_orchestration", "role_devops_engineer"],

  ["skill_python", "role_data_engineer"],
  ["skill_sql", "role_data_engineer"],
  ["skill_data_pipelines", "role_data_engineer"],
  ["skill_data_warehousing", "role_data_engineer"],
  ["skill_nosql_modeling", "role_data_engineer"],

  ["skill_cloud_fundamentals", "role_cloud_engineer"],
  ["skill_iac", "role_cloud_engineer"],
  ["skill_k8s_orchestration", "role_cloud_engineer"],
  ["skill_security_fundamentals", "role_cloud_engineer"],

  ["skill_programming_fundamentals", "role_software_engineer"],
  ["skill_data_structures", "role_software_engineer"],
  ["skill_algorithms", "role_software_engineer"],
  ["skill_git", "role_software_engineer"],

  ["skill_observability", "role_sre"],
  ["skill_performance_optimization", "role_sre"],
  ["skill_system_design", "role_sre"],
  ["skill_k8s_orchestration", "role_sre"],

  ["skill_iac", "role_platform_engineer"],
  ["skill_k8s_orchestration", "role_platform_engineer"],
  ["skill_cicd", "role_platform_engineer"],
  ["skill_system_design", "role_platform_engineer"],

  ["skill_automated_testing", "role_qa_automation_engineer"],
  ["skill_performance_optimization", "role_qa_automation_engineer"],
  ["skill_rest_apis", "role_qa_automation_engineer"],

  ["skill_mobile_development", "role_mobile_engineer"],
  ["skill_ios_development", "role_mobile_engineer"],
  ["skill_android_development", "role_mobile_engineer"],
  ["skill_ui_ux_principles", "role_mobile_engineer"],

  ["skill_ml_fundamentals", "role_ml_engineer"],
  ["skill_deep_learning", "role_ml_engineer"],
  ["skill_python", "role_ml_engineer"],
  ["skill_data_pipelines", "role_ml_engineer"],

  ["skill_statistics_probability", "role_data_scientist"],
  ["skill_ml_fundamentals", "role_data_scientist"],
  ["skill_data_visualization", "role_data_scientist"],
  ["skill_python", "role_data_scientist"],

  ["skill_system_design", "role_solutions_architect"],
  ["skill_cloud_fundamentals", "role_solutions_architect"],
  ["skill_microservices", "role_solutions_architect"],
  ["skill_event_driven_architecture", "role_solutions_architect"],

  ["skill_system_design", "role_engineering_manager"],
  ["skill_agile_scrum", "role_engineering_manager"],
  ["skill_oop_design", "role_engineering_manager"],

  ["skill_rest_apis", "role_technical_writer"],
  ["skill_agile_scrum", "role_technical_writer"],

  ["skill_react_dev", "role_product_engineer"],
  ["skill_ui_ux_principles", "role_product_engineer"],
  ["skill_agile_scrum", "role_product_engineer"],
  ["skill_rest_apis", "role_product_engineer"],

  ["skill_security_fundamentals", "role_security_engineer"],
  ["skill_networking_fundamentals", "role_security_engineer"],
  ["skill_auth", "role_security_engineer"],
  ["skill_cloud_fundamentals", "role_security_engineer"],
];

// --- Technology -> JobRole : COMMONLY_USED_IN ---
export const technologyCommonlyUsedInRole: [string, string][] = [
  ["tech_spring_boot", "role_backend_engineer"],
  ["tech_postgresql", "role_backend_engineer"],
  ["tech_redis", "role_backend_engineer"],
  ["tech_nodejs", "role_backend_engineer"],

  ["tech_react", "role_frontend_engineer"],
  ["tech_nextjs", "role_frontend_engineer"],
  ["tech_vite", "role_frontend_engineer"],

  ["tech_nodejs", "role_fullstack_developer"],
  ["tech_react", "role_fullstack_developer"],
  ["tech_postgresql", "role_fullstack_developer"],

  ["tech_docker", "role_devops_engineer"],
  ["tech_kubernetes", "role_devops_engineer"],
  ["tech_terraform", "role_devops_engineer"],
  ["tech_jenkins", "role_devops_engineer"],
  ["tech_github_actions", "role_devops_engineer"],

  ["tech_kafka", "role_data_engineer"],
  ["tech_elasticsearch", "role_data_engineer"],
  ["tech_postgresql", "role_data_engineer"],

  ["tech_aws", "role_cloud_engineer"],
  ["tech_gcp", "role_cloud_engineer"],
  ["tech_azure", "role_cloud_engineer"],
  ["tech_terraform", "role_cloud_engineer"],

  ["tech_prometheus", "role_sre"],
  ["tech_grafana", "role_sre"],
  ["tech_kubernetes", "role_sre"],

  ["tech_kubernetes", "role_platform_engineer"],
  ["tech_terraform", "role_platform_engineer"],
  ["tech_github_actions", "role_platform_engineer"],

  ["tech_jest", "role_qa_automation_engineer"],

  ["tech_swift", "role_mobile_engineer"],
  ["tech_kotlin", "role_mobile_engineer"],
  ["tech_flutter", "role_mobile_engineer"],
  ["tech_react_native", "role_mobile_engineer"],

  ["tech_tensorflow", "role_ml_engineer"],
  ["tech_pytorch", "role_ml_engineer"],

  ["tech_scikit_learn", "role_data_scientist"],
  ["tech_postgresql", "role_data_scientist"],

  ["tech_aws", "role_solutions_architect"],
  ["tech_grpc", "role_solutions_architect"],
  ["tech_kubernetes", "role_solutions_architect"],

  ["tech_aws_lambda", "role_security_engineer"],
];

// --- Project -> Skill : DEMONSTRATES ---
export const projectDemonstratesSkill: [string, string][] = [
  ["project_banking_app", "skill_java"],
  ["project_banking_app", "skill_sql"],
  ["project_banking_app", "skill_system_design"],
  ["project_banking_app", "skill_auth"],

  ["project_ecommerce_platform", "skill_rest_apis"],
  ["project_ecommerce_platform", "skill_database_design"],
  ["project_ecommerce_platform", "skill_microservices"],

  ["project_chat_app", "skill_javascript"],
  ["project_chat_app", "skill_message_queues"],
  ["project_chat_app", "skill_rest_apis"],

  ["project_job_portal", "skill_rest_apis"],
  ["project_job_portal", "skill_sql"],
  ["project_job_portal", "skill_auth"],

  ["project_payment_system", "skill_java"],
  ["project_payment_system", "skill_security_fundamentals"],
  ["project_payment_system", "skill_system_design"],

  ["project_social_analytics", "skill_data_pipelines"],
  ["project_social_analytics", "skill_data_warehousing"],
  ["project_social_analytics", "skill_python"],

  ["project_inventory_system", "skill_sql"],
  ["project_inventory_system", "skill_database_design"],

  ["project_ride_sharing", "skill_system_design"],
  ["project_ride_sharing", "skill_microservices"],
  ["project_ride_sharing", "skill_message_queues"],

  ["project_video_streaming", "skill_containerization"],
  ["project_video_streaming", "skill_k8s_orchestration"],
  ["project_video_streaming", "skill_performance_optimization"],

  ["project_recipe_community", "skill_html_css"],
  ["project_recipe_community", "skill_react_dev"],
  ["project_recipe_community", "skill_responsive_design"],

  ["project_finance_tracker", "skill_javascript"],
  ["project_finance_tracker", "skill_rest_apis"],

  ["project_task_manager", "skill_react_dev"],
  ["project_task_manager", "skill_state_management"],
  ["project_task_manager", "skill_rest_apis"],

  ["project_blogging_platform", "skill_react_dev"],
  ["project_blogging_platform", "skill_accessibility"],

  ["project_hotel_booking", "skill_sql"],
  ["project_hotel_booking", "skill_rest_apis"],
  ["project_hotel_booking", "skill_database_design"],

  ["project_fitness_tracker", "skill_react_dev"],
  ["project_fitness_tracker", "skill_responsive_design"],

  ["project_learning_platform", "skill_react_dev"],
  ["project_learning_platform", "skill_rest_apis"],
  ["project_learning_platform", "skill_database_design"],

  ["project_weather_pipeline", "skill_python"],
  ["project_weather_pipeline", "skill_data_pipelines"],

  ["project_log_monitoring", "skill_observability"],
  ["project_log_monitoring", "skill_performance_optimization"],

  ["project_mobile_banking", "skill_mobile_development"],
  ["project_mobile_banking", "skill_security_fundamentals"],
  ["project_mobile_banking", "skill_auth"],

  ["project_ios_fitness_companion", "skill_ios_development"],
  ["project_ios_fitness_companion", "skill_ui_ux_principles"],

  ["project_cross_platform_notes", "skill_mobile_development"],
  ["project_cross_platform_notes", "skill_ui_ux_principles"],

  ["project_ml_recommendation_engine", "skill_ml_fundamentals"],
  ["project_ml_recommendation_engine", "skill_python"],
  ["project_ml_recommendation_engine", "skill_data_pipelines"],

  ["project_sentiment_analysis", "skill_nlp"],
  ["project_sentiment_analysis", "skill_python"],

  ["project_data_viz_dashboard", "skill_data_visualization"],
  ["project_data_viz_dashboard", "skill_statistics_probability"],

  ["project_serverless_image_pipeline", "skill_serverless_architecture"],
  ["project_serverless_image_pipeline", "skill_cloud_fundamentals"],

  ["project_event_driven_orders", "skill_event_driven_architecture"],
  ["project_event_driven_orders", "skill_message_queues"],
  ["project_event_driven_orders", "skill_microservices"],

  ["project_api_gateway", "skill_microservices"],
  ["project_api_gateway", "skill_security_fundamentals"],
  ["project_api_gateway", "skill_system_design"],

  ["project_multiplayer_game_backend", "skill_system_design"],
  ["project_multiplayer_game_backend", "skill_message_queues"],
];

// --- Technology -> Project : USED_IN ---
export const technologyUsedInProject: [string, string][] = [
  ["tech_spring_boot", "project_banking_app"],
  ["tech_postgresql", "project_banking_app"],
  ["tech_docker", "project_banking_app"],

  ["tech_nodejs", "project_ecommerce_platform"],
  ["tech_express", "project_ecommerce_platform"],
  ["tech_postgresql", "project_ecommerce_platform"],
  ["tech_redis", "project_ecommerce_platform"],

  ["tech_nodejs", "project_chat_app"],
  ["tech_redis", "project_chat_app"],
  ["tech_kafka", "project_chat_app"],

  ["tech_fastapi", "project_job_portal"],
  ["tech_postgresql", "project_job_portal"],

  ["tech_spring_boot", "project_payment_system"],
  ["tech_postgresql", "project_payment_system"],
  ["tech_kafka", "project_payment_system"],

  ["tech_elasticsearch", "project_social_analytics"],
  ["tech_kafka", "project_social_analytics"],

  ["tech_postgresql", "project_inventory_system"],
  ["tech_mysql", "project_inventory_system"],

  ["tech_kafka", "project_ride_sharing"],
  ["tech_mongodb", "project_ride_sharing"],
  ["tech_redis", "project_ride_sharing"],

  ["tech_docker", "project_video_streaming"],
  ["tech_kubernetes", "project_video_streaming"],
  ["tech_aws", "project_video_streaming"],

  ["tech_react", "project_recipe_community"],
  ["tech_vite", "project_recipe_community"],
  ["tech_mongodb", "project_recipe_community"],

  ["tech_react", "project_finance_tracker"],
  ["tech_express", "project_finance_tracker"],

  ["tech_react", "project_task_manager"],
  ["tech_nodejs", "project_task_manager"],

  ["tech_nextjs", "project_blogging_platform"],
  ["tech_postgresql", "project_blogging_platform"],

  ["tech_react", "project_hotel_booking"],
  ["tech_postgresql", "project_hotel_booking"],

  ["tech_react", "project_fitness_tracker"],
  ["tech_mongodb", "project_fitness_tracker"],

  ["tech_nextjs", "project_learning_platform"],
  ["tech_postgresql", "project_learning_platform"],

  ["tech_docker", "project_weather_pipeline"],
  ["tech_elasticsearch", "project_weather_pipeline"],

  ["tech_prometheus", "project_log_monitoring"],
  ["tech_grafana", "project_log_monitoring"],
  ["tech_elasticsearch", "project_log_monitoring"],

  ["tech_swift", "project_mobile_banking"],
  ["tech_swift", "project_ios_fitness_companion"],
  ["tech_flutter", "project_cross_platform_notes"],
  ["tech_tensorflow", "project_ml_recommendation_engine"],
  ["tech_pytorch", "project_sentiment_analysis"],
  ["tech_elasticsearch", "project_data_viz_dashboard"],
  ["tech_aws_lambda", "project_serverless_image_pipeline"],
  ["tech_cloudflare_workers", "project_serverless_image_pipeline"],
  ["tech_kafka", "project_event_driven_orders"],
  ["tech_postgresql", "project_event_driven_orders"],
  ["tech_grpc", "project_api_gateway"],
  ["tech_kubernetes", "project_api_gateway"],
  ["tech_redis", "project_multiplayer_game_backend"],
  ["tech_kafka", "project_multiplayer_game_backend"],
];

// --- Project -> JobRole : RELEVANT_TO ---
export const projectRelevantToRole: [string, string][] = [
  ["project_banking_app", "role_backend_engineer"],
  ["project_ecommerce_platform", "role_fullstack_developer"],
  ["project_ecommerce_platform", "role_backend_engineer"],
  ["project_chat_app", "role_backend_engineer"],
  ["project_job_portal", "role_fullstack_developer"],
  ["project_payment_system", "role_backend_engineer"],
  ["project_social_analytics", "role_data_engineer"],
  ["project_inventory_system", "role_backend_engineer"],
  ["project_ride_sharing", "role_backend_engineer"],
  ["project_ride_sharing", "role_sre"],
  ["project_video_streaming", "role_devops_engineer"],
  ["project_video_streaming", "role_platform_engineer"],
  ["project_recipe_community", "role_frontend_engineer"],
  ["project_finance_tracker", "role_fullstack_developer"],
  ["project_task_manager", "role_frontend_engineer"],
  ["project_task_manager", "role_fullstack_developer"],
  ["project_blogging_platform", "role_frontend_engineer"],
  ["project_hotel_booking", "role_fullstack_developer"],
  ["project_fitness_tracker", "role_frontend_engineer"],
  ["project_learning_platform", "role_fullstack_developer"],
  ["project_weather_pipeline", "role_data_engineer"],
  ["project_log_monitoring", "role_sre"],
  ["project_log_monitoring", "role_devops_engineer"],

  ["project_mobile_banking", "role_mobile_engineer"],
  ["project_ios_fitness_companion", "role_mobile_engineer"],
  ["project_cross_platform_notes", "role_mobile_engineer"],
  ["project_ml_recommendation_engine", "role_ml_engineer"],
  ["project_ml_recommendation_engine", "role_data_scientist"],
  ["project_sentiment_analysis", "role_ml_engineer"],
  ["project_data_viz_dashboard", "role_data_scientist"],
  ["project_serverless_image_pipeline", "role_cloud_engineer"],
  ["project_event_driven_orders", "role_backend_engineer"],
  ["project_event_driven_orders", "role_solutions_architect"],
  ["project_api_gateway", "role_solutions_architect"],
  ["project_api_gateway", "role_backend_engineer"],
  ["project_multiplayer_game_backend", "role_backend_engineer"],
];

// --- Company -> JobRole : HIRES_FOR ---
export const companyHiresForRole: [string, string][] = [
  ["company_microsoft", "role_backend_engineer"],
  ["company_microsoft", "role_cloud_engineer"],
  ["company_microsoft", "role_software_engineer"],
  ["company_microsoft", "role_data_engineer"],

  ["company_google", "role_backend_engineer"],
  ["company_google", "role_sre"],
  ["company_google", "role_data_engineer"],
  ["company_google", "role_software_engineer"],

  ["company_amazon", "role_backend_engineer"],
  ["company_amazon", "role_cloud_engineer"],
  ["company_amazon", "role_devops_engineer"],
  ["company_amazon", "role_data_engineer"],

  ["company_adobe", "role_frontend_engineer"],
  ["company_adobe", "role_fullstack_developer"],
  ["company_adobe", "role_software_engineer"],

  ["company_atlassian", "role_fullstack_developer"],
  ["company_atlassian", "role_platform_engineer"],
  ["company_atlassian", "role_qa_automation_engineer"],

  ["company_flipkart", "role_backend_engineer"],
  ["company_flipkart", "role_frontend_engineer"],
  ["company_flipkart", "role_data_engineer"],

  ["company_netflix", "role_sre"],
  ["company_netflix", "role_platform_engineer"],
  ["company_netflix", "role_backend_engineer"],

  ["company_stripe", "role_backend_engineer"],
  ["company_stripe", "role_software_engineer"],
  ["company_stripe", "role_cloud_engineer"],

  ["company_uber", "role_backend_engineer"],
  ["company_uber", "role_sre"],
  ["company_uber", "role_data_engineer"],

  ["company_spotify", "role_backend_engineer"],
  ["company_spotify", "role_frontend_engineer"],
  ["company_spotify", "role_data_engineer"],

  ["company_meta", "role_backend_engineer"],
  ["company_meta", "role_ml_engineer"],
  ["company_meta", "role_engineering_manager"],

  ["company_apple", "role_mobile_engineer"],
  ["company_apple", "role_software_engineer"],
  ["company_apple", "role_security_engineer"],

  ["company_salesforce", "role_fullstack_developer"],
  ["company_salesforce", "role_solutions_architect"],
  ["company_salesforce", "role_product_engineer"],

  ["company_shopify", "role_backend_engineer"],
  ["company_shopify", "role_frontend_engineer"],
  ["company_shopify", "role_product_engineer"],

  ["company_airbnb", "role_fullstack_developer"],
  ["company_airbnb", "role_data_scientist"],
  ["company_airbnb", "role_sre"],

  ["company_linkedin", "role_backend_engineer"],
  ["company_linkedin", "role_data_engineer"],
  ["company_linkedin", "role_ml_engineer"],

  ["company_twilio", "role_backend_engineer"],
  ["company_twilio", "role_solutions_architect"],
  ["company_twilio", "role_technical_writer"],

  ["company_snowflake", "role_data_engineer"],
  ["company_snowflake", "role_data_scientist"],
  ["company_snowflake", "role_cloud_engineer"],
];

// --- Company -> Technology : USES ---
export const companyUsesTechnology: [string, string][] = [
  ["company_microsoft", "tech_azure"],
  ["company_microsoft", "tech_kubernetes"],
  ["company_microsoft", "tech_github_actions"],

  ["company_google", "tech_gcp"],
  ["company_google", "tech_kubernetes"],
  ["company_google", "tech_kafka"],

  ["company_amazon", "tech_aws"],
  ["company_amazon", "tech_docker"],
  ["company_amazon", "tech_kubernetes"],

  ["company_adobe", "tech_react"],
  ["company_adobe", "tech_aws"],

  ["company_atlassian", "tech_react"],
  ["company_atlassian", "tech_kubernetes"],
  ["company_atlassian", "tech_postgresql"],

  ["company_flipkart", "tech_aws"],
  ["company_flipkart", "tech_kafka"],
  ["company_flipkart", "tech_react"],

  ["company_netflix", "tech_aws"],
  ["company_netflix", "tech_kafka"],
  ["company_netflix", "tech_docker"],
  ["company_netflix", "tech_prometheus"],

  ["company_stripe", "tech_postgresql"],
  ["company_stripe", "tech_aws"],
  ["company_stripe", "tech_kubernetes"],

  ["company_uber", "tech_kafka"],
  ["company_uber", "tech_docker"],
  ["company_uber", "tech_kubernetes"],

  ["company_spotify", "tech_gcp"],
  ["company_spotify", "tech_kafka"],
  ["company_spotify", "tech_postgresql"],

  ["company_meta", "tech_react"],
  ["company_meta", "tech_pytorch"],
  ["company_meta", "tech_kubernetes"],

  ["company_apple", "tech_swift"],
  ["company_apple", "tech_kubernetes"],

  ["company_salesforce", "tech_postgresql"],
  ["company_salesforce", "tech_aws"],
  ["company_salesforce", "tech_grpc"],

  ["company_shopify", "tech_react"],
  ["company_shopify", "tech_kubernetes"],
  ["company_shopify", "tech_mysql"],

  ["company_airbnb", "tech_react"],
  ["company_airbnb", "tech_aws"],
  ["company_airbnb", "tech_kafka"],

  ["company_linkedin", "tech_kafka"],
  ["company_linkedin", "tech_kubernetes"],

  ["company_twilio", "tech_aws"],
  ["company_twilio", "tech_aws_lambda"],
  ["company_twilio", "tech_grpc"],

  ["company_snowflake", "tech_aws"],
  ["company_snowflake", "tech_gcp"],
  ["company_snowflake", "tech_azure"],
];

// --- Resource -> Skill : TEACHES ---
export const resourceTeachesSkill: [string, string][] = [
  ["resource_mdn_js", "skill_javascript"],
  ["resource_mdn_html_css", "skill_html_css"],
  ["resource_freecodecamp_js", "skill_data_structures"],
  ["resource_freecodecamp_js", "skill_algorithms"],
  ["resource_typescript_handbook", "skill_typescript"],
  ["resource_python_docs", "skill_python"],
  ["resource_postgres_docs", "skill_sql"],
  ["resource_postgres_docs", "skill_database_design"],
  ["resource_mongodb_university", "skill_nosql_modeling"],
  ["resource_grokking_system_design", "skill_system_design"],
  ["resource_ddia_book", "skill_data_pipelines"],
  ["resource_ddia_book", "skill_system_design"],
  ["resource_clean_code_book", "skill_oop_design"],
  ["resource_git_book", "skill_git"],
  ["resource_cs50", "skill_programming_fundamentals"],
  ["resource_graphql_docs", "skill_graphql"],
  ["resource_owasp_top10", "skill_security_fundamentals"],
  ["resource_testing_library_docs", "skill_automated_testing"],
  ["resource_web_dev_a11y", "skill_accessibility"],
  ["resource_freecodecamp_python", "skill_python"],

  ["resource_ml_coursera", "skill_ml_fundamentals"],
  ["resource_ml_coursera", "skill_statistics_probability"],
  ["resource_scrum_guide", "skill_agile_scrum"],
  ["resource_nn_group_ux", "skill_ui_ux_principles"],
];

// --- Resource -> Technology : TEACHES_TECHNOLOGY ---
export const resourceTeachesTechnology: [string, string][] = [
  ["resource_react_docs", "tech_react"],
  ["resource_nodejs_docs", "tech_nodejs"],
  ["resource_spring_guides", "tech_spring_boot"],
  ["resource_fastapi_docs", "tech_fastapi"],
  ["resource_docker_docs", "tech_docker"],
  ["resource_k8s_docs", "tech_kubernetes"],
  ["resource_aws_training", "tech_aws"],
  ["resource_terraform_docs", "tech_terraform"],
  ["resource_kafka_docs", "tech_kafka"],
  ["resource_prometheus_docs", "tech_prometheus"],
  ["resource_grafana_docs", "tech_grafana"],

  ["resource_apple_dev_docs", "tech_swift"],
  ["resource_android_dev_docs", "tech_kotlin"],
  ["resource_flutter_docs", "tech_flutter"],
  ["resource_tensorflow_docs", "tech_tensorflow"],
  ["resource_pytorch_docs", "tech_pytorch"],
  ["resource_cypress_docs", "tech_cypress"],
  ["resource_playwright_docs", "tech_playwright"],
  ["resource_aws_lambda_docs", "tech_aws_lambda"],
  ["resource_grpc_docs", "tech_grpc"],
];