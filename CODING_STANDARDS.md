# Part 1: Tech stack coding standard

These rules cover how code should be written beyond what tooling enforces. Don't restate rules a linter or formatter already catches. The language and framework sections further down add the rules for this project's stack. Rules for this one repo only (owned folders, reference files, frozen files) live in "Part 2: Repo coding standard" at the end of this file.

## Core principles

- **One reason to change per file.** A module edited for several unrelated reasons (Divergent Change) is a sign it should split. A single logical change that forces edits scattered across many unrelated files (Shotgun Surgery) is a sign related things should be gathered into one place instead.
- **No speculative generality.** Don't add abstraction, parameters, or hooks for needs the current spec doesn't have. Inline until a second real caller shows up.
- **Readable over short.** Write logic so it reads top to bottom on the first pass. Prefer `if` / early `return` over chained ternaries or packed `&&` / `||` expressions when there is more than one condition. Only take the shorter form when it gives a real, measurable advantage -- not to save lines. A ternary vs an `if` is never a speed difference. One simple ternary (`a ? b : c`) inside a template is fine.
- **Ownership boundaries are real.** Don't reformat, relint, or restructure code you don't own just because you're touching a neighbouring file. This covers generated files, vendored code, static assets, frozen snapshots, and folders another team owns. The stack sections below list the generated paths for each stack; "Part 2: Repo coding standard" lists this repo's own owned folders. An exclusion in the lint or format ignore list is a deliberate boundary, not an oversight.
- **An ignore list must stay true.** The moment a file on a lint or format ignore list is rewritten by hand, take it off the list. A stale entry hides real defects from the tool.

## Naming meaning

These rules are about what a name says. The case style (`camelCase`, `StudlyCaps`, ...) is set in each language section below. Examples here use camelCase.

- **Functions start with a verb.** `claimNextPending()`, `buildMessage()`, `markUnsupported()`. A bare noun names a thing, not an action, so the call site does not read as a call.
- **The noun is optional when the receiver already carries it.** `queue.insert()`, not `queue.insertQueue()`. Verb-only is the correct form here, not an exception to the rule.
- **Booleans read as a question:** `is` / `has` / `can` prefix (`isExpired()`, `hasPendingJobs()`).
- **A pure value accessor may be a noun phrase** when it computes nothing and takes no arguments. The moment it does work, it takes a verb.
- **Fluent setters that return the object may use the `with` prefix** (`withPayload()`). The prefix is the signal that the call chains, which `set` would lose.

Exempt -- names fixed by a framework, a runtime, or an established convention, never renamed to fit the rules above: script entrypoints (`main()`), framework lifecycle and contract methods, test-framework names (`test`, `beforeEach`, fixture names). The stack sections below list theirs.

## Comment dividers

**The three tiers have the same meaning in every language.** Tier 1 separates major code blocks. Tier 2 groups code serving the same purpose. Tier 3 explains the specific purpose of nearby code. These rules apply to procedural code, classes, functions, methods, components, and stylesheets.

**Required tiers may be used independently.** Tier 1 and tier 3 may appear without tier 2 when there is no purpose group to label. Tier 2 may appear without tier 1 when there is no major section or step to separate. Tier 3 may appear on its own. Independence does not make required comments optional: omitting a required divider or explanation is a standards violation.

All tier definitions, shapes, casing, and placement rules live in this section. Language and framework sections do not define additional tiers or override these rules.

### Geometry and spacing

- **Tier-1 border lines end at column 80**, including indentation and comment markers. Copy the banner shape below and shorten its borders when it is indented.
- **Tier 2 uses exactly three hyphens on each side of its label.** It has no fixed ending column. Do not add trailing fill or pad labels to match widths.
- **Dividers are indented to match the surrounding code.** A divider sits at column zero only when its code does.
- **One blank line before a divider, none after.** The first divider inside a block takes no blank line before it. Consecutive tier-1 and tier-2 dividers also take no blank line between them. Code, a docblock, or a tier-3 comment starts on the next line.

### The three shapes

**Tier 1 -- major code block.** Three comment lines, label in upper case. Separate major file sections or major processing steps inside a function or method.

```
// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------
```

**Tier 2 -- group with a shared purpose.** One line, label in title case, exactly `--- Label ---`. Use it for related imports, state, handlers, processing groups, or UI groups.

