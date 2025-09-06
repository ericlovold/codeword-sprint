# TestFlight Pre-Launch "Eagle Scout" Checklist

**Product:** XCAI + Codeword (iOS first)  
**App type:** Expo (React Native) with `expo-router`

---

## A. Build & Signing ✅

### App Identity & Versioning

- [ ] **`app.json` / `app.config.ts`**

  ```jsonc
  {
    "expo": {
      "name": "Codeword",
      "slug": "codeword",
      "version": "1.0.0", // marketing version
      "ios": {
        "bundleIdentifier": "com.xcai.codeword",
        "buildNumber": "100", // TestFlight build
        "supportsTablet": false,
        "entitlements": {
          // If approved: Critical Alerts (you stated this is approved)
          "com.apple.developer.usernotifications.critical-alerts": true,
        },
        "infoPlist": {
          "UIBackgroundModes": ["audio"], // needed for critical/alert audio
          "NSAppTransportSecurity": {
            "NSExceptionDomains": {
              "api.xcai.com": {
                "NSExceptionAllowsInsecureHTTPLoads": false,
                "NSRequiresCertificateTransparency": false,
                "NSExceptionMinimumTLSVersion": "TLSv1.2",
              },
              "api.openai.com": { "NSExceptionAllowsInsecureHTTPLoads": false },
            },
          },
          "UIApplicationSupportsIndirectInputEvents": true,
        },
      },
    },
  }
  ```

- [ ] **Bundle ID**: `com.xcai.codeword` exists in App Store Connect.
- [ ] **Capabilities**: Push/Notifications enabled if needed for alerting.

### EAS Build (recommended for Expo)

- [ ] `eas build:configure` completed.
- [ ] **Profiles**: `eas.json` has `preview` and `production` profiles.
- [ ] Build:
  ```bash
  eas build -p ios --profile preview
  # or production:
  eas build -p ios --profile production
  ```
- [ ] Submit to TestFlight (after a successful build):
  ```bash
  eas submit -p ios --latest --apple-id YOUR_APPLE_ID --asc-app-id YOUR_ASC_APP_ID
  ```

---

## B. Environment & Secrets ✅

### Secrets

- [ ] **No hardcoded keys** in repo:
  ```bash
  grep -R "sk-" . --exclude-dir=.git || true
  grep -R "API_KEY" . --exclude-dir=.git || true
  ```
- [ ] **EAS Secrets**: set in GitHub/Expo:
  - `CHAT_API_KEY_PROD`
  - `CHAT_API_KEY_STAGING`
  - `SENTRY_DSN_PROD` (or Crashlytics key)
  - Any HMAC/signing keys for remote-config verification

### Runtime Config

- [ ] **`src/config/runtime.ts`** centralizes endpoints & flags:
  ```ts
  export const RUNTIME = {
    ENV: process.env.EXPO_PUBLIC_ENV ?? 'production',
    API_BASE_URL: process.env.EXPO_PUBLIC_CHAT_API_BASE_URL ?? 'https://api.xcai.com/v1',
    TELEMETRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
    SAFETY_MODE: (process.env.EXPO_PUBLIC_SAFETY_MODE ?? 'on') === 'on',
    HIPAA_MODE: (process.env.EXPO_PUBLIC_HIPAA_MODE ?? 'on') === 'on',
  };
  ```
- [ ] **Public env** (safe to expose at runtime) in `app.config`:

  ```ts
  // app.config.ts
  export default ({ config }) => ({
    ...config,
    extra: {},
    expo: {
      ...config.expo,
      runtimeVersion: { policy: 'sdkVersion' },
    },
    plugins: [],
    ios: { ...config.ios },
  });
  ```

  Set public variables via EAS:

  ```bash
  eas secret:push --name EXPO_PUBLIC_ENV --value production
  eas secret:push --name EXPO_PUBLIC_CHAT_API_BASE_URL --value https://api.xcai.com/v1
  eas secret:push --name EXPO_PUBLIC_SAFETY_MODE --value on
  eas secret:push --name EXPO_PUBLIC_HIPAA_MODE --value on
  eas secret:push --name EXPO_PUBLIC_SENTRY_DSN --value https://example@sentry.io/123
  ```

---

## C. Networking & Resilience (AI Chat) ✅

### Timeouts & Retries

- [ ] **Client** uses `AbortController` with 15s connect timeout, 60s read timeout.
- [ ] **Retries**: Max 2 with exponential backoff; no retry on **4xx except 429** (honor `Retry-After`).

### Circuit Breaker

- [ ] Opens after **5 failures / 30s**; half-open probe every **10s**; close after **2 successes**.
- [ ] UI shows **Degraded Mode** when open.

### Streaming

