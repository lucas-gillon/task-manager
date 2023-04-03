import { getDatabase } from "@/src/database";
import { getSession } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";
import { userAgent } from "next/server";
import { useState } from "react";
import { Card, Nav, Button, Container, Form } from "react-bootstrap";
import { Layout } from "../../components/layout";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const email = session?.user.email;
  const mongodb = await getDatabase();

  const isUser = await mongodb
    .db()
    .collection("users")
    .findOne({ email: email });
  const userDb = JSON.parse(JSON.stringify(isUser));

  return {
    props: {
      nickname: userDb.nickname,
    },
  };
};

const CreateTasks: React.FC<{ nickname: string }> = ({ nickname }) => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const handleTitle = (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const handlePostContent = (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    setPost(e.target.value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const temp = {
      user: nickname,
      title: title,
      post: post,
    };
    // console.log("temp: ", temp);
    await fetch("/api/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    });
  };
  return (
    <>
      <Layout>
        <Container style={{ marginTop: "2em" }}>
          <h2>Create a post</h2>
          <br />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title of the post..."
                onChange={handleTitle}
              />
              <Form.Text className="text-muted">
                Make it as clear as possible
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content of the post</Form.Label>
              <Form.Control
                placeholder="content of the post..."
                as="textarea"
                rows={3}
                onChange={handlePostContent}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      </Layout>
    </>
  );
};

export default CreateTasks;
