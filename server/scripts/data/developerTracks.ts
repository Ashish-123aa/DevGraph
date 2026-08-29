import { DeveloperTrack } from "./developers";

interface TrackProfile {
  skills: string[];
  technologies: string[];
  projects: string[];
}

/**
 * Each track maps to a coherent bundle of skills/technologies/projects so
 * that generated Developer relationships make sense together (e.g. a
 * "frontend_react" developer never ends up KNOWS-ing Kubernetes with no
 * connecting technology). Beginner developers get a trimmed slice of their
 * track's list; Advanced/Expert developers get the full list.
 */
export const trackProfiles: Record<DeveloperTrack, TrackProfile> = {
  backend_java: {
    skills: [
      "skill_programming_fundamentals",
      "skill_data_structures",
      "skill_oop_design",
      "skill_java",
      "skill_sql",
      "skill_git",
      "skill_rest_apis",
      "skill_auth",
      "skill_system_design",
    ],
    technologies: ["tech_spring_boot", "tech_postgresql", "tech_docker", "tech_redis"],
    projects: ["project_banking_app", "project_payment_system"],
  },
  backend_node: {
    skills: [
      "skill_programming_fundamentals",
      "skill_javascript",
      "skill_typescript",
      "skill_git",
      "skill_rest_apis",
      "skill_auth",
      "skill_message_queues",
      "skill_sql",
    ],
    technologies: ["tech_nodejs", "tech_express", "tech_mongodb", "tech_redis", "tech_kafka"],
    projects: ["project_chat_app", "project_job_portal"],
  },
  backend_python: {
    skills: [
      "skill_programming_fundamentals",
      "skill_python",
      "skill_sql",
      "skill_git",
      "skill_rest_apis",
      "skill_data_pipelines",
    ],
    technologies: ["tech_fastapi", "tech_postgresql", "tech_docker"],
    projects: ["project_job_portal", "project_weather_pipeline"],
  },
  frontend_react: {
    skills: [
      "skill_html_css",
      "skill_javascript",
      "skill_typescript",
      "skill_react_dev",
      "skill_state_management",
      "skill_responsive_design",
      "skill_accessibility",
      "skill_git",
    ],
    technologies: ["tech_react", "tech_vite", "tech_nextjs"],
    projects: ["project_recipe_community", "project_blogging_platform", "project_fitness_tracker"],
  },
  fullstack: {
    skills: [
      "skill_programming_fundamentals",
      "skill_javascript",
      "skill_typescript",
      "skill_html_css",
      "skill_react_dev",
      "skill_rest_apis",
      "skill_sql",
      "skill_database_design",
      "skill_git",
    ],
    technologies: ["tech_nodejs", "tech_express", "tech_react", "tech_postgresql"],
    projects: ["project_task_manager", "project_finance_tracker", "project_hotel_booking"],
  },
  devops: {
    skills: [
      "skill_git",
      "skill_containerization",
      "skill_cicd",
      "skill_iac",
      "skill_cloud_fundamentals",
      "skill_k8s_orchestration",
      "skill_observability",
    ],
    technologies: ["tech_docker", "tech_kubernetes", "tech_terraform", "tech_aws", "tech_prometheus", "tech_grafana"],
    projects: ["project_log_monitoring", "project_video_streaming"],
  },
  data_engineer: {
    skills: [
      "skill_programming_fundamentals",
      "skill_python",
      "skill_sql",
      "skill_data_pipelines",
      "skill_data_warehousing",
      "skill_nosql_modeling",
    ],
    technologies: ["tech_postgresql", "tech_kafka", "tech_elasticsearch", "tech_aws"],
    projects: ["project_social_analytics", "project_weather_pipeline"],
  },
  mobile: {
    skills: [
      "skill_programming_fundamentals",
      "skill_git",
      "skill_oop_design",
      "skill_mobile_development",
      "skill_ios_development",
      "skill_android_development",
      "skill_ui_ux_principles",
    ],
    technologies: ["tech_swift", "tech_kotlin", "tech_flutter", "tech_react_native"],
    projects: ["project_mobile_banking", "project_ios_fitness_companion", "project_cross_platform_notes"],
  },
  ml_engineer: {
    skills: [
      "skill_programming_fundamentals",
      "skill_python",
      "skill_sql",
      "skill_data_structures",
      "skill_statistics_probability",
      "skill_ml_fundamentals",
      "skill_deep_learning",
      "skill_nlp",
    ],
    technologies: ["tech_tensorflow", "tech_pytorch", "tech_scikit_learn", "tech_postgresql"],
    projects: ["project_ml_recommendation_engine", "project_sentiment_analysis"],
  },
};

const TRIMMED_SIZE = { skills: 4, technologies: 2, projects: 1 };

export function relationshipsForDeveloper(
  track: DeveloperTrack,
  experienceLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert"
): TrackProfile {
  const profile = trackProfiles[track];
  if (experienceLevel === "Beginner") {
    return {
      skills: profile.skills.slice(0, TRIMMED_SIZE.skills),
      technologies: profile.technologies.slice(0, TRIMMED_SIZE.technologies),
      projects: profile.projects.slice(0, TRIMMED_SIZE.projects),
    };
  }
  if (experienceLevel === "Intermediate") {
    return {
      skills: profile.skills.slice(0, Math.max(TRIMMED_SIZE.skills + 2, profile.skills.length - 1)),
      technologies: profile.technologies,
      projects: profile.projects.slice(0, Math.max(1, profile.projects.length - 1)),
    };
  }
  // Advanced / Expert know their whole track.
  return profile;
}