```
// --- Signal Handlers ---
process.on('SIGTERM', () => gracefulShutdown());
```

Tier-2 labels name a group (`Setup`, `Handlers`, `Validation`). A sentence explaining a specific operation belongs in tier 3.

**Tier 3 -- specific purpose or child operation.** A plain comment, one line, at most 100 characters including indentation and comment markers, directly above the code it describes. Use sentence case: first word starts in upper case, except for case-sensitive identifiers.

A tier-3 comment is one of four kinds. Anything else is deleted:

- **Purpose** the code cannot show: why this line exists.
- **Usage hint**: how the code must be used, when its name or signature cannot say it.
- **Pointer**: where the full reason lives (`docs/adr/0003-theme-layers.md`, a design-doc section number).
- **Hazard**: tagged `[TRAP]`, see "Bracket labels" below.

**Deletion test, before writing one:** if this comment were removed, would a reader make a mistake or have to search for the reason? If not, do not write it. If the reason needs more than one line, it goes into an ADR or the design doc, and the code carries a one-line pointer.

```
// Restore the saved theme before rendering
applyTheme(localStorage.getItem('theme'));
```

### Placement

- **Use purpose, not syntax depth, to choose a tier.** Nested code does not need a new tier for every indentation level. Object-oriented code and component code use the same three tiers.
- **Tier 1 is required for each major file section that is present**, including external dependencies, internal dependencies, types, constants, helpers, and the main code (component, hook, class, module, or configuration). Use an upper-case label for the section's role. Skip sections that have no code; do not add empty banners. Short files follow the same rule.
- **Tier 1 is also required inside a function or method with two or more major processing steps.** Label each major step. A body with one major step does not need a tier-1 banner. Class and method declarations or docblocks do not replace required section dividers; a separate banner for every declaration within the same section is not required.
- **Tier 2 is required for each purpose group within a code block.** This includes import groups (`Services`, `Components`, `Utilities`), function or component logic groups (`Local State`, `Effects`, `Handlers`, `Render`), and distinct UI or style groups (`Header`, `Filters`, `Pagination`). Use labels for the groups actually present; no fixed framework-specific list is required. A plain tier-3 label does not replace a tier-2 divider.
- **Tier 3 is required when a specific operation or child block has a purpose or constraint that is not clear from the code.** Place it directly above that code. It does not require a divider above it. Clear code does not need a comment that only repeats it.
- **Never trigger a divider on line count.** Length does not imply stages. A long block can serve one purpose; a short block can contain distinct purposes.

Tier 1 with tier 3, without tier 2:

```
// -----------------------------------------------------------------------------
// INITIALIZATION
// -----------------------------------------------------------------------------
// Restore the saved theme before rendering
applyTheme(localStorage.getItem('theme'));
```

### Comment syntax

The meanings stay the same; use valid comment syntax for the current language or code region. Every tier-1 line, including the title, must be a comment.

| Code region                                            | Tier 2 example                | Tier 3 example                        |
| ------------------------------------------------------ | ----------------------------- | ------------------------------------- |
| JavaScript, TypeScript, PHP; JS expressions in JSX/TSX | `// --- Validation ---`       | `// Reject incomplete submissions`    |
| JSX/TSX markup                                         | `{/* --- Pagination --- */}`  | `{/* Number of results per page */}`  |
| HTML and Vue templates                                 | `<!-- --- Pagination --- -->` | `<!-- Number of results per page -->` |
| CSS                                                    | `/* --- Fields --- */`        | `/* Keep keyboard focus visible */`   |
| Python and shell                                       | `# --- Validation ---`        | `# Reject incomplete submissions`     |

For tier 1 in CSS, JSX markup, or HTML and Vue templates, use three separately wrapped comment lines: border, upper-case title, border. For Python and shell, prefix each of those three lines with `#`. Inside JavaScript expressions in JSX/TSX, use normal JavaScript comments.

### Documentation comments

**Documentation comments are separate from tiers. There is no tier 0.** Document classes, functions, and methods using the language's standard documentation format. Use function or method documentation for its purpose, parameters, return value, and exceptions as needed; a divider is not a replacement for it.

- **JavaScript and TypeScript:** JSDoc or the project's existing TSDoc convention (`/** ... */`), directly above the declaration.
- **PHP:** PHPDoc (`/** ... */`), directly above the declaration, with `@param`, `@return`, `@throws`, or `@var` as needed.
- **Python:** a docstring as the first statement inside the class, function, or method. Do not replace it with a tier-3 `#` comment.
- **CSS:** no docblocks. A comment on a stylesheet section or declaration is a tier-3 comment and follows its rules: one line, one of the four kinds.

