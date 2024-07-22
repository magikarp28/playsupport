import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/app/lib/data";
import Project from "./project";

function Projects() {
  return (
    <section id="projects" className="scroll-mt-16">
      <SectionHeading>My projects</SectionHeading>
      {projectsData.map((project, index) => (
        <React.Fragment key={index}>
          <Project {...project} />
        </React.Fragment>
      ))}
    </section>
  );
}

export default Projects;