- [ ] **Supported**: render tokens progressively; **cancel** on backgrounding.
- [ ] **Offline**: queue last outbound message; prompt to resend.

> Implementation note: see `src/lib/net.ts` in this repo for a reference client.

---

## D. Safety & Tier-1 Override ✅

> You noted that **Critical Alerts / audio override** is approved. In iOS this maps to the critical alerts entitlement and dedicated sound. Keep a switch to disable in review builds if needed.

### Phrase Detection (on device)

- [ ] **`assets/safety_phrases_v1.json`** bundled; version & hash visible on Diagnostics.
- [ ] Case-insensitive, diacritics/punctuation normalization.
- [ ] Target <300ms detection.

### Override Flow

- [ ] **Immediate UI lock** into `/help` panel when Tier-1 phrases hit.
- [ ] **Staging numbers** only for TestFlight (no real 911).
- [ ] Duplicate suppression (cooldown) to avoid alert storms.

### Audit

- [ ] Log **non-PII**: `trace_id`, `session_id`, `timestamp`, `trigger_version`.
- [ ] No message content logged.

---

## E. Prompt / Config Management ✅

- [ ] **Embedded config**: `assets/ai_config@1.0.0.json`
- [ ] **Remote override** (signed JSON; HMAC or ed25519):
  - Verify signature before applying.
  - Keep **last 3** versions cached for rollback.
- [ ] Diagnostics shows **active version** & signature hash.

Config skeleton:

```json
{
  "version": "1.0.0",
  "signature": "sha256:...signed...",
  "chat": {
    "max_tokens": 2048,
    "temperature": 0.7,
    "system_prompt": "You are a supportive crisis counselor...",
    "safety_overrides": true
  },
  "providers": { "primary": "anthropic", "fallback": ["openai", "azure"] }
}
```

---

## F. Telemetry, Crash, Cost Guardrails ✅

### Crash & Tracing

- [ ] **Sentry** (`sentry-expo`) or Crashlytics configured for **production**.
- [ ] Upload dSYMs automatically.
- [ ] **Trace IDs** per request; session ID per chat session.
- [ ] **No PII** in logs; scrubbers for emails/phones/SSN.

### Metrics / Alerts

- [ ] Latency P50/P95/P99; error rates per status; token usage per session.
- [ ] Budget guards:
  - Daily token soft cap (e.g., 100k/day)
  - Session token warning (e.g., 10k/session)
  - Graceful fail if exceeded (clear copy).

---

## G. Privacy & Compliance ✅

- [ ] Log scrubbing (allowlist only).
- [ ] Retention: chat 30 days (local), analytics 90 days, audits 7 years.
- [ ] User deletion flow exercised.
- [ ] App Privacy labels updated (Health/Usage/Contact if used).

---

## H. UX & Failure Copy ✅

**Strings** (exercise each):

- System busy: "System's at capacity—retrying shortly."
- Offline: "You're offline—message queued. We'll send when you're back."
- Degraded: "Limited mode active to keep you supported."
- Budget limit: "Daily usage limit reached. Service resumes tomorrow."
- Tier-1: "Let's connect you with immediate support."

**Loading**

- Typing indicator in chat; cancel in progress; Retry on error.

---

## I. Navigation QA (no dead ends) ✅

- [ ] All screens reachable: Chat, Library, Mood, Profile, Help.
- [ ] **Back button** on stacked screens (`/help`, `/diagnostics`).
- [ ] Center **semicolon** tab routes to `/help` reliably.
- [ ] KeyboardAvoidingView + FlatList insets: input never overlaps messages.

---

## J. TestFlight Submission ✅

### Pre-submission test

- [ ] Fresh install on device & simulator.
- [ ] Onboarding (if present) → Chat → Send/Receive (staging).
- [ ] Tier-1 trigger (staging only).
- [ ] Offline → queue/resend.
- [ ] Diagnostics triple-tap works.

### Release Notes (template)

```markdown
# Codeword v1.0.0 (100) — TestFlight

**Test acct**: reviewer@xcai.com / TestPass123  
**Demo**: Open → Chat → send "test crisis mode"  
**Tier-1**: Staging endpoints only (no live 911)  
**Diagnostics**: Triple-tap app title

New:

- AI crisis chat with streaming
- Automatic safety detection & escalation
- Offline queueing, resilient networking

Tech:

- Expo RN, provider routing (Anthropic/OpenAI)
- Circuit breaker + retries
- PII-safe telemetry (Sentry)
```

---

## Emergency Contacts (Testing Only)

- Primary: Your Name — you@email.com — (555) 123-4567
- Backup: Backup Name — backup@email.com — (555) 987-6543

**Staging Numbers** (for TestFlight):

- Crisis: (555) 000-0988 (fake)
- Emergency: **Do not** dial real 911

---
