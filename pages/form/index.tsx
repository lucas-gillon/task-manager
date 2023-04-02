import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import { Layout } from "../../components/layout";
import { getSession } from "@auth0/nextjs-auth0";
import { getDatabase } from "@/src/database";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res);
  const mongodb = await getDatabase();
  const user = session?.user;

  const response = await mongodb
    .db()
    .collection("users")
    .findOne({ email: user?.email });
  const userInfos = JSON.parse(JSON.stringify(response));
  let nickname = userInfos?.nickname;
  if ([null, undefined].includes(nickname)) nickname = "";

  return {
    props: {
      nickname: nickname,
    },
  };
};

const Form: React.FC<{ nickname: string }> = ({ nickname }) => {
  const [input, setInput] = React.useState();
  const { user, error, isLoading } = useUser();

  const handleChange = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (e: { preventDefault: () => void; target: any }) => {
    e.preventDefault();
    const temp = {
      pseudo: input,
      email: user?.email,
    };
    fetch("/api/update-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(temp),
    }).then(() => router.push("/profile"));
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <Layout>
      {user ? (
        <div className="container">
          <p>
            Your nickname:{" "}
            {nickname === "" || nickname === null || nickname === undefined
              ? "you don't have a nickname"
              : nickname}
          </p>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                choose nickname:
              </label>
              <input
                className="nicknameInput"
                type="text"
                placeholder="pseudo"
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <p>please connect</p>
      )}
    </Layout>
  );
};

export default Form;
