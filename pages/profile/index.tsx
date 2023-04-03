import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, Nav, Button, Container, ListGroup } from "react-bootstrap";
import { Layout } from "../../components/layout";
import { getDatabase } from "../../src/database";
import { v4 as uuidv4 } from "uuid";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const email = session?.user.email;
  const mongodb = await getDatabase();

  const isUser = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const userDb = JSON.parse(JSON.stringify(isUser));

  const tasks = userDb?.tasks;

  return {
    props: {
      nickname: userDb.nickname,
      tasks: tasks,
    },
  };
};

const Profile: React.FC<{
  nickname: string;
  tasks: [];
}> = ({ nickname, tasks }) => {
  const tasksLength = Object.keys(tasks).length;
  let isTasks = true;
  if (tasksLength <= 0) isTasks = false;
  return (
    <>
      <Layout>
        <Container style={{ marginTop: "2em" }}>
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
        </Container>
        {isTasks ? (
          <>
            <h4 className="container">Your tasks :</h4>
            <Container>
              <ListGroup>
                {tasks.map((element) => {
                  return (
                    <ListGroup.Item key={uuidv4()}>
                      {"Task: "}
                      {element?.title} {"| description: "}
                      {element?.content}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Container>
          </>
        ) : (
          <Container>
            <h4>You have no tasks</h4>
            <Button href="/create-task">Create a task</Button>
          </Container>
        )}
        <br />
      </Layout>
    </>
  );
};

export default Profile;
