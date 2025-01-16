"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import projects from "../../data/projects.json";
import experiences from "../../data/experience.json";
import resume from "../../data/resume.json";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Search() {
  const [isHover, setIsHover] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const project = searchParams.get("p");
  const [selectedSearch, setSelectedSearch] = useState(
    project === "ChatSpark"
      ? projects.find((proj) => proj.alias === "ChatSpark")
      : ""
  );
  const displayQuery = query ? query : "";
  const displayData =
    (displayQuery == "Saurabh-projects" && [...projects]?.reverse()) ||
    (displayQuery == "experience" && experiences) ||
    (displayQuery == "resume" && [...resume]?.reverse()) ||
    (displayQuery == "why-hire-saurabh");

  const [showMore, setShowMore] = useState(false);
  const [isOpen, setIsOpen] = useState(project === "ChatSpark" ? true : false);
  const languages = [
    "c",
    "C++",
    "Python",
    "JavaScript",
    "Typescript",
    "HTML",
    "CSS",
    "SQL",
    "Solidity",
  ];
  const technologies = [
    "React JS",
    "Nodejs",
    "Next JS",
    "Express JS",
    "Flask",
    "Tailwind CSS",
    "mongo DB",
    "Block Chain",
  ];

  useEffect(() => {
    if (project) {
      const params = new URLSearchParams(searchParams); // Clone the existing searchParams
      params.delete("p"); // Remove 'p' parameter

      (router.replace as unknown as (...args: any[]) => void)(
        `?${params.toString()}`,
        undefined,
        { shallow: true }
      );
    }
  }, [project, searchParams, router]);

  const handleSelect = (data: any) => {
    setIsOpen(true);
    setSelectedSearch(data);
  };

  const SearchItem = ({ data }: { data: any }) => {
    const [isImageAvailable, setIsImageAvailable] = useState(false);

    useEffect(() => {
      const imageUrl = `search-img/${data.alias}-icon.svg`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setIsImageAvailable(true); // Image exists
      img.onerror = () => setIsImageAvailable(false); // Image does not exist
    }, [data.alias]);

    return (
      <div
        className="font-ropaSans flex flex-row gap-x-2 mb-4"
        style={{ zIndex: 10 }}
      >
        <div className="w-4/5">
          <div className="flex flex-row items-center gap-x-4">
            <div className="bg-dark-purple-300 rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="bg-no-repeat bg-cover w-5 h-5"
                style={{ backgroundImage: `url(icons/key.svg)` }}
              />
            </div>
            <div className="font-light leading-tight">
              <h2>{data.title}</h2>
              <h2 className="opacity-75 text-sm">{data.timeline}</h2>
            </div>
          </div>
          <h2
            className="text-search-blue text-xl hover:underline cursor-pointer"
            onClick={() => handleSelect(data)}
          >
            {data.headline}
          </h2>
          <h2 className="text-white opacity-50">{data.searchDescription}</h2>
        </div>

        {isImageAvailable && (
          <div
            className="bg-no-repeat bg-cover w-24 h-24 rounded-md"
            style={{
              backgroundImage: `url(search-img/${data.alias}-icon.svg)`,
            }}
          />
        )}
      </div>
    );
  };

  const SearchItemOpen = ({ data }: any) => {
    return (
      <div>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-40 flex items-center justify-center">
          <div
            className={`p-2 flex flex-col items-center h-4/5 w-11/12 md:w-4/5 lg:w-3/5 bg-accent-color rounded-lg shadow-lg z-50 transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex row w-full justify-end mb-2">
              <div
                className="bg-no-repeat bg-cover w-6 h-6 cursor-pointer"
                style={{ backgroundImage: "url(icons/exit.svg)" }}
                onClick={() => setIsOpen(false)}
              />
            </div>

            {data.assests && (
              <div className="w-full h-2/5 md:h-3/5 rounded-lg">
                {data.assests && data.assests.endsWith(".mp4") ? (
                  <video
                    className="w-full h-full rounded-lg"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={data.assests} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={data.assests}
                    alt="Content"
                  />
                )}
              </div>
            )}

            <div className="flex flex-col w-full items-center justify-start h-3/5 p-4 gap-y-2 relative">
              <h2 className="w-full text-2xl">{data.title}</h2>
              <div className={`flex flex-row w-full gap-x-2`}>
                {displayQuery === "Saurabh-projects" &&
                  data.links.map((link: any, idx: any) => (
                    <Link
                      className={`flex flex-row py-1.5 px-3 text-sm font-medium text-center items-center gap-x-2 rounded  border border-stone-700 transform transition-all duration-300 ${
                        link.name == "github"
                          ? "bg-dark-purple-300 hover:bg-[#4D456E] border-dark-purple-300 flex-row-reverse"
                          : "bg-white text-dark-purple-100 hover:bg-stone-200 hover:text-dark-purple-300"
                      }`}
                      key={idx}
                      href={link.link}
                      target={"_blank"}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      <h2>{link.name}</h2>
                      <div
                        className={`bg-no-repeat bg-cover ${
                          link.name == "video" ? "w-6 h-6" : "w-4 h-4"
                        }`}
                        style={{
                          backgroundImage: `url(icons/${
                            isHover ? link.urlHover : link.url
                          })`,
                        }}
                      />
                    </Link>
                  ))}
              </div>

              <div
                className="relative w-full h-full overflow-y-scroll overflow-x-hidden text-wrap scroll-smooth"
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="font-thin">{data.longDescription}</div>
              </div>

              <div className="flex flex-row w-full gap-x-2">
                {data.type == "project" &&
                  data.tech.map((stack: any, idx: any) => (
                    <div
                      key={idx}
                      className="bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                    >
                      {stack}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-full text-white font-ropaSans">
      <div className="flex flex-col w-full relative ">
        <div className="borber-b border-[0.05rem] border-white border-opacity-10" />
        <div className="w-full flex flex-row gap-x-20 py-10">
          <div className="flex flex-col gap-y-4 px-4 md:w-1/2  lg:pl-48">
            {(displayQuery !== "why-hire-saurabh" &&
              Array.isArray(displayData) &&
              displayData?.map((data: any, idx: any) => (
                <div key={idx}>
                  <SearchItem data={data} />
                </div>
              ))) || (
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-row gap-x-2 items-center">
                  <div
                    className="bg-no-repeat bg-cover w-4 h-5"
                    style={{ backgroundImage: "url(icons/star.svg)" }}
                  />
                  <h2>AI Overview</h2>
                </div>

                <div
                  className={`flex flex-col gap-y-3 relative ${
                    showMore ? "h-auto" : "h-40 overflow-y-hidden"
                  }`}
                >
                  {!showMore && (
                    <>
                      <h2>
                        <span className="bg-[#735B95] py-1">
                          I transform environments.
                        </span>
                      </h2>
                      <h2 className="">
                        <span className="bg-[#735B95]  py-1">
                          seeking global opportunities to specialize in emerging
                          technologies and apply my skills in software, project
                          management, and design thinking
                        </span>
                      </h2>
                    </>
                  )}

                  <h2>
                    Ever since I learned how to program, my life’s purpose has
                    been to use my technical expertise to transform the
                    environments around me. My technical and project management
                    skills, combined with my design-thinking approach, have
                    enabled me to consistently exceed expectations and deliver
                    impactful results.
                  </h2>

                  <h2>
                    In every role, I’ve sought unique opportunities to rise
                    above challenges and push the boundaries of what’s possible.
                    At Arcurve, I pitched and developed a recruitment feature
                    with the potential to become a critical data-collection
                    asset. Currently, as the youngest developer at Symbiotic AI,
                    I’ve been deeply involved in achieving major product
                    milestones, including deploying our platform via AWS,
                    integrating EPIC API services, and designing interfaces for
                    cardiologists to enhance revascularization decisions.
                  </h2>

                  <h2>
                    My consulting efforts with companies like CIBC and Amazon
                    Alexa have led to product ideas being considered for
                    implementation, showcasing my skill in identifying
                    opportunities and delivering value.
                  </h2>

                  <h2>
                    While my technical experiences are vast, I deeply value
                    opportunities to broaden my exposure to the challenges and
                    perspectives of diverse communities worldwide. I am seeking
                    global opportunities to specialize in emerging technologies
                    and apply my skills in software, project management, and
                    design thinking to improve lives while broadening my
                    understanding of how people around the world navigate and
                    overcome challenges.
                  </h2>

                  {!showMore && (
                    <div className="bg-gradient-to-t from-dark-purple-300 via-dark-purple-200 to-transparent absolute -bottom-6 h-10 w-full" />
                  )}
                </div>

                {!showMore && (
                  <div className="flex flex-col justify-end bg-gradient-to-t from-dark-purple-300 to-transparent md:px-48  absolute left-0 w-full h-28 -bottom-8">
                    <div
                      onClick={() => setShowMore(!showMore)}
                      className="mt-3 py-3 border border-accent-color w-full rounded-full md:w-2/3 lg:w-2/5 bg-dark-purple-200 flex items-center justify-center hover:bg-[#322C48] gap-x-2 cursor-pointer"
                    >
                      <h2>Show More</h2>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M18 9L12 15L6 9" stroke="#C48DF6" />
                      </svg>
                    </div>

                    <div className=" borber-b border-[0.05rem] border-accent-text border-opacity-50 w-full mt-3" />
                  </div>
                )}
              </div>
            )}
          </div>

          {displayQuery !== "why-hire-saurabh" && (
            <div className="hidden w-1/3 p-2 h-[40rem] border-[0.05rem] border-white border-opacity-30 shadow-xl rounded-lg md:flex flex-col gap-y-3 ">
              {displayQuery === "resume" ? (
                <div className="w-full h-full rounded-t-lg overflow-hidden shadow-lg rpv-core__viewer--dark">
                  <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}
                  >
                    <Viewer
                      fileUrl="Saurabh_Resume.pdf"
                      plugins={[defaultLayoutPluginInstance]}
                    />
                  </Worker>
                </div>
              ) : (
                <img
                  src="states.svg"
                  alt="badal"
                  className="w-full h-[17rem] rounded-t-lg"
                />
              )}

              {displayQuery == "Saurabh-projects" && (
                <div className="flex flex-col gap-y-3">
                  <h2 className="opacity-70 text-lg">
                    I love building impact-driven, full-stack projects.{" "}
                  </h2>
                  <h2 className="opacity-70 text-lg">
                    Currently, I'm working on specializing my technical skills
                    in MERN stack, Next Js and BlockChain
                  </h2>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      languages
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {languages.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h2 className="uppercase tracking-wider text-sm">
                      Frameworks & Libraries
                    </h2>
                    <div className="flex flex-row flex-wrap gap-2">
                      {technologies.map((stack, idx) => (
                        <div
                          key={idx}
                          className="inline-flex bg-white bg-opacity-10 text-accent-text text-sm p-1 rounded"
                        >
                          {stack}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {isOpen && <SearchItemOpen data={selectedSearch} />}
      </div>

      {displayQuery == "why-hire-saurabh" && !showMore && (
        <div className="pl-10 md:pl-48 pt-16 flex flex-col gap-y-2">
          <h2 className="text-sm">
            Your search - <span className="font-bold">why hire saurabh</span> -
            did not match any documents
          </h2>
          <h2 className="text-sm">Suggestions:</h2>
          <ul className="list-disc pl-5 text-sm">
            <li>Don't search something preposterous</li>
            <li>Contact saurabh to learn more</li>
          </ul>
        </div>
      )}
    </div>
  );
}
