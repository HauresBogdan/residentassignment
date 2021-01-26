import Style from "./StyledProjectForm";
import { useState } from "react";
import uuid from "react-uuid";
import closeIcon from "../../media/close.png";

export default function ProjectForm() {
  const [projects, setProjects] = useState([]);
  const [projectsInput, setProjectsInput] = useState("");

  function handleProjectsInputChange(e) {
    const projectsInputValue = e.target.value;
    setProjectsInput(projectsInputValue);
  }

  function addingToProjects(e) {
    if (e.key === "Enter") {
      setProjects((prevValues) => [...prevValues, projectsInput]);
      setProjectsInput("");
    }
  }

  function removeFromProjects(e) {
    const toBeDeleted = e.target.getAttribute("value");
    const newProjectList = projects.filter(
      (project) => project !== toBeDeleted
    );
    console.log(newProjectList);
    setProjects(newProjectList);
  }

  return (
    <Style>
      <form>
        <label>
          Name:
          <input className="name-input" type="text" name="name" />
        </label>
        <label>
          Projects:{" "}
          {projects.map((project) => (
            <span key={uuid()} className="project-tag">
              {project}
              <img
                className="close-tag"
                src={closeIcon}
                alt="close-tag"
                onClick={removeFromProjects}
                value={project}
              />
            </span>
          ))}
          <input
            type="text"
            name="name"
            onChange={handleProjectsInputChange}
            value={projectsInput}
            onKeyDown={addingToProjects}
          />
        </label>
        {/* <input type="submit" value="Submit" /> */}
      </form>
    </Style>
  );
}
