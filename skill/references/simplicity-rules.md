# Simplicity Rules by Language

Append the relevant section(s) to the universal config template.
These are concrete, language-specific rules — not generic advice.

---

## Python

```markdown
## Python-Specific Rules

### Structure
- Use functions and modules. Avoid classes unless you genuinely need to hold shared state
  across multiple methods *and* there are at least 3 of those methods.
- Prefer `dataclasses` or `TypedDict` over plain dicts for structured data — names the fields.
- Use list/dict comprehensions for simple transforms. Use a regular `for` loop when the logic
  has conditions or side effects.

### Types
- Add type hints to all function signatures. They are documentation.
  ```python
  def get_user(user_id: str) -> dict | None:
  ```
- Don't use `Any` unless interfacing with truly dynamic external data.

### Naming
- `snake_case` for everything except classes (`PascalCase`) and constants (`UPPER_CASE`).
- Use plural names for collections: `users`, `product_ids`, not `user_list` or `items`.

### Specific patterns
- `pathlib.Path` instead of `os.path` string manipulation.
- `logging` instead of `print` for anything that's not direct user output.
- Context managers (`with`) for any resource that needs cleanup.
- Don't catch broad `Exception` unless you re-raise or specifically log it.

### What to avoid
- Metaclasses, `__getattr__` magic, decorators with state — explain in a comment if you must use them.
- Deeply nested lambdas.
- Mutable default arguments (`def fn(items=[])` is a bug, not a style issue).
```

---

## TypeScript / JavaScript

```markdown
## TypeScript/JavaScript-Specific Rules

### Types (TypeScript)
- Type everything that leaves or enters a function.
- Prefer `type` aliases for simple shapes, `interface` for things that extend.
- Use `unknown` instead of `any` when the shape is truly unknown — forces a runtime check.
- No `as SomeType` casts without a comment explaining why the type system can't infer it.

### Async
- `async/await` over raw Promises and `.then()` chains.
- Always handle the error case: `try/catch` or `.catch()` — never ignore it.
- Name async functions with a verb: `fetchUser`, `saveOrder`, not `userData` or `orderHandler`.

### Structure
- One exported thing per file (component, function, class). Name the file after it.
- No barrel files (`index.ts` that re-exports everything) unless the module is a published package.
- Prefer named exports over default exports — named exports are explicit in imports.

### React (if applicable)
- One component per file.
- Props interfaces named `[ComponentName]Props`.
- No logic in JSX — extract to a named variable or function above the return.
  ```tsx
  // BAD
  return <div>{users.filter(u => u.active).map(u => <User key={u.id} user={u} />)}</div>
  
  // GOOD
  const activeUsers = users.filter(u => u.active)
  return <div>{activeUsers.map(u => <User key={u.id} user={u} />)}</div>
  ```
- `useState` for local UI state. Don't reach for a global state library until you have 3+
  components sharing the same state.

### What to avoid
- Ternaries nested inside ternaries.
- Object spread for mutations: `{ ...obj, nested: { ...obj.nested, key: val } }` — use
  `structuredClone` or a named update function.
- `// eslint-disable` comments without an explanation.
```

---

## Go

```markdown
## Go-Specific Rules

### Structure
- Small packages with a single, clear purpose. Package name = what it does.
- Unexported (lowercase) everything that doesn't need to be used outside the package.
- Accept interfaces, return structs.

### Error handling
- Handle errors immediately where they occur. Don't accumulate them.
- Wrap errors with context: `fmt.Errorf("loading user %s: %w", id, err)`.
- Never `_` an error return unless you have an explicit comment explaining why.

### Naming
- Short, clear names at narrow scope; longer names at package scope.
- `err` for errors, `ok` for bool returns, `ctx` for context — follow Go conventions.
- Avoid stuttering: `user.UserID` → `user.ID`.

### What to avoid
- `interface{}` / `any` — use generics if you need a typed container.
- `init()` functions with side effects.
- Global mutable state.
```

---

## Rust

```markdown
## Rust-Specific Rules

### Ownership & borrowing
- Prefer borrowing over cloning unless the clone is intentional and worth a comment.
- Use `&str` for read-only string input, `String` for owned output.

### Error handling
- Use `?` for error propagation. No `.unwrap()` except in tests or genuinely impossible cases
  (explain in a comment).
- Define a project-level error type (or use `thiserror`) rather than stringing `Box<dyn Error>`.

### Structure
- One struct/enum + its `impl` block per file for non-trivial types.
- Derive common traits explicitly: `#[derive(Debug, Clone, PartialEq)]` — don't hide them.

