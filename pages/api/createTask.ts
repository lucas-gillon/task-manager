import { NextApiRequest, NextApiResponse } from "next";
import { getDatabase } from "@/src/database";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req.body);
  const user = req.body.user;
  const title = req.body.title;
  const post = req.body.post;

  const mongodb = await getDatabase();
  const response = await mongodb
    .db()
    .collection("users")
    .findOne({ nickname: user });
  //   console.log("response-----------------\n", response);
  const finalPost = {
    title: title,
    content: post,
  };
  console.log(...response?.tasks, finalPost);
  const createPost = await mongodb
    .db()
    .collection("users")
    .updateOne(
      { nickname: user },
      { $set: { tasks: [...response?.tasks, finalPost] } }
    );
};

export default handler;
