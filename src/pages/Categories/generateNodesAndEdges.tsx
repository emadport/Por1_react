import { Node, Edge } from 'reactflow';
import { Project, Task, SubProject, SubTask } from 'generated/graphql'; 
import { FaUser } from 'react-icons/fa';
import { themeColor } from 'utils/theme';
import { MdTask } from 'react-icons/md';
import { GoProject } from 'react-icons/go';

const generateNodesAndEdges = (projectsArray: Project[]) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const colors = ["#ffcccb", "#c0ffee", "#b0e0e6", "#f08080", "#faebd7"]; // Define some background colors

  // Function to add nodes and edges for subTasks
  const addSubTasks = (subTasks: SubTask[], taskId: string, taskIndex: number, projectIndex: number, parentX: number) => {
    subTasks.forEach((subTask: SubTask, subTaskIndex: number) => {
      const subTaskColor = colors[(projectIndex + taskIndex + subTaskIndex + 2) % colors.length]; // Assign a different background color to the subTask
      const subTaskY = 400; // Adjust vertical spacing for subTasks within tasks

      // Add the subTask node
      nodes.push({
        id: `subtask-${subTask._id}`,
        data: { label: <div className='items'><div><MdTask className='icons' color={themeColor}/></div><div>{subTask.name}</div> </div>, background: subTaskColor },
        position: { y: subTaskY, x: parentX + (subTaskIndex*2) * 200 }, // Adjust x-position as needed
        type: "custom",
      });

      // Add an edge from task to subTask
      edges.push({
        id: `e-task-${taskId}-subtask-${subTask._id}`,
        source: `task-${taskId}`,
        target: `subtask-${subTask._id}`,
        type: "default",
        sourceHandle: "right",
        targetHandle: "left",
        pathOptions: { curvature: 0 },
      });
    });
  };

  // Function to add nodes and edges for tasks
  const addTasks = (tasks: Task[], parentId: string, parentType: string, parentIndex: number, parentX: number) => {
    tasks.forEach((task: Task, taskIndex: number) => {
      const taskColor = colors[(parentIndex + taskIndex + 1) % colors.length]; // Assign a different background color to the task
      const taskY = 300; // Adjust vertical spacing for tasks

      // Add the task node
      nodes.push({
        id: `task-${task._id}`,
        data: { label: <div className='items'><div><MdTask className='icons' color={themeColor}/></div><div>{task.name}</div> </div>, background: taskColor },
        position: { y: taskY, x: parentX + taskIndex * 200 }, // Adjust x-position as needed
        type: "custom",
      });

      // Add an edge from parent to task
      edges.push({
        id: `e-${parentType}-${parentId}-task-${task._id}`,
        source: `${parentType}-${parentId}`,
        target: `task-${task._id}`,
        type: "default",
        sourceHandle: "right",
        targetHandle: "left",
        pathOptions: { curvature: 0 },
      });

      // Add subTasks for each task
      if (task.subTasks) {
        addSubTasks(task.subTasks as SubTask[], task._id as string, taskIndex, parentIndex, parentX + taskIndex * 200);
      }
    });
  };

  // Function to add nodes and edges for subProjects
  const addSubProjects = (subProjects: SubProject[], projectId: string, projectIndex: number) => {
    subProjects.forEach((subProject: SubProject, subProjectIndex: number) => {
      const subProjectColor = colors[(projectIndex + subProjectIndex + 1) % colors.length]; // Assign a different background color to the subProject
      const subProjectY = 200; // Adjust vertical spacing for subProjects within projects

      // Add the subProject node
      nodes.push({
        id: `subproject-${subProject._id}`,
        data: { label: <div className='items'><div><GoProject className='icons' color={themeColor}/></div><div>{subProject.name}</div> </div>, background: subProjectColor },
        position: { y: subProjectY, x: subProjectIndex * 200 + (projectIndex * 100) }, // Adjust x-position as needed
        type: "custom",
      });

      // Add an edge from project to subProject
      edges.push({
        id: `e-project-${projectId}-subproject-${subProject._id}`,
        source: `project-${projectId}`,
        target: `subproject-${subProject._id}`,
        type: "default",
        sourceHandle: "right",
        targetHandle: "left",
        pathOptions: { curvature: 0 },
      });

      // Add tasks for each subProject
      if (subProject.tasks) {
        addTasks(subProject.tasks as Task[], subProject._id as string, 'subproject', subProjectIndex, subProjectIndex * 200 + (projectIndex * 100));
      }
    });
  };

  // Function to add nodes and edges for projects
  const addProjects = (projects: Project[]) => {
    projects.forEach((project: Project, projectIndex: number) => {
      const projectColor = colors[projectIndex % colors.length]; // Assign a different background color to the project
      const projectY = 100 // Adjust vertical spacing for projects

      // Add the project node
      nodes.push({
        id: `project-${project._id}`,
        data: { label: <div className='items'><div><GoProject className='icons' color={themeColor}/></div><div>{project.name}</div> </div>, background: projectColor },
        position: { y: projectY, x: projectIndex * 100 }, // Adjust x-position as needed
        type: "custom",
      });

      // Add subProjects for each project
      if (project.subProjects) {
        addSubProjects(project.subProjects as SubProject[], project._id as string, projectIndex);
      }

      // Add tasks for each project
      if (project.tasks) {
        addTasks(project.tasks as Task[], project._id as string, 'project', projectIndex, projectIndex * 100);
      }
    });
  };

  // Call function to add projects
  addProjects(projectsArray);

  return { nodes, edges };
};

export default generateNodesAndEdges;
