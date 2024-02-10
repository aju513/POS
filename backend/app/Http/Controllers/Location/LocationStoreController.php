<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Models\District;
use App\Models\Municipality;
use App\Models\Province;
use Illuminate\Http\Request;

class LocationStoreController extends Controller
{
    //
    public function index()
    {
        // $path = public_path() . '/json/nepal_location.json';
        // $json = json_decode(file_get_contents($path), true);
        // foreach ($json['provinceList'] as $province) {
        //     $newProvince = new Province();
        //     $newProvince->id = $province['id'];
        //     $newProvince->name = $province['name'];
        //     $newProvince->save();
        //     foreach ($province['districtList'] as $district) {

        //         $newDistrict = new District();
        //         // $newProvince->id = $district['id'];
        //         $newDistrict->name = $district['name'];
        //         $newDistrict->province_id = $newProvince->id;
        //         $newDistrict->save();
        //         foreach ($district['municipalityList'] as $municipalities) {
        //             $newMuni = new Municipality();
        //             // $newMuni->id = $municipalities['id'];
        //             $newMuni->name = $municipalities['name'];
        //             $newMuni->province_id = $newProvince->id;
        //             $newMuni->district_id = $newDistrict->id;
        //             $newMuni->save();
        //         }
        //     }

        // }
        return response()->json(Municipality::find(200)->district);
    }
}
