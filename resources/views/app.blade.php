<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:site_name" content="Haltev Insurrance">
        <meta property="og:title" content="Haltev Insurrance">
        <meta property="og:description" content="Explore insurance products and submit a demo application with Haltev Insurrance.">
        <meta property="og:type" content="website">
        <meta property="og:image" content="{{ asset('images/brand/haltev-logo.png') }}">
        <meta property="og:image:alt" content="Haltev Insurrance logo">
        <meta name="twitter:card" content="summary">
        <meta name="twitter:image" content="{{ asset('images/brand/haltev-logo.png') }}">

        <link rel="icon" href="/favicon.ico?v=haltev-1" sizes="any">
        <link rel="icon" href="/favicon.png?v=haltev-1" type="image/png" sizes="128x128">
        <link rel="icon" href="/favicon.svg?v=haltev-1" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=haltev-1">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
