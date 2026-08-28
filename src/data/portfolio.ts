export type EvidenceStatus = "DIRECTLY VERIFIED" | "DERIVED" | "RECORDED CLAIM";

export type CaseVisual =
  | {
      alt: string;
      caption: string;
      height: number;
      kind: "image";
      phone?: boolean;
      src: string;
      width: number;
    }
  | {
      caption: string;
      height: number;
      kind: "video";
      poster: string;
      src: string;
      width: number;
    }
  | {
      caption: string;
      items: Array<{ label: string; text: string }>;
      kind: "diagram";
    }
  | {
      caption: string;
      kind: "terminal";
      lines: Array<{ tone?: "blue" | "ok" | "warn"; text: string }>;
    };

export type PortfolioCase = {
  accent?: "cyan";
  category: string;
  description: string;
  evidence: Array<{
    checkpoint: string;
    claim: string;
    evidence: string;
    href?: string;
    status: EvidenceStatus;
  }>;
  heroMeta: Array<{ label: string; value: string }>;
  narrative: Array<{ title: string; text: string }>;
  next?: string;
  proof?: Array<{ label: string; value: string }>;
  previous?: string;
  slug: string;
  summary: Array<{ label: string; text: string }>;
  title: string;
  visual: CaseVisual;
  visualSection?: {
    eyebrow: string;
    title: string;
    visual: CaseVisual;
  };
};

