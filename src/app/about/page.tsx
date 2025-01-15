import Link from "next/link";
import AboutPage from "@/components/About_page";
export default function About() {
  return (
    <div className=" flex flex-col w-full md:flex-row h-full items-center gap-x-10 gap-y-10 justify-center pb-10 md:pb-0 mb-10">
      <div className="flex md:flex-col-reverse items-center justify-start">
        <div
          className="bg-no-repeat bg-cover w-32 h-32 md:w-48 md:h-48 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border-4 border-white"
          style={{
            backgroundImage: `url("bg-photo.jpg")`,
            backgroundPosition: "center",
          }}
        />
      </div>
      <div className="flex flex-col w-4/5 md:w-2/5 lg:w-1/3 gap-y-4">
        <AboutPage />

        <Link
          href="/search?q=Saurabh-projects"
          className="border border-[#DED7FC] flex flex-row w-full items-center justify-center rounded-md p-4 hover:bg-[#DED7FC] hover:text-dark-purple-100 transform transition-all duration-300 font-ropaSans font-bold text-md text-white"
        >
          discover my projects
        </Link>
      </div>
    </div>
  );
}