Documentation comments still follow the "Comment volume" rules below. Tool directives, license headers, and `TODO:` markers keep their required formats and are not extra tiers.

### Bracket labels

**A comment line with a fixed, repeating role starts with an upper-case tag in square brackets.** The tag is the whole marker -- no colon after it, no other punctuation. The sentence follows on the same line. Same shape in a docblock and in a tier-3 line comment.

`[TRAP]` is the shared tag: a hazard the reader would otherwise trip over, one line. It is the only tag every file may use.

```
// [TRAP] Keep it to status = -1 only, or legacy queries return half-built rows
```

A module may also define tags for its own named steps (`[RESERVE]`, `[WRITE]`, `[FINALISE]`). **Name a step, never number it** -- `[RESERVE]`, not `tx1`. Do not invent a tag for a one-off note; a new tag earns its place only when the same role repeats in several spots.

## Comment volume

**When an accepted ADR already holds the reasoning, the code carries a one-line reference to it and nothing else.** Name the ADR file and the specific decision within it. Two copies of one table will drift, and the copy in the code is the one nobody updates. "Accepted ADR" means a file in `docs/adr/`. A spec or ticket in a temporary tracker is not one.

**Content not recorded anywhere else is moved out, not kept in place.** Before cutting something because "the ADR holds it", open the ADR and confirm it actually does. If it is not recorded anywhere, write it into an ADR first, then delete it from the code.

Keep:

- The purpose of a module, function, class, or component, stated briefly.
- A tier-3 comment of one of the four allowed kinds (see "The three shapes").
- A genuine hazard the reader would otherwise trip over and that no ADR records -- one line, tagged `[TRAP]`.
- A `TODO:` marking work that is deliberately unfinished, saying what is missing.

Remove on sight:

- Tables, rules or histories an accepted ADR already holds. Replace with the reference.
- Prose restating what a name or type signature already says.
- Description of what a _different_ function does. That belongs on that function.
- Large blocks of commented-out code kept "just in case". Git already has it. The one exception is a commented-out wiring line directly above the code that will replace it, kept while a feature is half built -- and it must carry a `TODO:` or a one-line note saying what completes it.

No line-count ceiling for comments in general; do not invent one. A language section may cap one specific kind of comment (for example, PHP docblocks).

### Bad and good

| Bad                                            | Why it fails                                  | Good                                                                 |
| ---------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------- |
| `// Loop over the users`                       | Repeats the code                              | Delete                                                               |
| `/* Primary brand ramp */` above `--forest-*`  | The role name `--color-brand` already says it | Delete                                                               |
| `/* Never pure black */` above an ink ramp     | A design rule the design doc already holds    | Delete, or a pointer to the design-doc section                       |
| Three lines on why breakpoints must be rem     | A paragraph in code                           | `/* [TRAP] Must be rem, a px breakpoint loses the cascade to lg: */` |
| No comment above `::-webkit-inner-spin-button` | Purpose not visible from the selector         | `/* Hide the browser's spin buttons */`                              |

### Dormant branches

**A legacy branch that is not ported gets one line: what it does, plus the source `file:line`. Never a commented-out copy of its body.**

```
// Dormant: Video ad types serve a VAST url, not markup. Ad.php:1559-1588.
```

The legacy source is the copy. A second copy in a comment drifts and nobody updates it.

## Testing

- **Assert external behavior, not internal calls.** A good test checks what the system actually did (what got rendered, what the route returned, what state a row ended up in, what got written) -- not which internal function got invoked. Internal refactors shouldn't break tests that never claimed to care about internals.
- **Prefer the highest existing seam.** Rendering a real page, hitting a real route, or spawning the real process, and asserting on what comes out, is worth more than a unit test of one helper in the middle. Use a mock only where the real thing cannot run in a test.
- **Isolate storage specifics behind one seam.** If the storage layer could plausibly change, put every schema-shaped detail (table names, column names, query shapes) in one harness or fixture file. Tests read as behavior assertions and stay valid across a storage swap.
- **Don't add a seam just to test a convention.** Some rules here are judgement calls no test can check (see "Enforcement" below). A test that can only verify the mechanical half of such a rule gives a false green -- don't write it.

