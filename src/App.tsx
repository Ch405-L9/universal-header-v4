import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);

const Home = lazy(() => import("./pages/Home"));
const Layout = lazy(() => import("@/components/Layout"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));
const BadgrBoltPrivacy = lazy(() => import("@/pages/BadgrBoltPrivacy"));
const FutureRoutePage = lazy(() => import("@/pages/FutureRoutePage"));
const AdditionalServicesPage = lazy(() => import("@/pages/AdditionalServicesPage"));
const SampleReportPage = lazy(() => import("@/pages/SampleReportPage"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const FreeLighthouseScan = lazy(() => import("@/pages/FreeLighthouseScan"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const PaymentSuccess = lazy(() => import("@/pages/PaymentSuccess"));
const PaymentCancel = lazy(() => import("@/pages/PaymentCancel"));
const PortfolioPage = lazy(() => import("@/pages/PortfolioPage"));
const PortfolioCaseStudyPage = lazy(
  () => import("@/pages/PortfolioCaseStudyPage")
);

/** Gives standalone pages the site header, footer and landmarks so no page is a dead end. */
function withLayout<P extends object>(Page: React.ComponentType<P>) {
  return (props: P) => (
    <Layout>
      <Page {...props} />
    </Layout>
  );
}

const PrivacyPage = withLayout(PrivacyPolicy);
const TermsPage = withLayout(TermsAndConditions);
const SampleReport = withLayout(SampleReportPage);
const AdditionalServices = withLayout(AdditionalServicesPage);
const Success = withLayout(PaymentSuccess);
const Cancel = withLayout(PaymentCancel);
const Missing = withLayout(NotFound);
const FutureRoute = withLayout(FutureRoutePage);

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/privacy"} component={PrivacyPage} />
        <Route path={"/privacy/badgr-bolt"} component={BadgrBoltPrivacy} />
        <Route path={"/terms"} component={TermsPage} />
        <Route path={"/sample-report"} component={SampleReport} />
        <Route path={"/portfolio"} component={PortfolioPage} />
        <Route path={"/portfolio/cwalts"}>
          {() => <PortfolioCaseStudyPage slug="cwalts" />}
        </Route>
        <Route path={"/portfolio/badgr-bolt"}>
          {() => <PortfolioCaseStudyPage slug="badgr-bolt" />}
        </Route>
        <Route path={"/portfolio/badgr-harness"}>
          {() => <PortfolioCaseStudyPage slug="badgr-harness" />}
        </Route>
        <Route path={"/portfolio/badgr-ai-ops"}>
          {() => <PortfolioCaseStudyPage slug="badgr-ai-ops" />}
        </Route>
        <Route path={"/portfolio/web-ops"}>
          {() => <PortfolioCaseStudyPage slug="web-ops" />}
        </Route>
        <Route path={"/proof"} component={CaseStudy} />
        <Route path={"/website-check"} component={FreeLighthouseScan} />
        <Route path={"/partners"}>
          {() => <FutureRoute title="Partners" routePath="/partners" />}
        </Route>
        <Route path={"/investors"}>
          {() => <FutureRoute title="Investors" routePath="/investors" />}
        </Route>
        <Route
          path={"/additional-services"}
          component={AdditionalServices}
        />
        <Route path={"/success"} component={Success} />
        <Route path={"/cancel"} component={Cancel} />
        <Route path={"/404"} component={Missing} />
        {/* Future route pattern guide:
            <Route path={"/partners"} component={PartnersPage} />
            <Route path={"/investors"} component={InvestorsPage} />
            <Route path={"/additional-services"} component={AdditionalServices} />
            Add the page component above, then wire the footer/nav link below. */}
        {/* Final fallback route */}
        <Route component={Missing} />
      </Switch>
    </Suspense>
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
