import { Route, Switch } from "wouter";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsAndConditions from "@/pages/TermsAndConditions";
import FutureRoutePage from "@/pages/FutureRoutePage";
import AdditionalServicesPage from "@/pages/AdditionalServicesPage";
import SampleReportPage from "@/pages/SampleReportPage";

import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms"} component={TermsAndConditions} />
      <Route path={"/sample-report"} component={SampleReportPage} />
      <Route path={"/partners"}>
        {() => <FutureRoutePage title="Partners" routePath="/partners" />}
      </Route>
      <Route path={"/investors"}>
        {() => <FutureRoutePage title="Investors" routePath="/investors" />}
      </Route>
      <Route
        path={"/additional-services"}
        component={AdditionalServicesPage}
      />
      <Route path={"/404"} component={NotFound} />
      {/* Future route pattern guide:
          <Route path={"/partners"} component={PartnersPage} />
          <Route path={"/investors"} component={InvestorsPage} />
          <Route path={"/additional-services"} component={AdditionalServicesPage} />
          Add the page component above, then wire the footer/nav link below. */}
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
