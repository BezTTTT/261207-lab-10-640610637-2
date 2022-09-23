import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
  if (req.method === "DELETE") {
    const rooms = readDB();
    const findRoom = rooms.findIndex((x) => x.roomId === roomId);
    if (findRoom === -1)
      return res.status(404).json({ ok: false, message: "Invalid room id" });
    const delMsg = rooms[findRoom].messages.findIndex(
      (x) => x.messageId === messageId
    );
    if (delMsg === -1)
      return res.status(404).json({ ok: false, message: "Invalid message id" });
    rooms[findRoom].messages.splice(delMsg, 1);
    writeDB(rooms);
    return res.json({ ok: true });
  }
}
