import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
    id:string;
    title:string
  }
  
  

const BorderCard = ({children, id, title}: Props) => {
  return (
    <motion.section
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false }}
    transition={{ duration: 0.8 }}
    variants={{
      visible: { opacity: 1 },
      hidden: { opacity: 0}
    }}
    >
      <div id={id} className="sm:w-full md:w-full lg:w-[80%] m-auto relative h-max rounded-2xl border-solid border-2 border-[#653499] bg-[#f5f5f5] p-8">
        <div className="absolute top-0 -right-[0.3rem] -z-10 w-[100%] h-[102%] rounded-[1rem] bg-[#653499]"></div>
        <div className="mx-auto text-center flex">
        <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                exit={{ opacity: 1 }}
                className="mx-auto mb-2 h-12 text-4xl title-font font-semibold text-center text-[#653499] " //bg-gradient-to-r from-[#653499]  via-[#cbb2e7] to-[#653499] text-transparent bg-clip-text inline-block
              >{title}</motion.h1>
        </div>
        <motion.hr
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="border-[#cbb2e7] border-2 w-40 mx-auto"
              />
        {children}
      </div>
      </motion.section>
  )
}

export default BorderCard