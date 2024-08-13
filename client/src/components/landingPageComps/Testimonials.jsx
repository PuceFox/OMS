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
        className="w-40 h-40 rounded-full mb-6 border-4 border-indigo-200"
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
      name: "Naufal Jundi",
      text: "We’ve cut down on errors and saved time thanks to Orderly. A must-have for any aviation business!",
      position: "CEO of SkyFac",
      image:
        "https://media.licdn.com/dms/image/D5603AQHh_2J2Dh-Ohg/profile-displayphoto-shrink_200_200/0/1712022490532?e=2147483647&v=beta&t=ovjY1ZXRy1m4D5aSVDXwXi8-dDP2x3phrV2nuE9lwps",
    },
    {
      name: "Rina Sismita",
      text: "Orderly has made our aviation order management process so much smoother. It's user-friendly and incredibly efficient!",
      position: "Public Figure",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQFN788jBJBBVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695823685697?e=2147483647&v=beta&t=_WcePaRrgxIUA8pDdO6lu0Ie9DGCJq8Z6kIFUoc7JRU",
    },
    {
      name: "Fatan Jundi",
      text: "Orderly’s seamless integration into our workflow has boosted our operational efficiency. Highly recommended!",
      position: "Senior Software Engineer",
      image:
        "https://media.licdn.com/dms/image/C4D03AQHAORhUStydqg/profile-displayphoto-shrink_200_200/0/1632191220479?e=2147483647&v=beta&t=YQc6UogjmsSRwBYTiFl5-zCbsLRKBOXJY4_On8638QM",
    },
    {
      name: "Farhan Amirullah",
      text: "Managing aviation orders has never been easier. Orderly is reliable, fast, and easy to use!",
      position: "Owner of Amirullah Corp",
      image:
        "https://media.licdn.com/dms/image/D5603AQFcfzUSiD4kuw/profile-displayphoto-shrink_200_200/0/1665424589330?e=2147483647&v=beta&t=w6HBwbp7bs1ePshv3nfxWCR-lGqPdY27hKwQxqhWFmU",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative bg-gray-100 overflow-hidden py-16 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 opacity-30"></div>

      <div className="relative container mx-auto text-center mt-16">
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

// import React from "react";
// import { motion } from "framer-motion";

// const TestimonialCard = ({ testimonial }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="bg-white shadow-2xl rounded-lg p-8 flex flex-col items-center text-center"
//       style={{ height: "auto", maxWidth: "350px" }}
//     >
//       <img
//         src={testimonial.image}
//         alt={testimonial.name}
//         className="w-28 h-28 rounded-full mb-6 border-4 border-indigo-200" // Increased size to 28
//       />
//       <h3 className="font-semibold text-xl mb-3">{testimonial.name}</h3>
//       <p className="text-gray-700 mb-5">{testimonial.text}</p>
//       <span className="text-gray-500 italic">{testimonial.position}</span>
//     </motion.div>
//   );
// };

// // Komponen untuk menampilkan daftar testimoni kalau ingin ditambahkan silahkan teman2// wordingnya belum sesuai
// const Testimonials = () => {
//   const testimonialsData = [
//     {
//       name: "Fatan Jundi",
//       text: "This platform has changed the way I learn! The courses are well-structured and informative.",
//       position: "Software Engineer",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       name: "Rina Sismita",
//       text: "I love the variety of courses available. The instructors are knowledgeable and supportive.",
//       position: "Famous DJ",
//       image:
//         "https://media.licdn.com/dms/image/v2/D5603AQFN788jBJBBVA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1695823685697?e=2147483647&v=beta&t=_WcePaRrgxIUA8pDdO6lu0Ie9DGCJq8Z6kIFUoc7JRU",
//     },
//     {
//       name: "Dylan Firmanto",
//       text: "A fantastic learning experience! I have gained so much knowledge in a short period.",
//       position: "Web Developer",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       name: "Farhan Amirullah",
//       text: "A fantastic learning experience! I have gained so much knowledge in a short period.",
//       position: "Web Developer",
//       image:
//         "https://media.licdn.com/dms/image/D5603AQFcfzUSiD4kuw/profile-displayphoto-shrink_200_200/0/1665424589330?e=2147483647&v=beta&t=w6HBwbp7bs1ePshv3nfxWCR-lGqPdY27hKwQxqhWFmU",
//     },
//   ];

//   return (
//     <section
//       id="testimonials"
//       className="relative bg-gray-100 overflow-hidden py-16 flex items-center justify-center"
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 opacity-30"></div>

//       <div className="relative container mx-auto text-center mt-16">
//         <h2
//           className="text-4xl md:text-5xl font-bold text-white leading-tight mb-12"
//           style={{
//             textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)",
//           }}
//         >
//           What Our Clients Say
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {testimonialsData.map((testimonial, index) => (
//             <TestimonialCard key={index} testimonial={testimonial} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;
