import WelcomeAnimation from "@/components/WelcomeAnimation";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Loader from "@/components/Loader";
import Link from "next/link";
import {
  FaAngleDoubleUp,
  FaArrowRight,
  FaCheck,
  FaDownload,
  FaEye,
  FaFilm,
  FaHeart,
  FaPhotoVideo,
  FaPlus,
  FaStar,
} from "react-icons/fa";
import { FaClapperboard } from "react-icons/fa6";

export default function Home() {
  const { alldata, loading } = useFetchData("/api/getmovies");
  const [wloading, setWloading] = useState(true);
  useEffect(() => {
    const visitedBefore = sessionStorage.getItem("visitedhome");
    if (visitedBefore) {
      setWloading(false);
    } else {
      setTimeout(() => {
        setWloading(false);
        sessionStorage.setItem("visitedhome", "false");
      }, 3000);
    }
  }, []);
  const publishedData = alldata.filter((ab) => ab.status === "publish");
  const [selectedGenre, setSelectedGenre] = useState("all movies");
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
  };
  const genres = [
    "all movies",
    "action",
    "adventure",
    "animation",
    "bio_graphy",
    "comedy",
    "drama",
    "crime",
    "fantasy",
    "horror",
    "romance",
    "study",
    "thriller",
    "science_fiction",
    "war",
  ];
  const categories = [
    "bollywood",
    "hollywood",
    "south",
    "gujarati",
    "marvel_studio",
    "tv_shows",
    "web_series",
  ];
  const filteredData = publishedData.filter((movie) => {
    if (selectedGenre === "all movies") return true;
    if (categories.includes(selectedGenre)) {
      return movie.category === selectedGenre;
    } else {
      return movie.genre.includes(selectedGenre);
    }
  });

  return (
    <>
      <Head>
        <title>Movie App | Frontend</title>
        <meta name="description" content="Next Js Movie App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {wloading ? (
          <WelcomeAnimation />
        ) : (
          <div>
            <div className="swiper_top_main">
              <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                direction="horizontal"
                loop={true}
                speed={1200}
                watchSlidesProgress={true}
                parallax={true}
                pagination={{ clickable: true }}
                modules={[Pagination, Navigation, Autoplay]}
                scrollbar={{ draggable: true }}
              >
                {loading ? (
                  <div className="slideimagebx flex flex-center">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {publishedData.slice(0, 4).map((movie) => {
                      return (
                        <SwiperSlide key={movie.id}>
                          <div className="slideimagebx">
                            <img
                              src={movie.bgposter}
                              alt="movie poster"
                              loading="lazy"
                            />
                            <div className="content" key={movie._id}>
                              <div className="contentflex">
                                <div className="smalimg">
                                  <img
                                    src={movie.smposter}
                                    alt="movie poster"
                                    loading="lazy"
                                  />
                                </div>
                                <div className="movieconte">
                                  <h1 id="header_title">{movie.title}</h1>
                                  <h6>
                                    Duration:{" "}
                                    <span id="header_dur">
                                      {movie.duration}
                                    </span>
                                  </h6>
                                  <h3 id="header_gen">
                                    <span className="star">&#9733;</span>
                                    {movie.rating}
                                    <span>
                                      {movie.genre.join(", ").toUpperCase()}
                                    </span>
                                  </h3>
                                  <div className="btns">
                                    <Link href={`/movies/${movie.slug}`}>
                                      <button className="btn_download">
                                        <FaDownload className="faDownload" />
                                        DOWNLOAD <span>FREE</span>
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </>
                )}
                <div className="swiper-pagination"></div>
                <div className="swiper-scrollbar"></div>
              </Swiper>
            </div>
            <div className="tranding_bx">
              <li>
                <Link href="/all" className="active">
                  <i>
                    <FaAngleDoubleUp className="fas" />
                  </i>
                  Latest
                </Link>
              </li>
              <li>
                <Link href="/movies">
                  <i>
                    <FaFilm className="fas" />
                  </i>
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series">
                  <i>
                    <FaStar className="fas" />
                  </i>
                  Series
                </Link>
              </li>
              <li>
                <Link href="/all">
                  <i>
                    <FaPlus className="fas" />
                  </i>
                  Recently Added
                </Link>
              </li>
            </div>
            <div className="scrollcardssec">
              <Swiper
                slidesPerView={8}
                spaceBetween={10}
                className="mySwiper"
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                direction="horizontal"
                loop={true}
                speed={1200}
                watchSlidesProgress={true}
                parallax={true}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  1587: {
                    slidesPerView: 8,
                    spaceBetween: 10,
                  },
                  1500: {
                    slidesPerView: 7,
                    spaceBetween: 10,
                  },
                  1200: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                  1040: {
                    slidesPerView: 5,
                    spaceBetween: 10,
                  },
                  992: {
                    slidesPerView: 6,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  650: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                  400: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  370: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  350: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
              >
                <div className="scrollcards">
                  {loading ? (
                    <div className="scrollcardssec flex flex-center h-15vh">
                      <Loader />
                    </div>
                  ) : (
                    <>
                      {publishedData.map((movie) => {
                        return (
                          <SwiperSlide key={movie.id}>
                            <div className="card">
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
                          </SwiperSlide>
                        );
                      })}
                    </>
                  )}
                </div>
              </Swiper>
            </div>
            <div className="tranding_bx" style={{ marginTop: "40px" }}>
              <li>
                <Link href="/movies">
                  <i>
                    <FaPhotoVideo className="fas" />
                  </i>
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series">
                  <i>
                    <FaFilm className="fas" />
                  </i>
                  Series
                </Link>
              </li>
              <li>
                <Link href="/series">
                  <i>
                    <FaCheck className="fas" />
                  </i>
                  Original Series
                </Link>
              </li>
              <li>
                <Link href="/genre">
                  <i>
                    <FaClapperboard className="fas" />
                  </i>
                  Genre
                </Link>
              </li>
            </div>
            <div className="moviestegs">
              {genres.slice(0, 16).map((genre) => (
                <button
                  key={genre}
                  className={selectedGenre === genre ? "active" : ""}
                  onClick={() => handleGenreClick(genre)}
                >
                  {genre}
                </button>
              ))}
              {categories.map((category) => (
                <button
                  key={category}
                  className={selectedGenre === category ? "active" : ""}
                  onClick={() => handleGenreClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="moviescontainer">
              {loading ? (
                <div className="scrollcardssec flex flex-center h-15vh">
                  <Loader />
                </div>
              ) : (
                <>
                  {filteredData.length === 0 ? (
                    <p className="nodatafound">No Movies Found</p>
                  ) : (
                    <>
                      {filteredData.map((movie) => (
                        <div className="card" key={movie.id}>
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
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
            <div className="nextpagelink">
              <Link href="/all">
                <button className="cssbuttons_io_button">
                  Next Page
                  <div className="icon">
                    <FaArrowRight className="fas" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
