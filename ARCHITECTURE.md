# Architecture — Insurance Application Demo

**Version:** 0.1  
**Status:** Proposed  
**Related document:** [PRD.md](./PRD.md)

## 1. Architecture goals

- Use Laravel, Inertia.js, React, and Tailwind CSS.
- Keep the demo frontend-led: Laravel serves Inertia pages, while React owns product browsing, application state, validation, and simulated submission.
- Separate presentation, application flow, domain rules, and infrastructure adapters.
- Keep product and application data in memory. Do not add a database, API, or persistent storage for this demo.
- Use English for function names, variable names, types, file names, and code comments.

## 2. High-level design

The application is a Laravel monolith with a React/Inertia frontend. Laravel handles URL routing and returns the requested Inertia page. It does not make underwriting decisions or persist application submissions.

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
    │   ├── Products/
    │   │   ├── Index.tsx
    │   │   └── Show.tsx
    │   └── Applications/
    │       └── Create.tsx
    ├── layouts/
    │   └── AppLayout.tsx
    ├── modules/
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
    │       │   └── applicationRules.ts
    │       ├── application/
    │       │   ├── createApplication.ts
    │       │   ├── submitApplication.ts
    │       │   └── applicationSubmissionGateway.ts
    │       ├── infrastructure/
    │       │   └── mockApplicationSubmission.ts
    │       └── presentation/
    │           ├── components/
    │           │   ├── ApplicationWizard.tsx
    │           │   ├── StepIndicator.tsx
    │           │   └── SubmissionConfirmation.tsx
    │           ├── hooks/
    │           │   └── useApplicationForm.ts
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
- `app/Http/Controllers/Web/` returns Inertia pages and minimal route props such as a selected product slug.
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
- `modules/application/domain/` defines the application shape and pure validation or transition rules.
- `modules/application/application/` coordinates wizard actions, step transitions, and submission requests.
- `modules/application/infrastructure/` simulates a successful submission and generates a demo reference number. It must not claim that the insurer approved or issued a policy.
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
6. React displays the submission confirmation in the same page flow.

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
- Application draft: React in-memory state owned by the application wizard.
- Submission: simulated in the browser; no Laravel endpoint is called.
- Persistence: none. Do not use a database, local storage, session storage, or cookies for application drafts in this demo.
- Refresh behavior: an in-progress application is lost and the user starts again.

## 9. Explicitly out of scope

- Authentication and user accounts.
- Database or durable application storage.
- Backend API or actual application submission endpoint.
- Payment, quotation calculation, underwriting, approval, and policy issuance.
- Real document upload or storage.
- Claims processing.
