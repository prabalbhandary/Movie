import Loading from "@/components/Loading";
import Movie from "@/components/Movie";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Addmovie() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <>
      <div className="addmoviepage container">
        <div className="movieadd">
          <div className="titledashboard w-100 flex flex-sb">
            <div>
              <h2>Add Movie</h2>
              <h3>ADMIN PANEL</h3>
            </div>
          </div>
          <Movie />
        </div>
      </div>
    </>
  );
}
