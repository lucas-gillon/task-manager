import Link from "next/link";
import Head from "next/head";
import { ReactNode } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Navbar } from "react-bootstrap";

export const Layout: React.FC<{ children: any }> = ({
    children,
}: {
    children: ReactNode;
}) => {
    const { user } = useUser();
    return (
        <div>
            <nav style={{ backgroundColor: "#873e23" }}>
                <header>
                    <div className="container">
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                            <Link href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                                task manager
                            </Link>
                            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"></ul>
                            <Navbar.Text style={{ marginRight: "2em", color: "black" }}>
                                {user ? `Connected as ${user.name}` : "Not logged in"}
                            </Navbar.Text>
                            <div className="text-end">
                                {user ? (
                                    <Link href="/api/auth/logout">
                                        <button className="navButton">
                                            Logout
                                        </button>
                                    </Link>
                                ) : (
                                    <Link href="/api/auth/login" >
                                        <button className="navButton">
                                            Login or Signup
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            </nav>
            {children}
            <hr />
            <footer>
                <p>work in progress</p>
            </footer>
        </div>
    );
};