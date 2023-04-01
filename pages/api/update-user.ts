import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "../../src/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body.email;
  const pseudo = req.body.pseudo;
  const mongodb = await getDatabase();
  const isUser = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  if (isUser) {
    await mongodb
      .db()
      .collection("users")
      .updateOne({ email: email }, { $set: { nickname: pseudo } });
    // console.log("l'user existe");
  } else {
    await mongodb.db().collection("users").insertOne({
      nickname: pseudo,
      email: email,
      tasks: {},
    });
    // console.log("l'user n'existe pas");
  }
  res.end();
}
