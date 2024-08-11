import React from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-white shadow-2xl rounded-lg p-8 flex flex-col items-center text-center"
      style={{ height: "auto", maxWidth: "350px" }}
    >
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-20 h-20 rounded-full mb-6 border-4 border-indigo-200"
      />
      <h3 className="font-semibold text-xl mb-3">{testimonial.name}</h3>
      <p className="text-gray-700 mb-5">{testimonial.text}</p>
      <span className="text-gray-500 italic">{testimonial.position}</span>
    </motion.div>
  );
};

// Komponen untuk menampilkan daftar testimoni kalau ingin ditambahkan silahkan teman2// wordingnya belum sesuai
const Testimonials = () => {
  const testimonialsData = [
    {
      name: "Fatan Cabs",
      text: "This platform has changed the way I learn! The courses are well-structured and informative.",
      position: "Software Engineer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Rina Cuantiks",
      text: "I love the variety of courses available. The instructors are knowledgeable and supportive.",
      position: "Product Manager",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Dylan Mamen",
      text: "A fantastic learning experience! I have gained so much knowledge in a short period.",
      position: "Web Developer",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Farhan Figs",
      text: "A fantastic learning experience! I have gained so much knowledge in a short period.",
      position: "Web Developer",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-gray-100 overflow-hidden py-16 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 opacity-30"></div>

      <div className="relative container mx-auto text-center">
        <h2
          className="text-4xl md:text-5xl font-bold text-white leading-tight mb-12"
          style={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
          }}
        >
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