## Quality gate

- **Every project has one gate command.** It runs lint, format check, type check, and build, plus tests and static analysis where the stack has them. The stack sections below name it. Code is not done until it passes.
- **Fix findings with the tools, not by hand.** Run the auto-fixers first. Don't hand-fix what a tool already fixes.

## Enforcement

**Missing required tiers are standards violations.** Code review must check present major sections, processing steps, and purpose groups for their required dividers, and unclear operations for required tier-3 explanations. Passing the automated quality gate does not satisfy this manual review.

**The judgement rules here (readable over short, naming meaning, comment dividers, comment volume) have no automated enforcement and cannot have one.** No linter reads what a comment says, whether a name is honest, or whether an ADR already holds a paragraph. Enforcement is a human or agent reading this file and applying judgement. This is not a gap to be closed later; it is what this kind of rule is.

**Old violations are fixed on touch.** Whoever next edits a file for a real reason brings that file up to these rules. Not in a separate sweep. Code review flags the violations a diff introduces.

## JS / TS

### Quality gate

`npm run ci:check` is the gate. It runs `eslint`, `prettier --check`, `tsc --noEmit`, and the framework build -- the same set CI runs. **Code is not done until it passes.** When a backend stack wraps it in its own gate command, run that one instead; it includes these checks.

Fix findings with the tools, in this order: `npm run lint` (eslint --fix), then `npm run format` (prettier --write). ESLint owns import order, prettier owns whitespace; the reverse order does not converge.

**One import sorter only.** ESLint's import-order rule sorts imports. Never add a second sorter such as `prettier-plugin-organize-imports` -- the two contradict each other and the gate never settles.

On ESLint 10 the import rules come from `eslint-plugin-import-x` (`import-x/order`), because `eslint-plugin-import` does not support ESLint 10. On older ESLint it is `import/order`.

### Naming

Case rules. What a name should say is under "Naming meaning" above.

- Types and interfaces: `PascalCase` (`AppState`, `TestResult`).
- Functions, variables, and constants that vary at runtime: `camelCase`.
- Fixed module-level constants that never change after load: `UPPER_SNAKE_CASE` (`DEBOUNCE_DELAY`, `POLL_INTERVAL_MS`).

**Every filename is lowercase kebab-case.** Only the exported identifier keeps its case: `HeaderSearchBar` lives in `header-search-bar.tsx`, `useSearch` lives in `use-search.tsx`. Two reasons:

- It is what the JS ecosystem does. `vercel/commerce` (`loading-dots.tsx`), `shadcn-ui/ui` (`alert-dialog.tsx`) and `bulletproof-react` all agree, so generated files (`npx shadcn add`) already match.
- It removes a real bug class. Windows and macOS filesystems ignore case, Linux does not. A miscased import such as `@/components/ui/Link` resolves locally and then fails the CI build. All-lowercase filenames leave nothing to miscase.

### Module system

Prefer ESM `import` / `export`. `require()` with `// eslint-disable-next-line @typescript-eslint/no-require-imports` is an accepted stopgap, not a violation to flag on sight -- but only when the comment names the actual blocker:

- A module path known only at runtime (`require(adaptorPath)`): cannot be a static `import` by definition.
- A dependency not yet migrated, commented "swap for ESM import, deferred": a stated reason, so it is compliant. When picked up as cleanup, migrate the `require`; don't delete the reasoning first.

A bare disable with no stated reason is the thing to flag.

### `@ts-nocheck`

A file that opens with `// @ts-nocheck : JS compatible` is plain JavaScript inside a `.ts` / `.tsx` extension, on purpose. Match the surrounding file. Do not convert it to strict typing unless that is the actual task, and do not add `@ts-nocheck` to a file that does not already have it.

## Vue

Vue 3 with Vite. Composition API and `<script setup lang="ts">` in every single-file component (SFC). This follows the official Vue style guide and the `create-vue` scaffold.

### Quality gate in Vue

