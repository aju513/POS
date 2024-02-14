<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;
use App\Manager\ImageManager;
use App\Models\Address;
use App\Models\Supplier;
use Str;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $suppliers = (new Supplier())->getAllSupplier($request);
        return SupplierListResource::collection($suppliers);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSupplierRequest $request)
    {
        //
        $address = (new Address())->prepareData($request[1]);

        $supplier = $request[0];

        $supplier['user_id'] = auth()->id();
        if ($supplier['logo']) {

            $file = $supplier['logo'];
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($supplier['name']);
            $path = Supplier::IMG_URL_PATH;
            $path_thumb = Supplier::THUMB_IMG_URL_PATH;
            $supplier['logo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $height_thumb, $path_thumb, $file);
        }

        $supplier = Supplier::create($supplier);
        $supplier->address()->create($address);
        return response()->json(['msg' => 'Supplier Created Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Supplier $supplier)
    {
        return new SupplierEditResource($supplier);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        //
        $address = (new Address())->prepareData($request[1]);

        $supplier_data = $request[0];


        $supplier_data['user_id'] = auth()->id();
        $url = filter_var($supplier_data['logo'], FILTER_SANITIZE_URL);

        // Validate url
        if (filter_var($url, FILTER_VALIDATE_URL) === false) {

            $file = $supplier_data['logo'];
            $width = 800;
            $height = 800;
            $width_thumb = 150;
            $height_thumb = 150;
            $name = Str::slug($supplier_data['name']);
            $path = Supplier::IMG_URL_PATH;
            $path_thumb = Supplier::THUMB_IMG_URL_PATH;
            $supplier_data['logo'] = ImageManager::uploadImageManager($name, $width, $height, $path, $file);
            ImageManager::uploadImageManager($name, $width_thumb, $height_thumb, $path_thumb, $file);
        } else {
            unset($supplier_data['logo']);
        }
        return $supplier_data;
        $supplier->update($supplier_data);
        $supplier->address()->update($address);
        return response()->json(['msg' => 'Supplier Created Successfully.', 'cls' => 'sucess']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Supplier $supplier)
    {
        //
        $supplier->address->delete();
        $supplier->delete();
    }
}
