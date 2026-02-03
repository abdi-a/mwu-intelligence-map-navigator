<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RouteController extends Controller
{
    public function route(Request $request)
    {
        $request->validate([
            'from' => 'required|string', 
            'to' => 'required|string',
        ]);

        $from = explode(',', $request->from);
        $to = explode(',', $request->to);

        if (count($from) !== 2 || count($to) !== 2) {
            return response()->json(['error' => 'Invalid coordinates format'], 400);
        }

        $osrmUrl = env('OSRM_BASE_URL', 'http://router.project-osrm.org');
        $coords = trim($from[1]) . ',' . trim($from[0]) . ';' . trim($to[1]) . ',' . trim($to[0]);
        
        $url = "{$osrmUrl}/route/v1/driving/{$coords}?overview=full&geometries=geojson";

        try {
            $response = Http::get($url);
            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch route'], 500);
        }
    }
}
