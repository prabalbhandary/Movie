import Loading from "@/components/Loading";
import { useSession, signOut, signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { MdOutlineAccountCircle } from "react-icons/md";

export default function profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loading />;
  }
  if (!session) {
    router.push("/auth");
    return null;
  }

  if (session) {
    return (
      <>
        <Head>
          <title>Profile page</title>
        </Head>
        <div className="container">
          <div className="profilesettings">
            <div className="leftprofile_details flex">
              <img src="/img/coder.png" alt="" />
              <div className="w-100">
                <div className="flex flex-sb flex-left mt-2">
                  <h2>My Profile</h2>
                  <h3>
                    Prabal Bhandary <br /> Web Developer
                  </h3>
                </div>
                <div className="flex flex-sb mt-2">
                  <h3>Phone:</h3>
                  <input type="text" defaultValue="+977 9865475613" />
                </div>
                <div className="mt-3">
                  <input
                    tupe="email"
                    defaultValue="prabalbhandary97@gmail.com"
                  />
                </div>
                <div className="flex flex-center w-100 mt-2">
                  <button>Save</button>
                </div>
              </div>
            </div>
            <div className="rightlogoutsec">
              <div className="topaccoutnbox">
                <h2 className="flex flex-sb">
                  MyAccount
                  <MdOutlineAccountCircle />
                </h2>
                <hr />
                <div className="flex flex-sb mt-2">
                  <h3>
                    Active Account <br /> <span></span>
                  </h3>
                  {
                    session ? (
                      <button onClick={signOut}>Log Out Here</button>
                    ) : (
                      <button onClick={signIn}>Log In With Google</button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
