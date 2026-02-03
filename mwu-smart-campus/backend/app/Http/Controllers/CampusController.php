<?php

namespace App\Http\Controllers;

use App\Models\CampusBoundary;
use Illuminate\Http\Request;

class CampusController extends Controller
{
    public function index()
    {
        $boundary = CampusBoundary::first();
        
        if (!$boundary) {
            return response()->json([
                'name' => 'Madda Walabu University',
                'geometry' => [
                    'minLat' => 7.1100,
                    'minLng' => 39.9800,
                    'maxLat' => 7.1500,
                    'maxLng' => 40.0300
                ]
            ]);
        }

        return response()->json($boundary);
    }
}