export const portfolioCases: PortfolioCase[] = [
  {
    category: "AI / RAG Reliability",
    description: "Hybrid RAG made measurable, recoverable, and fail-closed.",
    heroMeta: [
      { label: "Case Type", value: "Lead case" },
      { label: "Stack", value: "Chroma, BM25, MCP, pytest" },
      { label: "Status", value: "Private engineering system" },
      { label: "Proof Mode", value: "Checkpointed evaluation" },
    ],
    next: "badgr-bolt",
    proof: [
      { value: "17/17", label: "Useful retrieval @5 - Aug. 12 evaluation" },
      { value: "96/96", label: "Chroma/BM25 exact parity - Stage 2.3" },
      { value: "43/43", label: "Smoke checks - Aug. 12 suite" },
      { value: "23/23", label: "Fresh-session MCP checks" },
    ],
    slug: "cwalts",
    summary: [
      {
        label: "Problem",
        text: "Retrieval, preservation, and rollback behavior had to be measurable before promotion.",
      },
      {
        label: "Engineering Scope",
        text: "Retrieval architecture, gate design, parity/rollback validation, evaluation, and release-control scope represented in this case.",
      },
      {
        label: "Key Decision",
        text: "Pair dense retrieval with BM25 and require explicit gates for evaluation isolation, writes, and rollback safety.",
      },
      {
        label: "Failure Corrected",
        text: "A rollback path could restore mismatched vector and lexical indexes. Stage 2.3 made that failure visible.",
      },
      {
        label: "Verification",
        text: "Aug. 12 evaluation, smoke checks, fresh-session MCP checks, and Stage 2.3 parity checks all passed at their checkpoints.",
      },
      {
        label: "Current State",
        text: "Private engineering system with public, checkpointed evidence for retrieval quality and fail-closed behavior.",
      },
    ],
    title: "C.Walts",
    visual: {
      alt: "C.Walts Stage 2 disposition pass evidence visual",
      caption: "Reviewed Stage 2 PASS visual",
      height: 1080,
      kind: "image",
      src: "/portfolio/cwalts-stage2-pass.jpg",
      width: 1920,
    },
    visualSection: {
      eyebrow: "Architecture",
      title: "Fail-closed retrieval surface.",
      visual: {
        caption: "Derived from the C.Walts case-study architecture snapshot",
        items: [
          { label: "Caller", text: "Narration text or analysis request." },
          { label: "MCP Surface", text: "Seven approved tools, schema advertised." },
          { label: "Dense", text: "Chroma, nomic-embed-text, 768d." },
          { label: "Lexical", text: "BM25 with exact notation retention." },
          { label: "Fusion", text: "Reciprocal-rank fusion with cited results." },
          { label: "Gate", text: "Write-disabled by default; weakened candidate refused." },
        ],
        kind: "diagram",
      },
    },
    narrative: [
      {
        title: "Problem",
        text: "The system needed to retrieve approved narration and prosody guidance without contaminating production with evaluation material or losing protected wording constraints.",
      },
      {
        title: "Decision",
        text: "Use a hybrid dense plus lexical retrieval path, keep evaluation and production stores isolated, and make promotion depend on explicit gates.",
      },
      {
        title: "Implementation",
        text: "Chroma dense retrieval and BM25 lexical retrieval feed reciprocal-rank fusion. The MCP surface advertises seven approved tools with write controls and provenance checks.",
      },
      {
        title: "Failure",
        text: "A rollback path could silently restore a half-synchronized system where vector and lexical indexes diverged. Stage 2.3 also exposed a procedural tracked-file deviation.",
      },
      {
        title: "Correction",
        text: "The correction preserved the deviation rather than rewriting history, added restore verification, checked exact ID-set parity, and ran live retrieval/refusal probes.",
      },
      {
        title: "Verification",
        text: "Aug. 12 evaluation showed 17/17 useful hits at @5, 10/10 preservation checks, zero negative contamination, zero citation failures, zero assertion failures, p50 84 ms, and p95 125 ms.",
      },
      {
        title: "Current State",
        text: "Private engineering system and public evidence-backed case study with checkpointed retrieval, smoke, parity, and MCP validation artifacts.",
      },
      {
        title: "Remaining Limitation",
        text: "Raw test counts are not presented as a universal quality measure. Runtime narration quality still requires separate device or audio evaluation.",
      },
    ],
    evidence: [
      {
        checkpoint: "Aug. 12, 2026 evaluation",
        claim: "17/17 useful retrieval cases at @5; 10/10 preservation.",
        evidence: "evaluation-report.json",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Aug. 12, 2026 evaluation",
        claim: "Zero negative contamination, citation failures, and assertion failures.",
        evidence: "evaluation-report.json summary",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Stage 2.3 R1",
        claim: "96 Chroma records and 96 BM25 records with exact parity.",
        evidence: "gate1_2-stage2_3-r1-correction.json",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Aug. 12, 2026 smoke suite",
        claim: "43 smoke checks passed with zero failures.",
        evidence: "smoke-test.json",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Fresh-session MCP checkpoint",
        claim: "23 fresh-session MCP checks passed.",
        evidence: "mcp-fresh-session.json",
        status: "DIRECTLY VERIFIED",
      },
    ],
  },
  {
    accent: "cyan",
    category: "Android / Product Engineering",
    description: "Android reading product engineering with narration integration and release controls.",
    heroMeta: [
      { label: "Case Type", value: "Shipped-product case" },
      { label: "Stack", value: "Kotlin, Android, Compose, Play Integrity" },
      { label: "Status", value: "Android product evidence" },
      { label: "Marketplace", value: "Verified live Aug. 28, 2026" },
    ],
    next: "badgr-harness",
    previous: "cwalts",
    slug: "badgr-bolt",
    summary: [
      {
        label: "Problem",
        text: "A functional RSVP/ORP reader needed product polish, release discipline, and safer integration points.",
      },
      {
        label: "Engineering Scope",
        text: "Android product engineering, release integrity, narration-integration coverage, and marketplace-state verification represented in this case.",
      },
      {
        label: "Key Decision",
        text: "Keep the reader core focused while treating monetization, cloud sync, and expanded file support as separately verified scopes.",
      },
      {
        label: "Failure Corrected",
        text: "Release work exposed Gradle, Java, large-file, Material component, and callback-scoping issues.",
      },
      {
        label: "Verification",
        text: "Narration test source covers exact chunk reassembly and supported metadata mapping. Integrity code is report-only and fail-open.",
      },
      {
        label: "Current State",
        text: "Google Play listing verified live Aug. 28, 2026; listing shows Install availability, a Jul. 31, 2026 update, and What's New names BADGR-Bolt '3.4.1 Whisper'.",
      },
    ],
    title: "BADGR Bolt",
    visual: {
      alt: "BADGR Bolt Android app screenshot from June 23, 2026 evidence",
      caption: "Real Android app screenshot evidence",
      height: 2340,
      kind: "image",
      phone: true,
      src: "/portfolio/badgr-bolt-app.jpg",
      width: 1080,
    },
    visualSection: {
      eyebrow: "Demo Evidence",
      title: "Real app media, not stock product art.",
      visual: {
        caption: "Silent public derivative of app screen recording - controls enabled, no autoplay",
        height: 1560,
        kind: "video",
        poster: "/portfolio/badgr-bolt-app.jpg",
        src: "/portfolio/badgr-bolt-public-silent.mp4",
        width: 720,
      },
    },
    narrative: [
      {
        title: "Problem",
        text: "The Android app needed to move from a functional RSVP/ORP reader into a branded product with file import, settings, release readiness, and later narration integration.",
      },
      {
        title: "Decision",
        text: "Keep the core reader focused and privacy-aware while treating monetization, cloud sync, and advanced file support as separate planned or Pro-scope concerns.",
      },
      {
        title: "Implementation",
        text: "Artifacts document RSVP engine refinements, app renaming/branding, Settings and Library surfaces, Android Storage Access Framework import, narration chunking tests, and a report-only Play Integrity probe.",
      },
      {
        title: "Failure",
        text: "Build and release work hit practical issues: Gradle wrapper execution, Java 17 compatibility, SDK location, large GitHub files, Material component mismatch, and callback scoping for file import.",
      },
      {
        title: "Correction",
        text: "Fixes included executable Gradle wrapper setup, Java 17 environment alignment, history cleanup for large files, Divider compatibility, and explicit callback plumbing into the Library composable.",
      },
      {
        title: "Verification",
        text: "Representative test source asserts exact narration chunk reassembly under a server limit and covers supported metadata mapping. Integrity checks are report-only and fail-open by design.",
      },
      {
        title: "Current State",
        text: "Google Play listing verified live Aug. 28, 2026; listing shows Install availability, 10+ downloads, in-app purchases, Everyone rating, a Jul. 31, 2026 update, and What's New names BADGR-Bolt '3.4.1 Whisper'. Marketplace state should still be rechecked at production release.",
      },
      {
        title: "Remaining Limitation",
        text: "The final report contains planned Phase 2 and monetization features. The public case must separate implemented behavior from roadmap material.",
      },
    ],
    evidence: [
      {
        checkpoint: "June 23, 2026 screenshot; July 8, 2026 source recording",
        claim: "Android app surface exists and can be shown with real device media.",
        evidence: "App screenshot and silent public screen-recording derivative",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Aug. 14, 2026 source artifact",
        claim: "Narration test code asserts exact chunk reassembly and enforces the server hard limit.",
        evidence: "CwaltsNarrationTest.kt",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Aug. 14, 2026 source artifact",
        claim: "Narration test code covers mapping objective book metadata only to supported categories.",
        evidence: "CwaltsNarrationTest.kt",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "July 31, 2026 code artifact",
        claim: "Play Integrity integration is report-only and fail-open.",
        evidence: "IntegrityChecker.kt",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Verified Aug. 28, 2026",
        claim: "Google Play listing was live, showed Install availability, 10+ downloads, in-app purchases, Everyone rating, a Jul. 31, 2026 update, and What's New names BADGR-Bolt '3.4.1 Whisper'.",
        evidence: "Google Play listing",
        href: "https://play.google.com/store/apps/details?id=com.badgr.orbreader",
        status: "DIRECTLY VERIFIED",
      },
    ],
  },
  {
    category: "Agentic Orchestration / MCP / RAG",
    description: "Routing, schema hardening, and failure correction for an agentic harness.",
    heroMeta: [
      { label: "Case Type", value: "Agent orchestration case" },
      { label: "Stack", value: "Python, Ollama, MCP, Pydantic" },
      { label: "Status", value: "Private harness evidence" },
      { label: "Proof Mode", value: "Failure plus correction" },
    ],
    next: "badgr-ai-ops",
    previous: "badgr-bolt",
    slug: "badgr-harness",
    summary: [
      {
        label: "Problem",
        text: "Specialist routing could capture generic prompts, making agent behavior harder to trust.",
      },
      {
        label: "Engineering Scope",
        text: "Routing, schema hardening, observability, failure isolation, and regression-verification scope represented in this case.",
      },
      {
        label: "Key Decision",
        text: "Make specialist activation explicit and keep generic prompts on the base model unless domain signals justify routing.",
      },
      {
        label: "Failure Corrected",
        text: "A terminal artifact preserved the routing failure before the correction changed the activation boundary.",
      },
      {
        label: "Verification",
        text: "Phase 6 fix output directly shows generic and domain routing separation. A captured correction record reports 40/40 tests passing.",
      },
      {
        label: "Current State",
        text: "Private orchestration harness with public evidence for routing correction, schema hardening, and inspection tooling.",
      },
    ],
    title: "BADGR Harness",
    visual: {
      caption: "Architecture diagram derived from project implementation/evidence.",
      items: [
        { label: "Input", text: "Prompt enters routing layer." },
        { label: "Classifier", text: "Generic vs. domain signal check." },
        { label: "Base Path", text: "Generic prompts stay on mistral:7b." },
        { label: "Specialist Path", text: "Trading/domain prompt routes to badgr-analyst:latest." },
        { label: "Validation", text: "Terminal fix output plus harness inspection." },
      ],
      kind: "diagram",
    },
    visualSection: {
      eyebrow: "Routing Evidence",
      title: "Failure preserved, routing boundary corrected.",
      visual: {
        caption: "Terminal fragment from captured Harness correction evidence",
        kind: "terminal",
        lines: [
          { tone: "ok", text: "captured correction record: 40/40 tests passing" },
          { text: "generic classification -> mistral:7b" },
          { text: "domain trading setup -> badgr-analyst:latest" },
          { text: "harness_inspect -> role separation visible" },
          { tone: "warn", text: "failure preserved: specialist routed generic work before correction" },
        ],
      },
    },
    narrative: [
      {
        title: "Problem",
        text: "The orchestration harness needed to route generic prompts and specialist prompts differently. Evidence preserved a failure where a specialist model handled generic work.",
      },
      {
        title: "Decision",
        text: "Move routing from loose prompt expectation into an explicit classification boundary with schema hardening and inspection support.",
      },
      {
        title: "Implementation",
        text: "The evidence represents prompt routing, role separation, schema validation, task inspection, and regression-oriented correction output.",
      },
      {
        title: "Failure",
        text: "A generic classification prompt was routed to the specialist path before correction, showing the harness could over-activate domain agents.",
      },
      {
        title: "Correction",
        text: "The corrected flow keeps generic classification on mistral:7b and routes domain trading setup to badgr-analyst:latest only when the domain signal is present.",
      },
      {
        title: "Verification",
        text: "The terminal artifact directly shows generic and domain routing outputs. A captured correction summary reports 40/40 tests passing; harness_inspect.py showed 13 total tasks, 11 completed, 2 interrupted, and role separation in the log.",
      },
      {
        title: "Current State",
        text: "Private harness with published case evidence for routing correction, schema hardening, and operational inspection.",
      },
      {
        title: "Remaining Limitation",
        text: "The 40/40 count is retained as a recorded claim because raw runner output was not located in the reviewed evidence.",
      },
    ],
    evidence: [
      {
        checkpoint: "Phase 6 failure artifact",
        claim: "Specialist route captured a generic classification prompt before correction.",
        evidence: "phase6_fix-01 captured terminal output",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Phase 6 correction artifact",
        claim: "Generic classification routed to mistral:7b after correction.",
        evidence: "phase6_fix-01_test_results.txt terminal output",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Phase 6 correction artifact",
        claim: "Domain trading setup routed to badgr-analyst:latest after correction.",
        evidence: "phase6_fix-01_test_results.txt terminal output",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "Phase 6 correction record, Apr. 23, 2026",
        claim: "Captured Phase 6 correction record reports 40/40 tests passing.",
        evidence: "phase6_fix-01_test_results.txt captured correction record",
        status: "RECORDED CLAIM",
      },
      {
        checkpoint: "Harness inspection checkpoint",
        claim: "Inspection report shows 13 total tasks, 11 completed, 2 interrupted.",
        evidence: "harness_inspect.py output",
        status: "DIRECTLY VERIFIED",
      },
    ],
  },
  {
    category: "Developer Tooling / Provenance",
    description: "Reducing engineering-workspace noise with provenance-aware tooling.",
    heroMeta: [
      { label: "Case Type", value: "Developer-tooling case" },
      { label: "Stack", value: "Python, MCP, Ollama, OpenHands" },
      { label: "Status", value: "Internal tooling" },
      { label: "Guardrail", value: "Not every utility is a product" },
    ],
    next: "web-ops",
    previous: "badgr-harness",
    slug: "badgr-ai-ops",
    summary: [
      {
        label: "Problem",
        text: "AI-assisted engineering work was spread across noisy roots, tools, logs, and session state that could be lost.",
      },
      {
        label: "Engineering Scope",
        text: "Discovery, provenance, dedupe/classification, bounded MCP tooling, and recoverable handoff scope represented in this case.",
      },
      {
        label: "Key Decision",
        text: "Use explicit handoff state, memory docs, bounded MCP tools, dry-run tests, and rollback paths.",
      },
      {
        label: "Failure Corrected",
        text: "Raw discovery could over-count noisy roots and mix unrelated artifacts into the engineering story.",
      },
      {
        label: "Verification",
        text: "Toolchain tests cover HTTP fetch, file read, dry-run write refusal, and logging behavior.",
      },
      {
        label: "Current State",
        text: "Internal developer tooling and handoff model. The page does not present every utility as a released product.",
      },
    ],
    title: "BADGR AI Ops",
    visual: {
      caption: "Architecture diagram derived from project implementation/evidence.",
      items: [
        { label: "Raw Inputs", text: "Noisy engineering roots, tools, logs, and project state." },
        { label: "Discovery", text: "AISnap and state files identify what exists." },
        { label: "Provenance", text: "Memory docs and handoff JSON preserve source context." },
        { label: "Selection", text: "Dedupe/classification narrows evidence for handoff." },
        { label: "Recovery", text: "MCP tests and rollback scripts support repeatable work." },
      ],
      kind: "diagram",
    },
    visualSection: {
      eyebrow: "System Surface",
      title: "Bounded tools for agent work.",
      visual: {
        caption: "Actual terminal/report fragments summarized from selected AI Ops artifacts",
        kind: "terminal",
        lines: [
          { tone: "blue", text: "BADGR-AI-OPS.json" },
          { text: "canonical handoff state" },
          { text: "local models + remote GPU strategy" },
          { text: "memory docs for session continuity" },
          { tone: "blue", text: "mcp_server.py" },
          { text: "jailed file operations" },
          { text: "shell allowlist" },
          { text: "max file size and timeout limits" },
          { tone: "ok", text: "toolchain tests: HTTP, read_file, dry-run write, logging" },
        ],
      },
    },
    narrative: [
      {
        title: "Problem",
        text: "The workspace contained noisy project discovery, mixed tooling, local and remote model state, and session context that was easy to lose between agents or working sessions.",
      },
      {
        title: "Decision",
        text: "Use explicit state handoff JSON, memory documents, bounded MCP tools, dry-run behavior, and rollback scripts instead of relying on model memory or ad hoc notes.",
      },
      {
        title: "Implementation",
        text: "Artifacts document a BADGR-AI-OPS state file, local Ollama model inventory, OpenHands and RunPod workflow notes, a FastMCP server, an agent bridge, toolchain tests, and prompt-version rollback.",
      },
      {
        title: "Failure",
        text: "Raw discovery could over-count noisy roots and mix unrelated media, marketing, browser, or Unity artifacts into the engineering picture.",
      },
      {
        title: "Correction",
        text: "The public story narrows AI Ops to provenance, dedupe, tool boundaries, handoff recoverability, and rollback. It does not promote generic scanned files as product evidence.",
      },
      {
        title: "Verification",
        text: "Representative tests cover HTTP fetch, file read, dry-run write refusal, and JSON-line logging. MCP code shows path jailing, command allowlisting, size limits, and shell timeouts.",
      },
      {
        title: "Current State",
        text: "Internal developer tooling and operating model for repo-aware AI engineering work, evidence preservation, and reproducible handoffs.",
      },
      {
        title: "Remaining Limitation",
        text: "The AISnap statistics artifact included in the public evidence set is sparse in this handoff. Stronger publication should add a clearer sanitized screenshot or summary visual.",
      },
    ],
    evidence: [
      {
        checkpoint: "May 18, 2026 state handoff",
        claim: "Project state handoff captures local/remote AI development workflow and memory-doc strategy.",
        evidence: "BADGR-AI-OPS.json",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "April 11, 2026 code artifact",
        claim: "MCP file operations are path-jailed and shell execution is allowlisted.",
        evidence: "mcp_server.py",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "April 11, 2026 code artifact",
        claim: "Agent bridge exposes MCP tools to the local agent loop through sync wrappers.",
        evidence: "agent_mcp_bridge.py",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "April 11, 2026 test artifact",
        claim: "Toolchain tests cover HTTP fetch, file read, dry-run write refusal, and JSON-line logging.",
        evidence: "test_toolchain.py",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "April 12, 2026 script artifact",
        claim: "Rollback script switches prompt versions through a symlinked current path.",
        evidence: "rollback.sh",
        status: "DIRECTLY VERIFIED",
      },
    ],
  },
  {
    category: "Production Web Engineering",
    description: "Hardening a production web stack without losing conversion flow.",
    heroMeta: [
      { label: "Case Type", value: "Production case" },
      { label: "Stack", value: "React, Vite, Tailwind, Vercel" },
      { label: "Status", value: "Production system" },
      { label: "Proof Mode", value: "Dated report + workflows" },
    ],
    previous: "badgr-ai-ops",
    slug: "web-ops",
    summary: [
      {
        label: "Problem",
        text: "The production site needed security, dependency, accessibility, and performance hardening without breaking the business funnel.",
      },
      {
        label: "Engineering Scope",
        text: "Security headers, dependency remediation, performance/accessibility hardening, CI, smoke testing, and rollback scope represented in this case.",
      },
      {
        label: "Key Decision",
        text: "Use staged operations: Vercel headers, report-only CSP first, dependency remediation, CI checks, and rollback playbooks.",
      },
      {
        label: "Failure Corrected",
        text: "The May 2026 report documented missing headers, dependency risk, SEO gaps, and contrast issues.",
      },
      {
        label: "Verification",
        text: "Evidence includes curl header checks, pnpm audit results, Lighthouse CI workflow, Stripe checkout verification, and launch smoke tests.",
      },
      {
        label: "Current State",
        text: "Current live scores must be fetched in React phase or labeled with a fresh timestamp before publication.",
      },
    ],
    title: "Universal Header / Web-Ops",
    visual: {
      alt: "BADGRTechnologies production site screenshot from June 6, 2026 evidence",
      caption: "Production web visual evidence",
      height: 975,
      kind: "image",
      src: "/portfolio/web-ops-site.png",
      width: 1505,
    },
    visualSection: {
      eyebrow: "Demo Evidence",
      title: "Production site inspection.",
      visual: {
        caption: "Silent public derivative of site video evidence - controls enabled, no autoplay",
        height: 540,
        kind: "video",
        poster: "/portfolio/web-ops-site.png",
        src: "/portfolio/web-ops-public-silent.mp4",
        width: 960,
      },
    },
    proof: [
      { value: "8", label: "Required security headers in May 2026 report" },
      { value: "77 -> 0", label: "Dependency vulnerabilities to no known production-exploitable risks" },
      { value: "92KB", label: "Approx. image payload reduction in report" },
      { value: "12 -> 0", label: "Contrast violations after two-phase remediation" },
    ],
    narrative: [
      {
        title: "Problem",
        text: "The production BADGRTechnologies site needed stronger security headers, dependency hygiene, accessibility contrast, asset performance, and release checks without breaking lead capture or Stripe checkout.",
      },
      {
        title: "Decision",
        text: "Use staged hardening: headers in Vercel config, report-only CSP before enforcement, dependency removal/overrides, self-hosted optimized media, and CI checks.",
      },
      {
        title: "Implementation",
        text: "The evidence includes vercel.json headers, security-header validation workflow, Lighthouse CI workflow, security playbook, launch checklist, and performance/accessibility remediation notes.",
      },
      {
        title: "Failure",
        text: "The report documents missing security headers, 77 dependency vulnerabilities, SEO score gaps, and 12 contrast violations on dark UI elements before remediation.",
      },
      {
        title: "Correction",
        text: "Unused vulnerable packages were removed, pnpm overrides were applied, headers and cache policy were configured, dark-theme contrast tokens were adjusted, and route code-splitting was introduced.",
      },
      {
        title: "Verification",
        text: "May 2026 validation used curl header checks, pnpm audit, Lighthouse CI, Stripe checkout verification, and launch smoke procedures. Scores are treated as dated snapshots, not current claims.",
      },
      {
        title: "Current State",
        text: "The current local production source shows enforced CSP, global security headers, route lazy-loading, and documented operational checks. Live scores should be fetched before final publication.",
      },
      {
        title: "Remaining Limitation",
        text: "The report still listed SEO root-cause work, HSTS preload submission, and post-deployment accessibility re-audit as open items at that snapshot.",
      },
    ],
    evidence: [
      {
        checkpoint: "May 2026 snapshot",
        claim: "Eight required security response headers were reported live in production.",
        evidence: "BADGRTECH WebOps Security and Optimization Report",
        status: "RECORDED CLAIM",
      },
      {
        checkpoint: "May 16, 2026 report",
        claim: "Dependency vulnerability count was reduced from 77 to no known production-exploitable risks.",
        evidence: "WebOps report and pnpm audit excerpt",
        status: "RECORDED CLAIM",
      },
      {
        checkpoint: "June 6, 2026 workflow artifact",
        claim: "Security-header CI validates required headers and prevents x-robots-tag: noindex regressions.",
        evidence: "security-headers-test.yml",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "June 6, 2026 workflow artifact",
        claim: "Lighthouse CI builds and reports category scores for configured URLs.",
        evidence: "lighthouse-ci.yml",
        status: "DIRECTLY VERIFIED",
      },
      {
        checkpoint: "June 6, 2026 playbook artifacts",
        claim: "Launch and security playbooks define smoke tests, rollback, CSP review, and audit cadence.",
        evidence: "SECURITY_PLAYBOOK.md and LAUNCH_OPS_CHECKLIST.md",
        status: "DIRECTLY VERIFIED",
      },
    ],
  },
];

export const portfolioCaseMap = Object.fromEntries(
  portfolioCases.map(portfolioCase => [portfolioCase.slug, portfolioCase])
) as Record<string, PortfolioCase>;

export const leadPortfolioCase = portfolioCases[0];
