import Loading from "@/components/Loading";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidMoviePlay } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbCategoryPlus } from "react-icons/tb";
import { RiDraftLine, RiMovie2Line } from "react-icons/ri";
import Spinner from "@/components/Spinner";
import { FcRating } from "react-icons/fc";
import { useSession } from "next-auth/react";

export default function Home() { 
  const { alldata, loading } = useFetchData("/api/getmovies");
  const publishedMovies = alldata.filter((ab) => ab.status === "publish");
  const draftMovies = alldata.filter((ab) => ab.status === "draft");

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
          <title>Movie App | Backend</title>
          <meta name="description" content="Movie website backend" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {loading ? (
          <Loading />
        ) : (
          <div className="container">
            <div className="topheadertitle flex flex-sb">
              <div>
                <h1 className="mb-1">Explore all types of movies here</h1>
                <p className="mb-2 w-66">
                  You can see all types of shows i.e. Movie, Series & TV_Shows
                  here. Feel free to download it and watch online here.
                </p>
                <Link href="/">
                  <button>
                    Exclusive on <span>Makmovies</span>
                  </button>
                </Link>
              </div>
              <img src="/img/rocket.png" alt="Rocket" />
            </div>
            <div className="fourcards flex flex-sb">
              <div className="fcard">
                <div className="flex flex-sb">
                  <div className="fcardsvg">
                    <BiSolidMoviePlay />
                  </div>
                  <h3>Total Movies</h3>
                  <BsThreeDotsVertical />
                </div>
                <div className="flex flex-sb wh-100">
                  <img src="/img/chartone.svg" alt="Chart One" />
                  <h4>{publishedMovies.length}</h4>
                </div>
              </div>
              <div className="fcard">
                <div className="flex flex-sb">
                  <div className="fcardsvg">
                    <TbCategoryPlus />
                  </div>
                  <h3>Category</h3>
                  <BsThreeDotsVertical />
                </div>
                <div className="flex flex-sb wh-100">
                  <img src="/img/charttwo.svg" alt="Chart Two" />
                  <h4>7</h4>
                </div>
              </div>
              <div className="fcard">
                <div className="flex flex-sb">
                  <div className="fcardsvg">
                    <RiMovie2Line />
                  </div>
                  <h3>All Genres</h3>
                  <BsThreeDotsVertical />
                </div>
                <div className="flex flex-sb wh-100">
                  <img src="/img/chartthree.svg" alt="Chart Three" />
                  <h4>11</h4>
                </div>
              </div>
              <div className="fcard">
                <div className="flex flex-sb">
                  <div className="fcardsvg">
                    <RiDraftLine />
                  </div>
                  <h3>Draft Movies</h3>
                  <BsThreeDotsVertical />
                </div>
                <div className="flex flex-sb wh-100">
                  <img src="/img/chartfour.svg" alt="Chart Four" />
                  <h4>{draftMovies.length}</h4>
                </div>
              </div>
            </div>
            <div className="moviecards flex flex-col flex-left gap-2 w-100">
              <div className="flex flex-sb w-100 movietitle">
                <h2>List of Latest Movies</h2>
                <Link href="/addmovie">
                  <button>Add Movie</button>
                </Link>
              </div>
              {loading ? (
                <div>
                  <Spinner />
                </div>
              ) : (
                <>
                  {publishedMovies.slice(0, 3).map((movie) => {
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
              <Link
                href="/movies"
                className="loadmorehomebtn w-100 flex flex-center mt-2"
              >
                <button>Load More</button>
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }
}
