<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Building;
use App\Models\CampusBoundary;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        CampusBoundary::create([
            'name' => 'Main Campus',
            'geometry' => [
                'minLat' => 7.125000,
                'minLng' => 39.995000,
                'maxLat' => 7.140000,
                'maxLng' => 40.015000
            ]
        ]);

        $cats = [
            ['name' => 'Libraries', 'slug' => 'libraries'],
            ['name' => 'Cafes', 'slug' => 'cafes'],
            ['name' => 'Dorms', 'slug' => 'dorms'],
            ['name' => 'Admin', 'slug' => 'admin'],
        ];

        foreach ($cats as $c) {
            Category::create($c);
        }

        $libId = Category::where('slug', 'libraries')->first()->id;
        $cafeId = Category::where('slug', 'cafes')->first()->id;
        $dormId = Category::where('slug', 'dorms')->first()->id;
        $adminId = Category::where('slug', 'admin')->first()->id;

        $buildings = [
            [
                'name' => 'Main Gate',
                'category_id' => $adminId,
                'latitude' => 7.1265,
                'longitude' => 40.0010,
                'description' => 'The main entrance to MWU campus.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Main+Gate'
            ],
            [
                'name' => 'Admin Building',
                'category_id' => $adminId,
                'latitude' => 7.1320,
                'longitude' => 40.0050,
                'description' => 'Registrar, Finance, and President Office.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Admin+Block'
            ],
            [
                'name' => 'Main Library',
                'category_id' => $libId,
                'latitude' => 7.1350,
                'longitude' => 40.0080,
                'description' => '24/7 reading rooms and digital resources.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Main+Library'
            ],
            [
                'name' => 'Student Cafe 1',
                'category_id' => $cafeId,
                'latitude' => 7.1290,
                'longitude' => 40.0030,
                'description' => 'Open 6am - 8pm. Serves traditional food.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Cafe+1'
            ],
            [
                'name' => 'Block 101 (Men Dorm)',
                'category_id' => $dormId,
                'latitude' => 7.1380,
                'longitude' => 40.0100,
                'description' => 'Freshman dormitory.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Block+101'
            ],
             [
                'name' => 'Block 205 (Women Dorm)',
                'category_id' => $dormId,
                'latitude' => 7.1370,
                'longitude' => 40.0120,
                'description' => 'Senior dormitory block.',
                'image_url' => 'https://via.placeholder.com/600x400?text=Block+205'
            ],
        ];

        foreach ($buildings as $b) {
            Building::create($b);
        }
    }
}
