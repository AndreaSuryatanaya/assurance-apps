<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationPageController extends Controller
{
    public function create(string $slug): Response
    {
        return Inertia::render('Applications/Create', [
            'productSlug' => $slug,
        ]);
    }
}