### What to avoid
- `unsafe` without a `// SAFETY:` comment explaining the invariant.
- Lifetimes on public API unless truly necessary — redesign if you can avoid them.
```

---

## SQL

```markdown
## SQL-Specific Rules

### Queries
- One query = one question. Don't combine two separate data needs into one query with a subquery
  unless performance demands it.
- Name CTEs after what they contain, not what they do: `active_users`, not `filtered`.
- Avoid `SELECT *` in application code — list columns explicitly.

### Schema
- Column names are `snake_case`, singular nouns: `user_id`, `created_at`, `is_active`.
- Every table has a primary key named `id`.
- Add a comment on any column whose purpose isn't obvious from its name.

### What to avoid
- Business logic in SQL triggers — put it in application code where it's visible.
- Deeply nested subqueries — break into CTEs.
```

---

## Shell / Bash

```markdown
## Shell/Bash-Specific Rules

### Always at the top
```bash
#!/usr/bin/env bash
set -euo pipefail
```
`-e` exits on error, `-u` catches unset variables, `-o pipefail` catches pipe failures.

### Variables
- Quote all variable expansions: `"$var"` not `$var`.
- Use `local` for function variables.
- `UPPER_CASE` for exported/global vars, `lower_case` for local vars.

### Functions
- Extract any logic used more than once into a named function.
- Functions print to stdout or set a variable — not both.

### What to avoid
- Parsing `ls` output.
- `eval`.
- Scripts longer than ~100 lines — break into separate scripts called from a main one.
```

---

## C++

```markdown
## C++-Specific Rules

### Structure
- Favor composition over inheritance. Keep hierarchies shallow (no more than 2 levels).
- One class = one responsibility. If a class exceeds 200 lines, it's doing too much.
- Header-only templates are okay for small utilities; otherwise, separate `.hpp` and `.cpp`.

### Safety
- RAII is mandatory. Use `std::unique_ptr` and `std::shared_ptr` instead of raw `new`/`delete`.
- `const` everything that isn't modified. It's the most important keyword.
- No `using namespace std;`. Be explicit with `std::`.

### Naming
- `camelCase` for variables and functions, `PascalCase` for classes, `UPPER_CASE` for macros.
- Member variables prefix with `m_` or suffix with `_`: `m_user_id` or `user_id_`.

### What to avoid
- Preprocessor macros for constants — use `constexpr`.
- C-style casts — use `static_cast`, `const_cast`, etc.
- Manual memory management unless you're writing a low-level allocator.
```

---

## C#

```markdown
## C#-Specific Rules

### Structure
- Use `records` for immutable data shapes.
- Use `async/await` for any I/O. Use `ValueTask` for high-frequency async operations.
- Prefer LINQ for data transformations; use `foreach` when there are side effects.

### Safety
- Enable nullable reference types and treat warnings as errors.
- Use `using` declarations (e.g., `using var stream = ...`) for `IDisposable` resources.
- Use `sealed` by default for classes to prevent unintended inheritance.

### Naming
- `PascalCase` for classes, methods, and properties. `camelCase` for local variables.
- Interfaces start with `I`: `IUserRepository`.
- Booleans start with `Is`, `Has`, `Can`: `IsAuthorized`.

### What to avoid
- Deeply nested `if` statements — use guard clauses and early returns.
- Broad `try-catch` blocks — catch specific exceptions.
- Static classes for things that should be injected via DI.
```

---

## Ruby

```markdown
## Ruby-Specific Rules

### Structure
- One module/class = one job. Keep methods under 10 lines.
- Use `attr_reader` for read-only access. Avoid `attr_accessor` unless you need it.
- Prefer blocks and enumerables (`map`, `select`, `reduce`) over manual loops.

### Naming
- `snake_case` for everything except classes (`PascalCase`) and constants (`UPPER_CASE`).
- Predicate methods end in `?`: `logged_in?`, `empty?`.
- Mutating methods that might surprise the user end in `!`: `save!`, `update!`.

### Specific patterns
- Use `Hash` for small sets of data; use `Struct` or `Data.define` for structured data.
- Handle exceptions only when you can recover from them. Don't use `rescue nil`.
- Use `freeze` on strings used as constants.

### What to avoid
- Global variables (`$global`).
- Monkey-patching core classes unless you're building a framework (and even then, think twice).
- Deeply nested hashes — extract to a value object.
```

---

## How to select rules

When writing the config for a user:

1. Start with the universal template from `config-template.md`
2. Identify the primary language(s) from context
3. Append the relevant section(s) verbatim (removing the outer code fence)
4. If the language isn't listed here, write 3–5 rules following the same pattern:
   structure, naming, error handling, "what to avoid"
