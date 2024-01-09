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
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, soluta! Suscipit eaque perferendis quo, aut accusamus consequuntur totam vero rem voluptates error nulla saepe dolores esse vel molestias atque nam?",
  },
  {
    title: "What is the estimated delivery time for my shipment?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, soluta! Suscipit eaque perferendis quo, aut accusamus consequuntur totam vero rem voluptates error nulla saepe dolores esse vel molestias atque nam?",
  },
  {
    title:
      "How do you ensure the safety and security of my goods during transit?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, soluta! Suscipit eaque perferendis quo, aut accusamus consequuntur totam vero rem voluptates error nulla saepe dolores esse vel molestias atque nam?",
  },
  {
    title:
      "What sets your logistics company apart from others in the industry?",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, soluta! Suscipit eaque perferendis quo, aut accusamus consequuntur totam vero rem voluptates error nulla saepe dolores esse vel molestias atque nam?",
  },
];
export const FAQ = () => {
  return (
    <div className="flex flex-col items-center bg-[#F8F8F8] py-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl text-center">
          Frequently Asked Questions.
        </h1>

        <div className="w-[800px]">
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-4"
          >
            {faqs.map((item) => (
              <AccordionItem key={item.title} value={item.title} className="bg-white shadow p-4 rounded-lg">
                <AccordionTrigger className="p-0 py-2">
                  <h1 className="text-black font-bold">{item.title}</h1>
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
