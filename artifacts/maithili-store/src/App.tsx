import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/Home";
import { ToolsPage } from "@/pages/Tools";
import { CategoriesPage } from "@/pages/Categories";
import { CategoryPage } from "@/pages/Category";
import { ToolPage } from "@/pages/Tool";
import { AudiencePage } from "@/pages/Audience";
import { AboutPage } from "@/pages/About";
import { SavedPage } from "@/pages/Saved";
import { NewArrivalsPage } from "@/pages/NewArrivals";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/tools" component={ToolsPage} />
      <Route path="/categories" component={CategoriesPage} />
      <Route path="/category/:slug">
        {(params) => <CategoryPage slug={params.slug} />}
      </Route>
      <Route path="/tool/:slug">
        {(params) => <ToolPage slug={params.slug} />}
      </Route>
      <Route path="/for/:slug">
        {(params) => <AudiencePage slug={params.slug} />}
      </Route>
      <Route path="/about" component={AboutPage} />
      <Route path="/saved" component={SavedPage} />
      <Route path="/new" component={NewArrivalsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
