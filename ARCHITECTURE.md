# Architecture — Insurance Application Demo

**Version:** 0.2
**Status:** Proposed  
**Related document:** [PRD.md](./PRD.md)

## 1. Architecture goals

- Use Laravel, Inertia.js, React, and Tailwind CSS.
- Keep the demo frontend-led: Laravel serves Inertia pages, while React owns demo sign-in, role-based page flow, product browsing, application state, validation, application history, and simulated submission.
- Separate presentation, application flow, domain rules, and infrastructure adapters.
- Keep product and application data in memory. Do not add a database, API, or persistent storage for this demo.
- Use English for function names, variable names, types, file names, and code comments.

## 2. High-level design

The application is a Laravel monolith with a React/Inertia frontend. Laravel handles URL routing and returns the requested Inertia page. Demo accounts, role checks, and application records live in frontend memory only. They demonstrate the experience and do not provide real authentication, authorization, or durable storage.

Within the frontend, each feature is split into four responsibilities:

1. **Presentation** renders pages and reusable feature UI.
2. **Application** coordinates user actions and the application wizard flow.
3. **Domain** defines feature types and rules without React or Laravel dependencies.
4. **Infrastructure** provides static product data and the in-memory submission simulator.

## 3. Proposed folder structure

```text
app/
└── Http/
    └── Controllers/
        └── Web/
            ├── ProductPageController.php
            └── ApplicationPageController.php

routes/
└── web.php

resources/
├── css/
│   └── app.css
└── js/
    ├── app.tsx
    ├── pages/
    │   ├── Admin/
    │   │   ├── Submissions.tsx
    │   │   ├── Users.tsx
    │   │   └── components/
    │   │       └── AdminDialog.tsx
    │   ├── Products/
    │   │   ├── Index.tsx
    │   │   └── Show.tsx
    │   ├── Applications/
    │   │   └── Create.tsx
    │   ├── Auth/
    │   │   └── Login.tsx
    │   └── Dashboard/
    │       ├── Admin.tsx
    │       └── User.tsx
    ├── layouts/
    │   ├── AdminLayout.tsx
    │   └── AppLayout.tsx
    ├── modules/
    │   ├── auth/
    │   │   ├── application/
    │   │   │   └── demoSessionStore.ts
    │   │   ├── domain/
    │   │   │   ├── demoAccount.ts
    │   │   │   └── demoUserRecord.ts
    │   │   ├── infrastructure/
    │   │   │   ├── demoAccounts.ts
    │   │   │   ├── inMemoryUserDirectory.ts
    │   │   │   └── mockUsers.ts
    │   │   └── presentation/
    │   │       └── hooks/
    │   │           ├── useDemoSession.ts
    │   │           ├── useRoleGuard.ts
    │   │           └── useUsers.ts
    │   ├── products/
    │   │   ├── domain/
    │   │   │   └── product.ts
    │   │   ├── infrastructure/
    │   │   │   └── productCatalog.ts
    │   │   └── presentation/
    │   │       ├── components/
    │   │       │   ├── ProductCard.tsx
    │   │       │   └── ProductIcon.tsx
    │   │       └── ProductDetails.tsx
    │   └── application/
    │       ├── domain/
    │       │   ├── insuranceApplication.ts
    │       │   ├── applicationHistory.ts
    │       │   └── applicationRules.ts
    │       ├── application/
    │       │   ├── createApplication.ts
    │       │   ├── submitApplication.ts
    │       │   └── applicationSubmissionGateway.ts
    │       ├── infrastructure/
    │       │   ├── inMemoryApplicationHistory.ts
    │       │   ├── mockApplicationHistory.ts
    │       │   └── mockApplicationSubmission.ts
    │       └── presentation/
    │           ├── components/
    │           │   ├── ApplicationWizard.tsx
    │           │   ├── StepIndicator.tsx
    │           │   └── SubmissionConfirmation.tsx
    │           ├── hooks/
    │           │   ├── useApplicationForm.ts
    │           │   └── useApplicationHistory.ts
    ├── shared/
    │   ├── components/
    │   │   └── FormField.tsx
    │   ├── hooks/
    │   ├── lib/
    │   └── types/
    └── types/
        └── inertia.d.ts
```

This tree shows the intended application structure. Laravel's framework files and configuration remain in their standard locations. Add a file only when the corresponding responsibility is needed.

## 4. Folder responsibilities

### Laravel

- `routes/web.php` declares page routes and maps them to web controllers.
- `app/Http/Controllers/Web/` returns Inertia pages and minimal route props such as a selected product slug. Login and dashboard routes are presentation routes only; role checks are simulated in React.
- Controllers must not contain React state, product rules, application form orchestration, or simulated underwriting logic.
- No application submission `POST` route is needed while submission remains a client-side simulation.

### Inertia page entry points

- `resources/js/pages/` contains Inertia-resolved page components using the Laravel React starter kit's page resolver convention.
- Page components connect route props to feature presentation components. Keep page components thin.
- `resources/js/app.tsx` bootstraps React and Inertia and resolves page components.
- `resources/js/layouts/` contains shared page layout and site navigation.

### Feature modules

