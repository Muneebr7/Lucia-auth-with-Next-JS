import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  SingInTab: React.ReactNode;
  SingUpTab: React.ReactNode;
};

const TabSwitcher = (props: Props) => {
  return (
    <Tabs className="max-w-[500px] w-[400px]" defaultValue="singIn">
      <TabsList className="w-full">
        <TabsTrigger value="singIn" className="w-1/2"> Sign in </TabsTrigger>
        <TabsTrigger value="singUp" className="w-1/2"> Sign Up </TabsTrigger>
      </TabsList>

      <TabsContent value="singUp">{props.SingUpTab}</TabsContent>

      <TabsContent value="singIn">{props.SingInTab}</TabsContent>
    </Tabs>
  );
};

export default TabSwitcher;
