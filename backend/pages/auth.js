import Loading from "@/components/Loading";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Auth() {
    const { data: session, status } = useSession();
    const router = useRouter();
    if (status === "loading") {
      return <Loading />;
    }
    if(session){
        router.push("/");
        return;
    }
    return <>
        <Head>
            <title>Movie App | Backend</title>
        </Head>
        <div className="container">
            <div className="loginfront flex flex-center">
                <div className="loginbox flex flex-col">
                    <Image src="/img/coder.png" alt="Coder" width={250} height={250} />
                    <h1>Welcome Admin of the Makmovies</h1>
                    <p>Visit Our Website: <a href="https://prabalbhandary.github.io/animated_portfolio/" target="_blank">PRABAL BHANDARY</a></p>
                    {
                    session ? (
                      <button className="mt-2" onClick={signOut}>Log Out Here</button>
                    ) : (
                      <button className="mt-2" onClick={signIn}>Log In With Google</button>
                    )
                  }
                </div>
            </div>
        </div>
    </>
}