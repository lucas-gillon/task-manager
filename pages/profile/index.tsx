import { getSession } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, Nav, Button } from "react-bootstrap";
import { Layout } from "../../components/layout";
import { getDatabase } from "../../src/database";
import styles from "../styles/Home.module.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { v4 as uuidv4 } from "uuid";
import router from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const email = session?.user.email;
  const mongodb = await getDatabase();

  const response = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const userDb = JSON.parse(JSON.stringify(response));

  return {
    props: {
      _id: userDb._id,
      nickname: userDb.nickname,
      email: userDb.email,
    },
  };
};

const Profile: React.FC<{
  nickname: string;
}> = ({ nickname }) => {
  return (
    <>
      <Layout>
        <div className="container" style={{ marginTop: "2em" }}>
          <h2>
            Hi {nickname}!&nbsp;&nbsp;&nbsp;
            <Link href="/form" passHref>
              <Image
                className="edit-pseudo"
                src="/images/pencil-icon.png"
                alt="change nickname"
                width="20"
                height="20"
              />
            </Link>
          </h2>
        </div>
        <br />
      </Layout>
    </>
  );
};

export default Profile;
