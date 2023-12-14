import DashboardLayout from "@/components/layout/dashboard";
import { AddOperatorsModal, AddOperatorsModalRef } from "@/components/dashboard/operators/AddOperatorsModal";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/router";
import { Captains } from "@/components/dashboard/operators/tabs/Captains";
import { DeckHands } from "@/components/dashboard/operators/tabs/DeckHands";


const tabs = [
  {
    name: "Captains",
    value: "captains"
  },
  {
    name: "DeckHands",
    value: "deckhands"
  },
  {
    name: "Vessel Owners",
    value: "vesselOwners"
  }
]


export default function Operators() {
  const addOperatorsRef = useRef<AddOperatorsModalRef>(null)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>()
  const [size, setSize] = useState(0)

  useEffect(() => {
    const tab = router.query.tab as string | undefined
    if (!tab) {
      setActiveTab(`captains`)
    } else setActiveTab(tab)
  }, [router.query])

  function addOperator() {
    addOperatorsRef.current?.open()
  }


  function onTabValueChanged(value: string) {
    router.push(`/users?tab=${value}`)
  }

  return (
    <DashboardLayout>
      <Tabs value={activeTab} onValueChange={onTabValueChanged} className="flex flex-col py-8">
        <SEO title="Laswa | Users" />
        <AddOperatorsModal ref={addOperatorsRef} />

        <div className="flex flex-col gap-6">

          <h1 className="text-2xl font-bold">Users<span className="text-primary">({size})</span></h1>

          <div>
            <TabsList className="flex flex-wrap justify-start bg-white h-auto py-0 px-0">
              {tabs.map((item) => <div className={``} key={item.value}>
                <TabsTrigger className="mx-0 w-36 py-4 data-[state=active]:bg-[#F9F9FE] text-gray-500 rounded-none data-[state=active]:text-primary data-[state=active]:border-b-2 border-b-primary" value={item.value}>{item.name}</TabsTrigger>
              </div>)}
            </TabsList>
          </div>

          <div className="mt-4">
            <TabsContent value="captains">
              <Captains updateSize={setSize} addOperator={addOperator} />
            </TabsContent>

            <TabsContent value="deckhands">
              <DeckHands updateSize={setSize} addOperator={addOperator} />
            </TabsContent>

            <TabsContent value="vesselOwners">
              <DeckHands updateSize={setSize} addOperator={addOperator} />
            </TabsContent>
          </div>


        </div>
      </Tabs>
    </DashboardLayout>
  )
}