- `modules/products/domain/` defines product types and product-related rules.
- `modules/products/infrastructure/` contains the static product catalog used by the demo.
- `modules/products/presentation/` renders the catalog, category selection, and product details.
- `modules/auth/domain/` defines demo account and role types.
- `modules/auth/infrastructure/` provides the fixed admin demo account, mock user fixtures, and an observable in-memory user directory. Active directory records are exposed as user demo sign-in accounts.
- `modules/auth/application/` owns the in-memory demo session; a selected application destination is carried in the login URL's `next` parameter.
- `modules/auth/presentation/` renders the account picker and provides role-aware navigation guards. These guards are for the demo flow only and are not security controls.
- `modules/application/domain/` defines the application shape and pure validation or transition rules.
- `modules/application/application/` coordinates wizard actions, step transitions, and submission requests.
- `modules/application/infrastructure/` simulates a successful submission, keeps submitted records in memory, and generates a demo reference number. It must not claim that the insurer approved or issued a policy.
- `modules/application/presentation/` renders application steps and connects form input to the application flow.

### Shared frontend code

- `shared/components/` contains generic UI components used across features.
- `shared/hooks/` contains reusable React hooks that are not specific to a single feature.
- `shared/lib/` contains small framework-independent helpers.
- `shared/types/` contains types shared by multiple modules. Keep feature-specific types in their owning module.

## 5. Data flow

### Product browsing

1. A browser request reaches a route in `routes/web.php`.
2. A web controller returns the relevant Inertia page and any minimal route props.
3. The page reads product data from `modules/products/infrastructure/productCatalog.ts`.
4. Product presentation components render the catalog or selected product details.

### Application submission

1. The selected product is passed into the Inertia application page.
2. React owns the wizard state for applicant, insured item, coverage, documents, and review steps.
3. Domain rules and the application schema validate the current form data.
4. On confirmation, the application use case calls the mock submission adapter.
5. The adapter returns a demo reference and a submitted result.
6. React adds a submitted record with the active demo account ID to in-memory application history.
7. React displays the submission confirmation in the same page flow.

### Demo sign-in and role flow

1. Guest users may browse the product catalog and product details.
2. Selecting **Start application** sends a guest to `/login` with the selected application path preserved.
3. The login form matches the email to a predefined demo account and validates the shared demo password.
4. A valid demo account is set in a module-level in-memory store.
5. Admin accounts navigate to `/admin/dashboard`. User accounts with a safe `/apply/{slug}` `next` destination navigate directly to that application form; other user accounts navigate to `/dashboard`.
6. The user dashboard filters application history by the active account ID. The admin dashboard reads all records.
7. The pending destination is cleared once it is consumed so it cannot reopen after the application flow.

The admin area uses a dedicated responsive sidebar layout and exposes `/admin/dashboard` (overview), `/admin/submissions` (application list with detail, create, update, and delete), and `/admin/users` (user list with create, update, and delete). Static fixtures provide ten mock users and ten mock submissions. Admin changes and live submissions use observable in-memory stores; refresh discards the changes and reinitializes the static fixtures. Submission history stores a snapshot of applicant, insured item, coverage, document names, and accuracy confirmation so the admin detail view can render the submitted information.

Role guards only control the user experience. Laravel routes are not protected by these client-side mock roles, so this architecture is unsuitable for real accounts or sensitive application data.

Application data exists only in browser memory. A page refresh clears an unfinished application. Simulated document uploads keep file names or mock metadata only; files are not uploaded to a server.

## 6. Product-specific form data

Keep shared applicant fields in the application model. Keep product-specific insured-item fields grouped by product type instead of creating one form model with unrelated fields for every category.

The product-specific form variants should cover the PRD categories:

- Motor Vehicle
- Engineering
- Marine
- Neon Sign
- Mobile Phone
- Liability
- Property
- Business Interruption

Motor Vehicle coverage options are Comprehensive, Total Loss Only (TLO), and Special Insurance “Magic Car”. Product labels and descriptions are demo content, not policy terms.

## 7. Naming and dependency rules

- Use English `camelCase` for variables and functions, `PascalCase` for React components and types, and `kebab-case` only where a tool or URL convention requires it.
- Use descriptive names such as `selectedProduct`, `applicationDraft`, and `submitApplication`; avoid ambiguous names such as `data`, `item`, or `handleThing` when a more specific name is practical.
- React components may depend on their feature's application and domain code.
- Application use cases may depend on domain types and declared adapter interfaces, not on React components.
- Domain code must not import React, Inertia, Laravel, browser storage, or UI components.
- Infrastructure adapters implement the interfaces needed by application use cases.
- Shared code must not import feature-specific modules. Features may use shared code.
- Tailwind utility classes belong in presentation components. Keep product rules and submission behavior out of styling code.

## 8. State and persistence boundaries

- Product catalog: static TypeScript data imported by the React product module.
- Demo session: module-level in-memory state for the active account. A requested application destination travels in the login URL's `next` query parameter.
- Application history: ten static mock records plus module-level in-memory submissions owned by demo account IDs. Admin CRUD updates the observable collection in memory.
- Demo users: ten static mock user records managed through an observable in-memory directory. Active user records can sign in with the shared demo password; inactive records cannot.
- Application draft: React in-memory state owned by the application wizard.
- Submission: simulated in the browser; no Laravel endpoint is called.
- Persistence: none. Do not use a database, local storage, session storage, or cookies for demo session, application history, or application drafts.
- Refresh behavior: the demo account, admin CRUD changes, live submissions, and in-progress application are cleared. The user returns as a guest; static sample records are loaded again.

## 9. Explicitly out of scope

- Real authentication, authorization, and durable user account management.
- Database or durable application storage.
- Backend API or actual application submission endpoint.
- Payment, quotation calculation, underwriting, approval, and policy issuance.
- Real document upload or storage.
- Claims processing.