- **The type-check step is `vue-tsc`, not `tsc`.** Plain `tsc` cannot read `.vue` files, so it passes while an SFC has type errors. The `create-vue` script is `vue-tsc --build`.
- **The build step is `vite build`.**
- **ESLint runs `eslint-plugin-vue` at its `flat/recommended` level, plus `@vue/eslint-config-typescript`.** Together they own template style: `v-for` keys, `v-if` with `v-for`, attribute order, multi-word component names, self-closing tags, and SFC block order. Do not restate or hand-check those rules.
- **[TRAP] `create-vue` writes `flat/essential`, not `flat/recommended`.** The essential level skips attribute order, self-closing tags and the other style rules. Raise it in `eslint.config.ts`.
- **Keep `vue/no-v-html` on.** See "Templates" below for the only allowed use.

### Generated and static files

Never hand-edit or reformat:

- `public/` -- static assets served as they are.
- `dist/` -- build output.
- `env.d.ts` and any other `*.d.ts` file written by a Vite plugin.

### Where things live

The layout follows the `create-vue` scaffold. `@/` points at `src/`.

- `src/main.ts` -- creates the app, installs the router and Pinia, mounts it. Nothing else.
- `src/App.vue` -- the root component and the page shell.
- `src/views/` -- one component per route, named with a `View` suffix (`CartView` in `CartView.vue`).
- `src/components/` -- reusable components. Add a subfolder only once a third related component shows up.
- `src/composables/` -- composables shared by more than one component.
- `src/stores/` -- Pinia stores, one store per file.
- `src/router/` -- route definitions.
- `src/utils/` -- plain helper functions and constants, no Vue reactivity. Nuxt uses the same folder name.
- `src/api/` -- API clients and request functions.
- `src/assets/` -- images, fonts and CSS imported in code. An import is checked by the build; a `/images/...` string is not.

Folders never to create: `mixins/` (replaced by composables), `helpers/` and `lib/` (use `utils/`), `containers/`, `common/`.

### Imports

**Always import through the `@/` alias, never a relative path.** This holds for components, composables, stores, types, CSS and images, even for a file in the same folder.

```ts
import CartItem from '@/components/CartItem.vue'; // yes
import CartItem from './CartItem.vue'; // no
```

**Import every component and composable explicitly.** Do not add `unplugin-vue-components` or `unplugin-auto-import`. With auto-import, a search for a component's path does not find its users, and the type check depends on a generated `.d.ts` file.

### Naming in Vue

Case and meaning rules for plain code are above. These add the Vue-specific names.

- **Components are `PascalCase` multi-word nouns** (`CartItem`, not `Item`). A single word can clash with a current or future HTML element.
- **The `.vue` file is `PascalCase` and matches the component name** (`CartItem` in `CartItem.vue`). The Vue docs and `create-vue` use this form, and Vue DevTools shows the name taken from the file. This holds even where another section asks for kebab-case filenames.
- **Base components take a `Base` prefix** (`BaseButton`, `BaseInput`). A base component has no app logic and no store access.
- **A child that only makes sense inside one parent starts with the parent's name** (`CartList` and `CartListItem`).
- **In templates, component tags are `PascalCase`** (`<CartItem />`) and props are kebab-case (`:item-count="3"`). In script, props are camelCase (`itemCount`).
- **Event names are camelCase in `defineEmits` and kebab-case in the parent template** (`emit('itemRemoved')`, listened to as `@item-removed`). Name an event for what happened, not for what the parent should do.
- **Composables are `useSomething`** in `useSomething.ts`. The file name matches the export, as in VueUse and the Nuxt docs. This also holds where another section asks for kebab-case filenames.
- **Pinia stores are `useSomethingStore`** in `src/stores/something.ts`, with store id `'something'`. File name and store id are the same word (`todos.ts`, `'todos'`, `useTodosStore`). This matches the Pinia docs snippet and the `create-vue` scaffold.

Exempt from the verb-first rule (framework names): component names, composables, compiler macros (`defineProps`, `defineEmits`, `defineModel`, `defineSlots`, `defineExpose`, `defineOptions`), lifecycle hooks (`onMounted`, `onUnmounted`, ...), and `defineStore`.

### Single-file components

- **Block order is `<script setup lang="ts">`, then `<template>`, then `<style scoped>`.** The script declares what the template uses, so it reads first.
- **No Options API and no mixins in new code.** Shared logic is a composable. An existing Options API file is converted only when that is the actual task.
- **Each SFC block is its own code region.** Apply the comment tiers inside each block, with that block's comment syntax (see "Comment syntax" above).
- **Keep `<script setup>` groups in this order:** props and emits, stores and composables, local state, computed values, watchers, lifecycle hooks, handlers. A reader then finds the inputs first and the side effects last.

