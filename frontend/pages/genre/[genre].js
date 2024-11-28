import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaEye, FaHeart, FaStar } from "react-icons/fa";

export default function genres() {
  const router = useRouter();
  const { genre } = router.query;
  const { alldata, loading } = useFetchData(`/api/getmovies?genre=${genre}`);
  const filteredMovies = alldata
    .filter((ab) => ab.genre === ab.genre)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 20);
  const genremovies = [...filteredMovies].reverse();
  const capitalizeTitle = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const pagetitle = `${genre} Genre | MakMovies`;
  const capitalizedTitle = capitalizeTitle(pagetitle);

  return (
    <>
      <Head>
        <title>{capitalizedTitle}</title>
      </Head>
      <section className="genrenamesec">
        <div className="genrename">
          <h1>Genre: {genre}</h1>
          <p>
            Explosive stunts, action-packed adventures, and heart-pounding
            suspense await you on the big screen. Experience the thrill of real
            action and excitement like never before.
          </p>
        </div>
      </section>
      <section className="genremoviesec">
        <div className="genremovie">
          <section className="genremoviesec">
            <div className="genremovie">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {genremovies.length === 0 ? (
                    <p className="nodatafound">No Movies Found</p>
                  ) : (
                    <>
                      {genremovies.map((movie) => {
                        return (
                          <div key={movie._id} className="mcard">
                            <Link href={`/movies/${movie.slug}`}>
                              <div className="cardimg">
                                <img
                                  src={movie.smposter}
                                  alt="movie poster"
                                  loading="lazy"
                                />
                              </div>
                              <div className="contents">
                                <h5>{movie.title}</h5>
                                <h6>
                                  <span>{movie.year}</span>
                                  <div className="rate">
                                    <i className="cardfas">
                                      <FaHeart />
                                    </i>
                                    <i className="cardfas">
                                      <FaEye />
                                    </i>
                                    <i className="cardfas">
                                      <FaStar />
                                    </i>
                                    <h6>{movie.rating}</h6>
                                  </div>
                                </h6>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
