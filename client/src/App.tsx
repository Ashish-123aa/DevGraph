import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/About";
import { CareerPathPage } from "./pages/CareerPath";
import { CompaniesPage } from "./pages/Companies";
import { ExplorePage } from "./pages/Explore";
import { ProjectsPage } from "./pages/Projects";
import { SkillGapPage } from "./pages/SkillGap";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ExplorePage />} />
        <Route path="career-path" element={<CareerPathPage />} />
        <Route path="skill-gap" element={<SkillGapPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="companies" element={<CompaniesPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
