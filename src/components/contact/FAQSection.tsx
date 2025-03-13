
interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "How can I make a donation?",
    answer: "You can donate online through our secure payment system, send a check by mail, or contact us to discuss other options like wire transfers or stock donations."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "Yes, Brighter Futures Fund is a registered 501(c)(3) nonprofit organization, and all donations are tax-deductible to the extent allowed by law."
  },
  {
    question: "How can I volunteer with Brighter Futures?",
    answer: "We have various volunteer opportunities both locally and internationally. Please contact our volunteer coordinator at volunteer@brighterfutures.org for current opportunities."
  },
  {
    question: "Can I sponsor a specific child or project?",
    answer: "Yes, we offer sponsorship programs where you can support specific children or projects. Contact us for more details on our sponsorship options."
  },
  {
    question: "What percentage of my donation goes directly to programs?",
    answer: "We're proud that 85% of all donations go directly to our programs supporting children and communities. The remaining 15% covers essential administrative and fundraising costs."
  },
  {
    question: "How can my company partner with Brighter Futures?",
    answer: "We offer various corporate partnership opportunities, from employee giving programs to cause marketing campaigns. Please contact our partnerships team to discuss options."
  }
];

const FAQSection = () => {
  return (
    <div className="mb-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
