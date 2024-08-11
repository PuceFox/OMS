import React from "react";
import { RiComputerLine } from "react-icons/ri";
import { TbWorldWww } from "react-icons/tb";
import { IoMdHappy } from "react-icons/io";
import { BiSupport } from "react-icons/bi";
import { motion } from "framer-motion";

const ServicesData = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Software Development",
    link: "#",
    icon: <RiComputerLine />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Satisfied Clients",
    link: "#",
    icon: <IoMdHappy />,
    delay: 0.4,
  },
  {
    id: 4,
    title: "24/7 Support",
    link: "#",
    icon: <BiSupport />,
    delay: 0.5,
  },
];

// Animation for sliding from left
const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-indigo-200 overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-500 to-blue-100 opacity-30"></div>

      <div className="relative container mx-auto pb-14 pt-16 px-4 md:px-8">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 leading-tight border-b-4 border-white pb-2"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Discover Our <br /> Exceptional Services
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative bg-[#f4f4f4] rounded-full flex flex-col items-center justify-center p-10 hover:bg-blue-200 hover:shadow-2xl hover:scale-105 duration-300"
              style={{ height: "250px", width: "250px" }}
            >
              <div className="relative z-10 text-6xl text-purple-600 mb-4">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {service.title}
              </h2>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 opacity-30 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
