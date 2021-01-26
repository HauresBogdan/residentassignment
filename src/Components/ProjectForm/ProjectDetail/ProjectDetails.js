import Style from "./StyledProjectDetails";
import closeIcon from "../../../media/close.png";
import { useState } from "react";

export default function ProjectDetailsr({ projectId, remove, projects, setProjectsArr, projectsArr }) {
  const [selectedPoject, setSelectedProj] = useState("");

  function selectHandle(e) {
    setSelectedProj(e.target.value);
    const newProjectList = projectsArr.map((project) => (project.uniqId !== projectId ? project : { uniqId: projectId, selectedproject: e.target.value }));
    setProjectsArr(newProjectList);
  }
  return (
    <Style>
      <div className="added-projects">
        <p>Projects</p>
        <select value={selectedPoject} onChange={selectHandle}>
          <option value="" disabled hidden>
            Select Project
          </option>
          {projects.map((project) => (
            <option key={project}>{project}</option>
          ))}
        </select>
        <p>Details</p>
        <textarea className="details-textarea" name="details" id="details"></textarea>
        <p>Duration</p>
        <div className="duration-inputs">
          <input type="text" />
          <select>
            <option>days</option>
            <option>months</option>
            <option>years</option>
          </select>
        </div>
        <img className="close-projects" src={closeIcon} alt="close-projects" onClick={remove} value={projectId} value1={selectedPoject} />
      </div>
    </Style>
  );
}
