import Socials from "@/components/Socials";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Photo from "@/components/Photo";

function AboutPage() {
  return (
    <section className="h-full p-10 text-white">
      <div className=" container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between">
          <div className="text-center xl:text-left">
            <span className="text-xl">Software Developer</span>
            <h1 className="h2 mb-6">
              Hello I'm <br /> <span className="text-accent">Saurabh Jaiswar</span>
            </h1>
            <p className="max-w-[500pz] mb-9 text-white/80 ">
              Hey everyone! I'm Saurabh, currently navigating the world of
              BTech, my true passion lies in crafting sleek digital experiences.
              I've immersed myself in Software Development, Web Development, and
              Competitive Programming and I've honed my skills in frontend magic
              with HTML, CSS, JAVASCRIPT , Tailwind, React and Next.js. On the
              backend, I dance with Node js, Express js, Flask and MongoDB. With
              over 600+ DSA problems under my belt, solving complex problems is
              what keeps me going. Join me on this journey as I turn ideas into
              reality, one line of code at a time!
            </p>

            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a href="/assests/Saurabh_Resume.pdf" download>
                <Button
                  variant="outline"
                  size="lg"
                  className=" uppercase flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </Button>
              </a>
              <div className=" mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex  justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
