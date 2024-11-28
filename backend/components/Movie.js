import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Movie({_id, title: existingTitle, slug: existingSlug, bgposter: existingBgposter, smposter: existingSmposter, titlecategory: existingTitlecategory, description: existingDescription, rating: existingRating, duration: existingDuration, year: existingYear, genre: existingGenre, language: existingLanguage, subtitle: existingSubtitle, size: existingSize, quality: existingQuality, youtubelink: existingYoutubelink, category: existingCategory, watchonline: existingWatchonline, downloadlink: existingDownloadlink, status: existingStatus}) {
  const [redirect, setRedirect] = useState(false);
  const router = useRouter();
  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [bgposter, setBgposter] = useState(existingBgposter || "");
  const [smposter, setSmposter] = useState(existingSmposter || "");
  const [titlecategory, setTitlecategory] = useState(existingTitlecategory || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [rating, setRating] = useState(existingRating || "");
  const [duration, setDuration] = useState(existingDuration || "");
  const [year, setYear] = useState(existingYear || "");
  const [genre, setGenre] = useState(existingGenre || []);
  const [language, setLanguage] = useState(existingLanguage || "");
  const [subtitle, setSubtitle] = useState(existingSubtitle || "");
  const [size, setSize] = useState(existingSize || "");
  const [quality, setQuality] = useState(existingQuality || "");
  const [youtubelink, setYoutubelink] = useState(existingYoutubelink || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [watchonline, setWatchonline] = useState(existingWatchonline || "");
  const [downloadlink, setDownloadlink] = useState(existingDownloadlink || {
    "480p": "",
    "720p": "",
    "1080p": "",
    "4k": "",
  });
  const [status, setStatus] = useState(existingStatus || "");
  const [showInputs, setShowInputs] = useState({
    "480p": false,
    "720p": false,
    "1080p": false,
    "4k": false,
  });

  const resolutions = ["480p", "720p", "1080p", "4k"];
  const titlecategories = ["Movies", "Series", "Shows"];
  const moviecategories = [
    "Bollywood",
    "Hollywood",
    "South",
    "Gujarati",
    "Marvel_Studio",
    "Tv_Shows",
    "Web_Series",
  ];
  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Bio_Graphy",
    "Comedy",
    "Drama",
    "Crime",
    "Fantasy",
    "Horror",
    "Romance",
    "Study",
    "Thriller",
    "Science_Fiction",
    "War"
  ];

  const handleInputChange = (resolution, value) => {
    setDownloadlink((prevState) => ({
      ...prevState,
      [resolution]: value,
    }));
  };

  const toggleInputVisibility = (resolution) => {
    setShowInputs((prevstate) => ({
      ...prevstate,
      [resolution]: !prevstate[resolution],
    }));
  };

  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-");
    setSlug(newSlug);
  };

  async function createMovie(ev) {
    ev.preventDefault();
    const data = {
      title,
      slug,
      bgposter,
      smposter,
      titlecategory,
      description,
      rating,
      duration,
      year,
      genre,
      language,
      subtitle,
      size,
      quality,
      youtubelink,
      category,
      watchonline,
      downloadlink,
      status,
    };
    if (_id) {
      await axios.put("/api/getmovies", { ...data, _id });
    } else {
      await axios.post("/api/getmovies", data);
    }
    setRedirect(true);
  }

  useEffect(() => {
    if (redirect) {
      router.push("/");
    }
  }, [redirect, router]);

  return (
    <>
      <Head>
        <title>Add Movie page</title>
      </Head>
      <form onSubmit={createMovie} className="addmovieform">
        <div className="w-100 flex gap-3 mt-1">
          {bgposter ? (
            <div className="bgposter flex flex-col w-70 flex-left">
              <img src={bgposter} id="prv" alt="Background Poster Preview" />
              <label htmlFor="prv" className="w-100">
                Background Poster Preview
              </label>
            </div>
          ) : null}
          {smposter ? (
            <div className="smposter flex flex-col w-70 flex-left">
              <img src={smposter} id="prv" alt="Main Poster Preview" />
              <label htmlFor="prv" className="w-100">
                Main Poster Preview
              </label>
            </div>
          ) : null}
        </div>
        <div className="formdata w-100 flex flex-sb mt-3 flex-left">
          <div className="w-50 flex flex-col flex-left">
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="bgposter">Movie Background Poster Link</label>
              <input
                type="text"
                name="bgposter"
                id="bgposter"
                placeholder="Movie Background Poster Link"
                value={bgposter}
                onChange={(ev) => setBgposter(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Movie Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="description">Movie Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Movie Description"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="rating">Movie Rating</label>
              <input
                type="number"
                name="rating"
                id="rating"
                placeholder="Movie Rating"
                value={rating}
                onChange={(ev) => {
                  let newValue =
                    ev.target.value <= 10.0 ? ev.target.value : 10.0;
                  newValue = newValue >= 0 ? newValue : 0;
                  setRating(newValue);
                }}
                step="0.1"
                max="10.0"
                min="0"
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="duration">Movie Duration</label>
              <input
                type="text"
                name="duration"
                id="duration"
                placeholder="Movie Duration"
                value={duration}
                onChange={(ev) => setDuration(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="watchonline">Movie Watch Online Link</label>
              <input
                type="text"
                name="watchonline"
                id="watchonline"
                placeholder="Movie Watch Online Link"
                value={watchonline}
                onChange={(ev) => setWatchonline(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="downloadlink">Movie Download Link</label>
              <div className="flex gap-1">
                <div
                  className={
                    showInputs["480p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("480p")}
                >
                  {showInputs["480p"] ? "Hide 480p" : "Show 480p"}
                </div>
                <div
                  className={
                    showInputs["720p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("720p")}
                >
                  {showInputs["720p"] ? "Hide 720p" : "Show 720p"}
                </div>
                <div
                  className={
                    showInputs["1080p"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("1080p")}
                >
                  {showInputs["1080p"] ? "Hide 1080p" : "Show 1080p"}
                </div>
                <div
                  className={
                    showInputs["4k"] ? "dresolbtn active" : "dresolbtn"
                  }
                  onClick={() => toggleInputVisibility("4k")}
                >
                  {showInputs["4k"] ? "Hide 4k" : "Show 4k"}
                </div>
              </div>
              {resolutions ? (
                <>
                  {resolutions.map((resolution) => (
                    <div key={resolution} className="w-100">
                      {showInputs[resolution] && (
                        <>
                          <input
                            type="text"
                            id={`downloadlink${resolution}`}
                            placeholder={`${resolution} Download Link`}
                            value={downloadlink[resolution] || ""}
                            onChange={(ev) =>
                              handleInputChange(resolution, ev.target.value)
                            }
                          />
                        </>
                      )}
                    </div>
                  ))}
                </>
              ) : null}
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="status">Movie Status:</label>
              <div className="flex gap05">
                <input
                  type="radio"
                  name="status"
                  id="draft"
                  value="draft"
                  checked={status === "draft"}
                  onChange={(e) => setStatus(e.target.value)}
                />{" "}
                <label htmlFor="draft">Draft</label>
              </div>
              <div className="flex gap05">
                <input
                  type="radio"
                  name="status"
                  id="publish"
                  value="publish"
                  checked={status === "publish"}
                  onChange={(e) => setStatus(e.target.value)}
                />{" "}
                <label htmlFor="publish">Publish</label>
              </div>
            </div>
          </div>
          <div className="w-50 flex flex-col flex-left">
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="smposter">Movie Main Poster Link</label>
              <input
                type="text"
                name="smposter"
                id="smposter"
                placeholder="Movie Main Poster Link"
                value={smposter}
                onChange={(ev) => setSmposter(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="slug">Movie Slug (URL)</label>
              <input
                type="text"
                name="slug"
                id="slug"
                placeholder="Movie Slug (URL)"
                value={slug}
                onChange={handleSlugChange}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="year">Movie Release Year</label>
              <input
                type="text"
                name="year"
                id="year"
                placeholder="Movie Release Year"
                value={year}
                onChange={(ev) => setYear(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="youtubelink">Movie Youtube Link</label>
              <input
                type="text"
                name="youtubelink"
                id="youtubelink"
                placeholder="Movie Youtube Link"
                value={youtubelink}
                onChange={(ev) => setYoutubelink(ev.target.value)}
              />
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="language">Movie Language</label>
              <select
                name="language"
                id="language"
                value={language}
                onChange={(ev) => setLanguage(ev.target.value)}
              >
                <option value="">Select Movie Language</option>
                <option value="Hindi (ORG)">Hindi (ORG)</option>
                <option value="English">English</option>
                <option value="Hindi - English">Hindi - English</option>
                <option value="Dual Audio [Hindi (ORG) + English]">
                  Dual Audio [Hindi (ORG) + English]
                </option>
                <option value="Dual Audio [Hindi (Cleaned) + English]">
                  Dual Audio [Hindi (Cleaned) + English]
                </option>
              </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="quality">Movie Quality</label>
              <select
                name="quality"
                id="quality"
                value={quality}
                onChange={(ev) => setQuality(ev.target.value)}
              >
                <option value="">Select Movie Quality</option>
                <option value="480p || 720p || 1080p -WEB-DL">
                  480p || 720p || 1080p -WEB-DL
                </option>
                <option value="480p || 720p || 1080p || 2160p -WEB-DL">
                  480p || 720p || 1080p || 2160p -WEB-DL
                </option>
                <option value="480p || 720p || 1080p -HDTC">
                  480p || 720p || 1080p -HDTC
                </option>
              </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="subtitle">Movie Subtitle</label>
              <select
                name="subtitle"
                id="subtitle"
                value={subtitle}
                onChange={(ev) => setSubtitle(ev.target.value)}
              >
                <option value="">Select Movie Subtitle</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
              </select>
            </div>
            <div className="w-100 flex flex-col flex-left mb-2">
              <label htmlFor="size">Movie Size</label>
              <input
                type="text"
                name="size"
                id="size"
                placeholder="Movie Size (350MB || 1GB || 2GB || 4GB)"
                value={size}
                onChange={(ev) => setSize(ev.target.value)}
              />
            </div>
            <div className="moviecategory flex flex-sb flex-left">
              <div className="w-50 flex flex-col flex-left mb-2">
                <label>Title Category:</label>
                {titlecategories.map((cat) => (
                  <div key={cat} className="flex gap-05">
                    <input
                      type="radio"
                      id={cat.toLowerCase()}
                      name="titlecategory"
                      value={cat.toLowerCase()}
                      checked={titlecategory === cat.toLowerCase()}
                      onChange={(e) => setTitlecategory(e.target.value)}
                    />
                    <label htmlFor={cat.toLowerCase()}>{cat}</label>
                  </div>
                ))}
              </div>
              <div className="w-50 flex flex-col flex-left mb-2">
                <label>Movie Category:</label>
                {moviecategories.map((cat) => (
                  <div key={cat} className="flex gap-05">
                    <input
                      type="radio"
                      id={cat.toLowerCase()}
                      name="category"
                      value={cat.toLowerCase()}
                      checked={category === cat.toLowerCase()}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <label htmlFor={cat.toLowerCase()}>{cat}</label>
                  </div>
                ))}
              </div>
              <div className="w-50 flex flex-col flex-left mb-2">
                <label>Movie Genre:</label>
                {genres.map((genreOption) => (
                  <label key={genreOption} className="flex gap-05">
                    <input
                      type="checkbox"
                      value={genreOption.toLowerCase()}
                      checked={genre.includes(genreOption.toLowerCase())}
                      onChange={(e) => {
                        const selectedGenre = e.target.value;
                        setGenre((prevGenre) => {
                          if (prevGenre.includes(selectedGenre)) {
                            return prevGenre.filter(
                              (genre) => genre !== selectedGenre
                            );
                          } else {
                            return [...prevGenre, selectedGenre];
                          }
                        });
                      }}
                    />
                    {genreOption}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 mb-2">
          <button className="w-100 flex-center" type="submit">
            Save Data
          </button>
        </div>
      </form>
    </>
  );
}
