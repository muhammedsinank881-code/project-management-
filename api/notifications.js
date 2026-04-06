import data from "../data/db.json";

let notifications = data.notifications;

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.status(200).json(notifications);
  }

  if (req.method === "POST") {
    const newNotif = {
      ...req.body,
      id: Date.now().toString(),
    };
    notifications.unshift(newNotif);
    return res.status(201).json(newNotif);
  }

  if (req.method === "PUT") {
    const updated = req.body;

    notifications = notifications.map(n =>
      n.id === updated.id ? { ...n, ...updated } : n
    );

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    notifications = notifications.filter(n => n.id !== id);

    return res.status(200).json({ success: true });
  }
}