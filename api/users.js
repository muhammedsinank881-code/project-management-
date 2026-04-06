import data from "../data/db.json";

let users = data.users;

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json(users);
  }

  if (req.method === "POST") {
    const newUser = {
      ...req.body,
      id: Date.now().toString()
    };
    users.push(newUser);
    return res.status(201).json(newUser);
  }

  if (req.method === "PUT") {
    const updatedUser = req.body;

    users = users.map(u =>
      u.id === updatedUser.id ? updatedUser : u
    );

    return res.status(200).json(updatedUser);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    users = users.filter(u => u.id !== id);

    return res.status(200).json({ success: true });
  }
}