### Props, emits and v-model

- **Declare props and emits by type, not at runtime.**

```ts
const { size = 'md', items } = defineProps<{ size?: 'sm' | 'md'; items: CartItem[] }>();
const emit = defineEmits<{ itemRemoved: [id: number] }>();
```

- **Give defaults through the props destructure** (Vue 3.5+), not `withDefaults`.
- **[TRAP] A destructured prop passed to `watch` or a composable must be wrapped in a getter** (`watch(() => size, ...)`). A bare `size` passes the current value once and never updates.
- **Never mutate a prop.** Props go down, events go up. For two-way binding use `defineModel()`, not a prop plus an `update:` emit written by hand.
- **Use `defineExpose` only when a parent must call a method** (for example `focus()`). Data flows through props and events.
- **Use `provide` / `inject` only for data that many levels need** (theme, form context). Use a typed `InjectionKey` symbol as the key, never a string.

### Reactive state

- **Use `ref()` for all local state.** Use `reactive()` only for a fixed-shape object that is never reassigned or destructured. Destructuring a `reactive()` object loses reactivity.
- **Derived values are `computed`, never a watcher that writes into another ref.** A watcher that copies state creates a second source of truth and an extra render.
- **Watchers are for side effects only:** a request, storage, a third-party library call.
- **Template refs use `useTemplateRef('name')`** (Vue 3.5+), not a `ref(null)` with a matching name.
- **Every listener, timer or observer started in `onMounted` is removed in `onUnmounted`.** Check VueUse first; its composables already clean up after themselves.

### Composables

- **A composable goes in `src/composables/` only when more than one component uses it.** A composable used by one component stays in that component's script.
- **Return a plain object of refs, not a `reactive()` object.** The caller can then destructure it and keep reactivity.
- **Accept inputs as `MaybeRefOrGetter<T>` and read them with `toValue()`.** The caller can then pass a value, a ref, or a getter.
- **Check VueUse before writing a composable for a browser API** (`useEventListener`, `useLocalStorage`, `useIntersectionObserver`). It is the standard library for this.

### Pinia stores

- **Write setup stores** (`defineStore('cart', () => { ... })`), not option stores. They use the same Composition API as components.
- **[TRAP] A setup store returns every piece of state.** Pinia ignores a `ref` it does not see in the return object, so DevTools, SSR and plugins miss it.
- **A store holds state shared across routes or across unrelated components.** State used by one component tree stays in that tree, through props or `provide`.
- **Destructure store state with `storeToRefs()`.** Plain destructuring copies the values and loses reactivity. Actions may be destructured directly.
- **Components do not write store state directly.** Changes go through a store action, so one place owns each change.

### Router

- **Lazy-load every route view except the first page** (`component: () => import('@/views/CartView.vue')`). Each route then becomes its own chunk.
- **Name every route and navigate by name** (`router.push({ name: 'cart' })`). A URL change then edits one file.

### Templates

- **Template expressions stay simple:** a property access, a method call, or one simple ternary. Anything more goes into a `computed` value.
- **[TRAP] `v-html` renders raw HTML and opens an XSS hole.** Use it only on content sanitized with DOMPurify (or the same) in the script. Disable `vue/no-v-html` for that one line, with a comment that names where the sanitizing happens.
- **Pass content with slots, not with HTML strings in props.**

### Styling

- **Every `<style>` block is `scoped`.** A global style goes in the app's global CSS file, never in an unscoped SFC block.
- **Use `:deep()` only to style a third-party component's inner markup.** Never use it to reach into your own child component; give the child a prop or a slot instead.
- **With Tailwind, class order is owned by `prettier-plugin-tailwindcss`.** Never hand-sort it.

### Testing in Vue

- **Use Vitest with `@vue/test-utils` (or `@testing-library/vue`).**
- **Assert the rendered DOM and the emitted events** (`wrapper.emitted('itemRemoved')`). Never read or set `wrapper.vm` internals; that tests the implementation, not the behavior.
- **Give components their store through `createTestingPinia()`** from `@pinia/testing` and set the starting state there. Do not mock the store module by hand. Its actions are stubbed by default; pass `stubActions: false` when the test needs them to run.

# Part 2: Repo coding standard

Rules for this repo only: owned folders, reference implementations, frozen files, files not yet converted, and how the gate is wired (CI, hooks).
