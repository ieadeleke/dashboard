import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    title: "What services does your logistics company offer?",
    description:
      "Our company provides a wide range of logistics services, including freight shipping, warehousing, inventory management, supply chain consulting, and more. Visit our services page for a complete list",
  },
  {
    title: "How can I track my shipment?",
    description:
      "You can track your shipment by entering your tracking number on our website. Our tracking system provides real-time updates on the status and location of your cargo",
  },
  {
    title: "What is the estimated delivery time for my shipment?",
    description:
      "Delivery times vary based on the shipping method and destination. You can get an estimate by entering your details on our website or by contacting our customer support team.",
  },
  {
    title:
      "How do you ensure the safety and security of my goods during transit?",
    description:
      "We take security very seriously and empkoy various measures, including advanced tracking systems, secure packaging, and experienced drivers, to ensure the safety of your cargo during transportation.",
  },
  {
    title:
      "What sets your logistics company apart from others in the industry?",
    description:
      "Our commitment to customer satisfaction, innovative technology, a global network of partners, and a proven track record of reliability and efficiency make us a trusted choice for logistics services.",
  },
];
export const FAQ = () => {
  return (
    <div id="faqs" className="flex flex-col items-center bg-[#F8F8F8] py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-lg text-center md:text-2xl">
          Frequently Asked Questions.
        </h1>

        <div className="w-full px-2 lg:w-[800px]">
          <Accordion type="single" collapsible className="flex flex-col gap-4">
            {faqs.map((item) => (
              <AccordionItem
                key={item.title}
                value={item.title}
                className="bg-white shadow p-4 rounded-lg"
              >
                <AccordionTrigger className="p-0 py-2">
                  <h1 className="text-black font-semibold text-sm">
                    {item.title}
                  </h1>
                </AccordionTrigger>
                <AccordionContent className="text-sm mt-4 text-gray-600">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
