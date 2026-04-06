import data from "../data/db.json";

let roles = data.roles;

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json(roles);
  }

  if (req.method === "POST") {
    const newRole = req.body;
    roles.push(newRole);
    return res.status(201).json(newRole);
  }

  if (req.method === "PUT") {
    const updated = req.body;

    roles = roles.map(r =>
      r.id === updated.id ? updated : r
    );

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    roles = roles.filter(r => r.id !== id);

    return res.status(200).json({ success: true });
  }
}