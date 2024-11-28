import Loading from "@/components/Loading";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FcRating } from "react-icons/fc";

export default function movies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const { alldata, loading } = useFetchData(`/api/getmovies`);
  const allMovie = alldata.length;
  const filteredMovies =
    searchQuery.trim() === ""
      ? alldata
      : alldata.filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const indexOfFirstMovie = (currentPage - 1) * perPage;
  const indexOfLastMovie = currentPage * perPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );
  const publishedMovies = currentMovies.filter((ab) => ab.status === "publish");
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allMovie / perPage); i++) {
    pageNumbers.push(i);
  }
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
        <div className="container">
          <div className="moviecards flex flex-col flex-left gap-2 w-100">
            <div className="flex flex-sb w-100 movietitle">
              <h2>List of Published Movies</h2>
              <Link href="/addmovie">
                <button>Add Movie</button>
              </Link>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              <>
                {publishedMovies.map((movie) => {
                  return (
                    <div key={movie._id} className="moviecard">
                      <img
                        src={movie.bgposter || "/img/noimage.jpg"}
                        alt="Movie Poster"
                      />
                      <div className="moviecardinfo">
                        <div>
                          <h3>{movie.slug}</h3>
                          <p>{movie.category}</p>
                        </div>
                        <Link
                          href={`${movie.downloadlink["480p"]}`}
                          target="_blank"
                        >
                          {movie.downloadlink["480p"]}
                        </Link>
                        <div>
                          <FcRating /> {movie.rating}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Link href={`/movies/edit/${movie._id}`}>
                            <button>Update Movie</button>
                          </Link>
                          <Link href={`/movies/delete/${movie._id}`}>
                            <button>Delete Movie</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {publishedMovies.length === 0 ? (
              ""
            ) : (
              <div className="blogpagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                {pageNumbers
                  .slice(
                    Math.max(currentPage - 2, 1) - 1,
                    Math.min(currentPage + 2, pageNumbers.length)
                  )
                  .map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`${currentPage === number ? "active" : ""}`}
                    >
                      {number}
                    </button>
                  ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentMovies.length < perPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
