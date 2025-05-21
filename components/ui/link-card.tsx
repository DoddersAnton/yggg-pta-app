import { motion } from "framer-motion";
import Link from "next/link"
//import parse from "html-react-parser";
import Image from "next/image";
import { Button } from "./button";

interface Props {
  key: string;
  name: string;
  title: string;
  subTitle: string;
  img: string;

  content: string;
  list: string[];
  signOff: string;
  link: string;
  linkUrl: string;
  //ref: React.RefObject<HTMLDivElement>;
  index: number;
  orientation: string;
}

const InfoCard = ({
  key,
  title,
  subTitle,
  content,
  signOff,
  link,
  linkUrl,
  img,

  name,
  orientation,
}: Props) => (
  <motion.section
    //id={name}
    id={key}
    className="-scroll-mt-[100px]"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    transition={{ duration: 0.8 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0 },
    }}
  >
    <div className="sm:w-full md:w-full  m-auto relative h-max rounded-2xl border-solid border-2 border-[#653499] bg-[#f5f5f5] p-8">
      <div className="absolute top-0 -right-[0.3rem] -z-10 w-[100%] h-[102%] rounded-[1rem] bg-[#653499]"></div>
      <div className="text-left flex-col flex justify-between items-center md:flex-col lg:flex-row lg:w-4/5 mx-auto gap-3">
        {orientation === "textLeft" && (
          <>
            <motion.div
              id={`textHolder-${name}`}
              className="flex-grow sm:text-left text-center mt-6 sm:mt-0"
              viewport={{ once: false }}
              initial={{ opacity: 0, x: -50 }} // Set initial styles (note the x: 50 for fade-left)
              whileInView={{ opacity: 1, x: 0 }} // Set animation styles
              transition={{ ease: "easeInOut", delay: 0.2, duration: 0.5 }} // Set delay and duration
            >
              <div className="mx-auto text-center">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  exit={{ opacity: 1 }}
                  className="text-2xl h-12 text-center font-extrabold"
                >
                  {title}
                </motion.h1>
              </div>

              <div className="text-[#653499]">
                <p className="md:pb-2 text-sm pb-4 text-left">{content}</p>

                
                <Link href={linkUrl}>
                  <Button
                    variant="link"
                    className="text-[#653499] text-sm font-semibold underline"
                  >
                    {link}{" "}
                  </Button>{" "}
                </Link>
              </div>
            </motion.div>
            <motion.div
              id={`imgHolder-${name}"`}
              initial={{ opacity: 0, x: 50 }} // Set initial styles
              whileInView={{ opacity: 1, x: 0 }} // Set animation styles
              transition={{ ease: "easeInOut", delay: 0.2, duration: 0.5 }} // Set delay and duration of animation
              viewport={{ once: false }}
              className="w-32 h-32 lg:mr-10 md:h-32 md:w-32 lg:h-72 lg:w-72 inline-flex items-center justify-center rounded-lg text-purple-500 flex-shrink-0"
            >
              <div className="rounded-full bg-purple-50 p-2 w-full h-full shadow-lg">
                <Image
                  alt="mother and son at school gates"
                  src={img}
                  className="bg-transparent h-full rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
            </motion.div>
          </>
        )}

        {orientation === "textRight" && (
          <>
            <motion.div
              id={`imgHolder-${name}"`}
              initial={{ opacity: 0, x: -50 }} // Set initial styles
              whileInView={{ opacity: 1, x: 0 }} // Set animation styles
              transition={{ ease: "easeInOut", delay: 0.2, duration: 0.5 }} // Set delay and duration of animation
              viewport={{ once: false }}
              className="w-32 h-32 lg:mr-10 md:h-32 md:w-32 lg:h-72 lg:w-72 inline-flex items-center justify-center rounded-lg text-purple-500 flex-shrink-0 "
            >
              <Image
                alt="mother and son at school gates"
                src={img}
                className="bg-transparent h-full rounded-lg"
                width={300}
                height={300}
              />
            </motion.div>
            <motion.div
              id={`textHolder-${name}`}
              className="flex-grow sm:text-left text-center mt-6 sm:mt-0"
              viewport={{ once: false }}
              initial={{ opacity: 0, x: 50 }} // Set initial styles (note the x: 50 for fade-left)
              whileInView={{ opacity: 1, x: 0 }} // Set animation styles
              transition={{ ease: "easeInOut", delay: 0.2, duration: 0.5 }} // Set delay and duration
            >
              <div className="mx-auto text-center">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                  exit={{ opacity: 1 }}
                  className="text-2xl h-12 text-center font-extrabold"
                >
                  {title}
                </motion.h1>
              </div>
             

              <div className="text-[#653499]">
                <p className="md:pb-2 text-sm pb-4 text-left">{content}</p>
       
                
                  <Button
                    variant="outline"
                    className="text-[#653499] text-sm font-semibold rounded-lg!"
                  >
                    {"Learn More"}{" "}
                  </Button>{" "}
      
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  </motion.section>
);

export default InfoCard;
