"use client";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Francene Mitial",
    text: `Everything was beautifully done and the enrollment process ended well. Formidable experience, it was a very nice exchange between the agent and I to achieve this, this help was so needed; I must say necessary. Anyway, we're waiting for the follow‑up so I can have the chance to go see the doctor. Thank you very much for sharing the information with me. Hats off!`,
  },
  {
    name: "Christele Saint Jean",
    text: `I’m thrilled I chose H4H to assist with my health insurance process. It was a joy to see how warmly the team welcomed and guided me. Everything was resolved quickly, and I especially value that even if you only speak Creole, they understand and guide you throughout. They never left me alone, always checking to ensure everything goes smoothly, confirming I received my card, and explained every detail I didn’t understand. I have no complaints, only gratitude for the amazing initiative to help every Haitian in our community access these services fully. More people should know about this exceptional service. Thank you, H4H team, for supporting our community!`,
  },
  {
    name: "Jean Robert",
    text: `Great service from start to finish. The team was attentive and made sure I understood every part of the process. I really appreciate how easy they made everything for me.`,
  },
  {
    name: "Marie Louise",
    text: `I'm very happy with the help I received. They were patient, explained everything clearly, and followed up with me after. I would recommend them to anyone looking for support with health insurance.`,
  },
];

const TestimonialTexts = () => {
  return (
    <div className="px-4 md:px-20 mt-10 mb-16">
      <h2 className="text-3xl font-semibold text-center mb-10">What Our Clients Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {testimonial.text}
            </p>
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialTexts;
