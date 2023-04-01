import { useUser } from "@auth0/nextjs-auth0/client";
import { GetServerSideProps } from "next";
import router from "next/router";
import React from "react";
import { Layout } from "../../components/layout";

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//     return {
//         props: {
//         },
//     };
// };

const Form: React.FC<{}> = ({ }) => {
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
        }).then(() => router.push("/"));
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    return (
        <Layout>
            {user ? (
                <div className="container">
                    <form>
                        {/* Email: {email} */}
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">
                                Choisissez un pseudo :
                            </label>
                            <input type="text" placeholder="pseudo" onChange={handleChange} />
                            <button type="submit" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                ""
            )}
        </Layout>
    );
};

export default Form;