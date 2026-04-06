import data from "../data/db.json";

let projects = data.projects;
const users = data.users;

export default function handler(req, res) {

  if (req.method === "GET") {

    const enrichedProjects = projects.map(project => ({
      ...project,
      members: project.members.map(member => ({
        ...member,
        userDetails: users.find(u => u.id === member.userId)
      }))
    }));

    return res.status(200).json(enrichedProjects);
  }

  if (req.method === "POST") {
    const newProject = {
      ...req.body,
      id: Date.now().toString()
    };
    projects.push(newProject);
    return res.status(201).json(newProject);
  }

  if (req.method === "PUT") {
    const updated = req.body;

    projects = projects.map(p =>
      p.id === updated.id ? updated : p
    );

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    projects = projects.filter(p => p.id !== id);

    return res.status(200).json({ success: true });
  }
}