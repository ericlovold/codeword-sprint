# Codeword Sprint – Mini Context (UI & Flows first)

## Status (now)

- Expo + expo-router shell with 4 tabs: chat / library / mood / profile
- Center semicolon FAB mounted once (inside tabs layout), routes to /help
- Help screen scaffolded (tel/sms actions), Chat UI baseline with gradient
- Assets in app/assets/icons/ (some filenames contain spaces)

## Guardrails

- UI/UX first; minimal deps; one nav source (expo-router)
- Keep Babel minimal (babel-preset-expo); no flaky plugins
- One FAB render only; frequent small commits to feature branches

## Ask for Claude (initial tasks)

- Design-polish the bottom tab bar to match Figma (rounded tray, subtle shadow)
- Provide exact gradient stops + brand tokens from Figma and apply to Chat bg
- Replace vector tab icons with our PNGs (active/inactive states)
- Ensure FAB visually centered, doesn't block tab taps, and routes to /help

## File tree (key areas)

app/ (depth ≤2)
app/\_layout.tsx
app/(tabs)/\_layout.tsx
app/(tabs)/chat.tsx
app/(tabs)/library.tsx
app/(tabs)/mood.tsx
app/(tabs)/profile.tsx
app/codeword.tsx
app/create-codeword.tsx
app/get-help.tsx
app/help.tsx
app/index.tsx
app/invite-sent.tsx
app/onboarding-welcome.tsx
app/review-invite.tsx
app/track.tsx

src/ (depth ≤2)
src/assets.ts
src/components/CustomTabBar.tsx
src/components/Layer1.native.tsx
src/components/Screen.tsx
src/components/SemicolonFAB.tsx
src/icons/Semicolon.tsx
src/lib/chatClient.ts
src/state/chatStore.ts
src/ui/Button.tsx
src/ui/MessageBubble.tsx
src/ui/PillButton.tsx
src/ui/Text.tsx
