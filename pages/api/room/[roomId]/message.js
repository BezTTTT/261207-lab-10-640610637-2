import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const roomId = req.query.roomId;
    const findRoom = rooms.findIndex((x) => x.roomId === roomId);
    if (findRoom === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    return res.json({ ok: true, messages: rooms[findRoom].messages });
  } else if (req.method === "POST") {
    const rooms = readDB();
    //read request body
    const text = req.body.text;
    //create new id
    const newId = uuidv4();
    const roomId = req.query.roomId;
    const findRoom = rooms.findIndex((x) => x.roomId === roomId);

    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid text input" });
    if (findRoom === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id " });
    const newText = {
      messageId: newId,
      text: text,
    };
    rooms[findRoom].messages.push(newText);
    writeDB(rooms);
    return res.json({ ok: true, message: newText });
  }
}
