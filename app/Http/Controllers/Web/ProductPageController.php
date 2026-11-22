<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ProductPageController extends Controller
{
    public function show(string $slug): Response
    {
        return Inertia::render('Products/Show', [
            'productSlug' => $slug,
        ]);
    }
}
